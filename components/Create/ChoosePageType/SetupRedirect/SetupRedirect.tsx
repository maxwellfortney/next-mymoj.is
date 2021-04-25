import { useContext, useEffect, useState } from "react";
import { EmojiContext } from "../../../../pages/create";
import Emoji from "../../../Emoji/Emoji";
import metascraper from "metascraper";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

import { DebounceInput } from "react-debounce-input";
import styles from "../../../../styles/Claim.module.css";
import { createPageData } from "../../../../constants/emojiAtMetadata";
import fleekStorage from "@fleekhq/fleek-storage-js";

const SetupRedirect = () => {
    const [isLoadingURL, setIsLoadingURL] = useState(false);
    const [isValidURL, setIsValidURL] = useState(false);
    const [currentMetadata, setCurrentMetadata] = useState<any>(null);

    const {
        inputEmojiArr,
        chosenPageType,
        setChosenPageType,
        redirectURL,
        setRedirectURL,
    } = useContext(EmojiContext);

    const emojiString = `${inputEmojiArr
        .map((emoji: any) => {
            return emoji.symbol;
        })
        .join("")}`;

    function handleChange(e: any) {
        setRedirectURL(e.target.value);
    }

    useEffect(() => {
        if (isURL(redirectURL)) {
            setIsValidURL(true);
            setIsLoadingURL(true);
            loadURLMetadata();
        } else {
            setIsValidURL(false);
        }
    }, [redirectURL]);

    function isURL(url: string) {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(`https://${url}`)) {
            return true;
        } else {
            return false;
        }
    }

    async function loadURLMetadata() {
        const data = await fetch(
            `http://localhost:5001/api/urlMetadata?url=https://${redirectURL}`
        ).then((res) => res.json());

        if (data !== false && data) {
            setCurrentMetadata(data);
        } else {
            setCurrentMetadata(null);
        }

        console.log(data);
        setIsLoadingURL(false);
    }

    async function savePageData() {
        const jsonData = createPageData("redirect", `https://${redirectURL}`);
        console.log(jsonData);
        const pageDataBlob = new Blob([JSON.stringify(jsonData)], {
            type: "application/json",
        });
        const uploadedPageData = await fleekStorage.upload({
            apiKey: process.env.FLEEK_STORAGE_KEY as string,
            apiSecret: process.env.FLEEK_STORAGE_SECRET as string,
            key: `${emojiString}/pageData.json`,
            data: pageDataBlob,
        });
        console.log(uploadedPageData);
    }

    async function goToCheckout() {
        await savePageData();
    }

    return (
        <div
            className="absolute left-0 flex flex-col items-center justify-center w-full bg-emojiAtYellow"
            style={{
                height: "calc(100vh - 115px)",
                maxHeight: "calc(100vh - 115px)",
            }}
        >
            <svg
                onClick={() => setChosenPageType("")}
                className="absolute w-8 h-8 text-black transition-opacity cursor-pointer right-1 sm:right-4 md:right-10 top-1 hover:opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-black text-black sm:text-3xl md:text-4xl">
                    Redirect to any URL
                </h1>
                <p className="text-xs font-medium text-center text-black md:text-sm">
                    Your page will directly browse to your requested redirect
                    URL
                </p>
            </div>
            <div className="flex items-center w-11/12 h-full">
                <div className="flex flex-col items-start justify-start w-1/2 p-10 h-1/2">
                    <h1 className="text-5xl font-black">
                        Enter the URL you would like emoji.at/
                        <span>{emojiString}</span> to redirect to.
                    </h1>
                    <div className="flex items-center mt-12 mr-auto text-4xl font-black">
                        <p className="">https://</p>
                        {/* <input
                            value={redirectURL}
                            onChange={handleChange}
                            className={`ml-1 border-b-2 border-black leading-normal bg-emojiAtYellow outline-none ${styles["redirect-input"]}`}
                            placeholder="example.com"
                        /> */}
                        <DebounceInput
                            className={`ml-1 border-b-2 border-black leading-normal bg-emojiAtYellow outline-none ${styles["redirect-input"]}`}
                            minLength={2}
                            debounceTimeout={600}
                            onChange={handleChange}
                            placeholder="example.com"
                        />
                    </div>

                    <button
                        onClick={goToCheckout}
                        className={`self-center flex cursor-pointer mb-5 mt-12 px-12 items-center relative leading-none text-xl justify-center rounded-full font-bold text-white py-5 ${styles["next-gradient-button"]}`}
                    >
                        <div className="flex flex-col items-center justify-center flex-auto">
                            <p>Next</p>
                            <p className="text-sm opacity-70">Checkout</p>
                        </div>
                        <svg
                            className="absolute w-6 h-6 right-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-center w-1/2 h-full p-10">
                    <div className="flex items-center justify-center w-full bg-black h-2/3 rounded-xl">
                        {redirectURL.length > 2 && isValidURL ? (
                            <>
                                {isLoadingURL ? (
                                    <div className={`${styles["loader"]}`} />
                                ) : (
                                    <div className="flex flex-col w-full h-full">
                                        <div className="flex items-center justify-center min-w-0 min-h-0 overflow-hidden h-4/5 rounded-t-xl">
                                            {currentMetadata.image ? (
                                                <img
                                                    className="object-cover h-full min-w-0 min-h-0"
                                                    src={currentMetadata.image}
                                                />
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col justify-center p-3 text-white h-1/5 rounded-b-xl">
                                            <p className="overflow-hidden text-2xl font-black whitespace-nowrap overflow-ellipsis">
                                                {currentMetadata.title
                                                    ? currentMetadata.title
                                                    : "Unavailable"}
                                            </p>
                                            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {currentMetadata.description
                                                    ? currentMetadata.description
                                                    : "Unavailable"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Emoji classString="text-9xl" symbol="👻" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetupRedirect;
