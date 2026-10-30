-- ============================================================
-- CARVEYANCE CAR INDEX: ratings and reviews (Supabase)
-- ============================================================
-- Paste this whole file into Supabase > SQL Editor > New query,
-- and click Run. It uses the same project, the same accounts and
-- the same admins as the Garage (run schema.sql first, once).
-- It is safe to run again: it only creates what isn't there yet
-- and replaces the functions with this version.
--
-- What it sets up:
--   index_ratings   one row per account per car: a score from 1 to
--                   10 steering wheels and an optional written review.
--   index_reports   "Report this review" messages.
--
-- Readers never see who wrote a review beyond the name they chose
-- to show. Account ids and emails are never sent to the page.
-- ============================================================

create table if not exists public.index_ratings (
  id            bigint generated always as identity unique,
  car_id        text not null check (car_id ~ '^[a-z0-9][a-z0-9-]{1,79}$'),
  user_id       uuid not null references auth.users(id) on delete cascade,
  score         smallint not null check (score between 1 and 10),
  review        text not null default '' check (char_length(review) <= 1200),
  display_name  text not null default '' check (char_length(display_name) <= 40),
  hidden        boolean not null default false,   -- set by Carveyance only
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (car_id, user_id)
);
create index if not exists index_ratings_car on public.index_ratings (car_id, updated_at desc);
create index if not exists index_ratings_user on public.index_ratings (user_id, updated_at desc);

create table if not exists public.index_reports (
  id          bigint generated always as identity primary key,
  rating_id   bigint not null references public.index_ratings(id) on delete cascade,
  reason      text not null check (char_length(reason) between 1 and 60),
  created_at  timestamptz not null default now()
);

drop trigger if exists index_ratings_touch on public.index_ratings;
create trigger index_ratings_touch before update on public.index_ratings
  for each row execute function public.touch_updated_at();

-- ---------- who may do what ----------
-- No direct table access for anyone. Everything goes through the
-- functions below, so account ids never leave the database.
revoke all on public.index_ratings, public.index_reports from anon, authenticated;
alter table public.index_ratings enable row level security;
alter table public.index_reports enable row level security;

-- ---------- functions the site calls ----------

-- Every car's score in one call, for the Car Index page.
-- Returns one row per rated car: number of ratings and the average.
create or replace function public.index_scores()
returns table (car_id text, n bigint, avg numeric)
language sql stable security definer set search_path = public, pg_temp as $$
  select r.car_id, count(*), round(avg(r.score)::numeric, 2)
  from public.index_ratings r
  where not r.hidden
  group by r.car_id
$$;

-- One car's page: the score, how the votes spread from 1 to 10,
-- the latest written reviews, and the signed-in reader's own vote.
create or replace function public.index_car(p_car text)
returns jsonb
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare v_mine jsonb;
begin
  if auth.uid() is not null then
    select jsonb_build_object('score', score, 'review', review, 'name', display_name)
      into v_mine from public.index_ratings where car_id = p_car and user_id = auth.uid();
  end if;
  return jsonb_build_object(
    'n',   (select count(*) from public.index_ratings where car_id = p_car and not hidden),
    'avg', (select round(avg(score)::numeric, 2) from public.index_ratings where car_id = p_car and not hidden),
    'dist', (select coalesce(jsonb_agg(c order by s), '[]'::jsonb) from (
               select s, (select count(*) from public.index_ratings
                           where car_id = p_car and not hidden and score = s) as c
               from generate_series(1, 10) s) d),
    'reviews', coalesce((select jsonb_agg(x) from (
        select id, score, review, display_name as name, updated_at as at
        from public.index_ratings
        where car_id = p_car and not hidden and review <> ''
        order by updated_at desc limit 60) x), '[]'::jsonb),
    'mine', v_mine);
end $$;

-- Save (or change) the signed-in reader's vote. One vote per
-- account per car; voting again replaces the old vote.
create or replace function public.rate_car(p_car text, p_score int, p_review text, p_name text)
returns jsonb
language plpgsql volatile security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'signed_out'); end if;
  if p_car !~ '^[a-z0-9][a-z0-9-]{1,79}$' then return jsonb_build_object('ok', false, 'error', 'bad_car'); end if;
  if p_score is null or p_score < 1 or p_score > 10 then return jsonb_build_object('ok', false, 'error', 'bad_score'); end if;
  -- a gentle brake on scripted voting: 60 saves an hour per account
  if (select count(*) from public.index_ratings
       where user_id = auth.uid() and updated_at > now() - interval '1 hour') >= 60 then
    return jsonb_build_object('ok', false, 'error', 'slow_down');
  end if;
  insert into public.index_ratings (car_id, user_id, score, review, display_name)
  values (p_car, auth.uid(), p_score, left(btrim(coalesce(p_review, '')), 1200), left(btrim(coalesce(p_name, '')), 40))
  on conflict (car_id, user_id) do update
    set score = excluded.score, review = excluded.review, display_name = excluded.display_name;
  return jsonb_build_object('ok', true);
end $$;

-- Take the signed-in reader's vote back.
create or replace function public.unrate_car(p_car text)
returns boolean
language sql volatile security definer set search_path = public, pg_temp as $$
  delete from public.index_ratings where car_id = p_car and user_id = auth.uid() returning true
$$;

-- Anyone can flag a review for Carveyance to look at.
create or replace function public.report_review(p_rating bigint, p_reason text)
returns boolean
language sql volatile security definer set search_path = public, pg_temp as $$
  insert into public.index_reports (rating_id, reason)
  select p_rating, left(coalesce(nullif(btrim(p_reason), ''), 'Other'), 60)
  where exists (select 1 from public.index_ratings where id = p_rating)
  returning true
$$;

-- ---------- Carveyance-only functions ----------

-- The latest reviews, reported ones first, for moderation.
create or replace function public.admin_index_reviews()
returns table (id bigint, car_id text, score smallint, review text, display_name text,
               hidden boolean, reports bigint, updated_at timestamptz)
language plpgsql stable security definer set search_path = public, pg_temp as $$
begin
  if not public.is_admin() then return; end if;
  return query
    select r.id, r.car_id, r.score, r.review, r.display_name, r.hidden,
           (select count(*) from public.index_reports k where k.rating_id = r.id) as reports,
           r.updated_at
    from public.index_ratings r
    order by (select count(*) from public.index_reports k where k.rating_id = r.id) desc, r.updated_at desc
    limit 200;
end $$;

-- Hide or show a vote and its review. Hidden votes stop counting
-- toward the score. Showing it again also clears its reports.
create or replace function public.admin_hide_rating(p_id bigint, p_hidden boolean)
returns boolean
language plpgsql volatile security definer set search_path = public, pg_temp as $$
declare v_found boolean;
begin
  if not public.is_admin() then return false; end if;
  update public.index_ratings set hidden = p_hidden where id = p_id;
  v_found := found;
  if v_found and not p_hidden then delete from public.index_reports where rating_id = p_id; end if;
  return v_found;
end $$;

revoke all on function public.index_scores(), public.index_car(text),
                       public.rate_car(text, int, text, text), public.unrate_car(text),
                       public.report_review(bigint, text),
                       public.admin_index_reviews(), public.admin_hide_rating(bigint, boolean)
  from public;
grant execute on function public.index_scores(), public.index_car(text),
                          public.report_review(bigint, text)
  to anon, authenticated;
grant execute on function public.rate_car(text, int, text, text), public.unrate_car(text),
                          public.admin_index_reviews(), public.admin_hide_rating(bigint, boolean)
  to authenticated;
