module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["Epilogue"],
            },
            colors: {
                mymojisBg: "#F8FAFD",
                mymojisDarkText: "#1D2024",
                mymojisBlueText: "#003d71",
            },
            keyframes: {
                "fade-in-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "scale-up": {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.5s ease-out",
                "scale-up": "scale-up .25s ease-in-out",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
