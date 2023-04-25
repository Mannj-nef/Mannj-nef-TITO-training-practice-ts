module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-use-before-define": [
      "error",
      {
        functions: false,
      },
    ],
    "class-methods-use-this": ["error", { enforceForClassFields: false }],
    "no-param-reassign": ["error", { props: false }],
    "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
    "import/prefer-default-export": [
      "off" || "warn" || "error",
      { target: "single" || "any" },
    ],
    "func-names": ["error", "never"],
    "max-classes-per-file": ["error", { ignoreExpressions: true, max: 2 }],
  },
};
