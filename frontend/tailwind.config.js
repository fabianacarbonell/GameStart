/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FBBF24', // Brighter yellow (yellow-400)
                secondary: '#1F2937',
                accent: '#F59E0B',
                neutral: '#111827',
                'base-100': '#000000', // Pure black for better contrast
            }
        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                gamestart: {
                    "primary": "#FBBF24",        // Brighter yellow
                    "secondary": "#374151",       // Gray-700
                    "accent": "#F59E0B",          // Amber-500
                    "neutral": "#1F2937",         // Gray-800
                    "base-100": "#000000",        // Pure black
                    "base-200": "#0F0F0F",        // Very dark gray
                    "base-300": "#1F1F1F",        // Dark gray
                    "info": "#3B82F6",            // Blue-500
                    "success": "#10B981",         // Green-500
                    "warning": "#F59E0B",         // Amber-500
                    "error": "#EF4444",           // Red-500
                },
            },
            "dark",
        ],
    },
}
