export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
    extend: {
      animation: {
        'slide-bounce': 'slideBounce 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        slideBounce: {
          '0%': { opacity: 0, transform: 'translateX(30px) scale(0.95)' },
          '60%': { transform: 'translateX(0px) scale(1.05)' },
          '100%': { opacity: 1, transform: 'translateX(0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
