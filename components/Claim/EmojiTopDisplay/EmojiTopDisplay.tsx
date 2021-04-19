import { useContext, useEffect } from "react";
import { ValidEmojis } from "../../../constants/emojiData";
import { EmojiContext } from "../../../pages/claim";
import styles from "../../../styles/Claim.module.css";
import { Emoji as EmojiType } from "../../../types/Emoji";
import PickerResults from "./PickerResults";
import SelectedEmoji from "./SelectedEmoji";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EmojiTopDisplay = () => {
    const {
        searchString,
        setSearchString,
        inputEmojiArr,
        setInputEmojiArr,
        searchActiveIndex,
        setSearchActiveIndex,
    } = useContext(EmojiContext);

    useEffect(() => {
        console.log(inputEmojiArr);
    }, [inputEmojiArr]);

    function handleOnChange(e: any) {
        setSearchString(e.target.value);
    }

    function handleKeyDown(e: any) {
        if (
            e.key === "Backspace" &&
            inputEmojiArr.length > 0 &&
            searchString.length === 0
        ) {
            setInputEmojiArr(
                inputEmojiArr.filter((item: EmojiType, index: number) => {
                    return index !== inputEmojiArr.length - 1;
                })
            );
        } else if (
            e.key === "Enter" &&
            searchString.length > 0 &&
            inputEmojiArr.length < 5
        ) {
            let filterdArr = ValidEmojis.filter((item) => {
                let match = false;
                item.keywords.forEach((keyword) => {
                    if (keyword.includes(searchString)) match = true;
                });
                if (item.label?.includes(searchString)) match = true;

                return match;
            });
            if (filterdArr.length === 0) return;
            setInputEmojiArr([...inputEmojiArr, filterdArr[searchActiveIndex]]);
            setSearchString("");
        } else if (searchString.length > 0 && e.key === "ArrowRight") {
            e.preventDefault();

            let filterdArr = ValidEmojis.filter((item) => {
                let match = false;
                item.keywords.forEach((keyword) => {
                    if (keyword.includes(searchString)) match = true;
                });
                if (item.label?.includes(searchString)) match = true;

                return match;
            });

            if (searchActiveIndex < filterdArr.length - 1) {
                setSearchActiveIndex(searchActiveIndex + 1);
            }
        } else if (searchString.length > 0 && e.key === "ArrowLeft") {
            e.preventDefault();
            if (searchActiveIndex > 0) {
                setSearchActiveIndex(searchActiveIndex - 1);
            }
        } else if (searchString.length > 0 && e.key === "ArrowDown") {
            e.preventDefault();

            let filterdArr = ValidEmojis.filter((item) => {
                let match = false;
                item.keywords.forEach((keyword) => {
                    if (keyword.includes(searchString)) match = true;
                });
                if (item.label?.includes(searchString)) match = true;

                return match;
            });

            let numCols =
                filterdArr.length % 4 === 0
                    ? filterdArr.length / 4
                    : Math.ceil(filterdArr.length / 4);

            if (searchActiveIndex + numCols < filterdArr.length) {
                setSearchActiveIndex(searchActiveIndex + numCols);
            } else {
                setSearchActiveIndex(filterdArr.length - 1);
            }
        } else if (searchString.length > 0 && e.key === "ArrowUp") {
            e.preventDefault();

            let filterdArr = ValidEmojis.filter((item) => {
                let match = false;
                item.keywords.forEach((keyword) => {
                    if (keyword.includes(searchString)) match = true;
                });
                if (item.label?.includes(searchString)) match = true;

                return match;
            });

            let numCols =
                filterdArr.length % 4 === 0
                    ? filterdArr.length / 4
                    : Math.ceil(filterdArr.length / 4);

            if (searchActiveIndex - numCols >= 0) {
                setSearchActiveIndex(searchActiveIndex - numCols);
            }
        } else {
            setSearchActiveIndex(0);
        }
    }

    function onDragEnd(result: any) {
        console.log(result);
        const { destination, source, draggableId } = result;
        if (!destination) {
            // Null drop
            return;
        } else if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            // Dropped at the same index
            return;
        } else {
            const emojiData = inputEmojiArr[source.index];
            const newInputEmojiArr: EmojiType[] = Array.from(inputEmojiArr);
            newInputEmojiArr.splice(source.index, 1);
            newInputEmojiArr.splice(destination.index, 0, emojiData);

            console.log(newInputEmojiArr);
            setInputEmojiArr(newInputEmojiArr);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center flex-auto w-11/12 mt-12">
                <div className="flex items-center justify-start w-full">
                    <svg
                        className="flex-none h-20 text-black transition-opacity cursor-pointer lg:h-32 hover:opacity-80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <div
                        className={`relative flex items-center w-full justify-start my-auto ${styles["emoji-search-input-container"]}`}
                    >
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                                droppableId="selectedEmojis"
                                direction="horizontal"
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex items-center"
                                    >
                                        <TransitionGroup className="flex items-center">
                                            {inputEmojiArr.map(
                                                (
                                                    emoji: EmojiType,
                                                    i: number
                                                ) => {
                                                    return (
                                                        <CSSTransition
                                                            key={i}
                                                            classNames="fade"
                                                            timeout={250}
                                                        >
                                                            <SelectedEmoji
                                                                symbol={
                                                                    emoji.symbol
                                                                }
                                                                label={
                                                                    emoji.label
                                                                }
                                                                key={`${emoji.symbol}-${i}`}
                                                                i={i}
                                                            />
                                                        </CSSTransition>
                                                    );
                                                }
                                            )}
                                            {provided.placeholder}
                                        </TransitionGroup>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {/* </TransitionGroup> */}
                        <input
                            tabIndex={0}
                            type="text"
                            spellCheck="false"
                            autoComplete="false"
                            autoCorrect="false"
                            autoCapitalize="false"
                            onKeyDown={handleKeyDown}
                            onChange={handleOnChange}
                            value={searchString}
                            className={`${
                                inputEmojiArr.length > 0 ? "ml-5" : ""
                            } w-full overflow-x-visible text-4xl font-bold outline-none md:text-5xl lg:text-6xl ${
                                styles["emoji-search-input"]
                            }`}
                            placeholder={
                                inputEmojiArr.length > 0
                                    ? undefined
                                    : "Search for emojis"
                            }
                        />
                    </div>
                </div>
            </div>
            <PickerResults />
        </>
    );
};

export default EmojiTopDisplay;
