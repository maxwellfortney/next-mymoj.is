import React, { useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Emoji from "../../Emoji/Emoji";
import styles from "../../../styles/MyMojisExample.module.css";

interface SingleMojiProps {
    symbol: string;
    i: number;
}

const SingleMoji = ({ symbol, i }: SingleMojiProps) => {
    return (
        <div
            className={`flex items-center justify-center p-3 bg-white shadow-xl ${styles["SingleMoji"]} rounded-3xl w-full`}
        >
            <div
                className={`flex items-center justify-center w-full h-full p-1 ${styles["gradientBG"]} rounded-3xl`}
            >
                <SwitchTransition mode="out-in">
                    <CSSTransition key={symbol} classNames="fade" timeout={200}>
                        <Emoji symbol={symbol} classString={`mb-1`} />
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
};

export default SingleMoji;
