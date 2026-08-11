import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 22px 50px rgba(6, 18, 16, 0.28)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  daisyui: {
    themes: [
      {
        luna: {
          primary: '#1f6b58',
          'primary-content': '#f3faf7',
          secondary: '#c9a227',
          'secondary-content': '#1a1404',
          accent: '#8fd3c2',
          'accent-content': '#0c1f1a',
          neutral: '#141a18',
          'neutral-content': '#e7eeeb',
          'base-100': '#121916',
          'base-200': '#0c1210',
          'base-300': '#1e2a26',
          'base-content': '#e7eeeb',
          info: '#5b9bb8',
          success: '#3d9b74',
          warning: '#d4a017',
          error: '#d45b4a',
        },
      },
    ],
  },
  plugins: [daisyui],
};
