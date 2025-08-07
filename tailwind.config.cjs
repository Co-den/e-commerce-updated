module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/styles.css"],
  theme: {
    extend: {
      colors: {
        orange: "#FF6A13",
        black: "#1C1C1C",
        lemon: "#F9E600",
        yellow: "#FFB800",
        green:  "#22c55e",
        darkGreen:"#064e3b",
        blue: '#1F51FF',
        fontFamily: {
          inter: ["Inter", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};