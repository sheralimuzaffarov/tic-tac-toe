/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4a90e2',
          hover: '#357abd',
        },
        success: '#52c41a',
        warning: '#faad14',
      },
      animation: {
        'confetti-fall': 'confetti-fall 3s linear forwards',
        'pulse-scale': 'pulse-scale 0.5s ease-in-out',
        'bounce-scale': 'bounce-scale 0.5s ease-in-out',
        'highlight': 'highlight 0.5s ease-in-out',
      },
      keyframes: {
        'confetti-fall': {
          '0%': {
            transform: 'translateY(0) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh) rotate(720deg)',
            opacity: '0',
          },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'bounce-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        'highlight': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}

