module.exports = {
  env: {
    node: true,
  },
  extends: [
    "@react-native-community",
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:typescript-sort-keys/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
    ecmaVersion: 6,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "import",
    "prettier",
    "react",
    "react-native",
    "react-hooks",
    "sort-destructure-keys",
    "sort-keys-fix",
    "@typescript-eslint",
    "typescript-sort-keys",
  ],
  root: true,
  rules: {
    "@typescript-eslint/ban-ts-comment": ["off"],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {prefer: "type-imports"},
    ],
    "@typescript-eslint/default-param-last": ["warn"],
    "@typescript-eslint/explicit-function-return-type": ["warn"],
    "@typescript-eslint/explicit-member-accessibility": ["warn"],
    "@typescript-eslint/no-confusing-void-expression": [
      "warn",
      {ignoreVoidOperator: true},
    ],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-empty-interface": ["off"],
    "@typescript-eslint/no-inferrable-types": ["off"],
    "@typescript-eslint/no-invalid-this": ["warn"],
    "@typescript-eslint/no-loss-of-precision": ["warn"],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["off"],
    "@typescript-eslint/no-unnecessary-condition": ["off"],
    "@typescript-eslint/no-unnecessary-type-assertion": ["off"],
    "@typescript-eslint/no-unnecessary-type-constraint": ["off"],
    "@typescript-eslint/no-unused-expressions": ["warn"],
    "@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
    "@typescript-eslint/no-use-before-define": ["warn"],
    "@typescript-eslint/no-useless-constructor": ["warn"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/non-nullable-type-assertion-style": ["warn"],
    "@typescript-eslint/prefer-function-type": ["warn"],
    "@typescript-eslint/prefer-literal-enum-member": ["warn"],
    "@typescript-eslint/prefer-nullish-coalescing": ["warn"],
    "@typescript-eslint/prefer-optional-chain": ["warn"],
    "@typescript-eslint/prefer-readonly": ["warn"],
    "@typescript-eslint/promise-function-async": ["warn"],
    "@typescript-eslint/strict-boolean-expressions": ["warn"],
    "@typescript-eslint/switch-exhaustiveness-check": ["warn"],
    "import/default": ["off"],
    "import/extensions": [
      "warn",
      {
        js: "never",
        json: "always",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/newline-after-import": ["warn"],
    "import/no-duplicates": ["warn"],
    "import/no-named-as-default-member": ["off"],
    "import/no-unresolved": ["warn"],
    "import/no-unused-modules": ["warn"],
    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: false,
          order: "asc",
        },
        groups: ["builtin", "external", "parent", "internal", "index"],
        "newlines-between": "always",
      },
    ],
    "no-console": ["error"],
    "no-empty": ["warn", {allowEmptyCatch: true}],
    "no-eval": ["warn", {allowIndirect: true}],
    "no-implied-eval": ["warn"],
    "no-nested-ternary": ["warn"],
    "no-restricted-syntax": ["warn", "SequenceExpression"],
    "no-sequences": ["warn"],
    "no-shadow": ["off"],
    "no-unneeded-ternary": ["warn"],
    "no-unused-vars": ["off"],
    "no-var": ["warn"],
    "no-void": ["off"],
    "padding-line-between-statements": [
      "warn",
      {blankLine: "always", next: "return", prev: "*"},
      {blankLine: "always", next: "throw", prev: "*"},
      {blankLine: "always", next: "if", prev: "*"},
      {blankLine: "always", next: "*", prev: "if"},
      {blankLine: "always", next: "for", prev: "*"},
      {blankLine: "always", next: "*", prev: "for"},
      {blankLine: "always", next: "while", prev: "*"},
      {blankLine: "always", next: "*", prev: "while"},
      {blankLine: "always", next: "try", prev: "*"},
      {blankLine: "always", next: "*", prev: "try"},
      {blankLine: "always", next: "switch", prev: "*"},
      {blankLine: "always", next: "*", prev: "switch"},
      {blankLine: "always", next: "class", prev: "*"},
      {blankLine: "always", next: "*", prev: "class"},
    ],
    "prefer-const": ["warn"],
    "prettier/prettier": ["warn"],
    "react-hooks/rules-of-hooks": ["warn"],
    "react-native/no-raw-text": ["warn"],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-boolean-value": ["warn"],
    "react/jsx-filename-extension": ["warn", {extensions: [".tsx"]}],
    "react/jsx-key": ["warn"],
    "react/jsx-no-literals": ["warn"],
    "react/jsx-no-useless-fragment": ["warn"],
    "react/jsx-pascal-case": ["warn"],
    "react/jsx-sort-props": [
      "warn",
      {
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: ["key"],
      },
    ],
    "react/prefer-stateless-function": ["warn"],
    "react/prop-types": ["off"],
    "require-await": ["warn"],
    semi: ["warn", "never"],
    "sort-destructure-keys/sort-destructure-keys": ["warn"],
    "sort-imports": [
      "warn",
      {
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    "sort-keys": [
      "warn",
      "asc",
      {caseSensitive: true, minKeys: 2, natural: false},
    ],
    "sort-keys-fix/sort-keys-fix": ["warn"],
    "typescript-sort-keys/interface": ["warn"],
    "typescript-sort-keys/string-enum": ["warn"],
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/ignore": ["moment", "react"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["src"],
      },
      typescript: {alwaysTryTypes: true},
    },
    react: {
      version: "detect",
    },
  },
}
