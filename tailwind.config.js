/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1200px",
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        "orange-0": "#FFFAF7",
        "orange-50": "#FEEEE4",
        "orange-200": "#FFC09C",
        "orange-500": "#FF5E00",
        "purple-0": "#F9F9FC",
        "purple-50": "#F5F4FA",
        "purple-100": "#D6D3E3",
        "gray-50": "#F8F8F8",
        "gray-200": "#E4E4E4",
        "gray-300": "#D8D8D8",
        "gray-400": "#C6C6C6",
        "gray-500": "#8E8E8E",
        "gray-600": "#717171",
        "gray-800": "#2D2D2D",
        "gray-900": "#1D1D1D",
        danger: "#F82424",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [typography, require("@tailwindcss/aspect-ratio")],
};
