module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#141927",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
