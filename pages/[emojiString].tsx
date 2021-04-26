import { useRouter } from "next/router";
import { useEffect } from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { emojiAtPage } from "../constants/emojiAtMetadata";
import Head from "next/head";
import { GetServerSideProps } from "next";

async function getPage() {
    const pageData: emojiAtPage = await fleekStorage.getFileFromHash({
        hash: "bafybeie4gvyuu42fgea7g7gbpahy6577lkmbwszbkjmxtskts6naftk6nq",
    });

    console.log(pageData);
    return pageData;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log(context);

    console.log(context.params?.emojiString);

    const pageData = await getPage();

    if (
        pageData.pageType === "redirect" &&
        pageData.redirectURL &&
        context.params?.emojiString === "redirectTest"
    ) {
        return {
            redirect: {
                destination: pageData.redirectURL,
                permanent: false,
            },
        };
    }

    return {
        props: { emojiString: context.params?.emojiString },
    };
};

const UserPage = ({ emojiString }: any) => {
    // const router = useRouter();
    // const { emojiString } = router.query;
    console.log(emojiString);

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
                <title>{emojiString}</title>

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
