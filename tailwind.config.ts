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
        "black-main": "#07090F",
        primary: "#772D8B",
        cPink: "#FFE2D1",
        cGreen: "#156064",
      },
    },
  },
  plugins: [],
};

export default config;
