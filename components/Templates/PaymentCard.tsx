import { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from "../../styles/ExampleCard.module.css";

const cardExamples = [
    {
        cardBGClass: "ethCard",
        cardTitle: "Ethereum",
        cardLogo: "/Logos/eth-diamond.svg",
        address: "0xee61C516C9E4468E6F2C4Eb53b8520aDb68c0634",
        gradient: "linear-gradient(315deg, #3fe0f1, #14044d)",
    },
    {
        cardBGClass: "cashappCard",
        cardTitle: "Cash App",
        cardLogo: "/Logos/cash-app.svg",
        address: "$MaxwellFortney",
        gradient: "linear-gradient(315deg, #00d632, #008a20)",
    },
];

interface PaymentCardProps {
    emojiString: string;
    title: string;
    address: string;
}

const PaymentCard = ({ emojiString, title, address }: PaymentCardProps) => {
    const [cardIndex, setCardIndex] = useState(0);
    const [cardX, setCardX] = useState(0);
    const [cardY, setCardY] = useState(0);
    const [shadowX, setShadowX] = useState(0);
    const [shadowY, setShadowY] = useState(0);
    const [textShadowX, setTextShadowX] = useState(0);
    const [textShadowY, setTextShadowY] = useState(0);

    let cardBGClass = "";
    let cardLogo = null;
    let gradient = "";

    if (title === "CashApp") {
        cardBGClass = "cashappCard";
        cardLogo = "/Logos/cash-app.svg";
        gradient = "linear-gradient(315deg, #00d632, #008a20)";
    } else if (title === "Ethereum") {
        cardBGClass = "ethCard";
        cardLogo = "/Logos/eth-diamond.svg";
        gradient = "linear-gradient(315deg, #3fe0f1, #14044d)";
    }

    function getTransformValue(v1: number, v2: number, value: number) {
        return ((v1 / v2) * value - value / 2) * 1;
    }

    function handleMouseMove(e: any) {
        const card = document.querySelector("#PaymentCard") as HTMLElement;
        const svgLogo = document.querySelector(".card_svg") as HTMLElement;
        const text = document.querySelectorAll(".card_text");
        let card_x = getTransformValue(e.clientX, window.innerWidth, 56);
        let card_y = getTransformValue(e.clientY, window.innerHeight, 56);
        let shadow_x = getTransformValue(e.clientX, window.innerWidth, 20);
        let shadow_y = getTransformValue(e.clientY, window.innerHeight, 20);
        let text_shadow_x = getTransformValue(e.clientX, window.innerWidth, 28);
        let text_shadow_y = getTransformValue(
            e.clientY,
            window.innerHeight,
            28
        );

        setCardX(card_x);
        setCardY(card_y);
        setShadowX(shadow_x);
        setShadowY(shadow_y);
        setTextShadowX(text_shadow_x);
        setTextShadowY(text_shadow_y);

        card.style.transform = `rotateX(${card_y}deg) rotateY(${card_x}deg)`;
        card.style.boxShadow = `${-card_x}px ${card_y}px 55px rgba(0, 0, 0, .35)`;
        if (svgLogo) {
            svgLogo.style.filter = `drop-shadow(${-shadow_x}px ${shadow_y}px 4px rgba(0, 0, 0, .4))`;
        }
        text.forEach((item) => {
            (item as HTMLElement).style.textShadow = `${-text_shadow_x}px ${text_shadow_y}px 6px rgba(0, 0, 0, .8)`;
        });
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            console.log(cardIndex);
            setCardIndex(
                cardIndex === cardExamples.length - 1 ? 0 : cardIndex + 1
            );
        }, 6000);
    }, [cardIndex]);

    return (
        <div
            id="PaymentCard"
            className={`relative m-auto flex w-full  ${styles["floating"]} ${
                styles[`${cardBGClass}`]
            }`}
            style={{
                aspectRatio: "16/9",
                boxShadow: `${-cardX}px ${cardY}px 55px rgba(255, 255, 255, .2)`,
            }}
        >
            <div className={`${styles["thickness"]}`}></div>
            <div className={`${styles["thickness"]}`}></div>
            <div className={`${styles["thickness"]}`}></div>

            {/* <SwitchTransition mode="out-in">
                <CSSTransition key={cardIndex} classNames="fade" timeout={200}>
                    
                </CSSTransition>
            </SwitchTransition> */}

            <div
                className={`relative flex flex-col w-full py-2 md:py-3.5 lg:py-5 card_body px-1.5 md:px-5 lg:px-7`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {cardLogo ? (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                        <img
                            className="h-3/4 card_svg"
                            // style={{ height: "300px" }}
                            src={cardLogo}
                            style={{
                                filter: `drop-shadow(${-shadowX}px ${shadowY}px 4px rgba(0, 0, 0, .4))`,
                            }}
                        />
                        <img
                            className="absolute bottom-2 right-2 h-1/5 opacity-60 card_svg"
                            // style={{ height: "300px" }}
                            src="/Logos/Emoji@.svg"
                        />
                    </div>
                ) : (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                        <img
                            className="absolute bottom-2 right-2 h-1/5 opacity-60 card_svg"
                            // style={{ height: "300px" }}
                            src="/Logos/Emoji@.svg"
                        />
                    </div>
                )}

                <p
                    className={`text-2xl md:text-3xl xl:text-4xl font-black text-white card_text`}
                    style={{
                        transform: "translateZ(10px)",
                        textShadow: `${-textShadowX}px ${textShadowY}px 6px rgba(0, 0, 0, .8)`,
                    }}
                >
                    {title}
                </p>
                <div className="flex flex-col justify-center flex-auto mt-5">
                    <p
                        className="px-3 py-3 overflow-hidden text-2xl font-black text-white whitespace-normal md:text-3xl xl:text-4xl overflow-ellipsis card_text"
                        style={{
                            transform: "translateZ(10px)",
                            textShadow: `${-textShadowX}px ${textShadowY}px 6px rgba(0, 0, 0, .8)`,
                        }}
                    >
                        {address}
                    </p>
                    <p
                        className="pl-3 text-4xl xl:text-5xl"
                        style={{
                            transform: "translateZ(10px)",
                            textShadow: `${-textShadowX}px ${textShadowY}px 6px rgba(0, 0, 0, .8)`,
                        }}
                    >
                        {emojiString}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCard;
