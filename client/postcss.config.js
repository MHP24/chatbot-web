export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
      'postcss-prefix-selector': {
      prefix: '#chat_wrapper',
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
