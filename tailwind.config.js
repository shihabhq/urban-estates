import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btncol: "#f1913d",
        btnhov: "#2d2e33",
        btnsuccess: "#20b759",
      },
      screens: {
        mobile: "480px",
        xsm: "300px",
      },
      fontFamily: {
        arial: ["Arial", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
};
