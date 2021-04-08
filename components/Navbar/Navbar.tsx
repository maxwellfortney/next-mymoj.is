import React from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import BaseLink from "../BaseLink";
import style from "../../styles/Navbar.module.css";

const Navbar = () => {
    return (
        <div
            className="flex justify-between w-full animate-fade-in-up"
            style={{ height: "115px", minHeight: "115px" }}
        >
            <div className="flex items-center">
                <Link href="/">
                    <a
                        className={`text-4xl font-black transition-opacity bg-clip-text ${style["yellow-title"]} hover:opacity-60`}
                    >
                        MyMoj.is
                    </a>
                </Link>
            </div>
            <div className="flex items-center">
                <BaseLink href="/claim">
                    <a
                        className={`mr-10 text-xl font-semibold transition-opacity ${style["link"]} hover:opacity-60`}
                    >
                        Claim
                    </a>
                </BaseLink>
                <Link href="/claim">
                    <a
                        className={`mr-10 text-xl font-semibold transition-opacity ${style["link"]} hover:opacity-60`}
                    >
                        Claim
                    </a>
                </Link>
                <Link href="/about">
                    <a
                        className={`mr-10 text-xl font-semibold transition-opacity ${style["link"]} hover:opacity-60`}
                    >
                        About
                    </a>
                </Link>
                <Link href="/login">
                    <a
                        className={`flex items-center py-3 text-xl font-black transition bg-white rounded-lg shadow-xl px-7 ${style["login-button"]}`}
                    >
                        <p
                            className={`transition-opacity bg-clip-text  ${style["login-text"]}`}
                        >
                            Login
                        </p>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
