'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Flower2,
  Search,
  UserRound,
  LayoutGrid,
  Plus,
  RotateCcw,
  Trophy,
  Sparkles,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type Member = {
  id: number;
  name: string;
  email?: string | null;
  role?: string | null;
};

type Flower = {
  id: number;
  name: string;
  image_url?: string | null;
  category?: string | null;
  status?: string | null;
};

type Claim = {
  id: number;
  flower_id: number;
  member_id: number;
  note?: string | null;
};

type Tab = 'collection' | 'profile' | 'admin';

export default function Home() {
  const [tab, setTab] = useState<Tab>('collection');
  const [members, setMembers] = useState<Member[]>([]);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Tất cả loại');
  const [newFlower, setNewFlower] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    if (!supabase) {
      setError('Chưa cấu hình Supabase trong Vercel Environment Variables.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const [membersRes, flowersRes, claimsRes] = await Promise.all([
      supabase.from('members').select('id,name,email,role').order('id', { ascending: true }),
      supabase.from('flowers').select('id,name,image_url,category,status').order('id', { ascending: true }),
      supabase.from('flower_claims').select('id,flower_id,member_id,note').order('id', { ascending: true }),
    ]);

    if (membersRes.error || flowersRes.error || claimsRes.error) {
      setError(
        membersRes.error?.message || flowersRes.error?.message || claimsRes.error?.message || 'Không tải được dữ liệu.'
      );
      setLoading(false);
      return;
    }

    const memberData = (membersRes.data || []) as Member[];
    setMembers(memberData);
    setFlowers((flowersRes.data || []) as Flower[]);
    setClaims((claimsRes.data || []) as Claim[]);
    setCurrent((old) => old ?? memberData[0]?.id ?? null);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const me = members.find((m) => m.id === current) || members[0];
  const total = flowers.length;
  const myClaims = claims.filter((c) => c.member_id === current);
  const myFlowerIds = new Set(myClaims.map((c) => c.flower_id));

  const categories = useMemo(() => {
    const arr = flowers.map((f) => f.category || 'Khác').filter(Boolean);
    return ['Tất cả loại', ...Array.from(new Set(arr))];
  }, [flowers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flowers.filter((f) => {
      const okType = type === 'Tất cả loại' || (f.category || 'Khác') === type;
      const okSearch = !q || f.name.toLowerCase().includes(q);
      return okType && okSearch;
    });
  }, [flowers, query, type]);

  const ranking = useMemo(() => {
    return members
      .map((m) => {
        const count = claims.filter((c) => c.member_id === m.id).length;
        const pct = total ? Math.round((count / total) * 100) : 0;
        return { ...m, count, pct };
      })
      .sort((a, b) => b.count - a.count);
  }, [members, claims, total]);

  function ownersOf(flowerId: number) {
    const ownerIds = new Set(claims.filter((c) => c.flower_id === flowerId).map((c) => c.member_id));
    return members.filter((m) => ownerIds.has(m.id));
  }

  async function toggleFlower(flowerId: number) {
    if (!supabase || !current) return;
    const existed = claims.find((c) => c.member_id === current && c.flower_id === flowerId);

    if (existed) {
      const { error: deleteError } = await supabase.from('flower_claims').delete().eq('id', existed.id);
      if (deleteError) {
        alert(deleteError.message);
        return;
      }
      setClaims((old) => old.filter((c) => c.id !== existed.id));
      return;
    }

    const { data, error: insertError } = await supabase
      .from('flower_claims')
      .insert({ member_id: current, flower_id: flowerId, note: 'Đã có' })
      .select('id,flower_id,member_id,note')
      .single();

    if (insertError) {
      alert(insertError.message);
      return;
    }
    setClaims((old) => [...old, data as Claim]);
  }

  async function addFlower() {
    if (!supabase) return;
    const name = newFlower.trim();
    if (!name) return;
    const nextId = Math.max(0, ...flowers.map((f) => f.id)) + 1;
    const { data, error: insertError } = await supabase
      .from('flowers')
      .insert({ id: nextId, name: name.toUpperCase(), category: 'MỚI', status: null, image_url: null })
      .select('id,name,image_url,category,status')
      .single();

    if (insertError) {
      alert(insertError.message);
      return;
    }
    setFlowers((old) => [...old, data as Flower]);
    setNewFlower('');
  }

  if (loading) {
    return <main className="page"><h1>RAPPIT HOUSE</h1><p>Đang tải dữ liệu...</p></main>;
  }

  if (error) {
    return <main className="page"><h1>RAPPIT HOUSE</h1><p className="note">Lỗi: {error}</p></main>;
  }

  if (!me) {
    return <main className="page"><h1>RAPPIT HOUSE</h1><p>Chưa có thành viên.</p></main>;
  }

  return (
    <main>
      <nav className="top">
        <div className="brand"><Flower2 /> RAPPIT HOUSE</div>
        <div className="navlinks">
          <button className={tab === 'collection' ? 'active' : ''} onClick={() => setTab('collection')}><Flower2 /> Collection</button>
          <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}><UserRound /> Profile</button>
          <button className={tab === 'admin' ? 'active' : ''} onClick={() => setTab('admin')}><LayoutGrid /> Admin</button>
          <select value={current ?? ''} onChange={(e) => setCurrent(Number(e.target.value))}>
            {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <button onClick={loadData}><RotateCcw /> Tải lại</button>
        </div>
      </nav>

      {tab === 'collection' && (
        <section className="page">
          <header className="hero">
            <div>
              <h1><Flower2 /> RAPPIT HOUSE</h1>
              <p>Xin chào, <b>{me.name}</b> <span>{me.role}</span></p>
            </div>
            <button className="add" onClick={() => setTab('admin')}><Plus /> Thêm hoa</button>
          </header>

          <Stats total={total} joined={members.length} mine={myFlowerIds.size} />
          <Filters query={query} setQuery={setQuery} type={type} setType={setType} categories={categories} />

          <div className="grid">
            {filtered.map((f) => (
              <FlowerCard
                key={f.id}
                f={f}
                mine={myFlowerIds.has(f.id)}
                owners={ownersOf(f.id)}
                toggle={() => toggleFlower(f.id)}
              />
            ))}
          </div>
        </section>
      )}

      {tab === 'profile' && (
        <section className="page">
          <div className="profile">
            <div className="avatar">{me.name.includes('Bé') ? 'BÉ' : 'RH'}</div>
            <div><h2>{me.name}</h2><span>{me.role}</span></div>
            <div className="bigstat"><b>{myFlowerIds.size}</b><small>Hoa</small></div>
            <div className="bigstat"><b>#{ranking.findIndex((r) => r.id === current) + 1}</b><small>Hạng</small></div>
            <div className="bigstat"><b>{total ? Math.round((myFlowerIds.size / total) * 100) : 0}%</b><small>Đạt được</small></div>
            <label>Tiến trình sưu tập</label>
            <div className="bar"><i style={{ width: `${total ? (myFlowerIds.size / total) * 100 : 0}%` }} /></div>
            <p>{myFlowerIds.size} / {total} hoa</p>
          </div>

          <div className="columns">
            <section>
              <h2><Sparkles /> Hoa của tôi <small>{myFlowerIds.size}</small></h2>
              {flowers.filter((f) => myFlowerIds.has(f.id)).map((f) => (
                <div className="row" key={f.id}>
                  <b>{f.image_url ? <img src={f.image_url} alt="" /> : <Flower2 />}</b>
                  <span>{f.name}<em>{f.category} · Đã có</em></span>
                  <button onClick={() => toggleFlower(f.id)}><Trash2 /> Xóa</button>
                </div>
              ))}
            </section>

            <section>
              <h2><Trophy /> Bảng xếp hạng <small>{members.length}</small></h2>
              <div className="search"><Search /><input placeholder="Tìm thành viên..." value={query} onChange={(e) => setQuery(e.target.value)} /></div>
              {ranking.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())).map((r, i) => (
                <div className="rank" key={r.id}>
                  <b>{i + 1}</b><span>{r.name}<em>{r.role}</em></span><strong>{r.count}<small>{r.pct}%</small></strong>
                </div>
              ))}
            </section>
          </div>
        </section>
      )}

      {tab === 'admin' && (
        <section className="page">
          <h1>Admin quản lý hoa</h1>
          <div className="admin">
            <input placeholder="Nhập tên hoa mới..." value={newFlower} onChange={(e) => setNewFlower(e.target.value)} />
            <button onClick={addFlower}><Plus /> Thêm hoa</button>
          </div>
          <p className="note">Dữ liệu đang lấy trực tiếp từ Supabase. Khi thành viên tích/xóa hoa, dữ liệu sẽ cập nhật online.</p>
          {flowers.map((f) => (
            <div className="row" key={f.id}>
              <b>{f.image_url ? <img src={f.image_url} alt="" /> : <Flower2 />}</b>
              <span>{f.name}<em>{ownersOf(f.id).length} thành viên đang sở hữu</em></span>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

function Stats({ total, joined, mine }: { total: number; joined: number; mine: number }) {
  return (
    <div className="stats">
      <div><Flower2 /><b>{total}</b><span>Tổng số hoa</span></div>
      <div><Users /><b>{joined}</b><span>Thành viên online</span></div>
      <div><Search /><b>{mine}</b><span>Hoa của tôi</span></div>
    </div>
  );
}

function Filters({ query, setQuery, type, setType, categories }: { query: string; setQuery: (v: string) => void; type: string; setType: (v: string) => void; categories: string[] }) {
  return (
    <div className="filters">
      <div className="search"><Search /><input placeholder="Tìm hoa, xem ai đang sở hữu..." value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      <div className="select"><SlidersHorizontal /><select value={type} onChange={(e) => setType(e.target.value)}>{categories.map((t) => <option key={t}>{t}</option>)}</select></div>
    </div>
  );
}

function FlowerCard({ f, mine, owners, toggle }: { f: Flower; mine: boolean; owners: Member[]; toggle: () => void }) {
  return (
    <article className="card">
      <div className="pic">{f.image_url ? <img src={f.image_url} alt={f.name} /> : <span>{f.category === 'ĐỎ' ? '🌺' : '❀'}</span>}<i>{f.category || 'Khác'}</i></div>
      <h3>{f.name}</h3>
      <p><Users /> Thành viên ({owners.length})</p>
      {owners.length ? <ul>{owners.slice(0, 8).map((o) => <li key={o.id}>{o.name} <em>— Đã có</em></li>)}</ul> : <em>Chưa có thành viên</em>}
      <button className={mine ? 'ok' : 'join'} onClick={toggle}>{mine ? <CheckCircle2 /> : <Users />} {mine ? 'Đã tham gia / bấm để xóa' : 'Tích hoa này'}</button>
    </article>
  );
}
