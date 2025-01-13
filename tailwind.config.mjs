/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		fontFamily: {
		  montserrat: ["Montserrat", "sans-serif"],
		  quicksand: ["Quicksand", "sans-serif"],
		  rubik: ["Rubik", "sans-serif"]
		},
		colors:{
			highlighted: '#FFEB3B',
			secundary: '#FFAB91'
		}
	  },
	},
	plugins: [],
  }
  