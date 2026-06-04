import assert from 'node:assert/strict';

/** @type {{ name: string, version: string }} */
const pkg = (await import('../package.json', { with: { type: 'json' } })).default;

assert.equal(pkg.name, '@sheplu/cikit-node-fixture');
assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
