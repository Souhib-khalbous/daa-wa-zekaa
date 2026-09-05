const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: { 900: 'var(--blue-900)', 700: 'var(--blue-700)', 500: 'var(--blue-500)', 100: 'var(--blue-100)' },
        yellow: { 500: 'var(--yellow-500)', 200: 'var(--yellow-200)', 50: 'var(--yellow-50)' },
        paper: 'var(--paper)', white: 'var(--white)', line: 'var(--line)',
        ink: { 900: 'var(--ink-900)', 500: 'var(--ink-500)' },
      },
      borderRadius: { card: 'var(--radius-card)', node: 'var(--radius-node)', media: 'var(--radius-media)', pill: 'var(--radius-pill)' },
      boxShadow: { card: 'var(--shadow-card)' },
      transitionDuration: { 250: '250ms' },
      fontFamily: { sans: ['var(--font-inter)', 'Arial', 'sans-serif'], arabic: ['var(--font-arabic)', 'Arial', 'sans-serif'] },
    },
  },
};
export default config;
