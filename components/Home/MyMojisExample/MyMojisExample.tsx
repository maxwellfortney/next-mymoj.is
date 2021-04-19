import React, { useEffect, useState } from "react";
import SingleMoji from "./SingleMoji";
// import ShuffleIcon from "../../../public/Icons/shuffle.png";
import Image from "next/image";

import styles from "../../../styles/MyMojisExample.module.css";

import { ValidEmojis } from "../../../constants/emojiData";

const MyMojisExample = () => {
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
            <div
                className={`flex items-center justify-between w-3/4 mt-12 ${styles["container"]} animate-fade-in-up`}
            >
                <div className="flex-1 invisible" />
                <div className={`grid flex-none gap-4 ${styles["main"]}`}>
                    {currentMyMoji && currentMyMoji?.length > 0
                        ? currentMyMoji?.map((emoji, i) => {
                              return (
                                  <SingleMoji key={i} symbol={emoji} i={i} />
                              );
                          })
                        : null}
                </div>
                <div className="flex-1">
                    <img
                        onClick={() => getRandomEmojis(3)}
                        className="h-8 ml-2 transition-opacity cursor-pointer lg:ml-12 hover:opacity-70"
                        src="/Icons/shuffle.svg"
                    />
                </div>
            </div>
            <svg
                onClick={() =>
                    window.scrollTo(
                        0,
                        (document?.querySelector(
                            "#CustomizePage"
                        ) as HTMLElement).offsetTop - 20
                    )
                }
                className="w-12 h-12 text-black cursor-pointer animate-bounce"
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
        </>
    );
};

export default MyMojisExample;
