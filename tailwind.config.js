/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        BrandPrimary: "#4165EB",
        BrandLightPrimary: "#ECF0FD",
        BrandRed: "#F33B3B",
        BrandTextColor: "#757575",
        BrandGray: "#E6E6E6",
        BrandBlack: "#9B9B9B",
        BrandBlack1: "#2C2C2C",
        BrandLightGray: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
