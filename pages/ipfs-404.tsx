import Link from "next/link";
import { useEffect } from "react";

export default function Redirect() {
    function loadPage(href: string) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", href, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

    useEffect(() => {
        console.log(window.history);
        console.log(window.location);
        console.log(document.referrer);

        // window.history.pushState({});
        if (window.location.href.includes("claim")) {
            document.documentElement.innerHTML = loadPage("/claim.html");
            window.history.replaceState(null, "", "/claim");
        }
    }, []);
    return <div className="">REDIRECT</div>;
}
