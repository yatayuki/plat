module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  // add your custom rules here
  rules: {
    "no-console": "off", // console.log "error", "warn", "off"
    "no-trailing-spaces": "off" // 行の末尾の空白
  }
};
