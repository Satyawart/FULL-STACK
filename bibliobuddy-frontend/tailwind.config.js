/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        soft: {
          blue: '#e9f1ff',
          accent: '#cfe2ff',
          shadow: '#cbdaf7',
          white: '#f8fbff'
        }
      },
      boxShadow: {
        neu: '8px 8px 16px #c8d6f0, -8px -8px 16px #ffffff',
        neuSm: '4px 4px 8px #c8d6f0, -4px -4px 8px #ffffff'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
