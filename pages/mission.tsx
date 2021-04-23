import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Mission.module.css";

export default function Mission() {
    const [currentScroll, setCurrentScroll] = useState(0);
    const [slideHeight, setSlideHeight] = useState(0);

    function scrollToSlide(slideIndex: number) {
        const scrollContainer = document.querySelector(
            "#Mission-scroll_container"
        );

        console.log(
            (document?.querySelector(
                `#Mission-Slide${slideIndex}`
            ) as HTMLElement).offsetTop
        );

        console.log(scrollContainer?.clientHeight);
        console.log(slideIndex);

        scrollContainer?.scrollTo(
            0,
            scrollContainer?.clientHeight * slideIndex
        );
    }

    function handleScroll(e: any) {
        setCurrentScroll(e.target.scrollTop);
        setSlideHeight(e.target.clientHeight);
    }

    useEffect(() => {
        const scrollContainer = document.querySelector(
            "#Mission-scroll_container"
        );
        if (scrollContainer) {
            setCurrentScroll(scrollContainer.scrollTop);
            setSlideHeight(scrollContainer.clientHeight);
        }
    }, []);

    return (
        <div className="absolute top-0 w-full h-screen ">
            <div
                className="absolute flex flex-col text-emojiAtYellow top-1/2 left-3 mix-blend-difference"
                style={{ zIndex: 1 }}
            >
                <div
                    onClick={() => scrollToSlide(0)}
                    className={`cursor-pointer flex w-2.5 h-2.5 rounded-full mb-1 items-center justify-center border-2 border-emojiAtYellow ${
                        currentScroll >= 0 ? "bg-black" : "bg-emojiAtYellow"
                    }`}
                />
                <div
                    onClick={() => scrollToSlide(1)}
                    className={`cursor-pointer flex w-2.5 h-2.5 rounded-full mb-1 items-center justify-center border-2 border-emojiAtYellow ${
                        currentScroll >= slideHeight
                            ? "bg-black"
                            : "bg-emojiAtYellow"
                    }`}
                />
                <div
                    onClick={() => scrollToSlide(2)}
                    className={`cursor-pointer flex w-2.5 h-2.5 rounded-full mb-1 items-center justify-center border-2 border-emojiAtYellow ${
                        currentScroll >= slideHeight * 2
                            ? "bg-black"
                            : "bg-emojiAtYellow"
                    }`}
                />
                <div
                    onClick={() => scrollToSlide(3)}
                    className={`cursor-pointer flex w-2.5 h-2.5 rounded-full mb-1 items-center justify-center border-2 border-emojiAtYellow ${
                        currentScroll >= slideHeight * 3
                            ? "bg-black"
                            : "bg-emojiAtYellow"
                    }`}
                />
                <div
                    onClick={() => scrollToSlide(4)}
                    className={`cursor-pointer flex w-2.5 h-2.5 rounded-full items-center justify-center border-2 border-emojiAtYellow ${
                        currentScroll >= slideHeight * 4
                            ? "bg-black"
                            : "bg-emojiAtYellow"
                    }`}
                />
            </div>
            <div
                onScroll={handleScroll}
                id="Mission-scroll_container"
                className={`${styles["vertical-scroll-snap"]}`}
            >
                <section
                    id="Mission-Slide0"
                    className={`${styles["stacking-slide"]} bg-emojiAtYellow flex flex-col justify-end items-center`}
                >
                    <div
                        className="flex flex-col items-center justify-between animate-fade-in-up"
                        style={{ height: "calc(100vh - 115px)" }}
                    >
                        <div className="flex"></div>
                        <div className="flex flex-col items-center w-full">
                            <h2 className="w-11/12 text-5xl font-black text-left">
                                Bringing the power into your hands.
                            </h2>
                            <p className="w-3/4 mt-8 text-3xl font-normal text-left">
                                Emoji.at’s primary goal is to create a
                                completely decentralized service where user’s
                                have complete control to create their permanent,
                                persistant, and easily identifiable online
                                presence.
                            </p>
                        </div>

                        <div
                            onClick={() => scrollToSlide(1)}
                            className="flex flex-col items-center justify-center cursor-pointer animate-bounce hover:opacity-80"
                        >
                            <p className="font-black">Permanence</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 "
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
                        </div>
                    </div>
                </section>
                <section
                    id="Mission-Slide1"
                    className={`${styles["stacking-slide"]} bg-black flex flex-col justify-end items-center`}
                >
                    <div
                        className="flex flex-col items-center justify-between"
                        style={{ height: "calc(100vh - 115px)" }}
                    >
                        <svg
                            onClick={() => scrollToSlide(0)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 cursor-pointer animate-bounce text-emojiAtYellow"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                        <div className="flex flex-col items-center w-full">
                            <h2 className="w-11/12 text-5xl font-black text-right text-emojiAtYellow">
                                The permanent web through IPFS.
                            </h2>
                            <p className="w-3/4 mt-8 text-3xl font-normal text-left text-emojiAtYellow">
                                Emoji.at’s primary goal is to create a
                                completely decentralized service where user’s
                                have complete control to create their permanent,
                                persistant, and easily identifiable online
                                presence.
                            </p>
                        </div>

                        <div
                            onClick={() => scrollToSlide(2)}
                            className="flex flex-col items-center justify-center cursor-pointer animate-bounce hover:opacity-80 text-emojiAtYellow"
                        >
                            <p className="font-black">Persistance</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 "
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
                        </div>
                    </div>
                </section>
                <section
                    id="Mission-Slide2"
                    className={`${styles["stacking-slide"]} bg-emojiAtYellow flex flex-col justify-end items-center`}
                >
                    <div
                        className="flex flex-col items-center justify-between"
                        style={{ height: "calc(100vh - 115px)" }}
                    >
                        <div
                            onClick={() => scrollToSlide(1)}
                            className="flex flex-col items-center justify-center text-black cursor-pointer animate-bounce hover:opacity-80"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                            <p className="font-black">Permanence</p>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <h2 className="w-11/12 text-5xl font-black text-right text-black">
                                Persistent file storage through Filecoin.
                            </h2>
                            <p className="w-3/4 mt-8 text-3xl font-normal text-left text-black">
                                Emoji.at’s primary goal is to create a
                                completely decentralized service where user’s
                                have complete control to create their permanent,
                                persistant, and easily identifiable online
                                presence.
                            </p>
                        </div>

                        <div
                            onClick={() => scrollToSlide(3)}
                            className="flex flex-col items-center justify-center text-black cursor-pointer animate-bounce hover:opacity-80"
                        >
                            <p className="font-black">Persistance</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 "
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
                        </div>
                    </div>
                </section>
                <section
                    id="Mission-Slide3"
                    className={`${styles["stacking-slide"]} bg-black`}
                >
                    <h2>Section 3</h2>
                </section>
                <section
                    id="Mission-Slide4"
                    className={`${styles["stacking-slide"]} bg-emojiAtYellow`}
                >
                    <h2>Section 4</h2>
                </section>
            </div>
        </div>
    );
}
