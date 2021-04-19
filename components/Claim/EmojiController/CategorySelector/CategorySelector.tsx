import { useContext, useEffect, useState } from "react";
import { EmojiContext } from "../../../../pages/claim";
import ScrollContainer from "react-indiana-drag-scroll";
import styles from "../../../../styles/Claim.module.css";

const CategorySelector = () => {
    const {
        sliderScrollPos,
        setSliderScrollPos,
        sliderScrollBooster,
    } = useContext(EmojiContext);
    const [activeSection, setActiveSection] = useState("SmileysAndPeople");

    function scrollToSection(containerID: string) {
        console.log(containerID);
        // setActiveSection(containerID);

        sliderScrollBooster?.scrollTo({
            x:
                (document?.querySelector(`#${containerID}`) as HTMLElement)
                    ?.offsetLeft -
                window.innerWidth * 0.24,
            y: 0,
        });
    }

    let prevScroll = 0;
    useEffect(() => {
        // console.log(sliderScrollPos);

        if (Math.abs(sliderScrollPos - prevScroll) > 25) {
            prevScroll = sliderScrollPos;
            if (
                sliderScrollPos <=
                (document?.querySelector("#AnimalsAndNature") as HTMLElement)
                    ?.offsetLeft -
                    window.innerWidth * 0.25
            ) {
                setActiveSection("SmileysAndPeople");
            } else if (
                sliderScrollPos <=
                (document?.querySelector("#FoodAndDrink") as HTMLElement)
                    ?.offsetLeft -
                    window.innerWidth * 0.25
            ) {
                setActiveSection("AnimalsAndNature");
            } else if (
                sliderScrollPos <=
                (document?.querySelector("#Activities") as HTMLElement)
                    ?.offsetLeft -
                    window.innerWidth * 0.25
            ) {
                setActiveSection("FoodAndDrink");
            } else if (
                sliderScrollPos <=
                (document?.querySelector("#TravelAndPlaces") as HTMLElement)
                    ?.offsetLeft -
                    window.innerWidth * 0.25
            ) {
                setActiveSection("Activities");
            } else if (
                sliderScrollPos <=
                (document?.querySelector("#Objects") as HTMLElement)
                    ?.offsetLeft -
                    window.innerWidth * 0.25
            ) {
                setActiveSection("TravelAndPlaces");
            } else if (
                sliderScrollPos <=
                (document?.querySelector("#Symbols") as HTMLElement)
                    ?.offsetLeft -
                    window.innerWidth * 0.25
            ) {
                setActiveSection("Objects");
            } else if (
                sliderScrollPos <=
                (document?.querySelector("#Symbols") as HTMLElement)
                    ?.offsetLeft -
                    window.innerWidth * 0.23
            ) {
                setActiveSection("Symbols");
            } else {
                setActiveSection("Flags");
            }
        }
    }, [sliderScrollPos]);

    return (
        <ScrollContainer
            className={`flex justify-between text-base md:text-lg overflow-x-auto w-full sm:w-11/12 ${styles["category-selector"]} mb-4`}
        >
            <p
                onClick={() => scrollToSection("SmileysAndPeople")}
                className={`flex-none mx-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "SmileysAndPeople" ? "opacity-100" : ""
                }`}
            >
                Smileys & People
            </p>
            <p
                onClick={() => scrollToSection("AnimalsAndNature")}
                className={`flex-none mr-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "AnimalsAndNature" ? "opacity-100" : ""
                }`}
            >
                Animals & Nature
            </p>
            <p
                onClick={() => scrollToSection("FoodAndDrink")}
                className={`flex-none mr-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "FoodAndDrink" ? "opacity-100" : ""
                }`}
            >
                Food & Drink
            </p>
            <p
                onClick={() => scrollToSection("Activities")}
                className={`flex-none mr-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "Activities" ? "opacity-100" : ""
                }`}
            >
                Activities
            </p>
            <p
                onClick={() => scrollToSection("TravelAndPlaces")}
                className={`flex-none mr-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "TravelAndPlaces" ? "opacity-100" : ""
                }`}
            >
                Travel & Places
            </p>
            <p
                onClick={() => scrollToSection("Objects")}
                className={`flex-none mr-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "Objects" ? "opacity-100" : ""
                }`}
            >
                Objects
            </p>
            <p
                onClick={() => scrollToSection("Symbols")}
                className={`flex-none mr-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "Symbols" ? "opacity-100" : ""
                }`}
            >
                Symbols
            </p>
            <p
                onClick={() => scrollToSection("Flags")}
                className={`flex-none mr-4 font-black transition-opacity cursor-pointer opacity-60 hover:opacity-100 ${
                    activeSection === "Flags" ? "opacity-100" : ""
                }`}
            >
                Flags
            </p>
        </ScrollContainer>
    );
};

export default CategorySelector;
