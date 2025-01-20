/** @type {import('tailwindcss').Config} */
export default {
  content: [
	"./index.html",
	"./src/**/*.{js,jsx}"
	],
  theme: {
    extend: {
      colors:{
        'color1' : '#535759',
        'color2' : '#dbdbdb', //背景
        'color3' : '#A6A6A6', //小格
      },
      fontFamily: {
        'chat': ['Noto Sans Mono', 'Noto Sans TC'],
      },
    },
  },
  plugins: [],
}

