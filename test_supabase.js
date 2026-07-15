import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://trfxsmmtfdegiamrlgxf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bBZ25JC85bhM7bSiiESImQ_j9kga8q3';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
  const pkgResult1 = await supabase.from('packages').select('*');
  console.log('packages without order error:', pkgResult1.error);
  console.log('packages without order count:', pkgResult1.data?.length);

  const pkgResult2 = await supabase.from('packages').select('id').order('created_at', { ascending: false });
  console.log('packages with order error:', pkgResult2.error);
}

test();
