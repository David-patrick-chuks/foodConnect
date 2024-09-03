const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */


module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textColor:{
        "dark": "black",
        "real" : "#ffbb00"
      },
      backgroundColor:{
        "dark" : "#F8B602",
        "real" : "#ffbb00"
      }
    },
  },
  plugins: [],
});


// #F8B602"




// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


