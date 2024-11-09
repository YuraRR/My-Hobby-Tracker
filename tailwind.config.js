/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		screens: {
  			xs: '480px'
  		},
  		colors: {
  			gray: {
  				'50': 'var(--color-gray-50)',
  				'100': 'var(--color-gray-100)',
  				'200': 'var(--color-gray-200)',
  				'300': 'var(--color-gray-300)',
  				'400': 'var(--color-gray-400)',
  				'500': 'var(--color-gray-500)',
  				'600': 'var(--color-gray-600)',
  				'700': 'var(--color-gray-700)',
  				'800': 'var(--color-gray-800)',
  				'900': 'var(--color-gray-900)',
  				def: 'var(--color-gray-def)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".center-between": {
          "justify-content": "space-between",
          "align-items": "center",
        },
        ".center": {
          "justify-content": "center",
          "align-items": "center",
        },
        ".absolute-center": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      };

      addUtilities(newUtilities);
    },
      require("tailwindcss-animate")
],
};
