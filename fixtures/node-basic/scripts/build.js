import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync(new URL('../dist', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/index.js', import.meta.url), 'export const ok = true;\n');
