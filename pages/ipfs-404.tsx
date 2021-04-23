import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
    const router = useRouter();

    function handleRedirects() {
        const baseURL = document.getElementsByTagName("base")[0].href;

        console.log(window.history);
        console.log(window.location);
        console.log(router);

        console.log(
            window.location.pathname.substr(
                window.location.pathname.lastIndexOf("/") + 1
            )
        );

        router.basePath = baseURL;
        if (window.location.href.includes("create")) {
            router.replace("create", baseURL + "create");
        } else if (window.location.href.includes("about")) {
            router.replace("about", baseURL + "about");
        } else {
            router.replace(
                window.location.pathname.substr(-1) === "/"
                    ? window.location.pathname.substr(
                          window.location.pathname.indexOf("/") + 1
                      )
                    : window.location.pathname.substr(
                          window.location.pathname.lastIndexOf("/") + 1
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
