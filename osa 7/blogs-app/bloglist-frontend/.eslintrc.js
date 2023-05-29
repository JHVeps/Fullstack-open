module.exports = {
  extends: ['react-app', 'plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y', 'react'],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': ['error'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  // env: {
  //   browser: true,
  //   es6: true,
  //   "jest/globals": true,
  //   "cypress/globals": true
  // },
  // extends: [
  //   "eslint:recommended",
  //   "plugin:react/recommended",
  //   "plugin:prettier/recommended",
  //   "prettier"
  // ],
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true
  //   },
  //   ecmaVersion: 2018,
  //   sourceType: "module"
  // },
  // plugins: ["react", "jest", "cypress", "prettier"],
  // rules: {
  //   "prettier/prettier": [
  //     "error",
  //     {},
  //     {
  //       usePrettierrc: false
  //     }
  //   ],
  //   indent: ["error", 2],
  //   "linebreak-style": ["error", "windows"],
  //   quotes: ["error", "double"],
  //   semi: ["error", "always"],
  //   eqeqeq: "error",
  //   "no-trailing-spaces": "error",
  //   "object-curly-spacing": ["error", "always"],
  //   "arrow-spacing": ["error", { before: true, after: true }],
  //   "no-console": 0,
  //   "react/prop-types": 0,
  //   "react/react-in-jsx-scope": "off"
  // },
  // settings: {
  //   react: {
  //     version: "detect"
  //   }
  // }
}
