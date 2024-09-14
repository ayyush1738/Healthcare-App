const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4), inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 4px rgba(255, 255, 255, 0.2), 0px 0px 180px 0px #9917FF'
      },
      backgroundImage: theme => ({
        'gradient-to-b': 'linear-gradient(0deg, #A47CF3, #683FEA)'
      }),
      scale: {
        '110': '1.1'
      },
      translate: {
        '-1': '-2px'
      }
    },
  },
  plugins: [],
});
