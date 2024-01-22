import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        sun: "12s linear infinite spin",
      },
      colors: {
        neon: {
          DEFAULT: "#bfd68f",
          hover: "#8aa652",
        },
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
        serif: ["Times New Roman", "serif"],
        mono: ["var(--font-inconsolata)"],
      },
    },
  },
  plugins: [],
};
export default config;
