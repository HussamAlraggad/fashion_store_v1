import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          charcoal: "#1A1A1A",
          ivory: "#FFFFF0",
          cream: "#F5F0E8",
          gold: "#C9A84C",
          goldLight: "#E8D48B",
          black: "#0A0A0A",
          white: "#FFFFFF",
          gray: {
            light: "#F3F3F3",
            DEFAULT: "#888888",
            dark: "#444444",
          },
        },
        accent: {
          DEFAULT: "#C9A84C",
          hover: "#B8943A",
          light: "#E8D48B",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
