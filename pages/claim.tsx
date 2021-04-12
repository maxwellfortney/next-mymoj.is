import { createContext, useState } from "react";
import EmojiTopDisplay from "../components/Claim/EmojiTopDisplay/EmojiTopDisplay";
import EmojiSlider from "../components/Claim/EmojiController/EmojiController";
import { Emoji } from "../types/Emoji";
import styles from "../styles/Claim.module.css";

export default function Claim() {
    const [searchString, setSearchString] = useState("");
    const [inputEmojiArr, setInputEmojiArr] = useState<Emoji[]>([]);
    const [sliderScrollPos, setSliderScrollPos] = useState(0);
    const [sliderScrollBooster, setSliderScrollBooster] = useState();
    const [isAvailable, setIsAvailable] = useState(true);
    const [searchActiveIndex, setSearchActiveIndex] = useState(0);

    return (
        <div
            className={`flex flex-col items-center justify-end w-full ${styles["Claim"]} animate-fade-in-up`}
        >
            <h1 className="text-4xl font-black text-mymojisDarkText">
                Claim your MyMojis
            </h1>
            <p className="font-semibold text-mymojisBlueText">
                Pick at least 1 emoji
            </p>
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
                    } as any
                }
            >
                <EmojiTopDisplay />
                <EmojiSlider />
            </EmojiContext.Provider>
        </div>
    );
}

export const EmojiContext = createContext(null as any);
