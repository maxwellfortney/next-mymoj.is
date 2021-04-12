import React, { useEffect, useState } from "react";
import styles from "../../../../styles/TemplateExamples.module.css";

const TemplateExamples = () => {
    return (
        <div
            className={`grid w-3/4 grid-cols-1 gap-6 p-5 mt-12 bg-white shadow-lg lg:grid-cols-2 ${styles["TemplateExamples"]} rounded-3xl`}
        >
            <Template1 />
            <Template2 />
            <Template3 />
            <Template4 />
        </div>
    );
};

const Template1 = () => {
    return (
        <div
            className={`w-full h-full p-3 shadow-md ${styles["Template1"]} bg-mymojisBg rounded-3xl`}
        >
            1
        </div>
    );
};

const Template2 = () => {
    return (
        <div
            className={`w-full h-full p-3 shadow-md ${styles["Template1"]} bg-mymojisBg rounded-3xl`}
        >
            2
        </div>
    );
};

const Template3 = () => {
    return (
        <div
            className={`hidden w-full h-full p-3 shadow-md md:flex ${styles["Template1"]} bg-mymojisBg rounded-3xl`}
        >
            3
        </div>
    );
};

const Template4 = () => {
    return (
        <div
            className={`hidden w-full h-full p-3 shadow-md md:flex ${styles["Template1"]} bg-mymojisBg rounded-3xl`}
        >
            4
        </div>
    );
};

export default TemplateExamples;
