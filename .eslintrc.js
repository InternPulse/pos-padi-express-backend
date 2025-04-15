module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json", // Path to your tsconfig.json
    ecmaVersion: 2020, // Modern ECMAScript features
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    "no-console": "off",
    "prettier/prettier": "error",
    semi: ["error", "never"],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_id"],
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        optionalDependencies: ["@prisma/client"],
      },
    ],
    "consistent-return": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
      },
    },
  },
  overrides: [
    {
      // Apply to all TypeScript files
      files: ["__tests__/**/*.test.ts", "__tests__/**/*.spec.ts"],
      // General rules for the project
      env: {
        jest: true,
      },
    },
  ],
}
