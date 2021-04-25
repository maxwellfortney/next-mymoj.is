import { useRouter } from "next/router";
import { useEffect } from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { emojiAtPage } from "../constants/emojiAtMetadata";

const UserPage = () => {
    const router = useRouter();
    const { emojiString } = router.query;

    async function getPage() {
        const pageData: emojiAtPage = await fleekStorage.getFileFromHash({
            hash: "bafybeie4gvyuu42fgea7g7gbpahy6577lkmbwszbkjmxtskts6naftk6nq",
        });

        console.log(pageData);
        if (pageData.pageType === "redirect" && pageData.redirectURL) {
            router.push(pageData.redirectURL);
        }
    }

    useEffect(() => {
        //👽👽
        getPage();
    }, []);

    return <p>emojiString: {emojiString}</p>;
};

export default UserPage;
