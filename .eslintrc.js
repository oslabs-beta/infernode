module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb',
    'airbnb/whitespace',
    "airbnb/hooks",
  ],
  ignorePatterns: ["src/**/*.test.ts", "src/__tests__/", "dist/", "src/assets/", "coverage/", "src/public"],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
};
