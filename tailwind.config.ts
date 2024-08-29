import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F35F3"
      },
      screens: {
        tablet: "1150px",
        "small-tablet": "1000px",
        desktop: "1350px"
      }
    }
  },
  plugins: []
};
export default config;
