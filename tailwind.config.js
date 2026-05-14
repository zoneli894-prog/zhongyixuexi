/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tcm-bg': '#F5F5DC',
        'tcm-surface': '#FDFDFD',
        'tcm-primary': '#B22222',
        'tcm-dark': '#2C3E50',
        'tcm-accent': '#6B8E23',
        'tcm-muted': '#8B7D6B',
        'tcm-gold': '#DAA520',
      },
      fontFamily: {
        'serif': ['"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
        'sans': ['"Noto Sans SC"', '"Source Han Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
