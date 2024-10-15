import type { Config } from 'tailwindcss';

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
  ],
};

export default config;
