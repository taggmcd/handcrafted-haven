import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import aspectRation from "@tailwindcss/aspect-ratio";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        softGrayPurple: "#9F9AA4",
        blushPink: "#E7CFCD",
        paleTealGray: "#CFD8D7",
        desaturatedMint: "#B5C9C3",
        mutedLavenderPink: "#CAB1BD",
      },
    },
  },
  plugins: [
    aspectRation,
    typography,
  ],
};

export default config;
