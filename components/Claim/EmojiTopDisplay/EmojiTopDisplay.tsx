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
                        className="flex-none h-20 transition-opacity duration-150 cursor-pointer lg:h-32 text-mymojisDarkText hover:opacity-80"
                        viewBox="0 0 153 151"
                        fill="currentColor"
                    >
                        <path d="M65.5713 18.875C39.9196 18.875 19.125 39.3984 19.125 64.7142C19.125 90.0306 39.9202 110.553 65.5713 110.553C91.2231 110.553 112.018 90.0306 112.018 64.7142C112.018 39.3978 91.2231 18.875 65.5713 18.875ZM30.0537 64.7142C30.0537 45.3547 45.9555 29.6608 65.5713 29.6608C85.1872 29.6608 101.089 45.3547 101.089 64.7142C101.089 84.0737 85.1872 99.7676 65.5713 99.7676C45.9555 99.7676 30.0537 84.0737 30.0537 64.7142Z" />
                        <path d="M110.417 101.347C109.389 100.353 108.005 99.7995 106.565 99.8068C105.125 99.8141 103.747 100.382 102.729 101.386C101.711 102.391 101.136 103.751 101.128 105.172C101.121 106.593 101.682 107.959 102.69 108.974L124.547 130.546C125.572 131.557 126.961 132.125 128.41 132.125C129.86 132.125 131.249 131.557 132.274 130.546C132.782 130.045 133.184 129.451 133.459 128.796C133.734 128.142 133.875 127.441 133.875 126.732C133.875 126.024 133.734 125.323 133.459 124.669C133.184 124.014 132.782 123.42 132.274 122.919L110.417 101.347Z" />
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
                                        <TransitionGroup
                                            // className={`grid gap-4 ml-3`}
                                            // style={{
                                            //     gridAutoFlow: "column",
                                            // }}
                                            className="flex items-center"
                                        >
                                            {inputEmojiArr.map(
                                                (
                                                    emoji: EmojiType,
                                                    i: number
                                                ) => {
                                                    return (
                                                        // <CSSTransition
                                                        //     key={i}
                                                        //     classNames="fade"
                                                        //     timeout={250}
                                                        // >
                                                        //     <SelectedEmoji
                                                        //         symbol={
                                                        //             emoji.symbol
                                                        //         }
                                                        //         label={
                                                        //             emoji.label
                                                        //         }
                                                        //         key={`${emoji.symbol}-${i}`}
                                                        //         i={i}
                                                        //     />
                                                        // </CSSTransition>

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
