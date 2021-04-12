import Head from "next/head";
import MyMojisExample from "../components/Home/MyMojisExample/MyMojisExample";
import CustomizePage from "../components/Home/CustomizePage/CustomizePage";
import AboutIPFS from "../components/Home/AboutIPFS/AboutIPFS";
import BaseLink from "../components/BaseLink";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div
            className={`flex flex-col items-center justify-start w-11/12 ${styles["Home"]}`}
        >
            <div
                className={`flex flex-col items-center justify-around w-full ${styles["main-container"]}`}
            >
                <div className="flex flex-col animate-fade-in-up">
                    <h1
                        className={`text-5xl font-black text-center ${styles["main-title"]}`}
                    >
                        We believe in a<br /> decentralized and
                        <br /> open future.
                    </h1>
                    <h2
                        className={`mt-6 text-2xl text-center ${styles["sub-title"]}`}
                    >
                        Where you truly own your assets,
                        <br /> and can use and share them however you please.
                    </h2>
                </div>
                <MyMojisExample />
            </div>
            <div className="flex flex-col items-center justify-start w-full mb-36">
                <CustomizePage />
            </div>

            <div className="flex flex-col items-center justify-start w-full mb-36">
                <AboutIPFS />
            </div>
        </div>
    );
}
