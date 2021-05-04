import { useContext, useEffect, useState } from "react";
import BaseNFT from "../../../constants/baseNFT";
import { EmojiContext } from "../../../pages/create";

import GradientOption from "./GradientOption";
import { GradientOptions } from "../../../constants/gradientOptions";
import styles from "../../../styles/CustomizeNFT.module.css";
import UserCustomOption from "./UserCustomOption";
import { ChromePicker, ColorResult } from "react-color";
import { CSSTransition } from "react-transition-group";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { createJSONMetadata } from "../../../constants/emojiAtMetadata";

const CustomizeNFT = () => {
    const {
        inputEmojiArr,
        isCustomizeNFTOpen,
        setIsCustomizeNFTOpen,
        isChoosePageTypeOpen,
        setIsChoosePageTypeOpen,
    } = useContext(EmojiContext);
    const [gradientType, setGradientType] = useState("linear");
    const [gradientStop1, setGradientStop1] = useState("#7A5FFF");
    const [gradientStop2, setGradientStop2] = useState("#01FF89");
    const [gradientSpeed, setGradientSpeed] = useState(6);
    const [gradientAngle, setGradientAngle] = useState(315);

    const [editCustomColor, setEditCustomColor] = useState(0);
    const [customColor1, setCustomColor1] = useState("");
    const [customColor2, setCustomColor2] = useState("");

    function goToChoosePageType() {
        setIsCustomizeNFTOpen(false);
        setIsChoosePageTypeOpen(true);
    }

    function handleChangeComplete(e: ColorResult) {
        console.log(editCustomColor);
        if (editCustomColor === 1) {
            setCustomColor1(e.hex);
            setGradientStop1(e.hex);
        } else if (editCustomColor === 2) {
            setCustomColor2(e.hex);
            setGradientStop2(e.hex);
        }
    }

    function handleMaybeClose(e: any) {
        if (editCustomColor === 1 || editCustomColor === 2) {
            setEditCustomColor(0);
        }
    }

    async function getJPGBlob(serializedSVG: string) {
        const img = document
            .querySelector("#CustomNFTSVG")
            ?.cloneNode(true) as SVGImageElement;
        img.setAttribute("width", "1000px");
        img.setAttribute("height", "1000px");
        console.log(img);

        let canvas = document.createElement("canvas");
        let ratio = 1;
        canvas.width = 1000;
        canvas.height = 1000;
        let ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
            let data = canvas.toDataURL("image/png");
            console.log("HHH: ", data);
        } catch (e) {
            console.log(e);
        }
    }

    async function pinSVG() {
        var SVGDomElement = document
            .querySelector("#CustomNFTSVG")
            ?.cloneNode(true) as SVGElement;

        console.log(SVGDomElement);
        SVGDomElement.setAttribute("width", "1000px");
        SVGDomElement.setAttribute("height", "1000px");

        // 2. Serialize element into plain SVG
        var serializedSVG = new XMLSerializer().serializeToString(
            SVGDomElement
        );

        console.log(serializedSVG);
        const emojiString = `${inputEmojiArr
            .map((emoji: any) => {
                return emoji.symbol;
            })
            .join("")}`;

        const imageSVGBlob = new Blob([serializedSVG], {
            type: "image/svg+xml",
        });
        // const uploadedSVGImage = await fleekStorage.upload({
        //     apiKey: "O1w2bLBPvhameLoWJ7sz2Q==",
        //     apiSecret: "bLfeX2PC/mg6xZQetAlnK65ArM51g20T61MrXiJz9aM=",
        //     key: `${emojiString}/${emojiString}.svg`,
        //     data: imageSVGBlob,
        // });
        // console.log(uploadedSVGImage);

        // // const jpgBlob = await getJPGBlob(serializedSVG);

        // const jsonData = createJSONMetadata(emojiString, uploadedSVGImage.hash);
        // console.log(jsonData);
        // const metdataBlob = new Blob([JSON.stringify(jsonData)], {
        //     type: "application/json",
        // });
        // const uploadedMetadata = await fleekStorage.upload({
        //     apiKey: process.env.FLEEK_STORAGE_KEY as string,
        //     apiSecret: process.env.FLEEK_STORAGE_SECRET as string,
        //     key: `${emojiString}/${emojiString}.json`,
        //     data: metdataBlob,
        // });
        // console.log(uploadedMetadata);

        goToChoosePageType();
    }

    return (
        <div
            className="absolute left-0 z-30 flex flex-col items-center w-full bg-emojiAtYellow"
            style={{
                height: "calc(100vh - 115px)",
                maxHeight: "calc(100vh - 115px)",
                minHeight: "750px",
            }}
        >
            {editCustomColor !== 0 ? (
                <div
                    className="absolute flex items-center justify-center w-full h-full"
                    style={{ zIndex: 2 }}
                >
                    <div
                        onClick={handleMaybeClose}
                        className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
                    />
                    <ChromePicker
                        // className="z-20"
                        color={
                            editCustomColor === 1 ? customColor1 : customColor2
                        }
                        onChange={handleChangeComplete}
                        onChangeComplete={handleChangeComplete}
                    />
                </div>
            ) : null}
            <svg
                onClick={() => setIsCustomizeNFTOpen(false)}
                className="absolute w-8 h-8 text-black transition-opacity cursor-pointer right-1 sm:right-4 md:right-10 top-1 hover:opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            <h1 className="text-2xl font-black text-black sm:text-3xl md:text-4xl">
                Customize your NFT art
            </h1>
            <p className="text-xs font-medium text-center text-black md:text-sm">
                This is what you will see on an NFT marketplace like OpenSea
            </p>
            <div className="flex flex-col items-center flex-auto w-full md:items-start md:flex-row md:w-11/12">
                <div className="flex flex-col w-11/12 h-full mt-3 text-black md:mt-0 md:w-1/2">
                    <h1 className="text-2xl font-black md:text-3xl">Type</h1>
                    <div
                        className="flex justify-center w-full"
                        style={{ minHeight: "56px" }}
                    >
                        <div
                            onClick={() => setGradientType("linear")}
                            className={`px-4 py-3 items-center my-auto justify-center bg-black text-white shadow-lg rounded-xl mr-7 ${
                                styles["gradient-option"]
                            } ${
                                gradientType === "linear"
                                    ? `${styles["active-gradient-option"]}`
                                    : ""
                            }`}
                        >
                            <p className="text-lg font-black">Linear</p>
                        </div>
                        <div
                            onClick={() => setGradientType("radial")}
                            className={`px-4 py-3 items-center my-auto justify-center bg-black text-white shadow-lg rounded-xl ${
                                styles["gradient-option"]
                            } ${
                                gradientType === "radial"
                                    ? `${styles["active-gradient-option"]}`
                                    : ""
                            }`}
                        >
                            <p className="text-lg font-black">Radial</p>
                        </div>
                    </div>
                    <h1 className="mb-1 text-2xl font-black md:text-3xl">
                        Colors
                    </h1>
                    <div
                        className="grid justify-center gap-4 mb-4"
                        style={{
                            gridTemplateColumns: "repeat(auto-fill, 90px)",
                        }}
                    >
                        {GradientOptions.map((option) => {
                            return (
                                <GradientOption
                                    gradientType={gradientType}
                                    activeColor1={gradientStop1}
                                    gradientStop1={option.gradientStop1}
                                    setGradientStop1={setGradientStop1}
                                    activeColor2={gradientStop2}
                                    gradientStop2={option.gradientStop2}
                                    setGradientStop2={setGradientStop2}
                                    gradientAngle={gradientAngle}
                                />
                            );
                        })}
                        <UserCustomOption
                            customColor1={customColor1}
                            activeColor1={gradientStop1}
                            customColor2={customColor2}
                            activeColor2={gradientStop2}
                            editCustomColor={editCustomColor}
                            setEditCustomColor={setEditCustomColor}
                            setGradientStop1={setGradientStop1}
                            setGradientStop2={setGradientStop2}
                        />
                    </div>

                    <CSSTransition
                        classNames="fade"
                        timeout={250}
                        in={gradientType === "linear"}
                        unmountOnExit
                    >
                        <h1 className="text-2xl font-black md:text-3xl">
                            Angle
                        </h1>
                    </CSSTransition>
                    <CSSTransition
                        classNames="fade"
                        timeout={250}
                        in={gradientType === "linear"}
                        unmountOnExit
                    >
                        <div className="flex items-center justify-between w-full mt-2">
                            <input
                                className="w-3/4"
                                type="range"
                                min="0"
                                max="360"
                                value={gradientAngle}
                                onChange={(e) =>
                                    setGradientAngle(parseFloat(e.target.value))
                                }
                            />
                            <div className="flex items-center">
                                <input
                                    className="ml-4 font-bold bg-emojiAtYellow"
                                    type="number"
                                    min="-360"
                                    max="360"
                                    value={gradientAngle}
                                    onChange={(e) =>
                                        setGradientAngle(
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                                <p className="ml-1 font-bold">degrees</p>
                            </div>
                        </div>
                    </CSSTransition>

                    <h1 className="mt-4 text-2xl font-black md:text-3xl">
                        Speed
                    </h1>
                    <div className="flex items-center justify-between w-full mt-2">
                        <input
                            className="w-3/4"
                            type="range"
                            min="0"
                            max="20"
                            value={gradientSpeed}
                            onChange={(e) =>
                                setGradientSpeed(parseFloat(e.target.value))
                            }
                        />
                        <div className="flex items-center">
                            <input
                                className="ml-4 font-bold bg-emojiAtYellow"
                                type="number"
                                min="0"
                                max="20"
                                value={gradientSpeed}
                                onChange={(e) =>
                                    setGradientSpeed(parseFloat(e.target.value))
                                }
                            />
                            <p className="ml-1 font-bold">seconds</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-auto">
                        <div
                            onClick={pinSVG}
                            className={`flex cursor-pointer my-5 px-12 items-center relative leading-none text-xl justify-center rounded-full font-bold text-white py-5 ${styles["next-gradient-button"]}`}
                        >
                            <div className="flex flex-col items-center justify-center flex-auto">
                                <p>Next</p>
                                <p className="text-sm opacity-70">
                                    Customize your page
                                </p>
                            </div>
                            <svg
                                className="absolute w-6 h-6 right-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div
                    className="w-11/12 h-full p-1 md:p-10 md:pr-0 md:w-1/2"
                    style={{ minHeight: "420px" }}
                >
                    <BaseNFT
                        emojiArr={inputEmojiArr}
                        gradientType={gradientType}
                        gradientStop1={gradientStop1}
                        gradientStop2={gradientStop2}
                        gradientSpeed={gradientSpeed}
                        gradientAngle={gradientAngle}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomizeNFT;
