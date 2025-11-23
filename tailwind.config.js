/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Golden Stallion tema renkleri
        hipodrome: {
          base: "#F5F7F2",
          panel: "#FFFFFF",
          track: "#E8EFE3",
          side: "#F0F3ED",
          green: "#6B8F71",
          line: "#A9C6AE",
          turf: "#4F7A5A",
        },
        prize: {
          gold: "#D4AF37",
          goldLight: "#E8C766",
          bronze: "#B87333",
        },
        control: {
          start: "#4CAF50",
          stop: "#FFB300",
          resume: "#2196F3",
          reset: "#9E9E9E",
        },
        text: {
          title: "#2F3E34",
          body: "#4A5A50",
          muted: "#7A8B80",
          disabled: "#B0BDB5",
        },
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
