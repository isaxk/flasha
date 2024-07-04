/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

