-- Run this in your Supabase project's SQL editor (Project -> SQL Editor -> New query)

create table if not exists cameras (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,           -- used in the QR code URL, e.g. "camera-1"
  name text not null,                  -- e.g. "The Wanderer"
  story text default '',               -- the backstory, editable from admin
  total_frames int not null default 27,
  lat double precision default 34.0522,
  lng double precision default -118.2437,
  location_label text default 'Los Angeles, CA',
  location_updated_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid references cameras(id) on delete cascade,
  frames_remaining int not null,
  note text default '',
  finder_name text default '',
  created_at timestamptz default now()
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid references cameras(id) on delete cascade,
  checkin_id uuid references checkins(id) on delete set null,
  file_url text not null,
  media_type text default 'image',     -- 'image' or 'video'
  created_at timestamptz default now()
);

-- Row Level Security: public can read everything, and can insert check-ins/media
-- (this is an anonymous, walk-up-and-use app, so writes are open by design)
alter table cameras enable row level security;
alter table checkins enable row level security;
alter table media enable row level security;

create policy "public read cameras" on cameras for select using (true);
create policy "public read checkins" on checkins for select using (true);
create policy "public read media" on media for select using (true);

create policy "public insert checkins" on checkins for insert with check (true);
create policy "public insert media" on media for insert with check (true);

-- Only the admin page (using the password gate) should update/delete cameras.
-- For a true MVP we allow it via the anon key too, gated client-side by the
-- admin password. If you want real security, move these to a Supabase Edge
-- Function with a service-role key instead.
create policy "public update cameras" on cameras for update using (true);
create policy "public insert cameras" on cameras for insert with check (true);
create policy "public delete checkins" on checkins for delete using (true);
create policy "public delete media" on media for delete using (true);

-- Storage bucket for photo/video uploads (create via dashboard too, see README)
insert into storage.buckets (id, name, public)
values ('camera-media', 'camera-media', true)
on conflict (id) do nothing;

create policy "public read media bucket" on storage.objects
  for select using (bucket_id = 'camera-media');

create policy "public upload media bucket" on storage.objects
  for insert with check (bucket_id = 'camera-media');

-- Seed your 4 cameras (edit names/slugs now, or later from /admin.html)
insert into cameras (slug, name, total_frames, location_label)
values
  ('camera-1', 'Margarita Skinny Cam', 27, 'Los Angeles, CA'),
  ('camera-2', 'Margarita Spicy Cam', 27, 'Los Angeles, CA'),
  ('camera-3', 'Margarita Strawberry Cam', 27, 'Los Angeles, CA'),
  ('camera-4', 'Margarita Salty Cam', 27, 'Los Angeles, CA')
on conflict (slug) do nothing;


update cameras set name = 'Margarita Skinny Cam' where slug = 'camera-1';
update cameras set name = 'Margarita Spicy Cam' where slug = 'camera-2';
update cameras set name = 'Margarita Strawberry Cam' where slug = 'camera-3';
update cameras set name = 'Margarita Salty Cam' where slug = 'camera-4';
