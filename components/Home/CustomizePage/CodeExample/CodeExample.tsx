import React, { useEffect, useState } from "react";
import {
    ReactCompareSlider,
    ReactCompareSliderHandle,
    ReactCompareSliderImage,
} from "react-compare-slider";

const CodeExample = () => {
    return (
        <div className="flex flex-col items-center justify-center w-3/4 p-5 mt-12 bg-white shadow-lg rounded-3xl">
            <ReactCompareSlider
                className="rounded-3xl"
                handle={
                    <ReactCompareSliderHandle
                        buttonStyle={{
                            backdropFilter: undefined,
                            background: "white",
                            border: 0,
                            color: "#333",
                        }}
                    />
                }
                itemOne={
                    <ReactCompareSliderImage
                        src="/cat-code-example.png"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "left",
                        }}
                        alt="cat-code-example"
                    />
                }
                itemTwo={
                    <ReactCompareSliderImage
                        src="/cat-render-example.png"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "right",
                        }}
                        alt="cat-render-example"
                    />
                }
                // onPositionChange={handlePositionChange}
                style={{
                    display: "flex",
                    width: "100%",
                    // height: "600px",
                    minHeight: "450px",
                    maxHeight: "635px",
                }}
            />
        </div>
    );
};

export default CodeExample;
