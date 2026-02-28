-- Supabase Storage Setup for Avatars
-- Run this in your Supabase SQL Editor

-- 1. Create a public bucket
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true);

-- 2. Allow public access to view files
create policy "Allow public access to avatars"
on storage.objects for select
to public
using ( bucket_id = 'avatars' );

-- 3. Allow authenticated users to upload their own avatar
create policy "Allow authenticated users to upload avatars"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 4. Allow authenticated users to update their own avatar
create policy "Allow authenticated users to update avatars"
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars' and
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 5. Allow users to delete their own avatar
create policy "Allow authenticated users to delete avatars"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'avatars' and
  (storage.foldername(name))[1] = auth.uid()::text
);
