// tailwind.config.js
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Adjust if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
  ],
};
