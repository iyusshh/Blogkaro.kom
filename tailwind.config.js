/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { display: ['ui-sans-serif','system-ui'] },
      boxShadow: { glow: "0 0 30px rgba(99,102,241,0.5)" }
    }
  },
  plugins: []
}
