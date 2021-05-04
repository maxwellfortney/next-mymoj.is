import { EmojiContext } from "../../../pages/create";
import { useContext, useEffect, useState } from "react";
import { calculateFlowScore } from "../../../constants/flowScore";
import NumberEasing from "./NumberEasing";
import styles from "../../../styles/Claim.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PickerResults = () => {
    const {
        searchString,
        setSearchString,
        inputEmojiArr,
        setInputEmojiArr,
        isAvailable,
        isCustomizeNFTOpen,
        setIsCustomizeNFTOpen,
    } = useContext(EmojiContext);
    const [flowScore, setFlowScore] = useState<number>(10);

    function flowScoreShadow() {
        if (flowScore > 0 && flowScore <= 25) {
            return "red";
        } else if (flowScore <= 50) {
            return "orange";
        } else if (flowScore <= 75) {
            return "yellow";
        } else if (flowScore <= 100) {
            return "green";
        }
    }

    useEffect(() => {
        setFlowScore(calculateFlowScore(inputEmojiArr) as number);

        console.log(inputEmojiArr);
    }, [inputEmojiArr]);

    return (
        <div className="flex flex-col items-center justify-center w-full md:flex-row h-1/4 md:mb-6">
            <div className="flex items-center justify-end flex-1">
                <CSSTransition
                    in={inputEmojiArr.length > 0}
                    classNames="fade"
                    timeout={250}
                    unmountOnExit
                >
                    <div className="flex flex-col items-center justify-center">
                        <div
                            onClick={() => {
                                isAvailable
                                    ? setIsCustomizeNFTOpen(true)
                                    : null;
                            }}
                            className={`flex flex-col items-center justify-center px-12 py-2 md:py-4 rounded-full cursor-pointer ${
                                styles[
                                    `${
                                        isAvailable
                                            ? "available-gradient-button"
                                            : "taken-gradient-button"
                                    }`
                                ]
                            } ${isAvailable ? "text-white" : "text-white"}`}
                        >
                            <p className="text-base font-bold leading-tight md:text-xl whitespace-nowrap">
                                {isAvailable
                                    ? "Customize Now"
                                    : "This Emoji @ is taken"}
                            </p>
                            <p className="text-xs font-light leading-tight md:text-sm text-gray-50 whitespace-nowrap">
                                {isAvailable
                                    ? "Purchase for 1 ETH"
                                    : "View on OpenSea"}
                            </p>
                        </div>
                    </div>
                </CSSTransition>
            </div>
            <CSSTransition
                in={inputEmojiArr.length > 0}
                classNames="fade"
                timeout={250}
                unmountOnExit
            >
                <div className="hidden w-px mx-3 bg-gray-500 md:flex md:mx-5 lg:mx-8 h-1/4"></div>
            </CSSTransition>

            <div className="flex items-center justify-center flex-1 my-3 mb-0 md:my-0">
                {flowScore ? (
                    <CSSTransition
                        in={inputEmojiArr.length > 0}
                        classNames="fade"
                        timeout={250}
                        unmountOnExit
                    >
                        <>
                            <div
                                className={`flex ml-4 md:ml-0 items-center justify-center font-sans text-2xl font-black bg-white rounded-2xl blur-md relative text-mymojisDarkText ${
                                    styles["flow-score"]
                                } ${styles[`flow-score-${flowScoreShadow()}`]}`}
                                style={{
                                    aspectRatio: "1",
                                }}
                            >
                                <p className="z-10 mt-0.5">
                                    <NumberEasing
                                        value={flowScore}
                                        speed={700}
                                        decimals={0}
                                        ease="quintInOut"
                                    />
                                </p>
                            </div>
                            <div className="flex flex-col flex-auto w-full ml-6">
                                <p className="text-lg font-black md:text-xl text-mymojisDarkText">
                                    FLOW SCORE
                                </p>
                                <p className="text-sm leading-tight md:text-base">
                                    The price is based on its Flow Score,
                                    <br /> which is a measure of its rarity and
                                    uniqueness.
                                </p>
                                <svg
                                    className="w-5 h-5 transition-opacity duration-200 cursor-pointer hover:opacity-70"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </>
                    </CSSTransition>
                ) : null}
            </div>
        </div>
    );
};

export default PickerResults;
