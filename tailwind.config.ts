import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f1f3d",
          deep: "#091629",
          mid: "#1a3260",
          soft: "#243d72"
        },
        ivory: {
          DEFAULT: "#f7f4ee",
          warm: "#ede9df",
          deep: "#ddd8cc"
        },
        stone: {
          DEFAULT: "#a09a8e",
          light: "#ccc8c0",
          xlight: "#eae7e1"
        },
        gold: {
          DEFAULT: "#b8933a",
          light: "#d4aa55",
          pale: "#f5edd8"
        },
        ink: {
          DEFAULT: "#1a1814",
          soft: "#3a3630",
          muted: "#7a756e"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"]
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)"
      }
    }
  },
  plugins: []
};

export default config;
