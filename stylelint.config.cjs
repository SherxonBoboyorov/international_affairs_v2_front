module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order"],
  overrides: [
    {
      customSyntax: "postcss-html",
      files: ["**/*.vue"],
    },
    {
      customSyntax: "postcss-scss",
      files: ["**/*.scss"],
    },
  ],
  rules: {
    "at-rule-no-unknown": null,
    "declaration-property-value-keyword-no-deprecated": null,
    "keyframes-name-pattern": null,
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
    "no-empty-source": null,
    "scss/at-rule-no-unknown": true,
    "scss/dollar-variable-pattern": null,
    "scss/operator-no-unspaced": null,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
  },
};
