import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio"; // Corrected import

/** @type {Config} */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust according to your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    aspectRatio,
    typography,
  ],
};

export default config;
