/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#102C57',
        emerald: { DEFAULT: '#10B981', dark: '#059669' },
        slate: { light: '#F8FAFC' },
      },
      fontFamily: { sans: ['Inter', 'Montserrat', 'sans-serif'] },
      keyframes: {
        pulse2: { '0%,100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.5)' }, '50%': { boxShadow: '0 0 0 12px rgba(16,185,129,0)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        pulse2: 'pulse2 2s infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}
