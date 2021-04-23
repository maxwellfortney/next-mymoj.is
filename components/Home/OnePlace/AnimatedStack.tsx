import styles from "../../../styles/Home.module.css";

interface Card {
    headline: string;
    bgColor: string;
}

const AnimatedStack = () => {
    const cardArr: Card[] = [
        { headline: "My Instagram", bgColor: "white" },
        { headline: "My Reddit", bgColor: "#FF5700" },
        { headline: "My Twitter", bgColor: "#1DA1F2" },
    ];

    return (
        <div
            className="relative flex w-full h-full p-12"
            style={{ top: "0" }}
            // style={{ top: "-7vh", left: "-7vh" }}
            // style={{ perspective: "100px", perspectiveOrigin: "50% 10%" }}
        >
            {cardArr.slice(0, 3).map((card, i) => {
                return (
                    <div
                        className={`absolute rounded-lg ${styles[`card-${i}`]}`}
                        style={{
                            boxShadow: "0 0 0.5rem rgba(255,255,255,0.2)",
                            backgroundColor: card.bgColor,
                            width: "calc(100% - 6rem)",
                            height: "calc(100% - 6rem)",
                        }}
                    >
                        <p>{card.headline}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default AnimatedStack;
