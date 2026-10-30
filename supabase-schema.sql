create table if not exists public.user_closets (
  user_id uuid primary key references auth.users (id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_closets enable row level security;

drop policy if exists "Users can read their own closet" on public.user_closets;
create policy "Users can read their own closet"
  on public.user_closets for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own closet" on public.user_closets;
create policy "Users can create their own closet"
  on public.user_closets for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own closet" on public.user_closets;
create policy "Users can update their own closet"
  on public.user_closets for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, update on public.user_closets to authenticated;
