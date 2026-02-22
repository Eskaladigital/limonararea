const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directorio fuente y destino
const sourceDir = path.join(__dirname, '../images/slides web');
const targetDir = path.join(__dirname, '../public/images/slides');

// Selección variada de imágenes - mix de números y localizaciones
const selectedImages = [
  // Variedad de números
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (1).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (10).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (22).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (35).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (46).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (54).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (60).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (70).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (83).jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_ (93).jpg',
  
  // Variedad de localizaciones (paisajes diversos)
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_murcia.jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_espana.jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_pirineos.jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_a_coruna.jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_gandia.jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_altea.jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_mazarron.jpg',
  'limonar_campervans_alquiler_autocaravanas_motorhome_rent_lorca.jpg',
];

// Crear directorio de destino si no existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('🚀 Iniciando optimización de imágenes para hero slider...\n');

// Función para optimizar imagen
async function optimizeImage(filename, index) {
  const sourcePath = path.join(sourceDir, filename);
  const targetFilename = `hero-${String(index + 1).padStart(2, '0')}.webp`;
  const targetPath = path.join(targetDir, targetFilename);

  try {
    // Verificar que el archivo fuente existe
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  No encontrado: ${filename}`);
      return null;
    }

    // Optimizar y convertir a WebP
    await sharp(sourcePath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(targetPath);

    const stats = fs.statSync(targetPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`✅ ${targetFilename} (${sizeKB} KB) - Origen: ${filename}`);
    return targetFilename;
  } catch (error) {
    console.error(`❌ Error procesando ${filename}:`, error.message);
    return null;
  }
}

// Procesar todas las imágenes
async function processAll() {
  const results = [];
  
  for (let i = 0; i < selectedImages.length; i++) {
    const result = await optimizeImage(selectedImages[i], i);
    if (result) {
      results.push(result);
    }
  }

  console.log(`\n✨ Proceso completado. ${results.length}/${selectedImages.length} imágenes optimizadas.`);
  console.log('\n📋 Imágenes generadas:');
  results.forEach(img => console.log(`   - /images/slides/${img}`));
  
  return results;
}

// Ejecutar
processAll().catch(console.error);
