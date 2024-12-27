import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#40E0D0",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF6B6B",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#4169E1",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F0F0F0",
          foreground: "#666666",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        "typing": {
          "0%": { width: "0" },
          "20%, 25%": { width: "100%" },
          "45%, 50%": { width: "0" },
          "70%, 75%": { width: "100%" },
          "95%, 100%": { width: "0" }
        },
        "blink": {
          "50%": {
            borderColor: "transparent"
          },
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "scroll": "scroll 25s linear infinite",
        "typing": "typing 8s steps(20) infinite",
        "cursor": "blink 1s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;