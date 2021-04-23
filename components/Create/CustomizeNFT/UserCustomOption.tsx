import styles from "../../../styles/CustomizeNFT.module.css";

interface UserCustomOptionProps {
    customColor1: string;
    activeColor1: string;
    customColor2: string;
    activeColor2: string;
    editCustomColor: number;
    setEditCustomColor: Function;
    setGradientStop1: Function;
    setGradientStop2: Function;
}

const UserCustomOption = ({
    customColor1,
    activeColor1,
    customColor2,
    activeColor2,
    editCustomColor,
    setEditCustomColor,
    setGradientStop1,
    setGradientStop2,
}: UserCustomOptionProps) => {
    function setAsActive() {
        setGradientStop1(customColor1);
        setGradientStop2(customColor2);
    }

    function isActive() {
        if (activeColor1 === customColor1 && activeColor2 === customColor2) {
            return true;
        }
        return false;
    }

    return (
        <div
            onClick={() => {
                customColor1.length > 0 && customColor2.length > 0
                    ? setAsActive()
                    : null;
            }}
            className={`flex p-2.5 bg-white flex-col items-center justify-center shadow-xl rounded-2xl cursor-pointer relative ${
                styles["gradient-option"]
            } ${isActive() ? `${styles["active-gradient-option"]}` : ""}`}
            style={{ width: "90px", height: "90px" }}
        >
            <div className="flex flex-col justify-between w-full h-full">
                <div
                    onClick={() => setEditCustomColor(1)}
                    className="flex items-center justify-center w-full text-sm rounded-lg shadow-inner h-2/5"
                    style={{
                        backgroundColor: `${
                            customColor1.length > 0 ? customColor1 : "white"
                        }`,
                    }}
                >
                    {customColor1.length > 0 ? (
                        ""
                    ) : (
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    )}
                </div>
                <div
                    onClick={() => setEditCustomColor(2)}
                    className="flex items-center justify-center w-full text-sm rounded-lg shadow-inner h-2/5"
                    style={{
                        backgroundColor: `${
                            customColor2.length > 0 ? customColor2 : "white"
                        }`,
                    }}
                >
                    {customColor2.length > 0 ? (
                        ""
                    ) : (
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCustomOption;
