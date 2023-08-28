/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*. {js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*. {js,ts}",
    "./nuxt.config. {js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "bf": {
          "primary": "#1837D5",
          "secondary": "#A4192D",
          "accent": "#FFFF00",
          "neutral": "#fdfdfd",
          "white": "#fdfdfd",
          "dark": "#1F2937",
          "soft-dark": "#374151",
          "text": "#9C9885",
        }
      },
    },
  },
  plugins: [],
}

