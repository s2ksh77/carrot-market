/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'media', // media:브라우저 설정 class:우리가 state로 설정 부모 하위에 요소 위치로
  plugins: [],
};
