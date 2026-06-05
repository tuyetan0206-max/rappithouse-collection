-- Chạy file này trong Supabase SQL Editor để dùng dữ liệu online thật.
create table members (
  id text primary key,
  name text not null,
  role text default 'Thành viên',
  created_at timestamptz default now()
);

create table flowers (
  id text primary key,
  name text not null,
  type text default 'MỚI',
  color text default 'Hồng',
  image_url text,
  is_open boolean default true,
  created_at timestamptz default now()
);

create table member_flowers (
  member_id text references members(id) on delete cascade,
  flower_id text references flowers(id) on delete cascade,
  owned boolean default true,
  updated_at timestamptz default now(),
  primary key(member_id, flower_id)
);

alter table members enable row level security;
alter table flowers enable row level security;
alter table member_flowers enable row level security;

create policy "members read" on members for select using (true);
create policy "flowers read" on flowers for select using (true);
create policy "member_flowers read" on member_flowers for select using (true);
create policy "member_flowers write" on member_flowers for all using (true) with check (true);
