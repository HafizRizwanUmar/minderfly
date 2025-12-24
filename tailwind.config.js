/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#bcd848',
                    hover: '#95ad36'
                },
                background: {
                    dark: '#050505',
                    light: '#0a0a0a'
                }
            },
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['Manrope', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
