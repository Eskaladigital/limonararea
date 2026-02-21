const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../images/slides web');
const outputDir = path.join(__dirname, '../public/images/slides');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Obtener todas las imágenes (jpg, jpeg, png)
const imageFiles = fs.readdirSync(sourceDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

console.log(`📸 Encontradas ${imageFiles.length} imágenes para convertir...\n`);

let converted = 0;
let skipped = 0;

imageFiles.forEach((file, index) => {
  const inputPath = path.join(sourceDir, file);
  const baseName = path.basename(file, path.extname(file));
  const outputPath = path.join(outputDir, `${baseName}.webp`);

  // Saltar si ya existe el webp
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Saltando ${file} (ya existe .webp)`);
    skipped++;
    return;
  }

  try {
    sharp(inputPath)
      .webp({ quality: 85 })
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(outputPath)
      .then(() => {
        converted++;
        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`✅ [${index + 1}/${imageFiles.length}] ${file} → ${baseName}.webp (${sizeKB} KB)`);
        
        if (converted + skipped === imageFiles.length) {
          console.log(`\n✨ Conversión completada:`);
          console.log(`   - Convertidas: ${converted}`);
          console.log(`   - Saltadas: ${skipped}`);
          console.log(`   - Total: ${imageFiles.length}`);
        }
      })
      .catch(err => {
        console.error(`❌ Error convirtiendo ${file}:`, err.message);
      });
  } catch (error) {
    console.error(`❌ Error procesando ${file}:`, error.message);
  }
});
