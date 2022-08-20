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
    'airbnb',
    'airbnb-typescript',
    'airbnb/whitespace',
    "airbnb/hooks",
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  ignorePatterns: ["src/**/*.test.ts", "src/__tests__/", "dist/", "src/assets/", "coverage/", "src/public"],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    "import/extensions": ["error", "never"],
    "no-unused-expressions": "off",
    "react/jsx-filename-extension": [1, { "allow": "as-needed", "extensions": [".tsx", ".jsx"] }]
  }
};
