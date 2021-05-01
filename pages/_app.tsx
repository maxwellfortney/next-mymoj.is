import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { useEagerConnect, useInactiveListener } from "../web3/hooks";
import { injected, network } from "../web3/connectors";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { ethers } from "ethers";
import { testABI } from "../constants/abi";
import { useRouter } from "next/router";

function getLibrary(provider: any, connector: any) {
    const library = new Web3Provider(provider);
    console.log(library);
    library.pollingInterval = 12000;
    return library;
}

async function testStuff(contract: any) {
    console.log(await contract.emojiStringToPageCID("👽👽"));
}

function ChainId() {
    const { chainId, library } = useWeb3React();

    console.log(library);
    const contract = new ethers.Contract(
        "0x5b239e16a89e7a1679cdd6353bdfd9b900b9c7c2",
        testABI,
        library
    );

    console.log(contract);
    // testStuff(contract);

    return (
        <div className="z-30 p-3 bg-white">
            <span>Chain Id</span>
            <span role="img" aria-label="chain">
                ⛓
            </span>
            <span>{chainId ?? ""}</span>
        </div>
    );
}

function MyApp({ Component, pageProps }: any) {
    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        error,
    } = useWeb3React<Web3Provider>();

    const { pathname } = useRouter();

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState<any>();
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    console.log(triedEager);

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    console.log(pathname);
    console.log(pathname.includes("mission"));
    return (
        <div
            className={`flex flex-col items-center justify-start w-full h-full mx-auto bg-emojiAtYellow`}
        >
            {/* <ChainId /> */}
            {pathname.includes("create") ||
            pathname.includes("mission") ||
            pathname === "/" ? (
                <Navbar />
            ) : null}

            <Component {...pageProps} />

            {pathname.includes("create") || pathname === "/" ? (
                <Footer />
            ) : null}
        </div>
    );
}

function Web3Wrapper({ Component, pageProps }: AppProps) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <MyApp Component={Component} pageProps={pageProps} />
        </Web3ReactProvider>
    );
}

export default Web3Wrapper;
