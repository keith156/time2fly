import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env.local manually
const envPath = path.join(import.meta.dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: { [key: string]: string } = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const SUPABASE_URL = env['VITE_SUPABASE_URL'];
const SUPABASE_ANON_KEY = env['VITE_SUPABASE_ANON_KEY'];

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Import constants
import { PACKAGES, BLOG_POSTS, DUMMY_TICKETS } from '../constants';

async function seed() {
  console.log('Starting Supabase Seeding Script...');

  // --- SEED PACKAGES ---
  console.log('Checking packages...');
  const { data: dbPackages, error: pkgError } = await supabase.from('packages').select('destination');
  if (pkgError) {
    console.error('Error fetching packages:', pkgError);
  } else {
    const existingPkgDests = new Set(dbPackages.map(p => p.destination.toLowerCase().trim()));
    const pkgsToInsert = PACKAGES.filter(p => !existingPkgDests.has(p.destination.toLowerCase().trim()))
      .map(({ id, ...rest }) => rest); // Omit hardcoded id, let Supabase generate UUID

    if (pkgsToInsert.length > 0) {
      console.log(`Inserting ${pkgsToInsert.length} new packages into Supabase...`);
      const { error } = await supabase.from('packages').insert(pkgsToInsert);
      if (error) console.error('Error inserting packages:', error);
      else console.log('Packages seeded successfully!');
    } else {
      console.log('All packages are already present in Supabase.');
    }
  }

  // --- SEED BLOGS ---
  console.log('Checking blogs...');
  const { data: dbBlogs, error: blogError } = await supabase.from('blogs').select('title');
  if (blogError) {
    console.error('Error fetching blogs:', blogError);
  } else {
    const existingBlogTitles = new Set(dbBlogs.map(b => b.title.toLowerCase().trim()));
    const blogsToInsert = BLOG_POSTS.filter(b => !existingBlogTitles.has(b.title.toLowerCase().trim()))
      .map(({ id, ...rest }) => rest);

    if (blogsToInsert.length > 0) {
      console.log(`Inserting ${blogsToInsert.length} new blogs into Supabase...`);
      const { error } = await supabase.from('blogs').insert(blogsToInsert);
      if (error) console.error('Error inserting blogs:', error);
      else console.log('Blogs seeded successfully!');
    } else {
      console.log('All blogs are already present in Supabase.');
    }
  }

  // --- SEED TICKETS ---
  console.log('Checking live tickets...');
  const { data: dbTickets, error: ticketError } = await supabase.from('live_tickets').select('from, to');
  if (ticketError) {
    console.error('Error fetching tickets:', ticketError);
  } else {
    const normalizeCityName = (city: string): string =>
      city.replace(/\s*\([A-Z]{3}\)\s*/g, '').trim().toLowerCase();

    const existingTicketKeys = new Set(dbTickets.map(t => `${normalizeCityName(t.from)}->${normalizeCityName(t.to)}`));
    const ticketsToInsert = DUMMY_TICKETS.filter(t => !existingTicketKeys.has(`${normalizeCityName(t.from)}->${normalizeCityName(t.to)}`))
      .map(({ id, ...rest }) => rest);

    if (ticketsToInsert.length > 0) {
      console.log(`Inserting ${ticketsToInsert.length} new tickets into Supabase...`);
      const { error } = await supabase.from('live_tickets').insert(ticketsToInsert);
      if (error) console.error('Error inserting tickets:', error);
      else console.log('Tickets seeded successfully!');
    } else {
      console.log('All tickets are already present in Supabase.');
    }
  }

  console.log('Seeding finished.');
}

seed();
