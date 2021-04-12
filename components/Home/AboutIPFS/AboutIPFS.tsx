import React from "react";
import styles from "../../../styles/AboutIPFS.module.css";

const AboutIPFS = () => {
    return (
        <div className="flex flex-col items-center justify-start w-full">
            <h2
                className={`self-end font-black text-right ${styles["green-title"]}`}
            >
                The distributed web
                <br /> through IPFS
            </h2>
            <p className="w-3/4 mt-6 text-2xl text-left">
                When you create your custom MyMoj.is URL the files get
                distributed and pinned using the Inter Planetary File System to
                many peers across the world, with no central authority or
                location. This pinning results in a hash that can be used to
                access the original files. The hash is then stored on the
                ethereum blockchain as an ERC721 NFT that you are now the owner
                of!
            </p>
            <p className="w-3/4 mt-4 text-2xl text-left">
                As the owner you are the only person in the world capable of
                modifying the files the hash is associated with. So please dont
                lose your wallet login 😉.
            </p>
            <div
                className={`flex items-center justify-center w-3/4 mt-6 shadow-lg ${styles["AnimationPlaceholder"]}`}
            >{`<ANIMATIONHERE>`}</div>
        </div>
    );
};

export default AboutIPFS;
