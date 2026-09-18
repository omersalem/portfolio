/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'chrome-black': '#08090A',
        'chrome-charcoal': '#111215',
        'chrome-card': '#16181D',
        'chrome-surface': '#1D1F26',
        'chrome-border': '#282A33',
        'chrome-border-highlight': '#3E4250',
        'chrome-orange': '#FF5500',
        'chrome-orange-light': '#FF7733',
        'cv-offwhite': '#F4F1EA',
        'cv-offwhite-alt': '#ECE7DD',
        'cv-dark': '#141416',
        'cv-muted': '#63666E',
        'cv-border': '#DCD7CC',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
      },
      maxWidth: {
        'content': '1440px',
      },
      boxShadow: {
        'orange-glow': '0 0 24px rgba(255, 85, 0, 0.22)',
        'chrome-edge': '0 1px 0 0 rgba(255, 255, 255, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'card-elevated': '0 12px 36px -8px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
