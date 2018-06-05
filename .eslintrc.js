module.exports = {
  extends: "airbnb",
  plugins: ["react"],
  env: {
    browser: true,
    node: true
  },
  extends: "airbnb",
  rules: {
    "no-console": "off",
    "react/jsx-closing-bracket-location": [1, "after-props"],
    "padded-blocks": "off",
    indent: "off"
  }
};
