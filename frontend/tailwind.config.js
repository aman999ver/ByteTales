/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6', // Tech blue
          purple: '#8B5CF6', // Creative purple
          green: '#10B981', // Success green
          yellow: '#FBBF24', // Accent yellow
          dark: '#1F2937', // Text dark
          light: '#F3F4F6', // Background light
        },
        ui: {
          card: '#FFFFFF',
          border: '#E5E7EB',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional font
        mono: ['JetBrains Mono', 'monospace'], // Code font
      }
    },
  },
  plugins: [],
}
