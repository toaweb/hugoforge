#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const pngToIco = require('png-to-ico').default;

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets/svg');
const OUT = path.join(ROOT, 'static');

function render(svgPath, width, height) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Ubuntu Mono' },
    background: 'rgba(0,0,0,0)',
  });
  return resvg.render().asPng();
}

function write(name, buffer) {
  const target = path.join(OUT, name);
  fs.writeFileSync(target, buffer);
  console.log(`  ${name.padEnd(24)} ${buffer.length.toString().padStart(7)} bytes`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const ogSvg = path.join(SRC, 'og-image.svg');
  const favSvg = path.join(SRC, 'favicon.svg');

  console.log('Rendering branded assets via @resvg/resvg-js:');
  write('og-image.png', render(ogSvg, 1200, 630));

  const fav32 = render(favSvg, 32, 32);
  const fav16 = render(favSvg, 16, 16);
  const fav180 = render(favSvg, 180, 180);

  write('favicon-32x32.png', fav32);
  write('apple-touch-icon.png', fav180);

  const tmp16 = path.join('/tmp', 'fav16.png');
  const tmp32 = path.join('/tmp', 'fav32.png');
  fs.writeFileSync(tmp16, fav16);
  fs.writeFileSync(tmp32, fav32);
  const ico = await pngToIco([tmp16, tmp32]);
  write('favicon.ico', ico);

  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
