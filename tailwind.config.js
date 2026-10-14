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
        'chrome-black': '#110f24',
        'chrome-charcoal': '#161329',
        'chrome-card': '#1c1934',
        'chrome-surface': '#242040',
        'chrome-border': '#332d55',
        'chrome-border-highlight': '#4a4275',
        'chrome-orange': '#FF9E7D',
        'chrome-orange-light': '#FFB59A',
        'cyber-cyan': '#8ee3f5',
        'cyber-cyan-light': '#b5eefa',
        'cyber-purple': '#a595ff',
        'cyber-purple-light': '#C3B8FF',
        'cyber-pink': '#F7A1B8',
        'cyber-magenta': '#F2A7D8',
        'cyber-emerald': '#7fe0b8',
        'cyber-amber': '#F7CF86',
        'cv-offwhite': '#141127',
        'cv-offwhite-alt': '#1a1733',
        'cv-dark': '#F8FAFC',
        'cv-muted': '#94A3B8',
        'cv-border': '#352f57',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        ibmPlex: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      maxWidth: {
        'content': '1440px',
      },
      boxShadow: {
        // Soft diffuse colored drop shadows (light falls from top-left)
        'orange-glow': '0 18px 40px -14px rgba(255, 158, 125, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
        'cyan-glow': '0 18px 40px -14px rgba(142, 227, 245, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'purple-glow': '0 18px 40px -14px rgba(165, 149, 255, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'emerald-glow': '0 18px 40px -14px rgba(127, 224, 184, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'pink-glow': '0 18px 40px -14px rgba(247, 161, 184, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'rainbow-glow': '0 24px 60px -20px rgba(165, 149, 255, 0.4), 0 8px 24px -12px rgba(142, 227, 245, 0.3)',
        'chrome-edge': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(0, 0, 0, 0.25)',
        'card-elevated': '0 30px 60px -24px rgba(5, 3, 18, 0.75), 0 12px 24px -12px rgba(5, 3, 18, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        // Plush 3D surface stack: ambient + key shadow + top rim light + bottom inner shade
        'soft-1': '0 2px 6px -1px rgba(5, 3, 18, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.07)',
        'soft-2': '0 14px 32px -14px rgba(5, 3, 18, 0.7), 0 4px 10px -4px rgba(5, 3, 18, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -10px 20px -12px rgba(0, 0, 0, 0.35)',
        'soft-3': '0 40px 80px -30px rgba(5, 3, 18, 0.85), 0 18px 36px -18px rgba(5, 3, 18, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -16px 32px -16px rgba(0, 0, 0, 0.4)',
        'soft-inset': 'inset 0 2px 6px rgba(5, 3, 18, 0.55), inset 0 -1px 0 rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [],
}
