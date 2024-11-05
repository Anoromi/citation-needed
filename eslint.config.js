import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type import("eslint").config */
export default tseslint.config(...[
  ...pluginVue.configs["flat/recommended"],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  eslintConfigPrettier,
  {
    rules: {
        "vue/singleline-html-element-content-newline": "off"
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
  },
]);
