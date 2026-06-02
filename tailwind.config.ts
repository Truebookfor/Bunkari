import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        sand: "rgb(var(--c-sand) / <alpha-value>)",
        terracotta: {
          DEFAULT: "rgb(var(--c-terracotta) / <alpha-value>)",
          dark: "rgb(var(--c-terracotta-dark) / <alpha-value>)",
          light: "rgb(var(--c-terracotta-light) / <alpha-value>)",
        },
        sage: {
          DEFAULT: "rgb(var(--c-sage) / <alpha-value>)",
          dark: "rgb(var(--c-sage-dark) / <alpha-value>)",
          light: "rgb(var(--c-sage-light) / <alpha-value>)",
        },
        mustard: {
          DEFAULT: "rgb(var(--c-mustard) / <alpha-value>)",
          dark: "rgb(var(--c-mustard-dark) / <alpha-value>)",
        },
        cocoa: {
          DEFAULT: "rgb(var(--c-cocoa) / <alpha-value>)",
          light: "rgb(var(--c-cocoa-light) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(62, 47, 38, 0.18)",
        lift: "0 22px 60px -18px rgba(62, 47, 38, 0.28)",
        card: "0 2px 14px -6px rgba(62, 47, 38, 0.12)",
        "soft-dark": "0 10px 40px -12px rgba(0, 0, 0, 0.45)",
        "lift-dark": "0 22px 60px -18px rgba(0, 0, 0, 0.55)",
        "card-dark": "0 2px 14px -6px rgba(0, 0, 0, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.7)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "grow-vine": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        shoot: {
          "0%": { transform: "translate(0,0)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translate(-220px,160px)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        float: "float 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "slide-up": "slide-up 0.25s ease forwards",
        twinkle: "twinkle 3s ease-in-out infinite",
        sway: "sway 5s ease-in-out infinite",
        "grow-vine": "grow-vine 2.5s ease forwards",
        shoot: "shoot 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
