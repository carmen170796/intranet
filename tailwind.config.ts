import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'eablue': '#00239c',
      },
    },
  },
  plugins: [],
} satisfies Config;
