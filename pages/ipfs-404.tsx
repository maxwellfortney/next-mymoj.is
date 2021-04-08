import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
    const router = useRouter();

    function handleRedirects() {
        const baseURL = document.getElementsByTagName("base")[0].href;

        console.log(window.history);
        console.log(window.location);
        console.log(router);

        console.log(window.location.pathname.indexOf(baseURL));
        console.log(
            window.location.pathname.substr(
                window.location.pathname.indexOf(baseURL)
            )
        );

        // router.basePath = baseURL;
        if (window.location.href.includes("claim")) {
            router.replace("claim", baseURL + "claim");
        } else if (window.location.href.includes("about")) {
            router.replace("about", baseURL + "about");
        } else {
            router.replace(
                window.location.pathname.substr(
                    window.location.pathname.indexOf(baseURL)
                ),
                window.location.pathname
            );
        }
    }

    useEffect(() => {
        handleRedirects();
    }, []);
    return <div className="">REDIRECT</div>;
}
