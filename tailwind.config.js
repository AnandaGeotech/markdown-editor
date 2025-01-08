/* eslint-disable global-require */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))',
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))',
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))',
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))',
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				1: 'hsl(var(--chart-1))',
  				2: 'hsl(var(--chart-2))',
  				3: 'hsl(var(--chart-3))',
  				4: 'hsl(var(--chart-4))',
  				5: 'hsl(var(--chart-5))',
  			},
			  custom: {
          primary: '#e16841',
          dark1: '#2c2d31',
          dark2: '#35383f',
          dark4: '#6f7075',
          light1: '#f2f3f7',
          light2: '#feffff',
		  dark3: '#1e1f23',
          text1: '#7a7d82',
          text3: '#c8c9ce',
          text2: '#c0c1c6',
			  },
  		},
  	},
  },
  plugins: [require('tailwindcss-animate')],
};
