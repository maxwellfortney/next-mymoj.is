import React, { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CodeExample from "./CodeExample/CodeExample";
import RedirectExample from "./RedirectExample/RedirectExample";
import TemplateExamples from "./TemplateExamples/TemplateExamples";

import styles from "../../../styles/CustomizePage.module.css";

const SlideMessages = [
    <p>
        Customize your page
        <br /> with a template
    </p>,
    <p>
        Customize your page
        <br /> with HTML and CSS
    </p>,
    <p>
        Or redirect to whatever
        <br /> URL you like
    </p>,
];

const SlideComponents = [
    <TemplateExamples />,
    <CodeExample />,
    <RedirectExample />,
];

let interval: NodeJS.Timeout;

const CustomizePage = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        interval = setInterval(() => {
            slideIndex == 2 ? setSlideIndex(0) : setSlideIndex(slideIndex + 1);
        }, 1000 * 7);

        return () => {
            clearInterval(interval);
        };
    });
    return (
        <div
            id="CustomizePage"
            className="flex flex-col items-center justify-start w-full animate-fade-in-up"
        >
            <div className="flex items-center justify-between w-full">
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={slideIndex}
                        classNames="fade"
                        timeout={200}
                    >
                        <h1 className={`font-black ${styles["blue-title"]}`}>
                            {SlideMessages[slideIndex]}
                        </h1>
                    </CSSTransition>
                </SwitchTransition>
                <div
                    className={`flex w-1/3 h-2 shadow-md bg-gray-300 rounded-full ${styles["progress-container"]}`}
                >
                    <span
                        className={`bg-white rounded-full ${styles["progress-bar"]}`}
                    />
                </div>
            </div>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={slideIndex}
                    classNames="fadeAndSlide"
                    timeout={350}
                >
                    {SlideComponents[slideIndex]}
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

export default CustomizePage;
