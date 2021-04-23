import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { useEagerConnect, useInactiveListener } from "../web3/hooks";
import { injected, network } from "../web3/connectors";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";

function getLibrary(provider: any, connector: any) {
    const library = new Web3Provider(provider);
    console.log(library);
    library.pollingInterval = 12000;
    return library;
}

function ChainId() {
    const { chainId } = useWeb3React();

    return (
        <>
            <span>Chain Id</span>
            <span role="img" aria-label="chain">
                ⛓
            </span>
            <span>{chainId ?? ""}</span>
        </>
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

    return (
        <div
            className={`flex flex-col items-center justify-start w-full h-full mx-auto bg-emojiAtYellow`}
        >
            {/* <ChainId /> */}
            <Navbar />
            <Component {...pageProps} />
            <Footer />
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
