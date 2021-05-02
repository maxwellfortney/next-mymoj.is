import Head from "next/head";
import { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { templateProps } from "../../constants/emojiAtMetadata";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "../../styles/templates/Template1.module.css";
import ExampleCard from "../Home/OnePlace/ExampleCard";
import PaymentCard from "./PaymentCard";

const Template1 = ({
    emojiString,
    metaImage,
    headline,
    bio,
    linkData,
    walletData,
}: templateProps) => {
    const [copied, setCopied] = useState(false);
    const [walletIndex, setWalletIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState("left");

    function handleGoPrev() {
        const card = document.querySelector(
            ".fadeAndSlide-left-enter-done"
        ) as HTMLElement;
        if (card) {
            card.classList.replace(
                "fadeAndSlide-left-enter-done",
                "fadeAndSlide-right-enter-done"
            );
        }
        setAnimationDirection("right");
        setTimeout(() => {
            if (walletData) {
                if (walletIndex === 0) {
                    setWalletIndex(walletData.length - 1);
                } else {
                    setWalletIndex(walletIndex - 1);
                }
            }
        }, 10);
    }

    function handleGoNext() {
        const card = document.querySelector(
            ".fadeAndSlide-right-enter-done"
        ) as HTMLElement;
        if (card) {
            card.classList.replace(
                "fadeAndSlide-right-enter-done",
                "fadeAndSlide-left-enter-done"
            );
        }
        setAnimationDirection("left");
        setTimeout(() => {
            if (walletData) {
                if (walletIndex === walletData.length - 1) {
                    setWalletIndex(0);
                } else {
                    setWalletIndex(walletIndex + 1);
                }
            }
        }, 10);
    }

    useEffect(() => {
        if (copied)
            [
                setTimeout(() => {
                    setCopied(false);
                }, 1500),
            ];
    }, [copied]);

    return (
        <>
            <Head>
                <title>
                    {emojiString} | {headline}
                </title>
                {bio ? <meta name="description" content={bio} /> : null}

                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={`${emojiString} | ${headline}`}
                    key="title"
                />
                <meta property="og:image" content={metaImage} />
                <meta
                    property="og:url"
                    content={`https://emoji.at/${emojiString}`}
                />
                {bio ? <meta property="og:description" content={bio} /> : null}

                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:title"
                    content={`${emojiString} | ${headline}`}
                />
                <meta property="twitter:image" content={metaImage} />
                <meta
                    property="twitter:url"
                    content={`https://emoji.at/${emojiString}`}
                />
                {bio ? (
                    <meta property="twitter:description" content={bio} />
                ) : null}
            </Head>
            <div className="flex items-center justify-center w-full h-screen bg-white">
                <div className="flex flex-col w-11/12 h-full md:flex-row animate-fade-in-up">
                    <div className="flex flex-col items-start justify-between w-full pb-2 md:w-1/2 md:py-14">
                        <div className="flex flex-col">
                            <h1 className="mt-10 mb-5 mr-12 font-black md:mb-10 text-7xl md:mt-14">
                                {emojiString}
                            </h1>
                            <h2
                                className={`pb-4 mr-12 font-black text-6xl sm:text-7xl 2xl:text-8xl ${styles["headline"]}`}
                            >
                                {headline}
                            </h2>
                            {bio && (
                                <p className="mt-5 mr-12 text-2xl md:text-3xl ">
                                    {bio}
                                </p>
                            )}
                        </div>
                        <a href="/">
                            <img
                                src="/Logos/Emoji@.svg"
                                className={`hidden md:flex ${styles["emojiAtLogo"]} transition-opacity hover:opacity-60`}
                            />
                        </a>
                    </div>
                    <div className="flex flex-col items-center justify-around flex-auto w-full py-5 md:w-1/2 md:py-14">
                        {linkData && walletData ? (
                            <>
                                <div className="flex flex-col items-start justify-center w-full lg:w-10/12 md:h-1/2">
                                    {linkData.map((link, i) => {
                                        return (
                                            <div className="flex items-center transition-opacity hover:opacity-60">
                                                {link.icon ? (
                                                    <img
                                                        className="mr-8"
                                                        src={link.icon}
                                                        style={{
                                                            height: "56px",
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: "80px",
                                                        }}
                                                    />
                                                )}
                                                <a
                                                    className={`flex flex-col ${
                                                        i !== 0 &&
                                                        i !==
                                                            linkData.length - 1
                                                            ? "md:my-4 my-1"
                                                            : ""
                                                    }`}
                                                    href={link.url}
                                                >
                                                    <h2 className="text-3xl font-extrabold sm:text-4xl">
                                                        {link.title}
                                                    </h2>
                                                    {link.description && (
                                                        <h3 className="text-2xl font-extrabold">
                                                            {link.description}
                                                        </h3>
                                                    )}
                                                    <h3 className="ml-4">
                                                        {
                                                            new URL(link.url)
                                                                .hostname
                                                        }
                                                    </h3>
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="relative flex items-center justify-between w-full my-6 md:my-0 md:h-1/2">
                                    <div className="absolute flex top-1 left-1">
                                        <CopyToClipboard
                                            text={
                                                walletData[walletIndex].address
                                            }
                                            onCopy={() => setCopied(true)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 transition-opacity cursor-pointer hover:opacity-60"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                        </CopyToClipboard>
                                        <CSSTransition
                                            in={copied}
                                            timeout={400}
                                            classNames="fade"
                                            unmountOnExit
                                        >
                                            <p className="ml-1">Copied</p>
                                        </CSSTransition>
                                    </div>
                                    <svg
                                        onClick={handleGoPrev}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-none w-6 h-6 transition-opacity cursor-pointer hover:opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>

                                    <SwitchTransition mode="out-in">
                                        <CSSTransition
                                            key={walletIndex}
                                            classNames={`fadeAndSlide-${animationDirection}`}
                                            timeout={200}
                                        >
                                            <div className="flex items-center justify-center w-9/12 mt-14 md:mt-0">
                                                <PaymentCard
                                                    emojiString={emojiString}
                                                    title={
                                                        walletData[walletIndex]
                                                            .title
                                                    }
                                                    address={
                                                        walletData[walletIndex]
                                                            .address
                                                    }
                                                />
                                            </div>
                                        </CSSTransition>
                                    </SwitchTransition>

                                    <svg
                                        onClick={handleGoNext}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-none w-6 h-6 transition-opacity cursor-pointer hover:opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                                <a href="/" className="self-start">
                                    <img
                                        src="/Logos/Emoji@.svg"
                                        className={`flex self-start md:hidden transition-opacity hover:opacity-60 mt-10`}
                                        style={{ height: "60px" }}
                                    />
                                </a>
                            </>
                        ) : null}
                        {linkData && !walletData ? (
                            <>
                                <div className="h-1/2"></div>
                                <div className="h-1/2"></div>
                            </>
                        ) : null}
                        {!linkData && walletData ? (
                            <>
                                <div className="h-1/2"></div>
                                <div className="h-1/2"></div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Template1;
