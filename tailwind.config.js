module.exports = {
  important: true,
  purge: false,
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
  },
  variants: {
    backgroundColor: ['hover', 'focus', 'active', 'disabled', 'checked', 'odd'],
    cursor: ['disabled'],
    width: ['responsive']
  },
  plugins: [],
}
