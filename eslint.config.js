import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'; // Importación correcta del plugin de TS
import typescriptParser from '@typescript-eslint/parser'; // Parser de TypeScript

export default [
  {
    ignores: ['dist'],
    files: ['**/*.{ts,tsx}'], // Aplica la configuración solo a archivos TS/TSX
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: typescriptParser, // Define el parser de TypeScript
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Reglas recomendadas de React Hooks
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn', // Ejemplo de regla de TS
      '@typescript-eslint/no-unused-vars': 'error', // Otra regla típica de TS
      'prettier/prettier': 'error', // Reglas de Prettier
    },
  },
  js.configs.recommended, // Configuración recomendada de JavaScript de ESLint
];
