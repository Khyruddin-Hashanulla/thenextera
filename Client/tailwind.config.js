/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-cyan': '#00d4ff',
        'space-purple': '#8b5cf6',
        'space-blue': '#3b82f6',
        'space-pink': '#ec4899',
        'space-indigo': '#6366f1',
        'space-emerald': '#10b981',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      addUtilities({
        '.glass-card': {
          'background': 'rgba(255, 255, 255, 0.08)',
          'backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.15)',
          'border-radius': '16px',
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        },
        '.glass-card-enhanced': {
          'background': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          'backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '20px',
          'box-shadow': '0 12px 40px 0 rgba(31, 38, 135, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(139, 92, 246, 0.1)',
        },
        '.gradient-border': {
          'position': 'relative',
          '&::before': {
            'content': '""',
            'position': 'absolute',
            'inset': '0',
            'padding': '1px',
            'background': 'linear-gradient(135deg, #00d4ff, #8b5cf6, #ec4899)',
            'border-radius': 'inherit',
            'mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            'mask-composite': 'exclude',
          }
        },
        '.shimmer-effect': {
          'position': 'relative',
          'overflow': 'hidden',
          '&::after': {
            'content': '""',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            'transform': 'translateX(-100%)',
            'animation': 'shimmer 3s infinite',
          }
        }
      })
    }
  ],
}
