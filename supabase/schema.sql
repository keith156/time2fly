-- Supabase Schema and Migrations

-- 1. live_tickets table
-- This table stores live flight rates.
-- If the table doesn't have the 'order_index' column, run this:
ALTER TABLE live_tickets ADD COLUMN IF NOT EXISTS order_index INTEGER;
-- For the Availability feature:
ALTER TABLE live_tickets ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT TRUE;

-- STORAGE SETUP
-- Run these in your Supabase SQL Editor to ensure images can be uploaded and viewed.
-- 1. Create the bucket if it doesn't exist
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('images', 'images', true)
-- ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to the bucket
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
-- CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
-- CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
-- CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- To clear all tickets and start fresh (if you see duplicates):
-- TRUNCATE TABLE live_tickets;

-- Optional: If you also need to create the table from scratch:
/*
CREATE TABLE IF NOT EXISTS live_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "from" TEXT,
  "to" TEXT,
  price_ugx BIGINT,
  price_usd_min REAL,
  price_usd_max REAL,
  trend TEXT DEFAULT 'stable',
  city_image TEXT,
  dates TEXT,
  airline TEXT,
  order_index INTEGER,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/

-- 2. packages table
/*
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination TEXT,
  price REAL,
  duration TEXT,
  description TEXT,
  image TEXT,
  rating REAL DEFAULT 5,
  is_starred BOOLEAN DEFAULT FALSE,
  category TEXT,
  itinerary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/

-- 3. blogs table
/*
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  excerpt TEXT,
  content TEXT,
  date TEXT,
  author TEXT,
  image TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/

-- 4. destinations table
ALTER TABLE destinations ADD COLUMN IF NOT EXISTS tagline TEXT;
/*
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  image TEXT,
  details TEXT,
  tagline TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/
