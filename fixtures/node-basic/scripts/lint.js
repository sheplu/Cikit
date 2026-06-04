import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

if (pkg.type !== 'module') {
  throw new Error('fixture package must stay ESM');
}
