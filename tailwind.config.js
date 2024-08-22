/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 애니메이션 추가
      animation: {
        zoomInOut: "zoomInOut 10s ease-in-out infinite",
        diagonalMove: "diagonalMove 5s infinite alternate", // 대각선 이동 애니메이션 추가
      },
      // keyframes 정의
      keyframes: {
        zoomInOut: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        diagonalMove: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-10%, -10%)" }, // 대각선으로 이동
        },
      },
    },
  },
  plugins: [],
};
