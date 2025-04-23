module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json", // Path to your tsconfig.json
    ecmaVersion: 2020, // Modern ECMAScript features
    sourceType: "module",
    tsconfigRootDir: __dirname,
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
        allow: ["_id", "_sum", "_count", "_avg", "_min", "_max"],
      },
    ],
    "import/no-extraneous-dependencies": [
  "error",
  {
    devDependencies: [
      "**/*.test.ts",
      "**/*.spec.ts",
      "**/test/**",
      "**/__tests__/**",
      "**/*.config.js",
      "**/scripts/**",
    ],
    optionalDependencies: false,
    packageDir: './',
  },
],

    "consistent-return": "off",
    "@typescript-eslint/naming-convention": "off",
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
      // Exclude .eslintrc.js from linting
      files: [".eslintrc.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      // Apply to all TypeScript files
      files: ["__tests__/**/*.test.ts", "__tests__/**/*.spec.ts", "api/index.ts"],

      rules: {
        "import/no-extraneous-dependencies": "off",
      },
      // General rules for the project
      env: {
        jest: true,
      },
    },
    {
      files: ["api/**/*.ts"], // 👈 This is the new block
      rules: {
        "import/prefer-default-export": "off"
      }
    }
  ],
}
