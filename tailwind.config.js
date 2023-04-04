/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { buttonBg: "#DEA01E" },
      animation: {
        moveDown: "moveDown 0.3s forwards",
      },
      keyframes: {
        moveDown: {
          "0%": { transform: "translateY(-50%)", opacity: 0, height: "0" },
          "100%": { transform: "translateY(0%)", opacity: 1, height: "100%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
