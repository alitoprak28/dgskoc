import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#173054',
        orange: '#EE7D1E',
        'orange-soft': '#FFF4E9',
        'gray-bg': '#F7F8FA',
        'gray-border': '#EEEEEE',
        'gray-text': '#6E6E6E', // AA kontrast icin #8A8A8A'dan koyulastirildi
        'navy-soft': '#B9C4D6',
        'nav-link': '#5A6B85',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        icerik: '72rem', // max-w-6xl karsiligi, bolum kapsayicisi
      },
    },
  },
  plugins: [],
};

export default config;
