import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { emojiAtPage, wallet, link } from "../constants/emojiAtMetadata";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getWeb3ReactContext, useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { testABI } from "../constants/abi";
import Template1 from "../components/Templates/Template1";

const emojiRegex = require("emoji-regex/RGI_Emoji.js");

interface UserPageProps {
    emojiString: string;
    metaImage: string;
    isAvailable?: boolean;
    isValidEmojiString?: boolean;
    isTemplate?: boolean;
    templateNumber?: number;
    headline?: string;
    bio?: string;
    walletData?: wallet[];
    linkData?: link[];
}

async function getPage(emojiString: string) {
    try {
        const pageData = await fleekStorage.get({
            apiKey: process.env.FLEEK_STORAGE_KEY as string,
            apiSecret: process.env.FLEEK_STORAGE_SECRET as string,
            key: `/${emojiString}/pageData.json`,
            getOptions: ["data"],
        });

        const pageJson = JSON.parse(pageData.data.toString());
        console.log(pageJson);

        return pageJson as emojiAtPage;
    } catch (e) {
        return false;
    }
}

async function getMetaImage(emojiString: string) {
    const metaImageData = await fleekStorage.get({
        apiKey: process.env.FLEEK_STORAGE_KEY as string,
        apiSecret: process.env.FLEEK_STORAGE_SECRET as string,
        key: `${emojiString}/${emojiString}.jpg`,
        getOptions: ["publicUrl"],
    });

    console.log(metaImageData);

    return metaImageData["publicUrl"];

    // return metaImageBuffer.data.toString();
}

async function parseEmojiString(emojiString: string) {
    const regex = emojiRegex();
    const parsedString = emojiString.replace(regex, "");

    if (parsedString.length !== 0) {
        return false;
    }

    console.log("PARSED: ", emojiString.replace(regex, ""));
    return true;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const emojiString = context.params?.emojiString as string;

    const isValidEmojiString = await parseEmojiString(emojiString);

    if (isValidEmojiString) {
        const pageData = await getPage(emojiString);
        const metaImage = await getMetaImage(emojiString);

        // Page doesnt exists
        if (pageData === false) {
            return {
                props: {
                    emojiString: emojiString,
                    isAvailable: true,
                    isValidEmojiString,
                },
            };
        }
        // Page is redirect
        else if (pageData.pageType === "redirect" && pageData.redirectURL) {
            return {
                redirect: {
                    destination: pageData.redirectURL,
                    permanent: false,
                },
            };
        } else if (
            pageData.pageType === "template" &&
            pageData.templateNumber
        ) {
            return {
                props: {
                    emojiString: emojiString,
                    metaImage,
                    isValidEmojiString,
                    isTemplate: true,
                    templateNumber: pageData.templateNumber,
                    headline: pageData.headline,
                    bio: pageData?.bio ? pageData?.bio : null,
                    linkData: pageData?.linkData ? pageData?.linkData : null,
                    walletData: pageData?.walletData
                        ? pageData?.walletData
                        : null,
                },
            };
        }
    } else {
        return {
            props: {
                emojiString: emojiString,
                isValidEmojiString,
            },
        };
    }

    return {
        props: { emojiString: emojiString },
    };
};

const UserPage = ({
    emojiString,
    metaImage,
    isAvailable,
    isValidEmojiString,
    isTemplate,
    templateNumber,
    headline,
    bio,
    linkData,
    walletData,
}: UserPageProps) => {
    // const router = useRouter();
    // const { emojiString } = router.query;
    console.log(emojiString);

    if (isTemplate) {
        return (
            <>
                <Head>
                    <title>Emoji.at | 404</title>

                    <meta
                        property="og:title"
                        content={`TEST - ${emojiString ? emojiString : ""}`}
                        key="title"
                    />
                </Head>
                {templateNumber === 1 && (
                    <Template1
                        emojiString={emojiString}
                        metaImage={metaImage}
                        headline={headline as string}
                        bio={bio}
                        walletData={walletData}
                        linkData={linkData}
                    />
                )}
            </>
        );
    } else {
        return (
            <div className="flex">
                <Head>
                    {isValidEmojiString ? (
                        <title>{`${emojiString}${
                            isAvailable ? " | Claim now!" : ""
                        }`}</title>
                    ) : (
                        <title>Emoji.at | 404</title>
                    )}

                    {isValidEmojiString ? (
                        <meta
                            property="og:title"
                            content={`${emojiString}${
                                isAvailable ? " | Claim now!" : ""
                            }`}
                            key="title"
                        />
                    ) : (
                        <meta
                            property="og:title"
                            content="Emoji.at | 404"
                            key="title"
                        />
                    )}
                </Head>
                {isValidEmojiString ? (
                    <div className="flex flex-col items-center justify-center">
                        <p>emojiString: {emojiString}</p>
                        <p>Claim now!</p>
                    </div>
                ) : (
                    <p>404: {emojiString}</p>
                )}
            </div>
        );
    }
};

export default UserPage;
