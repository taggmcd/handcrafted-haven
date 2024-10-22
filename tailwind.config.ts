import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio"; // Corrected import

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
      },
    },
  },
  plugins: [
    aspectRatio, // Corrected usage
    typography,
  ],
};

export default config;
