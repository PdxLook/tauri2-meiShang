// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["flex-items-center", "flex items-center"],
    ["flex-justify-center", "flex justify-center"],
    ["wh-fluid", "w-full h-full"],
  ],
  rules: [
    [
      /^ratios-(\d+)(?:-(\d+))?$/,
      ([, w, h]) => ({
        "aspect-ratio": h ? `${w}/${h}` : `${w}`,
        display: "block",
      }),
    ],
    // 定位居中 start
    [
      "dw-center",
      {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    ],

    // top居中 start
    [
      "top-center",
      {
        top: "50%",
        transform: "translateY(-50%)",
      },
    ],

    // left居中 start
    [
      "left-center",
      {
        left: "50%",
        transform: "translateX(-50%)",
      },
    ],
  ],
  theme: {
    container: {
      center: true,
      padding: {
        // DEFAULT: '1.25rem',
        // sm: '1.25rem',
        DEFAULT: "1rem",
        sm: "0rem",
        md: "0rem",
        lg: "0rem",
        xl: "0rem",
      },
    },

    breakpoints: {
      sm: "100%", // => @media (min-width: 640px) { ... }
      md: "768px", // => @media (min-width: 768px) { ... }
      lg: "1024px", // => @media (min-width: 1024px) { ... }
      xl: "1224px", // => @media (min-width: 1200px) { ... }
      "2xl": "1820px", // => @media (min-width: 1320px) { ... }
    },
    // 颜色
    colors: {
      black: {
        "900": "#0D0D0D",
        "800": "#333333",
        "700": "#737373",
        "600": "#A6A6A6",
        "500": "#D9D9D9",
        "400": "#E6E6E6",
        "300": "#F0F0F0",
        "200": "#F5F6F7",
        "100": "#FAFAFA",
      },
      primary: {
        "900": "#CC0011",
        "800": "#ff5b5c",
        "700": "#F24B59",
        "200": "#FAACB3",
        "100": "#FFF3F4",
      },
      blue: {
        "900": "#1345BA",
        "800": "#3370FF",
        "700": "#749DFC",
        "200": "#AFC5FA",
        "100": "#EDF1FA",
      },
      green: {
        "900": "#0AA371",
        "800": "#14B681",
        "700": "#41D1A2",
        "200": "#8EE5C9",
        "100": "#EDFAF6",
      },
      yellow: {
        "900": "#D09C17",
        "800": "#F0B001",
        "700": "#F5C84C",
        "200": "#F7DE99",
        "100": "#FAF7ED",
      },
    },
    boxShadow: {
      lg: "0px 0px 16px 0px rgba(13,13,13,0.06)",
    },
  },
});
