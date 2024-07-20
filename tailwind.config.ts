import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        "black-main": "#010101",
        "gray-shade": "#1d1d1d",
        cWhite: "#fbfbfb",
        primary: "#772D8B",
        cPink: "#FFE2D1",
        green: "#90ff03",
      },
    },
  },
  plugins: [],
};

export default config;
