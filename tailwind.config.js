/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "Noto Sans KR", "sans-serif"],
        title: ["Source Sans Pro"],
      },
    },
    backgroundImage: {
      "Landing-image":
        "url('https://web-resource.gentlemonster.com/assets/stories/heronpreston/img/gallery1_image_pc_ffff.jpg')",
    },
  },
  plugins: [],
};
