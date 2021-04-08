import Link from "next/link";
import { useRouter } from "next/router";
import { createElement, useEffect } from "react";
import BaseLink from "../components/BaseLink";

export default function Redirect() {
    const router = useRouter();

    function loadPage(href: string) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", href, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

    function handleRedirects() {
        const baseURL = document.getElementsByTagName("base")[0].href;

        console.log(window.history);
        console.log(window.location);
        console.log(document.referrer);

        console.log(router);
        // router.replace(window.location.href);
        // window.history.pushState({});
        // router.replace("/claim");
        router.basePath = baseURL;
        if (window.location.href.includes("claim")) {
            // window.history.replaceState(null, "", "/claim");
            // document.documentElement.innerHTML = loadPage("/claim.html");
            router.replace("claim", baseURL + "claim");
        } else {
            // router.replace();
        }
    }

    useEffect(() => {
        handleRedirects();
    }, []);
    return <div className="">REDIRECT</div>;
}
