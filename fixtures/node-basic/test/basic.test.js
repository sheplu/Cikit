import assert from 'node:assert/strict';
import test from 'node:test';

test('fixture can run on the active Node.js runtime', () => {
  const major = Number.parseInt(process.versions.node.split('.')[0], 10);
  assert.ok(major >= 20);
});
