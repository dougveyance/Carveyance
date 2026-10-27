-- ============================================================
-- CARVEYANCE: The Lot (cars for sale) + The Paddock click counts
-- ============================================================
-- Run this ONCE in Supabase > SQL Editor > New query, AFTER
-- schema.sql, and BEFORE you push the site files that use it.
-- It's safe to run again: it only adds what isn't there yet and
-- replaces the functions with this version.
--
-- What it adds:
--   cars.for_sale ...  an owner can list their car on The Lot.
--                      Carveyance approves each listing before it
--                      shows (sale_approved, set by admins only).
--   inquiries          private messages from buyers to an owner.
--                      Only the owner (and Carveyance) can read them.
--                      The owner's email is never shown to the buyer.
--   paddock_clicks     taps on a Paddock listing's website, Instagram,
--                      phone or directions: one per phone per listing
--                      per kind per day, so Carveyance can tell a
--                      business how many people it sent them.
-- ============================================================

-- ---------- The Lot: sale details on each car ----------
alter table public.cars add column if not exists for_sale      boolean not null default false;
alter table public.cars add column if not exists sale_price    int check (sale_price is null or sale_price between 1 and 100000000);
alter table public.cars add column if not exists sale_note     text not null default '' check (char_length(sale_note) <= 800);
alter table public.cars add column if not exists sale_sold     boolean not null default false;
alter table public.cars add column if not exists sale_approved boolean not null default false;  -- Carveyance only
alter table public.cars add column if not exists listed_at     timestamptz;

-- Anyone can read the sale details; owners can change their own
-- (but never sale_approved, which only the admin function sets).
grant select (for_sale, sale_price, sale_note, sale_sold, sale_approved, listed_at) on public.cars to anon;
grant update (for_sale, sale_price, sale_note, sale_sold) on public.cars to authenticated;

-- Listing a car (again) sends it back for approval and dates it.
-- Taking it off The Lot clears the approval.
create or replace function public.cars_sale_rules() returns trigger
language plpgsql as $$
begin
  if new.for_sale and not coalesce(old.for_sale, false) then
    new.listed_at := now();
    new.sale_sold := false;
    new.sale_approved := false;
  end if;
  if not new.for_sale then
    new.sale_approved := false;
  end if;
  return new;
end $$;

drop trigger if exists cars_sale on public.cars;
create trigger cars_sale before update on public.cars
  for each row execute function public.cars_sale_rules();

create index if not exists cars_lot on public.cars (listed_at desc)
  where for_sale and sale_approved and not sale_sold;

-- ---------- The Lot: private messages to the owner ----------
create table if not exists public.inquiries (
  id         bigint generated always as identity primary key,
  car_id     uuid not null references public.cars(id) on delete cascade,
  name       text not null check (char_length(name) between 1 and 80),
  email      text not null check (char_length(email) between 5 and 120 and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  phone      text not null default '' check (char_length(phone) <= 30),
  message    text not null check (char_length(message) between 1 and 2000),
  device_id  uuid,
  read       boolean not null default false,
  hidden     boolean not null default false,   -- hidden by Carveyance (spam)
  created_at timestamptz not null default now()
);
create index if not exists inquiries_car on public.inquiries (car_id, created_at desc);
create index if not exists inquiries_device on public.inquiries (device_id, created_at desc);

revoke all on public.inquiries from anon, authenticated;
alter table public.inquiries enable row level security;
grant select (id, car_id, name, email, phone, message, read, hidden, created_at) on public.inquiries to authenticated;
grant update (read) on public.inquiries to authenticated;

drop policy if exists inquiries_owner_read on public.inquiries;
create policy inquiries_owner_read on public.inquiries for select to authenticated
  using (not hidden and exists (select 1 from public.cars c where c.id = car_id and c.owner_id = auth.uid()));
drop policy if exists inquiries_admin_read on public.inquiries;
create policy inquiries_admin_read on public.inquiries for select to authenticated
  using (public.is_admin());
drop policy if exists inquiries_owner_mark on public.inquiries;
create policy inquiries_owner_mark on public.inquiries for update to authenticated
  using (exists (select 1 from public.cars c where c.id = car_id and c.owner_id = auth.uid()))
  with check (exists (select 1 from public.cars c where c.id = car_id and c.owner_id = auth.uid()));

-- A buyer sends a message. Only works while the car is on The Lot.
-- Limits: 2 messages per phone per car per day, 6 per phone per day,
-- 40 per car per day. Returns {"ok":true} or {"ok":false,"error":...}.
create or replace function public.send_inquiry(p_car uuid, p_name text, p_email text, p_phone text,
                                               p_message text, p_device uuid)
returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare c record; v_email text;
begin
  select * into c from public.cars where id = p_car;
  if not found or c.hidden or c.owner_hidden or not c.for_sale or not c.sale_approved or c.sale_sold then
    return jsonb_build_object('ok', false, 'error', 'not_for_sale');
  end if;
  if auth.uid() is not null and auth.uid() = c.owner_id then
    return jsonb_build_object('ok', false, 'error', 'own_car');
  end if;
  v_email := lower(trim(coalesce(p_email, '')));
  if char_length(trim(coalesce(p_name, ''))) < 1 or char_length(trim(coalesce(p_message, ''))) < 1
     or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    return jsonb_build_object('ok', false, 'error', 'missing');
  end if;
  if p_device is not null and (
       (select count(*) from public.inquiries where device_id = p_device and car_id = p_car and created_at > now() - interval '1 day') >= 2
    or (select count(*) from public.inquiries where device_id = p_device and created_at > now() - interval '1 day') >= 6) then
    return jsonb_build_object('ok', false, 'error', 'limit');
  end if;
  if (select count(*) from public.inquiries where car_id = p_car and created_at > now() - interval '1 day') >= 40 then
    return jsonb_build_object('ok', false, 'error', 'busy');
  end if;
  insert into public.inquiries (car_id, name, email, phone, message, device_id)
  values (p_car, left(trim(p_name), 80), left(v_email, 120), left(trim(coalesce(p_phone, '')), 30),
          left(trim(p_message), 2000), p_device);
  return jsonb_build_object('ok', true);
end $$;

-- How many unread messages the owner has (for the badge in the editor).
create or replace function public.my_unread_inquiries()
returns bigint
language sql stable security definer set search_path = public, pg_temp as $$
  select count(*) from public.inquiries i join public.cars c on c.id = i.car_id
  where c.owner_id = auth.uid() and not i.read and not i.hidden
$$;

-- ---------- The Paddock: click counts ----------
create table if not exists public.paddock_clicks (
  listing    text not null check (listing ~ '^[a-z0-9-]{1,80}$'),
  kind       text not null check (kind in ('site', 'ig', 'phone', 'map')),
  device_id  uuid not null,
  day        date not null default current_date,
  primary key (listing, kind, device_id, day)
);
revoke all on public.paddock_clicks from anon, authenticated;
alter table public.paddock_clicks enable row level security;

create or replace function public.record_paddock_click(p_listing text, p_kind text, p_device uuid)
returns void
language sql volatile security definer set search_path = public, pg_temp as $$
  insert into public.paddock_clicks (listing, kind, device_id)
  select p_listing, p_kind, p_device
  where p_device is not null and p_listing ~ '^[a-z0-9-]{1,80}$' and p_kind in ('site', 'ig', 'phone', 'map')
  on conflict do nothing
$$;

-- ---------- Carveyance-only functions ----------
create or replace function public.admin_lot_list()
returns table (id uuid, sticker_number int, year int, make text, model text, owner_name text, town text,
               for_sale boolean, sale_price int, sale_sold boolean, sale_approved boolean,
               listed_at timestamptz, messages bigint)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return; end if;
  return query
    select c.id, c.sticker_number, c.year, c.make, c.model, c.owner_name, c.town,
           c.for_sale, c.sale_price, c.sale_sold, c.sale_approved, c.listed_at,
           (select count(*) from public.inquiries i where i.car_id = c.id)
    from public.cars c where c.for_sale or c.sale_sold
    order by c.sale_approved, c.listed_at desc nulls last;
end $$;

create or replace function public.admin_set_sale(p_car uuid, p_approved boolean)
returns boolean
language plpgsql volatile security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return false; end if;
  update public.cars set sale_approved = p_approved where id = p_car and for_sale;
  return found;
end $$;

create or replace function public.admin_hide_inquiry(p_id bigint, p_hidden boolean)
returns boolean
language plpgsql volatile security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return false; end if;
  update public.inquiries set hidden = p_hidden where id = p_id;
  return found;
end $$;

create or replace function public.admin_paddock_clicks(p_days int)
returns table (listing text, site bigint, ig bigint, phone bigint, map bigint, total bigint)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return; end if;
  return query
    select k.listing,
           count(*) filter (where k.kind = 'site'), count(*) filter (where k.kind = 'ig'),
           count(*) filter (where k.kind = 'phone'), count(*) filter (where k.kind = 'map'), count(*)
    from public.paddock_clicks k
    where k.day > current_date - greatest(1, least(coalesce(p_days, 30), 366))
    group by k.listing order by count(*) desc;
end $$;

-- ---------- who may run what ----------
-- Owners can't set sale_approved (it isn't in their column grant);
-- only admin_set_sale can. Buyers can only reach inquiries through
-- send_inquiry, which checks the car is really on The Lot.
revoke all on function public.send_inquiry(uuid, text, text, text, text, uuid),
                       public.record_paddock_click(text, text, uuid),
                       public.my_unread_inquiries(),
                       public.admin_lot_list(), public.admin_set_sale(uuid, boolean),
                       public.admin_hide_inquiry(bigint, boolean), public.admin_paddock_clicks(int)
  from public, anon;
grant execute on function public.send_inquiry(uuid, text, text, text, text, uuid),
                          public.record_paddock_click(text, text, uuid)
  to anon, authenticated;
grant execute on function public.my_unread_inquiries(),
                          public.admin_lot_list(), public.admin_set_sale(uuid, boolean),
                          public.admin_hide_inquiry(bigint, boolean), public.admin_paddock_clicks(int)
  to authenticated;
