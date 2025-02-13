/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
    primaryColor: "#0067FF",
    yellowColor: "#FEB60D",
    purpleColor: "#9771FF",
    irisBlueColor: "#01B5C5",
    headingColor: "#181A1E",
    textColor: "#4E545F",
    dimgray: "#4b5563",
    white: "#fff",
    mediumslateblue: "#0067ff"

      },
      boxShadow: {
        panelShadow: "rgba(17,12,46,0.15) 0px 48px 100px 0px",
      },
      fontFamily: {
        outfit: "Outfit",
      },
    },
    fontSize:{
      lg:"18px",
      inherit: false,
    },
    corePlugins:{
      preFlight: false,
    }
  },
  plugins: [],
};

