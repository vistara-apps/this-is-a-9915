/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(210, 30%, 95%)',
        'accent': 'hsl(130, 70%, 50%)',
        'primary': 'hsl(210, 70%, 50%)',
        'surface': 'hsl(210, 30%, 100%)',
        'text-primary': 'hsl(210, 30%, 10%)',
        'text-secondary': 'hsl(210, 30%, 40%)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 10px hsla(0, 0%, 0%, 0.05)',
        'modal': '0 12px 36px hsla(0, 0%, 0%, 0.1)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'xxl': '24px',
      },
    },
  },
  plugins: [],
}