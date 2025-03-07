import type { Config } from "tailwindcss"

export const themeConfig = {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#FF6B00",
        foreground: "#000000",
      },
    },
  },
} satisfies Config["theme"]

