/**
 * Traduce TODOS los textos estáticos de todas las páginas (t("...") y translateServer("...")).
 * 1. Genera dump actual de traducciones (static-translations-dump.json)
 * 2. Extrae todas las claves usadas en src
 * 3. Detecta qué claves faltan en en/fr/de/nl
 * 4. Llama a OpenAI para traducir y escribe src/lib/i18n/translations/generated.ts
 *
 * Requisitos: OPENAI_API_KEY en .env.local. Ejecutar dump antes: npx tsx scripts/dump-static-translations.ts
 *
 * Uso: node scripts/translate-static-pages-openai.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const LOCALES = ['en', 'fr', 'de', 'nl'];
const LOCALE_NAMES = { en: 'English', fr: 'French', de: 'German', nl: 'Dutch' };

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY en .env.local');
  process.exit(1);
}

const SRC = path.join(__dirname, '..', 'src');
const DUMP_PATH = path.join(__dirname, 'static-translations-dump.json');
const GENERATED_PATH = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'translations', 'generated.ts');

// Extraer claves t("...") y translateServer("...") de un archivo
function extractKeysFromCode(content) {
  const keys = new Set();
  let m;
  const reTd = /\bt\s*\(\s*"([^"]*)"\s*\)/g;
  const reTs = /\bt\s*\(\s*'([^']*)'\s*\)/g;
  const reSd = /translateServer\s*\(\s*"([^"]*)"\s*\)/g;
  const reSs = /translateServer\s*\(\s*'([^']*)'\s*\)/g;
  while ((m = reTd.exec(content)) !== null) keys.add(m[1]);
  while ((m = reTs.exec(content)) !== null) keys.add(m[1]);
  while ((m = reSd.exec(content)) !== null) keys.add(m[1]);
  while ((m = reSs.exec(content)) !== null) keys.add(m[1]);
  return keys;
}

function walkDir(dir, ext, out) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== '.next') walkDir(full, ext, out);
    } else if (e.name.endsWith(ext)) out.push(full);
  }
}

function allKeysUsedInSrc() {
  const files = [];
  walkDir(SRC, '.tsx', files);
  walkDir(SRC, '.ts', files);
  const keys = new Set();
  for (const f of files) {
    try {
      const content = fs.readFileSync(f, 'utf8');
      extractKeysFromCode(content).forEach((k) => keys.add(k));
    } catch (_) {}
  }
  return keys;
}

async function translateWithOpenAI(text, locale) {
  if (!text || String(text).trim() === '') return '';
  const lang = LOCALE_NAMES[locale] || locale;
  const systemPrompt = `You are a professional translator. Translate the following Spanish text to ${lang}. Reply ONLY with the translation, no quotes, no explanation. Keep the same tone (formal/informal) and style.`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: String(text) },
      ],
      temperature: 0.3,
      max_tokens: 500,
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenAI ${response.status}: ${JSON.stringify(err)}`);
  }
  const data = await response.json();
  const out = (data.choices?.[0]?.message?.content || '').trim().replace(/^["']|["']$/g, '');
  return out;
}

function main() {
  return (async () => {
    console.log('\n' + '='.repeat(70));
    console.log('  TRADUCCIÓN DE TEXTOS ESTÁTICOS (todas las páginas)');
    console.log('  Idiomas: EN, FR, DE, NL');
    console.log('='.repeat(70) + '\n');

    if (!fs.existsSync(DUMP_PATH)) {
      console.log('⚠️  Ejecuta primero: npx tsx scripts/dump-static-translations.ts\n');
      process.exit(1);
    }

    const dump = JSON.parse(fs.readFileSync(DUMP_PATH, 'utf8'));
    const usedKeys = allKeysUsedInSrc();
    console.log('📦 Claves en dump:', Object.keys(dump).length);
    console.log('📋 Claves usadas en src:', usedKeys.size, '\n');

    const missing = [];
    for (const key of usedKeys) {
      const entry = dump[key];
      const es = (entry && entry.es) || key;
      for (const locale of LOCALES) {
        const val = entry && entry[locale];
        if (!val || String(val).trim() === '') {
          missing.push({ key, locale, spanishText: es });
        }
      }
    }

    console.log('📝 Traducciones faltantes (key + locale):', missing.length, '\n');
    if (missing.length === 0) {
      console.log('✅ No falta ninguna traducción estática.\n');
      return;
    }

    const byKey = {};
    for (const m of missing) {
      if (!byKey[m.key]) {
        const existing = dump[m.key] || {};
        byKey[m.key] = { es: existing.es || m.key, en: existing.en, fr: existing.fr, de: existing.de, nl: existing.nl };
      }
      byKey[m.key][m.locale] = undefined;
    }

    let done = 0;
    for (const key of Object.keys(byKey)) {
      const entry = byKey[key];
      const spanish = entry.es || key;
      for (const locale of LOCALES) {
        const val = entry[locale];
        if (val != null && String(val).trim() !== '') continue;
        process.stdout.write(`  ${key.slice(0, 50)}... → ${locale} `);
        try {
          entry[locale] = await translateWithOpenAI(spanish, locale);
          console.log('✅');
          done++;
          await new Promise((r) => setTimeout(r, 400));
        } catch (e) {
          console.log('❌', e.message);
        }
      }
    }

    const lines = [
      '/**',
      ' * Traducciones generadas por scripts/translate-static-pages-openai.js',
      ' * No editar a mano; regenerar con el script si hace falta.',
      ' */',
      '',
      'export const generatedTranslations = {',
    ];
    const esc = (s) => (s == null ? '' : String(s)).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    for (const [k, v] of Object.entries(byKey)) {
      const es = v.es != null && String(v.es).trim() !== '' ? esc(v.es) : esc(k);
      const en = (v.en != null && String(v.en).trim() !== '' ? esc(v.en) : es);
      const fr = (v.fr != null && String(v.fr).trim() !== '' ? esc(v.fr) : es);
      const de = (v.de != null && String(v.de).trim() !== '' ? esc(v.de) : es);
      const nl = (v.nl != null && String(v.nl).trim() !== '' ? esc(v.nl) : es);
      const keyEsc = k.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      lines.push(`  "${keyEsc}": { es: "${es}", en: "${en}", fr: "${fr}", de: "${de}", nl: "${nl}" },`);
    }
    lines.push('};');
    fs.writeFileSync(GENERATED_PATH, lines.join('\n'), 'utf8');
    console.log('\n💾 Escrito:', GENERATED_PATH);
    console.log('   (index.ts ya importa generatedTranslations)');
    console.log('\n' + '='.repeat(70) + '\n');
  })();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
