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
        BrandLighterGray: "#C2C2C2",
        BrandBorderGray: "#FDFDFD",
      },
      fontSize: {
        TwentyTwo: ["22px", { lineHeight: "1.5" }], // 22px for h1
        Twenty: ["20px", { lineHeight: "1.5" }], // 20px for h2
        Eighteen: ["18px", { lineHeight: "1.5" }], // 18px for h3
        Sixteen: ["16px", { lineHeight: "1.5" }], // 16px for h4
        Fourteen: ["14px", { lineHeight: "1.5" }], // 14px for h5
        Twelve: ["12px", { lineHeight: "1.5" }], // 12px for h6
      },
    },
  },
  plugins: [],
};
