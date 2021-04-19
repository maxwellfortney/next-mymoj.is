import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ValidEmojis } from "../constants/emojiData";
import Emoji from "../components/Emoji/Emoji";

export default function Home() {
    const [currentMyMoji, setCurrentMyMoji] = useState<string[]>();

    function getRandomEmojis(numEmojis: number) {
        const tempArr: string[] = [];
        for (let i = 0; i < numEmojis; i++) {
            tempArr.push(
                ValidEmojis.map((item) => {
                    return item.symbol;
                })[Math.floor(Math.random() * ValidEmojis.length)]
            );
        }

        setCurrentMyMoji(tempArr);
    }

    useEffect(() => {
        getRandomEmojis(3);
    }, []);

    return (
        <div
            className={`flex flex-col items-center justify-start w-11/12 ${styles["Home"]}`}
        >
            <div
                className={`absolute top-0 right-0 w-3/5 h-screen bg-black`}
            ></div>
            <div className="absolute flex flex-col items-center w-full bottom-2">
                <div className="flex self-end w-3/4 overflow-x-hidden whitespace-nowrap">
                    <p style={{ fontSize: "30rem", zIndex: 1 }}>
                        {currentMyMoji?.map((emoji) => {
                            return <Emoji symbol={emoji} />;
                        })}
                    </p>
                </div>
                <div className="flex items-center justify-between w-full px-5">
                    <img
                        className="h-16 text-black fill-current"
                        src="/Logos/Discord.svg"
                    />
                    <svg
                        onClick={() =>
                            window.scrollTo(
                                0,
                                (document?.querySelector(
                                    "#CustomizePage"
                                ) as HTMLElement).offsetTop - 20
                            )
                        }
                        className="self-end w-12 h-12 cursor-pointer text-emojiAtYellow animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                    <img
                        onClick={() => getRandomEmojis(3)}
                        className="h-8 text-emojiAtYellow"
                        src="/Icons/shuffle.svg"
                    />
                </div>
            </div>
            <div
                className={`flex flex-col items-center justify-start w-full ${styles["main-container"]}`}
            >
                <h1 className="self-start w-3/4 mt-16 font-black mix-blend-difference text-emojiAtYellow text-8xl">
                    We believe in a decentralized and open future.
                </h1>
                <p className="self-start w-1/3 mt-4 text-xl font-normal text-left mix-blend-difference text-emojiAtYellow">
                    Where you truly own what you pay for, and can use and share
                    it however you please.
                </p>
            </div>
            <div className="flex w-screen h-screen bg-red-500">a</div>
        </div>
    );
}
