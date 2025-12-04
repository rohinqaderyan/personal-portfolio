module.exports = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css}': ['prettier --write'],
  '*.{ts,tsx}': () => 'tsc --noEmit',
}
