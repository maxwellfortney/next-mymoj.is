import React from "react";

import styles from "../../styles/MyMojisExample.module.css";

interface EmojiProps {
    label?: string;
    symbol: string;
    classString?: string;
}

const Emoji = ({ label, symbol, classString }: EmojiProps) => {
    return (
        <span
            className={
                classString
                    ? `${classString} ${styles["emoji"]}`
                    : `${styles["emoji"]}`
            }
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
        >
            {symbol}
        </span>
    );
};

export default Emoji;
