/**
 * Traduce TODO el contenido que falte en content_translations usando OpenAI.
 * - Parcelas (source_table 'parcels': name, short_description)
 * - Posts (title, excerpt, content, meta_title, meta_description)
 * - Categorías de contenido (name)
 * - Claves i18n Mar Menor (mar-menor-es.json) y páginas (pages-es.json): source_table 'i18n'
 * Idiomas: EN, FR, DE, NL
 *
 * Requisitos en .env.local:
 *   OPENAI_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (o NEXT_PUBLIC_SUPABASE_ANON_KEY si tiene permisos de escritura)
 *
 * Ejecutar: node scripts/translate-all-content-openai.js
 */

require('dotenv').config({ path: '.env.local' });
const path = require('path');
const fs = require('fs');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const LOCALES = ['en', 'fr', 'de', 'nl'];
const LOCALE_NAMES = { en: 'Inglés', fr: 'Francés', de: 'Alemán', nl: 'Neerlandés' };

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o clave Supabase en .env.local');
  process.exit(1);
}
if (!OPENAI_API_KEY) {
  console.error('❌ Falta OPENAI_API_KEY en .env.local');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function buildKey(table, id, field, locale) {
  return `${table}:${id}:${field}:${locale}`;
}

async function fetchExistingTranslations() {
  const { data, error } = await supabase
    .from('content_translations')
    .select('source_table, source_id, source_field, locale')
    .in('locale', LOCALES);
  if (error) throw new Error(`content_translations: ${error.message}`);
  const set = new Set();
  (data || []).forEach((t) => set.add(buildKey(t.source_table, t.source_id, t.source_field, t.locale)));
  return set;
}

async function translateWithOpenAI(text, locale, context = 'general') {
  if (!text || String(text).trim() === '') return '';

  const localeNames = { en: 'English', fr: 'French', de: 'German', nl: 'Dutch' };
  const lang = localeNames[locale] || locale;

  const prompts = {
    title: `Translate this title from Spanish to ${lang}. Keep it engaging and natural. Reply only with the translation, no quotes or explanation.`,
    excerpt: `Translate this short text from Spanish to ${lang}. Keep it concise and natural. Reply only with the translation.`,
    content: `Translate this content from Spanish to ${lang}. Keep all HTML tags and structure exactly. Reply only with the translated content.`,
    meta: `Translate this SEO text from Spanish to ${lang}. Keep it natural and SEO-friendly. Reply only with the translation.`,
    name: `Translate this name or short label from Spanish to ${lang}. Keep it natural. Reply only with the translation.`,
    general: `Translate from Spanish to ${lang}. Reply only with the translation, nothing else.`,
    long: `Translate this paragraph or section from Spanish to ${lang}. Preserve meaning, tone and any technical or place names (e.g. Mar Menor, Cymodocea, Albujón). Reply only with the translation.`,
  };
  const systemPrompt = prompts[context] || prompts.general;

  const maxTokens = context === 'content' ? 4000 : context === 'long' ? 2000 : context === 'excerpt' ? 500 : 300;

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
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenAI ${response.status}: ${JSON.stringify(err)}`);
  }

  const data = await response.json();
  const out = data.choices?.[0]?.message?.content?.trim() || '';
  return out.replace(/^["']|["']$/g, '').trim();
}

async function saveTranslation(sourceTable, sourceId, sourceField, locale, translatedText) {
  const row = {
    source_table: sourceTable,
    source_id: String(sourceId),
    source_field: sourceField,
    locale,
    translated_text: translatedText,
  };
  const { error } = await supabase.from('content_translations').upsert(row, {
    onConflict: 'source_table,source_id,source_field,locale',
  });
  if (error) throw new Error(`Guardar: ${error.message}`);
}

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('  TRADUCCIÓN DE CONTENIDO CON OPENAI → content_translations');
  console.log('  Idiomas: EN, FR, DE, NL');
  console.log('='.repeat(70) + '\n');

  const existing = await fetchExistingTranslations();
  console.log(`📦 Traducciones ya existentes: ${existing.size}\n`);

  const missing = [];

  // 1) Parcelas → source_table 'parcels'
  const { data: parcels } = await supabase.from('parcels').select('id, name, short_description');
  if (parcels && parcels.length > 0) {
    const fields = ['name', 'short_description'];
    for (const p of parcels) {
      for (const field of fields) {
        const value = p[field];
        if (value == null || String(value).trim() === '') continue;
        for (const locale of LOCALES) {
          if (existing.has(buildKey('parcels', p.id, field, locale))) continue;
          missing.push({
            source_table: 'parcels',
            source_id: p.id,
            source_field: field,
            locale,
            original_text: String(value),
            context: field === 'name' ? 'name' : 'general',
          });
        }
      }
    }
  }

  // 2) Posts publicados
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, excerpt, content, meta_title, meta_description')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  if (posts && posts.length > 0) {
    const fields = [
      { key: 'title', context: 'title' },
      { key: 'excerpt', context: 'excerpt' },
      { key: 'content', context: 'content' },
      { key: 'meta_title', context: 'meta' },
      { key: 'meta_description', context: 'meta' },
    ];
    for (const post of posts) {
      for (const { key, context } of fields) {
        const value = post[key];
        if (value == null || String(value).trim() === '') continue;
        for (const locale of LOCALES) {
          if (existing.has(buildKey('posts', post.id, key, locale))) continue;
          missing.push({
            source_table: 'posts',
            source_id: post.id,
            source_field: key,
            locale,
            original_text: String(value),
            context,
          });
        }
      }
    }
  }

  // 3) Categorías de contenido
  const { data: categories } = await supabase.from('content_categories').select('id, name');
  if (categories && categories.length > 0) {
    for (const c of categories) {
      if (!c.name || String(c.name).trim() === '') continue;
      for (const locale of LOCALES) {
        if (existing.has(buildKey('content_categories', c.id, 'name', locale))) continue;
        missing.push({
          source_table: 'content_categories',
          source_id: c.id,
          source_field: 'name',
          locale,
          original_text: String(c.name),
          context: 'name',
        });
      }
    }
  }

  // 4) Claves i18n página Mar Menor (mar-menor-es.json → content_translations, source_table 'i18n')
  const marMenorPath = path.join(__dirname, '../src/lib/i18n/data/mar-menor-es.json');
  if (fs.existsSync(marMenorPath)) {
    const marMenorEs = JSON.parse(fs.readFileSync(marMenorPath, 'utf8'));
    const SOURCE_FIELD = 'text';
    for (const [key, spanishText] of Object.entries(marMenorEs)) {
      if (spanishText == null || String(spanishText).trim() === '') continue;
      const text = String(spanishText);
      const useLong = text.length > 400;
      for (const locale of LOCALES) {
        if (existing.has(buildKey('i18n', key, SOURCE_FIELD, locale))) continue;
        missing.push({
          source_table: 'i18n',
          source_id: key,
          source_field: SOURCE_FIELD,
          locale,
          original_text: text,
          context: useLong ? 'long' : 'general',
        });
      }
    }
    console.log(`📄 Claves Mar Menor (i18n): ${Object.keys(marMenorEs).length} → hasta ${LOCALES.length * Object.keys(marMenorEs).length} traducciones\n`);
  }

  // 5) Claves i18n páginas (contacto, normas, galería, footer, etc.) → content_translations, source_table 'i18n'
  const pagesPath = path.join(__dirname, '../src/lib/i18n/data/pages-es.json');
  if (fs.existsSync(pagesPath)) {
    const pagesEs = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
    const SOURCE_FIELD = 'text';
    for (const [key, spanishText] of Object.entries(pagesEs)) {
      if (spanishText == null || String(spanishText).trim() === '') continue;
      const text = String(spanishText);
      const useLong = text.length > 400;
      for (const locale of LOCALES) {
        if (existing.has(buildKey('i18n', key, SOURCE_FIELD, locale))) continue;
        missing.push({
          source_table: 'i18n',
          source_id: key,
          source_field: SOURCE_FIELD,
          locale,
          original_text: text,
          context: useLong ? 'long' : 'general',
        });
      }
    }
    console.log(`📄 Claves páginas (i18n): ${Object.keys(pagesEs).length} → hasta ${LOCALES.length * Object.keys(pagesEs).length} traducciones\n`);
  }

  console.log(`📋 Traducciones a generar: ${missing.length}\n`);
  if (missing.length === 0) {
    console.log('✅ No falta nada. Ya está todo traducido.\n');
    return;
  }

  let ok = 0;
  let err = 0;
  for (let i = 0; i < missing.length; i++) {
    const m = missing[i];
    const label = `${m.source_table}:${m.source_id}:${m.source_field} → ${m.locale}`;
    process.stdout.write(`[${i + 1}/${missing.length}] ${label} ... `);
    try {
      const translated = await translateWithOpenAI(m.original_text, m.locale, m.context);
      await saveTranslation(m.source_table, m.source_id, m.source_field, m.locale, translated);
      console.log('✅');
      ok++;
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.log('❌ ' + (e.message || e));
      err++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`✅ Guardadas: ${ok} | ❌ Errores: ${err}`);
  console.log('='.repeat(70) + '\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
