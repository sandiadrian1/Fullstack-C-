/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-L': 'fadeInLeft 0.5s ease-out',
        'fade-in-R': 'fadeInRight 0.5s ease-out',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-100px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(100px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(130px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: 0, transform: 'translateX(-130px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],

}