import Link from "next/link";
import { useEffect } from "react";

export default function Redirect() {
    useEffect(() => {
        console.log(window.history);
        console.log(window.location);
        console.log(document.referrer);
    }, []);
    return <div className="">REDIRECT</div>;
}
