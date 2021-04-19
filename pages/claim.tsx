import { createContext, useState } from "react";
import EmojiTopDisplay from "../components/Claim/EmojiTopDisplay/EmojiTopDisplay";
import EmojiSlider from "../components/Claim/EmojiController/EmojiController";
import { Emoji } from "../types/Emoji";
import styles from "../styles/Claim.module.css";
import { CSSTransition } from "react-transition-group";
import BaseNFT from "../constants/baseNFT";
import CustomizeNFT from "../components/Claim/CustomizeNFT/CustomizeNFT";
import ChoosePageType from "../components/Claim/ChoosePageType/ChoosePageType";

export default function Claim() {
    const [searchString, setSearchString] = useState("");
    const [searchActiveIndex, setSearchActiveIndex] = useState(0);

    const [inputEmojiArr, setInputEmojiArr] = useState<Emoji[]>([]);

    const [sliderScrollPos, setSliderScrollPos] = useState(0);
    const [sliderScrollBooster, setSliderScrollBooster] = useState();

    const [isAvailable, setIsAvailable] = useState(true); // Psuedo toggle if emojiString is sold or not
    const [isCustomizeNFTOpen, setIsCustomizeNFTOpen] = useState(false);

    const [isChoosePageTypeOpen, setIsChoosePageTypeOpen] = useState(false);

    return (
        <div
            className={`flex flex-col items-center justify-start w-full ${styles["Claim"]} animate-fade-in-up`}
        >
            <EmojiContext.Provider
                value={
                    {
                        searchString,
                        setSearchString,
                        inputEmojiArr,
                        setInputEmojiArr,
                        sliderScrollPos,
                        setSliderScrollPos,
                        sliderScrollBooster,
                        setSliderScrollBooster,
                        isAvailable,
                        setIsAvailable,
                        searchActiveIndex,
                        setSearchActiveIndex,
                        isCustomizeNFTOpen,
                        setIsCustomizeNFTOpen,
                        isChoosePageTypeOpen,
                        setIsChoosePageTypeOpen,
                    } as any
                }
            >
                <CSSTransition
                    in={isCustomizeNFTOpen}
                    classNames="fade"
                    timeout={250}
                    unmountOnExit
                >
                    <CustomizeNFT />
                </CSSTransition>

                <CSSTransition
                    in={isChoosePageTypeOpen}
                    classNames="fade"
                    timeout={250}
                    unmountOnExit
                >
                    <ChoosePageType />
                </CSSTransition>

                {isCustomizeNFTOpen || isChoosePageTypeOpen ? null : (
                    <>
                        <h1 className="text-4xl font-black text-black">
                            Claim your MyMojis
                        </h1>
                        <p className="font-normal text-black">
                            Pick at least 1 emoji
                        </p>
                        <EmojiTopDisplay />
                        <EmojiSlider />
                    </>
                )}
            </EmojiContext.Provider>
        </div>
    );
}

export const EmojiContext = createContext(null as any);
