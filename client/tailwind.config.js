/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D12',
        surface: {
          DEFAULT: '#141821',
          hover: '#191E2A',
          card: '#141821',
          light: '#1B212E'
        },
        border: {
          DEFAULT: '#1F2638',
          subtle: '#181E2C',
          bright: '#2D374D'
        },
        electric: {
          DEFAULT: '#4F8CFF',
          hover: '#3B76EB',
          dark: '#1D4ED8',
          glow: 'rgba(79, 140, 255, 0.25)',
          glowStrong: 'rgba(79, 140, 255, 0.45)'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(79, 140, 255, 0.3)',
        'glow-lg': '0 0 50px -10px rgba(79, 140, 255, 0.4)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}
