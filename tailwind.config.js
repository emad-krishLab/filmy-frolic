/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F5C518",
          light: "#EAB308",
          dark: "#F39C12",
          foreground: "#080810",
        },

        background: {
          DEFAULT: "#080810",
          secondary: "#0D0D18",
        },

        surface: {
          DEFAULT: "#12121E",
          light: "#1A1A26",
          elevated: "#1A1A2A",
          card: "#1A1A2E",
          hover: "#262635",
        },

        text: {
          primary: "#F0F0F8",
          secondary: "#8A8A9E",
          muted: "#7A7A8C",
          disabled: "#6A6A7C",
          tertiary: "#5C5C6E",
        },

        border: {
          DEFAULT: "#333344",
          light: "#262635",
        },

        success: {
          DEFAULT: "#2ECC71",
          light: "#22C55E",
        },

        danger: {
          DEFAULT: "#E84545",
          light: "#FC8181",
        },

        warning: {
          DEFAULT: "#F39C12",
          light: "#EAB308",
        },

        info: {
          DEFAULT: "#3B82F6",
          light: "#4D91FF",
        },

        /* ===========================
         * Accent
         * =========================== */
        accent: {
          purple: "#7C5CFC",
          violet: "#9B59B6",
          deepPurple: "#7E14FF",
          pink: "#E91E8C",
          magenta: "#EC4899",
          orange: "#F97316",
          teal: "#1FD1A8",
          emerald: "#1ABC9C",
        },

        black: "#000000",
        white: "#FFFFFF",
      },

      borderRadius: {
        xs: "6px",
        sm: "8px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        
        full: "9999px",
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.25)",
        modal: "0 10px 40px rgba(0,0,0,0.35)",
        button: "0 4px 14px rgba(245,197,24,0.25)",
      },
    },
  },
  plugins: [],
};
