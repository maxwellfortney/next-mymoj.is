import {
    ValidEmojis,
    SmileysAndPeople,
    AnimalsAndNature,
    FoodAndDrink,
    Activities,
    TravelAndPlaces,
    Objects,
    Symbols,
    getKeywordsForEmoji,
} from "../../../../constants/emojiData";
import styles from "../../../../styles/Claim.module.css";
import CategoryMatrix from "./CategoryMatrix";
import { EmojiContext } from "../../../../pages/create";
import { useContext, useEffect } from "react";
import { useScrollBoost } from "react-scrollbooster";

// import ScrollContainer from "react-indiana-drag-scroll";
import SearchResults from "./SearchResults";

const EmojiSlider = () => {
    const [viewport, scrollbooster] = useScrollBoost({
        direction: "horizontal",
        // friction: 0.12,
        // bounceForce: 0.15,
        // bounce: false,
        scrollMode: "native",
        // emulateScroll: true,
        onUpdate: (e) => {
            setSliderScrollPos(e.position.x);
        },
    });

    const {
        searchString,
        setSearchString,
        sliderScrollPos,
        setSliderScrollPos,
        setSliderScrollBooster,
    } = useContext(EmojiContext);

    function handleScroll(e: any) {
        setSliderScrollPos(e);
    }

    useEffect(() => {
        setSliderScrollBooster(scrollbooster);
    }, [scrollbooster]);

    return (
        <>
            <div
                ref={viewport}
                tabIndex={1}
                className={`flex items-center justify-start w-full mb-2 overflow-x-auto ${styles["emoji-slider"]} EmojiSlider`}
            >
                <div className={`flex items-center justify-start`}>
                    {searchString.length > 1 ? (
                        <SearchResults
                            emojiArr={ValidEmojis.filter((item) => {
                                let match = false;
                                item.keywords.forEach((keyword) => {
                                    if (keyword.includes(searchString))
                                        match = true;
                                });
                                if (item.label?.includes(searchString))
                                    match = true;

                                return match;
                            })}
                        />
                    ) : (
                        <>
                            <CategoryMatrix
                                id="SmileysAndPeople"
                                emojiArr={SmileysAndPeople}
                                isFirst={true}
                            />
                            <CategoryMatrix
                                id="AnimalsAndNature"
                                emojiArr={AnimalsAndNature}
                            />
                            <CategoryMatrix
                                id="FoodAndDrink"
                                emojiArr={FoodAndDrink}
                            />
                            <CategoryMatrix
                                id="Activities"
                                emojiArr={Activities}
                            />
                            <CategoryMatrix
                                id="TravelAndPlaces"
                                emojiArr={TravelAndPlaces}
                            />
                            <CategoryMatrix id="Objects" emojiArr={Objects} />
                            <CategoryMatrix
                                id="Symbols"
                                emojiArr={Symbols}
                                isLast={true}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default EmojiSlider;
