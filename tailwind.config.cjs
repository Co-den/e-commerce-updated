module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/styles.css"],
  theme: {
    extend: {
      colors: {
        orange: "#FF6A13",
        black: "#1C1C1C",
        lemon: "#F9E600",
        yellow: "#FFB800",
        green: "#44FB07",
        fontFamily: {
          inter: ["Inter", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};
