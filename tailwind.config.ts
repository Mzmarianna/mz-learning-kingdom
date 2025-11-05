
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        'kingdom-background-start': '#0b1020', // Deep space blue
        'kingdom-background-end': '#1A2942',   // Richer, darker blue
        'kingdom-primary': '#4f46e5',        // A vibrant, magical indigo
        'kingdom-accent-gold': '#facc15',      // Glowing gold for highlights
        'kingdom-accent-teal': '#14b8a6',      // Mystical teal
        'kingdom-accent-purple': '#8b5cf6',     // Enchanted purple
        'kingdom-foreground': '#e2e8f0',      // Soft, starry white for text
        'kingdom-muted': '#64748b',          // Muted stone gray
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-medieval-sharp)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
       boxShadow: {
        'glow-gold': '0 0 15px 5px rgba(250, 204, 21, 0.4)',
        'glow-teal': '0 0 15px 5px rgba(20, 184, 166, 0.4)',
        'glow-purple': '0 0 15px 5px rgba(139, 92, 246, 0.4)',
      }
    },
  },
  plugins: [],
}
export default config
