module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-irregular-whitespace": 2,
    "no-trailing-spaces": 2,
    "comma-dangle": 2,
    "arrow-spacing": 2,
    "rest-spread-spacing": 2,
    quotes: [2, "single"],
    semi: 0
  }
};
