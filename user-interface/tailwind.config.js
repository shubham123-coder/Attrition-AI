/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      animation: {
        "status-glow": "status-glow 3s ease-in-out infinite",
      },

      keyframes: {
        "status-glow": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.4",
            filter: "blur(4px)",
          },

          "50%": {
            transform: "scale(1.4)",
            opacity: "0.8",
            filter: "blur(6px)",
          },
        },
      },
    },
  },

  plugins: [],
};