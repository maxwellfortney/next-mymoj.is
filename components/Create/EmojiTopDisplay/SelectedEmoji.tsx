import Emoji from "../../Emoji/Emoji";
import { useContext, useEffect, useState } from "react";
import { EmojiContext } from "../../../pages/create";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import styles from "../../../styles/Claim.module.css";
import { Emoji as EmojiType } from "../../../types/Emoji";
import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "./natural-drag-animation-rbdnd";

interface SelectedEmojiProps {
    symbol: string;
    label?: string;
    i: number;
}

const SelectedEmoji = ({ symbol, label, i }: SelectedEmojiProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const { inputEmojiArr, setInputEmojiArr, isAvailable } = useContext(
        EmojiContext
    );

    function removeSelectedEmoji() {
        setInputEmojiArr(
            inputEmojiArr.filter((item: EmojiType, index: number) => {
                return index !== i;
            })
        );
    }

    return (
        <Draggable key={symbol} draggableId={`${symbol}-${i}`} index={i}>
            {(provided, snapshot) => (
                <NaturalDragAnimation
                    style={provided.draggableProps.style}
                    snapshot={snapshot}
                >
                    {(style: React.CSSProperties) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className={`relative mr-4 text-8xl flex justify-center items-center bg-white shadow-md  ${
                                styles["single-emoji-selected"]
                            } ${
                                styles[
                                    `${
                                        isAvailable
                                            ? "single-emoji-selected-valid"
                                            : "single-emoji-selected-invalid"
                                    }`
                                ]
                            }`}
                            style={style}
                        >
                            <Emoji
                                symbol={symbol}
                                label={label}
                                classString="mb-3 z-10"
                            />
                            <CSSTransition
                                in={isHovering}
                                key={`${symbol}-selected`}
                                classNames="scale"
                                timeout={250}
                                unmountOnExit
                            >
                                <div
                                    onClick={removeSelectedEmoji}
                                    className={`absolute z-20 flex items-center justify-center p-1 bg-white rounded-full shadow-sm -top-1 -right-1 ${
                                        isHovering
                                            ? `${styles["delete-selected-button"]}`
                                            : ""
                                    }`}
                                    style={{
                                        border: "1px solid #999999",
                                        cursor: "pointer",
                                    }}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </div>
                            </CSSTransition>
                        </div>
                    )}
                </NaturalDragAnimation>
            )}
        </Draggable>
    );
};

export default SelectedEmoji;
