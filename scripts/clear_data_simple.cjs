
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://trfxsmmtfdegiamrlgxf.supabase.co';
const supabaseKey = 'sb_publishable_bBZ25JC85bhM7bSiiESImQ_j9kga8q3';

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearData() {
    console.log('Clearing data from Supabase...');
    const tables = ['packages', 'destinations', 'blogs'];

    for (const table of tables) {
        try {
            const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
            if (error) {
                console.error(`Error clearing table ${table}:`, error.message);
            } else {
                console.log(`Cleared table ${table}`);
            }
        } catch (err) {
            console.error(`Exception clearing table ${table}:`, err);
        }
    }
}

clearData();
