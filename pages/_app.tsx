import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div
            className={`flex flex-col items-center justify-start w-full h-full mx-auto`}
        >
            <Navbar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
