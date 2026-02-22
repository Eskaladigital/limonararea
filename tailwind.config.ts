import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Estrategia responsive: Mobile+Tablet (default) vs Desktop (1024px+)
    screens: {
      'sm': '640px',   // Mobile grande
      'md': '768px',   // Tablet
      'lg': '1024px',  // BREAKPOINT PRINCIPAL: Desktop
      'xl': '1280px',  // Desktop grande
      '2xl': '1536px', // Desktop muy grande
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        heading: ["var(--font-lora)", "Georgia", "serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
        nunito: ["var(--font-nunito)", "system-ui", "sans-serif"],
        lora: ["var(--font-lora)", "Georgia", "serif"],
        // Legacy
        rubik: ["var(--font-nunito)", "system-ui", "sans-serif"],
        amiko: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ============================================
        // PALETA ECO AREA LIMONAR - Mar Menor
        // Azul mediterráneo + Amarillo sol + Arena blanca
        // ============================================

        // Azul mediterráneo (principal) — mapea a "earth" para compatibilidad
        earth: { DEFAULT: "#0C6E9C", deep: "#064A6E", mid: "#1A8AB8" },
        // Amarillo sol (CTA / acento) — mapea a "clay" para compatibilidad
        clay: { DEFAULT: "#F5A623", dk: "#D4900E", lt: "#FFD166" },
        // Arena clara (fondos suaves)
        sand: { DEFAULT: "#F5EFE6", lt: "#FAF7F2", warm: "#EDE4D6" },
        // Blanco cálido (fondo base)
        cream: "#FDFCFA",
        // Verde eco (secundario)
        olive: { DEFAULT: "#2D9B4E", lt: "#5BBF6E", mist: "#E0F2E5" },
        // Turquesa mar
        turquesa: { DEFAULT: "#17B5AD", lt: "#5CD6CE", dk: "#0F8A84" },
        // Dorado atardecer
        gold: { DEFAULT: "#E8B531", soft: "#F5D36E" },

        // Paleta Eco Area Limonar (aliases)
        "limonar-blue": "#064A6E",
        "limonar-blue-dark": "#043752",
        "limonar-blue-light": "#0C6E9C",
        "limonar-orange": "#F5A623",
        "limonar-orange-dark": "#D4900E",
        "limonar-orange-bright": "#FFD166",
        "limonar-green": "#2D9B4E",
        "limonar-yellow": "#E8B531",
        limonar: {
          blue: {
            DEFAULT: "#064A6E",
            dark: "#043752",
            light: "#0C6E9C",
            50: "#EBF7FC",
            100: "#D1EEF8",
            200: "#A3DDF1",
            300: "#5CBFE2",
            400: "#1A8AB8",
            500: "#064A6E",
            600: "#043752",
            700: "#032A3E",
            800: "#021C2A",
            900: "#010E15",
          },
          orange: {
            DEFAULT: "#F5A623",
            dark: "#D4900E",
            light: "#FFD166",
            bright: "#FFD166",
            50: "#FFF9EB",
            100: "#FFF0CC",
            500: "#F5A623",
            600: "#D4900E",
          },
          gray: {
            50: "#FDFCFA",
            100: "#FAF7F2",
            200: "#F5EFE6",
            300: "#E0D6C8",
            400: "#A8A098",
            500: "#6E6860",
            600: "#4A4540",
            700: "#2E2A27",
            800: "#1E1B19",
            900: "#0F0E0D",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.6" },
          "50%": { transform: "translateY(-10px) translateX(5px)", opacity: "0.4" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
