/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
      },
      colors: {
        brand: {
          dark: "#0F172A",
          blue: "#2563EB",
          surface: "#F8FAFC",
          border: "#E2E8F0",
        },
      },
    },
  },
  plugins: [],
};
