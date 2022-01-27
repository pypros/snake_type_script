module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  extends: ["airbnb-typescript/base", "prettier"],
  plugins: ["import","prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    project: "tsconfig.json"
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "import/extensions": "off",
  },
};
