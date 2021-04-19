import EmojiSlider from "./EmojiSlider/EmojiSlider";
import CategorySelector from "./CategorySelector/CategorySelector";
import { EmojiContext } from "../../../pages/claim";
import { useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const EmojiController = () => {
    const { inputEmojiArr } = useContext(EmojiContext);

    return (
        <div className="relative flex flex-col items-center justify-end w-full">
            <CSSTransition
                in={inputEmojiArr.length === 5}
                classNames="fade90"
                timeout={250}
                unmountOnExit
            >
                <div className="absolute z-10 flex items-center justify-center w-full h-full bg-emojiAtYellow">
                    <p className="text-3xl">
                        You've reached the{" "}
                        <span className="font-bold">maximum length</span>.
                    </p>
                </div>
            </CSSTransition>
            <EmojiSlider />
            <CategorySelector />
        </div>
    );
};

export default EmojiController;
