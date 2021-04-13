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
                shake: {
                    "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
                    "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
                    "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
                    "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
                    "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
                    "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
                    "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
                    "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
                    "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
                    "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
                    "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.5s ease-out",
                "scale-up": "scale-up .25s ease-in-out",
                shake: "shake .5s infinite",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
