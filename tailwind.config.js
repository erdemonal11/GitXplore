/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBg: '#0e0e10',
        lightBg: '#f5f5f5',
        darkCard: '#1f1f23',
        lightCard: '#ffffff',
        accent: '#0070f3',
        textDark: '#eaeaea',
        textLight: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
};
