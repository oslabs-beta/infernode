module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // 'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/whitespace',
    "airbnb/hooks",
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  ignorePatterns: [
    "src/**/*.test.ts",
    "src/__tests__/",
    "dist/",
    "src/assets/",
    "coverage/",
    "src/public",
    "src/examples/",
    "./site/"
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    "import/extensions": ["error", "never"],
    "no-console": "off",
    "no-unused-expressions": "off",
    "no-console": "off",
  }
};
