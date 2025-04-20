// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [eslint.configs.recommended, tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    sourceType: 'module', // Assuming ES Modules (can switch to 'commonjs' if needed)
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
  },
});
