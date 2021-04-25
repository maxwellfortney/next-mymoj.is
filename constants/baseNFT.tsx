import { useEffect } from "react";

interface BaseNFTProps {
    emojiArr: any;
    gradientType: string;
    gradientStop1: string;
    gradientStop2: string;
    gradientSpeed: number;
    gradientAngle: number;
}

const BaseNFT = ({
    emojiArr,
    gradientType,
    gradientStop1,
    gradientStop2,
    gradientSpeed,
    gradientAngle,
}: BaseNFTProps) => {
    function containerInlineMod() {
        switch (emojiArr.length) {
            case 1:
                return { width: "50%", radius: "20" };
            case 2:
                return { width: "75%", radius: "30" };
            default:
                return { width: "95%", radius: "40" };
        }
    }

    function containerMod() {
        switch (emojiArr.length) {
            case 1:
                return { heightMod: 0.5, xMod: -0.25 };
            case 2:
                return { heightMod: 0.8, xMod: -0.125 };
            default:
                return { heightMod: 1.25, xMod: -0.025 };
        }
    }

    function textMod() {
        switch (emojiArr.length) {
            case 1:
                return { widthMod: 2.5, xMod: 0.75 };
            case 2:
                return { widthMod: 1.5, xMod: 0.25 };
            default:
                return { widthMod: 1.15, xMod: 0.075 };
        }
    }

    useEffect(() => {
        console.log("HEHRHHE");
        const svg = document.querySelector(
            "#emojiStringContainer"
        ) as SVGGraphicsElement;
        const whiteContainer = document.querySelector(
            "#whiteContainer"
        ) as SVGGraphicsElement;

        console.log(svg);

        if (svg) {
            const text = svg.querySelector("text");
            console.log(text);

            if (text) {
                const bbox = text.getBBox();
                console.log(bbox);

                if (whiteContainer) {
                    whiteContainer.setAttribute(
                        "viewBox",
                        [
                            bbox.width * containerMod().xMod,
                            0,
                            bbox.width,
                            bbox.height * containerMod().heightMod,
                        ].join(" ")
                    );

                    svg.setAttribute(
                        "viewBox",
                        [
                            bbox.x - bbox.width * textMod().xMod,
                            bbox.y,
                            bbox.width * textMod().widthMod,
                            bbox.height,
                        ].join(" ")
                    );

                    console.log(
                        "whiteContainer BBox: ",
                        whiteContainer.getBBox()
                    );
                    console.log("emojiStringContainer BBox: ", svg.getBBox());
                }
            }
        }
    }, []);

    return (
        <svg
            id="CustomNFTSVG"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            width="100%"
            height="100%"
        >
            <defs>
                <radialGradient id="radialGradient">
                    <stop offset="0%" stopColor={gradientStop1}>
                        <animate
                            attributeName="stop-color"
                            // values="#7A5FFF; #01FF89; #7A5FFF"
                            values={`${gradientStop1};${gradientStop2};${gradientStop1}`}
                            dur={`${gradientSpeed}s`}
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop offset="100%" stopColor={gradientStop2}>
                        <animate
                            attributeName="stop-color"
                            // values="#01FF89; #7A5FFF; #01FF89"
                            values={`${gradientStop2};${gradientStop1};${gradientStop2}`}
                            dur={`${gradientSpeed}s`}
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                </radialGradient>

                <linearGradient
                    id="linearGradient"
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    gradientTransform={`rotate(${gradientAngle})`}
                >
                    <stop offset="0%" stopColor={gradientStop1}>
                        <animate
                            attributeName="stop-color"
                            // values="#7A5FFF; #01FF89; #7A5FFF"
                            values={`${gradientStop1};${gradientStop2};${gradientStop1}`}
                            dur={`${gradientSpeed}s`}
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop offset="100%" stopColor={gradientStop2}>
                        <animate
                            attributeName="stop-color"
                            // values="#01FF89; #7A5FFF; #01FF89"
                            values={`${gradientStop2};${gradientStop1};${gradientStop2}`}
                            dur={`${gradientSpeed}s`}
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                </linearGradient>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill={`url(#${
                    gradientType === "linear"
                        ? "linearGradient"
                        : "radialGradient"
                })`}
            />

            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="whiteContainer"
                width="100%"
                height="100%"
                x="0"
                // style={{
                //     filter:
                //         "drop-shadow(0.5rem 1rem 1rem rgba(50, 50, 93, 0.45))",
                // }}
                filter="drop-shadow(0.5rem 1rem 1rem rgba(50, 50, 93, 0.45))"
            >
                <rect
                    width={containerInlineMod().width}
                    height="100%"
                    fill="white"
                    rx={containerInlineMod().radius}
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="emojiStringContainer"
                width="100%"
                height="100%"
            >
                <text
                    id="emojiString"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    style={{
                        fontSize: "100px",
                    }}
                >
                    {`${emojiArr
                        .map((emoji: any) => {
                            return emoji.symbol;
                        })
                        .join("")}`}
                </text>
            </svg>
        </svg>
    );
};

export default BaseNFT;
