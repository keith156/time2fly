
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://trfxsmmtfdegiamrlgxf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bBZ25JC85bhM7bSiiESImQ_j9kga8q3';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cleanData() {
  console.log('Fetching tickets...');
  const { data, error } = await supabase.from('live_tickets').select('id, from, to, created_at');
  
  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  console.log('Tickets found:', JSON.stringify(data, null, 2));
}

cleanData();
