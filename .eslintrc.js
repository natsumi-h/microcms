module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/warnings",
    // prettierと干渉しないように設定(eslint-config-prettierのプラグインが入っていて、↓が設定されていればPretierで勝手に修正してくれる)
    "prettier",
    "plugin:import/warnings",
    // "plugin:react/recommended"
  ],

  rules: {
    // "semi" :["error", "always"],
    // "quotes": ["error", "double"],
    // "react/prop-types": ["off"],
    // "no-undef": "error",
    // "react/jsx-props-no-spreading": "off",
    "@next/next/no-img-element": "off",
  },
  // settings: {
  //   react: {
  //     version: "detect",
  //   },
  // },
};
