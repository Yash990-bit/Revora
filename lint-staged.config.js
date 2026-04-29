/** @type {import('lint-staged').Config} */
export default {
  'apps/web/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --config apps/web/eslint.config.js',
    'prettier --write',
  ],
  'apps/docs/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --config apps/docs/eslint.config.js',
    'prettier --write',
  ],
  'packages/ui/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --config packages/ui/eslint.config.mjs',
    'prettier --write',
  ],
  '!({apps,packages}/**)/*.{js,jsx,ts,tsx}': ['prettier --write'],
  'apps/api/**/*.py': ['black --line-length 100'],
  '*.{json,md,css,scss}': ['prettier --write'],
};
