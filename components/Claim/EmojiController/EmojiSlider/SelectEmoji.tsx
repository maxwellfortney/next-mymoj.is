import Emoji from "../../../Emoji/Emoji";
import styles from "../../../../styles/Claim.module.css";
import { EmojiContext } from "../../../../pages/claim";
import { useContext, useEffect } from "react";

interface SelectEmojiProps {
    symbol: string;
    label?: string;
    inSearch?: boolean;
    i?: number;
}

const SelectEmoji = ({ symbol, label, inSearch, i }: SelectEmojiProps) => {
    const {
        searchString,
        setSearchString,
        inputEmojiArr,
        setInputEmojiArr,
        searchActiveIndex,
    } = useContext(EmojiContext);

    function addEmojiToInput() {
        console.log(inputEmojiArr);
        if (inputEmojiArr.length === 5) return;
        if (searchString.length > 0) setSearchString("");

        setInputEmojiArr([...inputEmojiArr, { symbol, label }]);
    }
    return (
        <div
            onClick={addEmojiToInput}
            className={`flex items-center justify-center ${
                styles["single-emoji"]
            } p-1 bg-white shadow-md text-4xl rounded-xl cursor-pointer ${
                inSearch && i === searchActiveIndex
                    ? `${styles["single-emoji-active"]}`
                    : ""
            }`}
        >
            <Emoji symbol={symbol} label={label} />
        </div>
    );
};

export default SelectEmoji;
