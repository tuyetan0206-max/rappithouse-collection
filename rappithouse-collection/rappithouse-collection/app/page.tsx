'use client';

import { useMemo, useState, useEffect } from 'react';
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

type Member = { id: string; name: string; role: string };
type Flower = { id: string; name: string; type: string; color: string; image: string; open?: boolean };

const members: Member[] = [
  { id: 'be-tho', name: 'RH •「Bé Thỏ」', role: 'Hội Trưởng' },
  { id: 'zoi', name: 'RH •「Zoi」', role: 'Tinh Anh' },
  { id: 'tuyet-nha', name: 'RH •「Tuyết Nhã」', role: 'Tinh Anh' },
  { id: 'uniii', name: 'RH •「Uniii」', role: 'Thành viên' },
  { id: 'nana', name: 'RH •「Nana Cute」', role: 'Thành viên' },
  { id: 'nhu', name: 'RH •「Như Ýiee96」', role: 'Thành viên' },
  { id: 'tieu-mieu', name: 'RH •「Tiểu Miêu」', role: 'Thành viên' },
  { id: 'doa-nhi', name: 'RH •「Đóa Nhi」', role: 'Thành viên' },
  { id: 'moc-nhi', name: 'RH •「Mộc Nhi」', role: 'Thành viên' },
  { id: 'coca', name: 'RH •「Coca」', role: 'Thành viên' },
  { id: 'miu', name: 'RH •「Miu」', role: 'Thành viên' },
  { id: 'bun', name: 'RH •「Bún」', role: 'Thành viên' },
  { id: 'susu', name: 'RH •「Susu」', role: 'Thành viên' },
  { id: 'mimi', name: 'RH •「Mimi」', role: 'Thành viên' },
  { id: 'gumi', name: 'RH •「Gumi」', role: 'Thành viên' },
  { id: 'bong', name: 'RH •「Bông」', role: 'Thành viên' },
  { id: 'meo', name: 'RH •「Mèo」', role: 'Thành viên' },
  { id: 'kem', name: 'RH •「Kem」', role: 'Thành viên' },
  { id: 'sam', name: 'RH •「Sam」', role: 'Thành viên' },
  { id: 'moon', name: 'RH •「Moon」', role: 'Thành viên' },
  { id: 'sun', name: 'RH •「Sun」', role: 'Thành viên' },
  { id: 'hana', name: 'RH •「Hana」', role: 'Thành viên' },
  { id: 'rin', name: 'RH •「Rin」', role: 'Thành viên' },
  { id: 'miya', name: 'RH •「Miya」', role: 'Thành viên' },
  { id: 'chou', name: 'RH •「Chou」', role: 'Thành viên' },
  { id: 'rinny', name: 'RH •「Rinny」', role: 'Thành viên' },
  { id: 'pupu', name: 'RH •「Pupu」', role: 'Thành viên' },
  { id: 'lala', name: 'RH •「Lala」', role: 'Thành viên' },
  { id: 'bibi', name: 'RH •「Bibi」', role: 'Thành viên' },
  { id: 'kiki', name: 'RH •「Kiki」', role: 'Thành viên' },
  { id: 'lili', name: 'RH •「Lili」', role: 'Thành viên' },
  { id: 'nini', name: 'RH •「Nini」', role: 'Thành viên' },
  { id: 'toto', name: 'RH •「Toto」', role: 'Thành viên' },
  { id: 'yuki', name: 'RH •「Yuki」', role: 'Thành viên' },
];

const flowers: Flower[] = [
  { id: 'chep-vang', name: 'CHÉP VÀNG VƯỢT SÓNG', type: 'ĐỎ', color: 'Đỏ', image: '🐠', open: true },
  { id: 'thien-cung', name: 'THIÊN CUNG', type: 'ĐỎ', color: 'Đỏ', image: '🏯', open: true },
  { id: 'ngan-ha', name: 'NGÂN HÀ CHIẾU NHUY', type: 'ĐỎ', color: 'Tím', image: '✿', open: true },
  { id: 'ba-ba-hong-nhat', name: 'BÀ BÀ NA HỒNG NHẠT', type: 'XANH DƯƠNG', color: 'Xanh dương', image: '🌸' },
  { id: 'ba-ba-trang-suong', name: 'BÀ BÀ NA TRẮNG SƯƠNG', type: 'XANH DƯƠNG', color: 'Xanh dương', image: '🌼' },
  { id: 'bach-hop-hong', name: 'BÁCH HỢP HỒNG', type: 'XANH LÁ', color: 'Xanh lá', image: '🌷' },
  { id: 'mau-don-do', name: 'MẪU ĐƠN ĐỎ', type: 'ĐỎ', color: 'Đỏ', image: '🌺' },
  { id: 'sen-vang', name: 'SEN VÀNG', type: 'VÀNG', color: 'Vàng', image: '🪷' },
  { id: 'tu-dang', name: 'TỬ ĐẰNG', type: 'TÍM', color: 'Tím', image: '💜' },
  { id: 'cam-tu-cau', name: 'CẨM TÚ CẦU', type: 'XANH DƯƠNG', color: 'Xanh dương', image: '💐' },
  { id: 'hoa-anh-dao', name: 'HOA ANH ĐÀO', type: 'HỒNG', color: 'Hồng', image: '🌸' },
  { id: 'huong-duong', name: 'HƯỚNG DƯƠNG', type: 'VÀNG', color: 'Vàng', image: '🌻' },
];

const seed: Record<string, string[]> = {
  'be-tho': flowers.slice(0, 8).map((f) => f.id),
  zoi: flowers.slice(1, 7).map((f) => f.id),
  'tuyet-nha': flowers.slice(0, 6).map((f) => f.id),
  uniii: ['thien-cung', 'ngan-ha', 'sen-vang'],
  nana: ['ngan-ha', 'hoa-anh-dao'],
  nhu: ['ngan-ha', 'bach-hop-hong'],
  'tieu-mieu': ['ngan-ha', 'mau-don-do'],
  'doa-nhi': ['ngan-ha', 'tu-dang'],
};

export default function Home() {
  const [tab, setTab] = useState<'collection' | 'profile' | 'admin'>('collection');
  const [current, setCurrent] = useState('be-tho');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Tất cả loại');
  const [data, setData] = useState<Record<string, string[]>>(seed);
  const [list, setList] = useState<Flower[]>(flowers);
  const [newFlower, setNewFlower] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('rh-data');
    const savedFlowers = localStorage.getItem('rh-flowers');
    if (saved) setData(JSON.parse(saved));
    if (savedFlowers) setList(JSON.parse(savedFlowers));
  }, []);

  useEffect(() => {
    localStorage.setItem('rh-data', JSON.stringify(data));
    localStorage.setItem('rh-flowers', JSON.stringify(list));
  }, [data, list]);

  const me = members.find((m) => m.id === current) ?? members[0];
  const filtered = list.filter(
    (f) => (type === 'Tất cả loại' || f.type === type) && f.name.toLowerCase().includes(query.toLowerCase()),
  );
  const myIds = data[current] || [];
  const owners = (flowerId: string) => members.filter((m) => (data[m.id] || []).includes(flowerId));
  const ranking = useMemo(
    () =>
      members
        .map((m) => ({
          ...m,
          count: (data[m.id] || []).length,
          pct: Math.round((((data[m.id] || []).length || 0) / Math.max(list.length, 1)) * 100),
        }))
        .sort((a, b) => b.count - a.count),
    [data, list.length],
  );

  const toggleFlower = (id: string) => {
    setData((d) => {
      const has = (d[current] || []).includes(id);
      return {
        ...d,
        [current]: has ? (d[current] || []).filter((x) => x !== id) : [...(d[current] || []), id],
      };
    });
  };

  const addFlower = () => {
    if (!newFlower.trim()) return;
    const id = newFlower
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-');
    setList([...list, { id, name: newFlower.toUpperCase(), type: 'MỚI', color: 'Hồng', image: '✿', open: true }]);
    setNewFlower('');
  };

  return (
    <main>
      <nav className="top">
        <div className="brand"><Flower2 /> RAPPIT HOUSE</div>
        <div className="navlinks">
          <button className={tab === 'collection' ? 'active' : ''} onClick={() => setTab('collection')}><Flower2 /> Collection</button>
          <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}><UserRound /> Profile</button>
          <button className={tab === 'admin' ? 'active' : ''} onClick={() => setTab('admin')}><LayoutGrid /> Admin</button>
          <select value={current} onChange={(e) => setCurrent(e.target.value)}>
            {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <button onClick={() => setData(seed)}><RotateCcw /> Đổi/Reset</button>
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
          <Stats total={list.length} joined={members.length} mine={myIds.length} />
          <Filters query={query} setQuery={setQuery} type={type} setType={setType} list={list} />
          <div className="grid">
            {filtered.map((f) => (
              <FlowerCard key={f.id} f={f} mine={myIds.includes(f.id)} owners={owners(f.id)} toggle={() => toggleFlower(f.id)} />
            ))}
          </div>
        </section>
      )}

      {tab === 'profile' && (
        <section className="page">
          <div className="profile">
            <div className="avatar">{me.name.includes('Bé') ? 'BÉ' : 'RH'}</div>
            <div><h2>{me.name}</h2><span>{me.role}</span></div>
            <div className="bigstat"><b>{myIds.length}</b><small>Hoa</small></div>
            <div className="bigstat"><b>#{ranking.findIndex((r) => r.id === current) + 1}</b><small>Hạng</small></div>
            <div className="bigstat"><b>{Math.round((myIds.length / Math.max(list.length, 1)) * 100)}%</b><small>Đạt được</small></div>
            <label>Tiến trình sưu tập</label>
            <div className="bar"><i style={{ width: `${(myIds.length / Math.max(list.length, 1)) * 100}%` }} /></div>
            <p>{myIds.length} / {list.length} hoa</p>
          </div>

          <div className="columns">
            <section>
              <h2><Sparkles /> Hoa của tôi <small>{myIds.length}</small></h2>
              {list.filter((f) => myIds.includes(f.id)).map((f) => (
                <div className="row" key={f.id}>
                  <b>{f.image}</b>
                  <span>{f.name}<em>{f.type} · Đã có</em></span>
                  <button onClick={() => toggleFlower(f.id)}><Trash2 /> Xóa</button>
                </div>
              ))}
            </section>
            <section>
              <h2><Trophy /> Bảng xếp hạng <small>{members.length}</small></h2>
              <div className="search"><Search /><input placeholder="Tìm thành viên..." value={query} onChange={(e) => setQuery(e.target.value)} /></div>
              {ranking.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())).map((r, i) => (
                <div className="rank" key={r.id}>
                  <b>{i + 1}</b>
                  <span>{r.name}<em>{r.role}</em></span>
                  <strong>{r.count}<small>{r.pct}%</small></strong>
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
          <p className="note">Bản này chạy được ngay bằng dữ liệu lưu trên trình duyệt. Khi kết nối Supabase, 34 thành viên có thể dùng chung dữ liệu online.</p>
          {list.map((f) => (
            <div className="row" key={f.id}>
              <b>{f.image}</b>
              <span>{f.name}<em>{owners(f.id).length} thành viên đang sở hữu</em></span>
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

function Filters({ query, setQuery, type, setType, list }: any) {
  const types = ['Tất cả loại', ...Array.from(new Set((list as Flower[]).map((f) => f.type)))] as string[];

  return (
    <div className="filters">
      <div className="search">
        <Search />
        <input placeholder="Tìm hoa, xem ai đang sở hữu..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="select">
        <SlidersHorizontal />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
    </div>
  );
}

function FlowerCard({ f, mine, owners, toggle }: { f: Flower; mine: boolean; owners: Member[]; toggle: () => void }) {
  return (
    <article className="card">
      <div className="pic"><span>{f.image}</span><i>{f.type}</i></div>
      <h3>{f.name}</h3>
      <p><Users /> Thành viên ({owners.length})</p>
      {owners.length ? (
        <ul>
          {owners.slice(0, 8).map((o) => <li key={o.id}>{o.name} <em>— Đã có</em></li>)}
        </ul>
      ) : (
        <em>Chưa có thành viên</em>
      )}
      <button className={mine ? 'ok' : 'join'} onClick={toggle}>
        {mine ? <><CheckCircle2 /> Đã tham gia / bấm để xóa</> : <><Users /> Tích hoa này</>}
      </button>
    </article>
  );
}
