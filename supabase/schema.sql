-- Supabase Schema and Migrations

-- 1. live_tickets table
-- This table stores live flight rates.
-- If the table doesn't have the 'order_index' column, run this:
ALTER TABLE live_tickets ADD COLUMN IF NOT EXISTS order_index INTEGER;

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
/*
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  image TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/
