import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ValidEmojis } from "../constants/emojiData";
import Emoji from "../components/Emoji/Emoji";
import OnePlace from "../components/Home/OnePlace/OnePlace";
import Head from "next/head";

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
        <>
            <Head>
                <title>Emoji.at - Home</title>
                <meta
                    property="og:title"
                    content="Emoji.at - Home"
                    key="title"
                />
            </Head>
            <div
                className={`flex flex-col items-center justify-start w-full ${styles["Home"]}`}
            >
                <div
                    className={`absolute top-0 right-0 w-3/5 h-screen bg-black`}
                    // style={{ minHeight: "900px" }}
                ></div>

                <div
                    className={`flex flex-col items-center justify-between w-full ${styles["main-container"]}`}
                >
                    <div className="flex flex-col items-center justify-start w-11/12 mt-0 md:mt-12">
                        <h1 className="self-start w-full text-5xl font-black md:text-6xl md:w-11/12 lg:w-3/4 mix-blend-difference text-emojiAtYellow lg:text-7xl 2xl:text-8xl">
                            We believe in a decentralized and open future.
                        </h1>
                        <p
                            className={`self-start pr-5 mt-5 text-xl font-normal text-left lg:text-2xl mix-blend-difference text-emojiAtYellow ${styles["sub-title"]}`}
                        >
                            Where you truly own what you pay for, and can use
                            and share it however you please.
                        </p>
                    </div>

                    <div
                        className="flex flex-col justify-end flex-auto w-full h-full"
                        style={{ minHeight: "175px" }}
                    >
                        <div
                            className="flex items-center self-end flex-auto"
                            style={{ width: "95.83333%", minHeight: "100px" }}
                        >
                            <div className="flex flex-col justify-end flex-auto mr-5 h-1/2">
                                <a
                                    href="/create"
                                    className={`mr-auto flex items-center text-5xl ${styles["create-button"]} mix-blend-difference border-b-4 text-emojiAtYellow border-emojiAtYellow`}
                                >
                                    <p>Create</p>
                                    <p className="ml-1 text-6xl transition-all">{`>`}</p>
                                </a>
                            </div>
                            <div className="flex items-center w-3/4 h-full overflow-x-hidden">
                                <img
                                    src="/Icons/emoji_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/@_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/emoji_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/@_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/emoji_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/@_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/emoji_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/@_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/emoji_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                                <img
                                    src="/Icons/@_yellow.svg"
                                    className="mr-10 mix-blend-difference h-5/6"
                                />
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between w-full px-5"
                            style={{ zIndex: 1 }}
                        >
                            <div className="flex-1">
                                <a
                                    href="https://discord.com"
                                    className="transition-opacity hover:opacity-80"
                                >
                                    <img
                                        className="h-16 text-black fill-current"
                                        src="/Logos/Discord.svg"
                                    />
                                </a>
                            </div>

                            <svg
                                onClick={() =>
                                    window.scrollTo(
                                        0,
                                        (document?.querySelector(
                                            "#OnePlace"
                                        ) as HTMLElement).offsetTop
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
                            <div className="flex-1">
                                <div
                                    className={`${styles["psuedo-element"]}`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <OnePlace />
        </>
    );
}
