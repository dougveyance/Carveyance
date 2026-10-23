-- ============================================================
-- CARVEYANCE GARAGE: database setup (Supabase)
-- ============================================================
-- Paste this whole file into Supabase > SQL Editor > New query,
-- and click Run. It's safe to run again: it only creates what
-- isn't there yet and replaces the functions with this version.
--
-- What it sets up:
--   stickers    one row per printed sticker. Only a scrambled
--               (hashed) copy of each claim code is stored.
--   cars        one row per claimed sticker: the car's page.
--   car_events  where the car has been (the event passport).
--   collects    who saved the car's card (one per phone per car).
--   scans       sticker scans (one per phone per car per day).
--   reports     "Report this page" messages.
--   admins      the Carveyance accounts that can moderate.
--   car-photos  the photo storage bucket (public to view).
--
-- Nothing here stores a VIN, a plate, an address or a location.
-- ============================================================

-- ---------- tables ----------

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.stickers (
  number          int primary key check (number between 1 and 99999),
  claim_hash      text not null,
  batch           text not null default '',
  car_id          uuid,
  claimed_at      timestamptz,
  failed_attempts int not null default 0,
  created_at      timestamptz not null default now()
);

create table if not exists public.cars (
  id             uuid primary key default gen_random_uuid(),
  sticker_number int not null unique references public.stickers(number),
  owner_id       uuid not null references auth.users(id) on delete cascade,
  owner_name     text not null default '' check (char_length(owner_name) <= 60),
  town           text not null default '' check (char_length(town) <= 60),
  instagram      text not null default '' check (char_length(instagram) <= 40),
  year           int check (year between 1885 and 2100),
  make           text not null default '' check (char_length(make) <= 40),
  model          text not null default '' check (char_length(model) <= 60),
  nickname       text not null default '' check (char_length(nickname) <= 60),
  story          text not null default '' check (char_length(story) <= 1200),
  specs          jsonb not null default '[]'::jsonb
                   check (jsonb_typeof(specs) = 'array' and jsonb_array_length(specs) <= 12),
  build          jsonb not null default '[]'::jsonb
                   check (jsonb_typeof(build) = 'array' and jsonb_array_length(build) <= 20),
  photos         jsonb not null default '[]'::jsonb
                   check (jsonb_typeof(photos) = 'array' and jsonb_array_length(photos) <= 12),
  card_color     text not null default '#9E2B25' check (card_color ~ '^#[0-9A-Fa-f]{6}$'),
  owner_hidden   boolean not null default false,
  -- set by Carveyance only (through the admin functions below):
  hidden         boolean not null default false,
  specs_checked  boolean not null default false,
  owner_slug     text not null default '' check (owner_slug ~ '^[a-z0-9-]*$'),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'stickers_car_id_fkey') then
    alter table public.stickers
      add constraint stickers_car_id_fkey foreign key (car_id)
      references public.cars(id) on delete set null;
  end if;
end $$;

create table if not exists public.car_events (
  id          bigint generated always as identity primary key,
  car_id      uuid not null references public.cars(id) on delete cascade,
  event_id    text not null default '' check (char_length(event_id) <= 120),
  name        text not null check (char_length(name) between 1 and 120),
  town        text not null default '' check (char_length(town) <= 60),
  event_date  date not null,
  level       text not null default 'owner' check (level in ('owner', 'seen', 'checked')),
  created_at  timestamptz not null default now()
);
create index if not exists car_events_car on public.car_events (car_id, event_date desc);

create table if not exists public.collects (
  car_id      uuid not null references public.cars(id) on delete cascade,
  device_id   uuid not null,
  event_id    text not null default '',
  event_name  text not null default '',
  created_at  timestamptz not null default now(),
  primary key (car_id, device_id)
);

create table if not exists public.scans (
  sticker_number int not null references public.stickers(number) on delete cascade,
  device_id      uuid not null,
  day            date not null default current_date,
  primary key (sticker_number, device_id, day)
);

create table if not exists public.reports (
  id          bigint generated always as identity primary key,
  car_id      uuid not null references public.cars(id) on delete cascade,
  reason      text not null check (char_length(reason) between 1 and 60),
  details     text not null default '' check (char_length(details) <= 1000),
  created_at  timestamptz not null default now()
);

-- keep updated_at current
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

drop trigger if exists cars_touch on public.cars;
create trigger cars_touch before update on public.cars
  for each row execute function public.touch_updated_at();

-- ---------- who may do what ----------
-- Supabase gives new tables broad default access, so start from
-- nothing and grant back only what each kind of visitor needs.

revoke all on public.admins, public.stickers, public.cars, public.car_events,
              public.collects, public.scans, public.reports
  from anon, authenticated;

alter table public.admins     enable row level security;
alter table public.stickers   enable row level security;
alter table public.cars       enable row level security;
alter table public.car_events enable row level security;
alter table public.collects   enable row level security;
alter table public.scans      enable row level security;
alter table public.reports    enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.admins where user_id = auth.uid())
$$;

-- cars: anyone can read a public page; owners read and edit their own
-- car (only the columns listed); Carveyance reads everything.
grant select (id, sticker_number, owner_name, town, instagram, year, make, model,
              nickname, story, specs, build, photos, card_color, owner_hidden,
              hidden, specs_checked, owner_slug, created_at, updated_at)
  on public.cars to anon;
grant select on public.cars to authenticated;
grant update (owner_name, town, instagram, year, make, model, nickname, story,
              specs, build, photos, card_color, owner_hidden)
  on public.cars to authenticated;

drop policy if exists cars_public_read on public.cars;
create policy cars_public_read on public.cars for select to anon, authenticated
  using (not hidden and not owner_hidden);
drop policy if exists cars_owner_read on public.cars;
create policy cars_owner_read on public.cars for select to authenticated
  using (owner_id = auth.uid());
drop policy if exists cars_admin_read on public.cars;
create policy cars_admin_read on public.cars for select to authenticated
  using (public.is_admin());
drop policy if exists cars_owner_update on public.cars;
create policy cars_owner_update on public.cars for update to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- car_events: readable wherever the car is readable. Owners add
-- "owner" entries for events that have already happened and can
-- remove their own entries; Carveyance adds "seen"/"checked".
grant select on public.car_events to anon, authenticated;
grant insert (car_id, event_id, name, town, event_date, level) on public.car_events to authenticated;
grant delete on public.car_events to authenticated;

drop policy if exists events_read on public.car_events;
create policy events_read on public.car_events for select to anon, authenticated
  using (exists (select 1 from public.cars c where c.id = car_id));
drop policy if exists events_owner_add on public.car_events;
create policy events_owner_add on public.car_events for insert to authenticated
  with check (level = 'owner' and event_date <= current_date
              and exists (select 1 from public.cars c where c.id = car_id and c.owner_id = auth.uid()));
drop policy if exists events_owner_remove on public.car_events;
create policy events_owner_remove on public.car_events for delete to authenticated
  using (level = 'owner'
         and exists (select 1 from public.cars c where c.id = car_id and c.owner_id = auth.uid()));
drop policy if exists events_admin_add on public.car_events;
create policy events_admin_add on public.car_events for insert to authenticated
  with check (public.is_admin() and event_date <= current_date);
drop policy if exists events_admin_remove on public.car_events;
create policy events_admin_remove on public.car_events for delete to authenticated
  using (public.is_admin());

-- reports: anyone can send one; only Carveyance reads or clears them.
grant insert (car_id, reason, details) on public.reports to anon, authenticated;
grant select, delete on public.reports to authenticated;
drop policy if exists reports_send on public.reports;
create policy reports_send on public.reports for insert to anon, authenticated
  with check (true);
drop policy if exists reports_admin_read on public.reports;
create policy reports_admin_read on public.reports for select to authenticated
  using (public.is_admin());
drop policy if exists reports_admin_clear on public.reports;
create policy reports_admin_clear on public.reports for delete to authenticated
  using (public.is_admin());

-- stickers, collects, scans, admins: no direct access at all.
-- Everything goes through the functions below.

-- ---------- functions the site calls ----------

-- What does sticker N lead to?  unknown / unclaimed / hidden / claimed
create or replace function public.sticker_status(p_number int)
returns table (status text, car_id uuid)
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare s record; c record;
begin
  select * into s from public.stickers where number = p_number;
  if not found then return query select 'unknown'::text, null::uuid; return; end if;
  if s.car_id is null then return query select 'unclaimed'::text, null::uuid; return; end if;
  select * into c from public.cars where id = s.car_id;
  if c.hidden or c.owner_hidden then return query select 'hidden'::text, null::uuid; return; end if;
  return query select 'claimed'::text, s.car_id;
end $$;

-- Claim sticker N with the code from its backing card.
-- Returns {"ok":true,"car_id":...} or {"ok":false,"error":...}.
-- After 10 wrong codes the sticker locks until Carveyance unlocks it.
create or replace function public.claim_sticker(p_number int, p_code text)
returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare s record; v_code text; v_car uuid;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'signed_out'); end if;
  select * into s from public.stickers where number = p_number for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'unknown'); end if;
  if s.car_id is not null then return jsonb_build_object('ok', false, 'error', 'claimed'); end if;
  if s.failed_attempts >= 10 then return jsonb_build_object('ok', false, 'error', 'locked'); end if;
  v_code := upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
  if encode(sha256(convert_to(p_number::text || ':' || v_code, 'UTF8')), 'hex') <> s.claim_hash then
    update public.stickers set failed_attempts = failed_attempts + 1 where number = p_number;
    return jsonb_build_object('ok', false, 'error', 'wrong_code',
                              'left', greatest(0, 9 - s.failed_attempts));
  end if;
  insert into public.cars (sticker_number, owner_id) values (p_number, auth.uid())
    returning id into v_car;
  update public.stickers set car_id = v_car, claimed_at = now(), failed_attempts = 0
    where number = p_number;
  return jsonb_build_object('ok', true, 'car_id', v_car);
end $$;

-- A phone scanned sticker N (counted once per phone per day).
create or replace function public.record_scan(p_number int, p_device uuid)
returns void
language sql volatile security definer set search_path = public, pg_temp as $$
  insert into public.scans (sticker_number, device_id)
  select p_number, p_device where exists (select 1 from public.stickers where number = p_number)
  on conflict do nothing
$$;

-- A phone saved this car's card (counted once per phone per car).
create or replace function public.record_collect(p_car uuid, p_device uuid,
                                                 p_event_id text, p_event_name text)
returns void
language sql volatile security definer set search_path = public, pg_temp as $$
  insert into public.collects (car_id, device_id, event_id, event_name)
  select p_car, p_device, left(coalesce(p_event_id, ''), 120), left(coalesce(p_event_name, ''), 120)
  where exists (select 1 from public.cars c where c.id = p_car and not c.hidden and not c.owner_hidden)
  on conflict do nothing
$$;

-- The owner's own numbers (also open to Carveyance). Private: never
-- shown on the public page.
create or replace function public.car_stats(p_car uuid)
returns jsonb
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare c record;
begin
  select * into c from public.cars where id = p_car;
  if not found or not (c.owner_id = auth.uid() or public.is_admin()) then return null; end if;
  return jsonb_build_object(
    'scans_30d', (select count(*) from public.scans
                  where sticker_number = c.sticker_number and day > current_date - 30),
    'scans_total', (select count(*) from public.scans where sticker_number = c.sticker_number),
    'collects', (select count(*) from public.collects where car_id = p_car),
    'by_event', coalesce((select jsonb_agg(x) from (
        select event_name as name, count(*) as n from public.collects
        where car_id = p_car and event_name <> ''
        group by event_name order by count(*) desc limit 5) x), '[]'::jsonb)
  );
end $$;

-- ---------- Carveyance-only functions ----------

create or replace function public.admin_overview()
returns jsonb
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return null; end if;
  return jsonb_build_object(
    'stickers', (select count(*) from public.stickers),
    'claimed', (select count(*) from public.stickers where car_id is not null),
    'locked', (select count(*) from public.stickers where failed_attempts >= 10 and car_id is null),
    'public_cars', (select count(*) from public.cars where not hidden and not owner_hidden),
    'scans_30d', (select count(*) from public.scans where day > current_date - 30),
    'collects', (select count(*) from public.collects),
    'reports', (select count(*) from public.reports));
end $$;

create or replace function public.admin_car_list()
returns table (id uuid, sticker_number int, year int, make text, model text,
               owner_name text, town text, hidden boolean, owner_hidden boolean,
               specs_checked boolean, owner_slug text, scans bigint, collects bigint,
               events bigint, updated_at timestamptz)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return; end if;
  return query
    select c.id, c.sticker_number, c.year, c.make, c.model, c.owner_name, c.town,
           c.hidden, c.owner_hidden, c.specs_checked, c.owner_slug,
           (select count(*) from public.scans s where s.sticker_number = c.sticker_number),
           (select count(*) from public.collects k where k.car_id = c.id),
           (select count(*) from public.car_events e where e.car_id = c.id),
           c.updated_at
    from public.cars c order by c.sticker_number;
end $$;

create or replace function public.admin_set_car(p_car uuid, p_hidden boolean,
                                                p_specs_checked boolean, p_owner_slug text)
returns boolean
language plpgsql volatile security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return false; end if;
  update public.cars set hidden = p_hidden, specs_checked = p_specs_checked,
         owner_slug = lower(coalesce(p_owner_slug, ''))
   where id = p_car;
  return found;
end $$;

create or replace function public.admin_unlock_sticker(p_number int)
returns boolean
language plpgsql volatile security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return false; end if;
  update public.stickers set failed_attempts = 0 where number = p_number;
  return found;
end $$;

revoke all on function public.admin_overview(), public.admin_car_list(),
                       public.admin_set_car(uuid, boolean, boolean, text),
                       public.admin_unlock_sticker(int)
  from public, anon;
grant execute on function public.admin_overview(), public.admin_car_list(),
                          public.admin_set_car(uuid, boolean, boolean, text),
                          public.admin_unlock_sticker(int)
  to authenticated;
revoke all on function public.claim_sticker(int, text), public.car_stats(uuid) from public, anon;
grant execute on function public.claim_sticker(int, text), public.car_stats(uuid) to authenticated;
grant execute on function public.sticker_status(int), public.record_scan(int, uuid),
                          public.record_collect(uuid, uuid, text, text)
  to anon, authenticated;

-- ---------- photo storage ----------
-- Public to view. An owner can only add, replace or remove files in
-- the folder named after their own car.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('car-photos', 'car-photos', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists car_photos_owner_add on storage.objects;
create policy car_photos_owner_add on storage.objects for insert to authenticated
  with check (bucket_id = 'car-photos' and (storage.foldername(name))[1] in
              (select id::text from public.cars where owner_id = auth.uid()));
drop policy if exists car_photos_owner_change on storage.objects;
create policy car_photos_owner_change on storage.objects for update to authenticated
  using (bucket_id = 'car-photos' and (storage.foldername(name))[1] in
         (select id::text from public.cars where owner_id = auth.uid()));
drop policy if exists car_photos_owner_remove on storage.objects;
create policy car_photos_owner_remove on storage.objects for delete to authenticated
  using (bucket_id = 'car-photos' and (storage.foldername(name))[1] in
         (select id::text from public.cars where owner_id = auth.uid()));
