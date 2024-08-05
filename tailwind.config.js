const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */


module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor:{
        "dark": "#05380a"
      },
      backgroundColor:{
        "dark" : "#05380a"
      }
    },
  },
  plugins: [],
});







// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


