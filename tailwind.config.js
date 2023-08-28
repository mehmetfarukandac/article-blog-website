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
          "white": "#fdfdfd",
          "primary": "#1837D5",
          "secondary": "#A4192D",
          "accent": "#FFFF00",
          "neutral": "#fdfdfd",
          "soft-dark": "#374151",
          "dark": "#1F2937",
          "text": "#9C9885",
        }
      },
    },
  },
  plugins: [],
}

