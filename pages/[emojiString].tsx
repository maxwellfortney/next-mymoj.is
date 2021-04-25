import { useRouter } from "next/router";
import { useEffect } from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { emojiAtPage } from "../constants/emojiAtMetadata";
import Head from "next/head";

const UserPage = () => {
    const router = useRouter();
    const { emojiString } = router.query;

    async function getPage() {
        const pageData: emojiAtPage = await fleekStorage.getFileFromHash({
            hash: "bafybeie4gvyuu42fgea7g7gbpahy6577lkmbwszbkjmxtskts6naftk6nq",
        });

        console.log(pageData);
        // if (pageData.pageType === "redirect" && pageData.redirectURL) {
        //     router.push(pageData.redirectURL);
        // }
    }

    useEffect(() => {
        //👽👽
        getPage();
    }, []);

    return (
        <div className="flex">
            <Head>
                <title>TEST - {emojiString ? emojiString : ""}</title>
                <meta
                    property="og:title"
                    content={`TEST - ${emojiString ? emojiString : ""}`}
                    key="title"
                />
            </Head>
            <p>emojiString: {emojiString}</p>
        </div>
    );
};

export default UserPage;
