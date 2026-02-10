/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			'5xl': '2.5rem',
  			'6xl': '3rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			playful: {
  				red: '#FF3C3C',
  				yellow: '#FFE600',
  				blue: '#3282FF',
  				indigo: '#6366F1'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			}
  		},
  		keyframes: {
  			wobble: {
  				'0%, 100%': { transform: 'rotate(-1deg) scaleY(1)' },
  				'50%': { transform: 'rotate(1deg) scaleY(1.02)' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-15px)' }
  			}
  		},
  		animation: {
  			wobble: 'wobble 3s ease-in-out infinite',
  			float: 'float 4s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}