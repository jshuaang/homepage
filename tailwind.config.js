/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      animation: {
        'bounce-short': 'bounce 1s ease-in-out 1',
        'ping-short': 'ping 1s ease-in-out 1',
        'pulse-short': 'pulse 1s ease-in-out 1',
        'entrance': 'entrance .3s ease-in-out 1',
        'wiggle': 'wiggle .3s ease-in-out 1',
        'exit': 'exit .3s ease-in-out 1'
      },
      keyframes: {
        entrance: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
        exit: {
          '100%': { transform: 'translateX(0)' },
          '0%': { transform: 'translateX(5px)' },
        }
      }
    },
  },
  plugins: [],
}
