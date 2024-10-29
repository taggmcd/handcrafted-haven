import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust according to your file structure
  ],
  theme: {
    extend: {
      colors: {
        'beige-100': '#f5f5dc',
        'beige-50': '#fafaf0',
        'forest-green-800': '#003300',
        'brown-600': '#654321',
      },
    },
  },
  plugins: [
    typography,
    aspectRatio,
  ],
};

export default config;
