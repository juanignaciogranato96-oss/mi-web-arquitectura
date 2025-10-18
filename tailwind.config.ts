import type { Config } from "tailwindcss";

// FIX: Restablecer configuracion de Tailwind CSS 3 tras abandonar el preset beta de la v4.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/data/**/*.{ts,tsx,mdx}",
    "./src/locales/**/*.{ts,tsx,mdx,json}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
