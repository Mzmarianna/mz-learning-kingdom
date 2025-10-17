
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kingdom-background-start': '#0b1020', // Deep space blue
        'kingdom-background-end': '#1A2942',   // Richer, darker blue
        'kingdom-primary': '#4f46e5',        // A vibrant, magical indigo
        'kingdom-accent-gold': '#facc15',      // Glowing gold for highlights
        'kingdom-accent-teal': '#14b8a6',      // Mystical teal
        'kingdom-accent-purple': '#8b5cf6',     // Enchanted purple
        'kingdom-foreground': '#e2e8f0',      // Soft, starry white for text
        'kingdom-muted': '#64748b',          // Muted stone gray
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
