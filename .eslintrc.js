module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  "globals": {
    "expect": true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': 'off',
    'vue/no-unused-vars': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/html-indent': 'off',
    'vue/order-in-components': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-unused-components': 'off',
    'object-curly-spacing': 'off',
    'vue/no-v-html': 'off'
  }
}
