// Hugo's `css.TailwindCSS` pipe runs node_modules/.bin/tailwindcss as a
// Node script. pnpm wraps the binary with a POSIX shell shim, which Hugo
// refuses with "binary is not a Node.js script". Replace the shim with a
// symlink to the actual .mjs entry point.

const fs = require('fs');
const path = require('path');

try {
  const root = path.resolve(__dirname, '..');
  const target = path.join(root, 'node_modules/@tailwindcss/cli/dist/index.mjs');
  const link = path.join(root, 'node_modules/.bin/tailwindcss');

  if (!fs.existsSync(target)) {
    throw new Error(`expected entry point not found: ${target}`);
  }

  fs.rmSync(link, { force: true });
  fs.symlinkSync(target, link);
  fs.chmodSync(target, 0o755);
  console.log(`  fix-tailwindcss-bin: linked ${path.relative(root, link)} → ${path.relative(root, target)}`);
} catch (err) {
  console.error('  fix-tailwindcss-bin: failed to patch binary —', err.message);
  process.exit(1);
}
