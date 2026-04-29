#!/usr/bin/env node

/**
 * Validation script to check project setup
 * Usage: node scripts/validate-setup.js
 */

const fs = require('fs');
const path = require('path');

const checks = {
  'Root package.json': () => fs.existsSync('package.json'),
  'Husky installed': () => fs.existsSync('.husky'),
  'Pre-commit hook': () => fs.existsSync('.husky/pre-commit'),
  'Pre-push hook': () => fs.existsSync('.husky/pre-push'),
  'Frontend tests': () => fs.existsSync('apps/web/tests'),
  'Backend tests': () => fs.existsSync('apps/api/tests'),
  'Jest config': () => fs.existsSync('apps/web/jest.config.ts'),
  'Pytest config': () => fs.existsSync('apps/api/pytest.ini'),
  'GitHub workflows': () => fs.existsSync('.github/workflows/test.yml'),
  'Lint-staged config': () => fs.existsSync('lint-staged.config.js'),
  'Testing docs': () => fs.existsSync('TESTING.md'),
};

console.log('\n Project Setup Validation\n');

let passed = 0;
let failed = 0;

Object.entries(checks).forEach(([name, check]) => {
  const result = check();
  const status = result ? '✓' : '✗';
  console.log(`${status} ${name}`);
  if (result) passed++;
  else failed++;
});

console.log(`\n${passed} checks passed, ${failed} checks failed\n`);

if (failed > 0) {
  console.error(' Some setup checks failed!');
  process.exit(1);
} else {
  console.log('Setup validation passed!');
  process.exit(0);
}
