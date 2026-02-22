/**
 * Script para generar iconos PWA desde el logo de Eco Area Limonar
 * 
 * Genera todos los tamaños necesarios para iOS, Android y la PWA
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Rutas
const sourceImage = path.join(__dirname, '../images/limonar/Logo_fondo_azul.jpg');
const outputDir = path.join(__dirname, '../public');

// Tamaños de iconos para PWA
const sizes = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
];

// Iconos especiales
const specialIcons = [
  { size: 180, name: 'apple-icon.png' }, // Apple Touch Icon
  { size: 32, name: 'favicon.png' },     // Favicon
  { size: 512, name: 'icon.png' },       // Icono genérico
];

async function generateIcons() {
  console.log('🎨 Generando iconos PWA desde el logo de Eco Area Limonar...\n');

  // Verificar que existe la imagen fuente
  if (!fs.existsSync(sourceImage)) {
    console.error('❌ Error: No se encontró la imagen fuente:', sourceImage);
    process.exit(1);
  }

  try {
    // Generar iconos PWA estándar
    console.log('📱 Generando iconos PWA estándar:');
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .png()
        .toFile(outputPath);
      
      console.log(`  ✅ ${name} (${size}x${size})`);
    }

    // Generar iconos especiales
    console.log('\n🌟 Generando iconos especiales:');
    for (const { size, name } of specialIcons) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .png()
        .toFile(outputPath);
      
      console.log(`  ✅ ${name} (${size}x${size})`);
    }

    // Generar favicon.ico (usando la versión de 32x32)
    console.log('\n🔷 Generando favicon.ico:');
    const faviconBuffer = await sharp(sourceImage)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center',
      })
      .png()
      .toBuffer();
    
    // Nota: sharp no puede generar .ico directamente, pero el navegador
    // puede usar el favicon.png como alternativa
    fs.writeFileSync(path.join(outputDir, 'favicon-backup.png'), faviconBuffer);
    console.log('  ✅ favicon-backup.png (32x32) - Para conversión manual a .ico');

    console.log('\n✨ ¡Todos los iconos PWA generados exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`  - ${sizes.length} iconos PWA estándar`);
    console.log(`  - ${specialIcons.length} iconos especiales`);
    console.log(`  - Ubicación: ${outputDir}`);
    console.log('\n💡 Nota: Los archivos .ico requieren conversión manual o una herramienta específica.');
    console.log('   Puedes usar: https://www.icoconverter.com/ o similar');

  } catch (error) {
    console.error('\n❌ Error al generar los iconos:', error.message);
    process.exit(1);
  }
}

// Ejecutar
generateIcons().catch(console.error);
