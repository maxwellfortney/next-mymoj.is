import Head from "next/head";
import { templateProps } from "../../constants/emojiAtMetadata";
import styles from "../../styles/templates/Template1.module.css";
import ExampleCard from "../Home/OnePlace/ExampleCard";

const Template1 = ({
    emojiString,
    headline,
    bio,
    linkData,
    walletData,
}: templateProps) => {
    return (
        <>
            <Head>
                <title>
                    {emojiString} | {headline}
                </title>

                <meta
                    property="og:title"
                    content={`${emojiString} | ${headline}`}
                    key="title"
                />
            </Head>
            <div className="flex items-center justify-center w-full h-screen bg-white">
                <div className="flex flex-col w-11/12 h-full md:flex-row">
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
                                <p className="mt-5 mr-12 text-3xl">{bio}</p>
                            )}
                        </div>
                        <a href="/">
                            <img
                                src="/Logos/Emoji@.svg"
                                className={`hidden md:flex ${styles["emojiAtLogo"]} transition-opacity hover:opacity-60`}
                            />
                        </a>
                    </div>
                    <div className="flex flex-col items-center w-full py-2 md:w-1/2 md:py-14">
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
                                <div className="flex items-center justify-between w-full md:h-1/2">
                                    <svg
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
                                    <div className="items-center justify-center w-9/12 mt-14 md:mt-0">
                                        <ExampleCard />
                                    </div>
                                    <svg
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
