const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');

async function generateOGImage() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/og-image.svg'));
  
  await sharp(svgBuffer)
    .resize(1200, 630)
    .png()
    .toFile(path.join(__dirname, '../public/og-image.png'));
  
  console.log('OG image generated successfully!');
}

generateOGImage().catch(console.error); 