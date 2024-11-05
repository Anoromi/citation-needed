import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

/** @type import("eslint").config */
export default tseslint.config(...[
  ...pluginVue.configs["flat/recommended"],

  {
    rules: {
        "vue/singleline-html-element-content-newline": "off"
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
  },
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  }
]);
