/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        indeterminate: {
          "0%": { left: "-35%", right: "100%" },
          "60%": { left: "100%", right: "-90%" },
          "100%": { left: "100%", right: "-90%" },
        },
        indeterminateShort: {
          "0%": { left: "-35%", right: "100%" },
          "60%": { left: "100%", right: "-90%" },
          "100%": { left: "100%", right: "-90%" },
        },
      },
      animation: {
        indeterminate:
          "indeterminate 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
        indeterminateShort:
          "indeterminateShort 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
      },
    },
  },
  plugins: [],
};
