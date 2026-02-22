/**
 * Script de prueba para el endpoint de calendario
 * 
 * Ejecutar: node scripts/test-calendar-endpoint.js
 * 
 * Verifica que el endpoint de suscripción de calendario funcione correctamente
 */

const token = process.env.CALENDAR_SUBSCRIPTION_TOKEN || 'limonar2026';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const calendarUrl = `${baseUrl}/api/calendar/entregas?token=${token}`;

console.log('\n===========================================');
console.log('📅 TEST: Endpoint de Calendario');
console.log('===========================================\n');

console.log('🔍 Configuración:');
console.log(`   URL Base: ${baseUrl}`);
console.log(`   Token: ${token}`);
console.log(`   URL Completa: ${calendarUrl}\n`);

// Test 1: Sin token
console.log('TEST 1: Acceso sin token (debe fallar)');
fetch(`${baseUrl}/api/calendar/entregas`)
  .then(res => {
    console.log(`   ❌ Status: ${res.status} (esperado: 401)`);
    if (res.status !== 401) {
      console.log('   ⚠️  FALLO: Debería rechazar acceso sin token');
    } else {
      console.log('   ✅ CORRECTO: Rechaza acceso sin token\n');
    }
    return res.text();
  })
  .then(() => {
    // Test 2: Con token inválido
    console.log('TEST 2: Acceso con token inválido (debe fallar)');
    return fetch(`${baseUrl}/api/calendar/entregas?token=token_incorrecto`);
  })
  .then(res => {
    console.log(`   ❌ Status: ${res.status} (esperado: 401)`);
    if (res.status !== 401) {
      console.log('   ⚠️  FALLO: Debería rechazar token inválido');
    } else {
      console.log('   ✅ CORRECTO: Rechaza token inválido\n');
    }
    return res.text();
  })
  .then(() => {
    // Test 3: Con token correcto
    console.log('TEST 3: Acceso con token correcto (debe funcionar)');
    return fetch(calendarUrl);
  })
  .then(res => {
    console.log(`   ✅ Status: ${res.status} (esperado: 200)`);
    console.log(`   Content-Type: ${res.headers.get('content-type')}`);
    
    if (res.status !== 200) {
      console.log('   ⚠️  FALLO: Debería devolver 200');
      throw new Error(`Status incorrecto: ${res.status}`);
    }
    
    if (!res.headers.get('content-type')?.includes('text/calendar')) {
      console.log('   ⚠️  ADVERTENCIA: Content-Type debería ser text/calendar');
    }
    
    return res.text();
  })
  .then(content => {
    console.log('\n📄 Contenido del .ics:');
    console.log('─────────────────────────────────────────');
    
    // Verificar que sea un archivo iCalendar válido
    if (!content.startsWith('BEGIN:VCALENDAR')) {
      console.log('   ⚠️  ERROR: No es un archivo iCalendar válido');
      console.log('   Primeras líneas:');
      console.log(content.substring(0, 200));
      return;
    }
    
    // Contar eventos
    const eventCount = (content.match(/BEGIN:VEVENT/g) || []).length;
    console.log(`   ✅ Formato válido (iCalendar)`);
    console.log(`   📅 Eventos encontrados: ${eventCount}`);
    
    // Mostrar primeros eventos
    if (eventCount > 0) {
      const lines = content.split('\n');
      let inEvent = false;
      let eventLines = [];
      let eventsShown = 0;
      const maxEventsToShow = 2;
      
      console.log('\n   Primeros eventos:');
      console.log('   ─────────────────────────────────────────');
      
      for (const line of lines) {
        if (line.includes('BEGIN:VEVENT')) {
          inEvent = true;
          eventLines = [];
        }
        
        if (inEvent) {
          eventLines.push(line);
          
          if (line.includes('END:VEVENT')) {
            eventsShown++;
            if (eventsShown <= maxEventsToShow) {
              console.log(`\n   Evento ${eventsShown}:`);
              eventLines.forEach(l => console.log(`     ${l}`));
            }
            inEvent = false;
            
            if (eventsShown >= maxEventsToShow) {
              break;
            }
          }
        }
      }
      
      if (eventCount > maxEventsToShow) {
        console.log(`\n   ... y ${eventCount - maxEventsToShow} eventos más`);
      }
    } else {
      console.log('   ℹ️  No hay eventos próximos (calendario vacío)');
    }
    
    console.log('\n─────────────────────────────────────────');
    console.log('\n✅ TODOS LOS TESTS PASADOS\n');
    console.log('📋 Próximos pasos:');
    console.log('   1. Copia esta URL en tu calendario:');
    console.log(`      ${calendarUrl}`);
    console.log('   2. Sigue las instrucciones en docs/GUIA-RAPIDA-CALENDARIO.md');
    console.log('   3. Espera 1-2 horas para la primera sincronización\n');
    console.log('===========================================\n');
  })
  .catch(error => {
    console.error('\n❌ ERROR EN LOS TESTS:', error.message);
    console.log('\n🔧 Posibles soluciones:');
    console.log('   1. Verifica que el servidor esté corriendo (npm run dev)');
    console.log('   2. Verifica las variables de entorno en .env.local');
    console.log('   3. Verifica que la base de datos esté accesible\n');
    process.exit(1);
  });
