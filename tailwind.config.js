/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'typewriter': 'typewriter 4s steps(40) infinite',
        'flip': 'flip 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 20px currentColor' },
          '50%': { textShadow: '0 0 40px currentColor, 0 0 60px currentColor' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        typewriter: {
          '0%, 90%, 100%': { width: '0' },
          '60%, 80%': { width: '100%' },
        },
        flip: {
          '0%': { transform: 'perspective(400px) rotateX(0deg)' },
          '50%': { transform: 'perspective(400px) rotateX(90deg)' },
          '100%': { transform: 'perspective(400px) rotateX(0deg)' },
        },
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        bg: 'var(--bg-color)',
      }
    },
  },
  plugins: [],
}
