import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { getSpecies3DModel, species3DData } from '../src/data/species3D.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const CORAL_IDS = ['coral', 'red-coral', 'cold-water-coral', 'indian-ocean-coral'];

test('all four coral species point at dedicated GLB models', () => {
  for (const id of CORAL_IDS) {
    const model = getSpecies3DModel(id);
    assert.ok(model, `${id} should have a dedicated model`);
    assert.equal(model.placeholder, false);
    assert.equal(model.type, 'coral');
    assert.ok(model.modelName);
    assert.ok(model.credit);
    assert.ok(model.license);
    assert.ok(model.source);

    const file = path.join(root, 'public', model.model.replace(/^\//, ''));
    assert.ok(fs.existsSync(file), `${id} GLB should exist at ${file}`);
    assert.ok(fs.statSync(file).size > 1_000_000, `${id} GLB should contain the scan`);
  }
});

test('non-coral species still fall back to placeholder geometry', () => {
  assert.equal(getSpecies3DModel('shark'), null);
  assert.equal(getSpecies3DModel('fish'), null);
  assert.equal(species3DData.shark.placeholder, true);
});

test('coral model attribution files are shipped', () => {
  assert.ok(fs.existsSync(path.join(root, 'public', 'models', 'LICENSE-Dina3D.txt')));
  assert.ok(fs.existsSync(path.join(root, 'public', 'models', 'ATTRIBUTION.md')));
});
