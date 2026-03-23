
const url = 'https://trfxsmmtfdegiamrlgxf.supabase.co/rest/v1/live_tickets?select=id,from,to,created_at';
const apikey = 'sb_publishable_bBZ25JC85bhM7bSiiESImQ_j9kga8q3';

async function fetchTickets() {
  try {
    const response = await fetch(url, {
      headers: {
        'apikey': apikey,
        'Authorization': `Bearer ${apikey}`
      }
    });
    const data = await response.json();
    console.log('---TICKETS_START---');
    console.log(JSON.stringify(data, null, 2));
    console.log('---TICKETS_END---');
  } catch (err) {
    console.error('Fetch failed:', err.message);
  }
}

fetchTickets();
