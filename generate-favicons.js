/**
 * Script to generate favicon images from SVG
 * Requires: npm install sharp
 * Run: node generate-favicons.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp package is required. Install it with: npm install --save-dev sharp');
  console.log('\nAlternatively, you can use an online tool like:');
  console.log('https://realfavicongenerator.net/');
  console.log('Upload the favicon.svg file and download all the generated favicons.');
  process.exit(1);
}

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'mstile-150x150.png', size: 150 },
  { name: 'mstile-144x144.png', size: 144 }
];

const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const publicDir = path.join(__dirname, 'public');

async function generateFavicons() {
  try {
    // Read SVG
    const svgBuffer = fs.readFileSync(svgPath);
    
    console.log('Generating favicon images...\n');
    
    // Generate each size
    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }
    
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();

