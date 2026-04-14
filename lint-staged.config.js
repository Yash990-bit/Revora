/** @type {import('lint-staged').Config} */
export default {
  "apps/web/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix --config apps/web/eslint.config.js",
  ],
  "apps/docs/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix --config apps/docs/eslint.config.js",
  ],
  "packages/ui/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix --config packages/ui/eslint.config.mjs",
  ],
  "!({apps,packages}/**)/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
  ],
  "*.{json,md,css,scss}": ["prettier --write"],
};
