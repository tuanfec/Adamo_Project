// tailwind.config.js
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Đảm bảo Tailwind quét các file trong thư mục src
  theme: {
    extend: {
      colors: {
        mycolor: "#ff5733", // Màu tùy chỉnh của bạn
      },
    },
  },
  plugins: [],
};
