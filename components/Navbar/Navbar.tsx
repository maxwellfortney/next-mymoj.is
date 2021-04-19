import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import BaseLink from "../BaseLink";
import styles from "../../styles/Navbar.module.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../web3/connectors";

const Navbar = () => {
    const [isHovering, setIsHovering] = useState(false);

    const { activate, account, deactivate } = useWeb3React();

    return (
        <div
            className="flex justify-between w-11/12 animate-fade-in-up"
            style={{ height: "115px", minHeight: "115px" }}
        >
            <div className="flex items-center">
                <BaseLink href="/">
                    <a
                        className={`transition-opacity flex items-center hover:opacity-60`}
                    >
                        <img
                            src="/Logos/Emoji@.svg"
                            style={{ height: "75px" }}
                        />
                    </a>
                </BaseLink>
            </div>
            <div className="flex items-center">
                <BaseLink href="/claim">
                    <a
                        className={`mr-10 text-2xl font-semibold transition-opacity ${styles["link"]} hover:opacity-60`}
                    >
                        claim
                    </a>
                </BaseLink>
                <BaseLink href="/about">
                    <a
                        className={`mr-10 text-2xl font-semibold transition-opacity ${styles["link"]} hover:opacity-60`}
                    >
                        mission
                    </a>
                </BaseLink>
                {/* <BaseLink href="/login"> */}

                {account ? (
                    <div
                        onClick={deactivate}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`cursor-pointer flex items-center py-2.5 text-xl font-semibold rounded-xl px-7 ${styles["login-button"]}`}
                    >
                        <p
                            className={`transition-opacity  ${styles["login-text"]}`}
                        >
                            {isHovering
                                ? "Logout"
                                : `${account.substr(0, 10)}...`}
                        </p>
                    </div>
                ) : (
                    <div
                        onClick={() => activate(injected)}
                        className={`cursor-pointer flex items-center py-2.5 text-xl font-semibold transition rounded-xl px-7 ${styles["login-button"]}`}
                    >
                        <p
                            className={`transition-opacity ${styles["login-text"]}`}
                        >
                            Login
                        </p>
                    </div>
                )}
                {/* </BaseLink> */}
            </div>
        </div>
    );
};

export default Navbar;
