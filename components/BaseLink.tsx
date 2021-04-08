import { useMemo } from "react";
import { resolve } from "url";
import Link from "next/link";

const BaseLink = ({ href, as, ...rest }: any) => {
    const newAs = useMemo(() => {
        let baseURI_as = as || href;

        // make absolute url relative
        // when displayed in url bar
        if (baseURI_as.startsWith("/")) {
            //  for static html compilation
            baseURI_as = "." + href;
            // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="./about">About</a>

            // on the client
            //   document is unavailable when compiling on the server
            if (typeof document !== "undefined") {
                const { pathname } = window.location;
                const ipfsMatch = new RegExp(".*\\/Qm\\w{44}").exec(pathname);
                console.log(ipfsMatch);
                baseURI_as = resolve(
                    ipfsMatch ? ipfsMatch[0] : "/",
                    baseURI_as
                );
                // => <a href="https://gateway.ipfs.io/ipfs/Qm<hash>/about">About</a>
            }
        }
        return baseURI_as;
    }, [as, href]);

    return <Link {...rest} href={href} as={newAs} />;
};

export default BaseLink;
