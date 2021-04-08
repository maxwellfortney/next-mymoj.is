import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
    const router = useRouter();

    function handleRedirects() {
        const { pathname } = window.location;
        const ipfsMatch = new RegExp(".*\\/Qm\\w{44}").exec(pathname);

        // const baseURL = document.getElementsByTagName("base")[0].href;
        const baseURL = ipfsMatch ? ipfsMatch[0] : "/";
        console.log(window.history);
        console.log(window.location);
        console.log(router);

        // router.basePath = baseURL;
        if (window.location.href.includes("claim")) {
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
