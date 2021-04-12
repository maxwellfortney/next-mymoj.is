import { EmojiContext } from "../../../pages/claim";
import { useContext, useEffect, useState } from "react";
import { calculateFlowScore } from "../../../constants/constants";
import NumberEasing from "./NumberEasing";
import styles from "../../../styles/Claim.module.css";

const PickerResults = () => {
    const {
        searchString,
        setSearchString,
        inputEmojiArr,
        setInputEmojiArr,
        isAvailable,
    } = useContext(EmojiContext);
    const [flowScore, setFlowScore] = useState<number>(10);
    // async function calc() {
    //     setFlowScore(await calculateFlowScore(inputEmojiArr));
    // }

    useEffect(() => {
        setFlowScore(calculateFlowScore(inputEmojiArr) as number);

        console.log(inputEmojiArr);
    }, [inputEmojiArr]);

    // function x(inputEmojiArr: any) {
    //     return calculateFlowScore(inputEmojiArr);
    // }

    return (
        <div className="flex items-center justify-center w-full h-1/4">
            <div className="flex items-center justify-end flex-1">
                <div
                    className={`flex flex-col items-center justify-center px-12 py-4 rounded-full ${
                        styles[
                            `${
                                isAvailable
                                    ? "available-gradient-button"
                                    : "taken-gradient-button"
                            }`
                        ]
                    } ${isAvailable ? "text-white" : "text-white"}`}
                >
                    <p className="text-xl font-bold leading-tight whitespace-nowrap">
                        {isAvailable
                            ? "Buy now for $696"
                            : "This MyMoji is taken"}
                    </p>
                    <p className="text-sm font-light leading-tight text-gray-50 whitespace-nowrap">
                        {isAvailable
                            ? "Pay once, truly own forever 😉"
                            : "Try another combo"}
                    </p>
                </div>
            </div>
            <div className="flex w-px mx-8 bg-gray-500 h-1/4"></div>
            <div className="flex flex-1">
                {flowScore ? (
                    <NumberEasing
                        value={flowScore}
                        speed={500}
                        decimals={1}
                        ease="quintInOut"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default PickerResults;

// FIX ME 4/11/21
