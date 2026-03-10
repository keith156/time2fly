/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    300: '#8080ff',
                    400: '#4d4dff',
                    500: '#1a1aff',
                    600: '#0000ff',
                    700: '#0000e6',
                    800: '#0000cc',
                    900: '#0000b3',
                },
                navy: {
                    500: '#0000ff',
                    600: '#0000cc',
                    700: '#000099',
                    800: '#000066',
                    900: '#000033',
                }
            }
        }
    },
    plugins: [],
}
