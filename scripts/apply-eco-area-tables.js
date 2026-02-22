/**
 * Aplica la migración add-eco-area-tables.sql a Supabase.
 * Requiere DATABASE_URL en .env.local (Connection string de Supabase).
 *
 * Ejecutar: node scripts/apply-eco-area-tables.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!DATABASE_URL) {
  console.error('❌ Falta DATABASE_URL o SUPABASE_DB_URL en .env.local');
  console.error('   Obtén la Connection string en: Supabase → Project Settings → Database');
  process.exit(1);
}

async function run() {
  let pg;
  try {
    pg = require('pg');
  } catch {
    console.error('❌ Instala pg: npm install pg');
    process.exit(1);
  }

  const sqlPath = path.join(__dirname, '../supabase/add-eco-area-tables.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = new pg.Client({ connectionString: DATABASE_URL });
  try {
    await client.connect();
    console.log('📤 Aplicando add-eco-area-tables.sql...');
    await client.query(sql);
    console.log('✅ Migración aplicada correctamente.');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
