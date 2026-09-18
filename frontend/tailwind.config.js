/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f5ee',
          100: '#efe7d9',
          200: '#ded0b3',
          300: '#c7b08a',
          400: '#ad8d5f',
          500: '#a07644',
          600: '#845d2f',
          700: '#69472b',
          800: '#513725',
          900: '#3f2b1d',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(20, 20, 20, 0.18)',
      },
    },
  },
  plugins: [],
}

