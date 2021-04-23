import styles from "../../../styles/CustomizeNFT.module.css";

interface GradientOptionProps {
    gradientType: string;
    activeColor1: string;
    gradientStop1: string;
    setGradientStop1: Function;
    activeColor2: string;
    gradientStop2: string;
    setGradientStop2: Function;
    gradientAngle: number;
}

const GradientOption = ({
    gradientType,
    activeColor1,
    gradientStop1,
    setGradientStop1,
    activeColor2,
    gradientStop2,
    setGradientStop2,
    gradientAngle,
}: GradientOptionProps) => {
    function isActive() {
        if (activeColor1 === gradientStop1 && activeColor2 === gradientStop2) {
            return true;
        }
        return false;
    }

    return (
        // <div

        //     className={`flex p-0 bg-black shadow-xl rounded-xl cursor-pointer ${
        //         styles["gradient-option"]
        //     } ${isActive() ? `${styles["active-gradient-option"]}` : ""}`}
        //     style={{ width: "90px", height: "90px" }}
        // >

        // </div>
        <div
            onClick={() => {
                setGradientStop1(gradientStop1);
                setGradientStop2(gradientStop2);
            }}
            className={`${styles["gradient-option"]} flex rounded-xl ${
                isActive() ? `${styles["active-gradient-option"]}` : ""
            }`}
            style={{
                width: "90px",
                height: "90px",
                background: `${
                    gradientType === "linear"
                        ? `linear-gradient(${gradientAngle}deg,${gradientStop1}, ${gradientStop2})`
                        : `radial-gradient(${gradientStop1}, ${gradientStop2})`
                }`,
            }}
        />
    );
};

export default GradientOption;
