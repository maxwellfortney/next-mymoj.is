export function createJSONMetadata(emojiString: string, SVGHash: string) {
    const ret = {
        name: emojiString,
        image: `ipfs://${SVGHash}`,
    };

    return ret;
}

export interface link {
    url: string;
    title: string;
    description?: string;
    icon?: string;
}

export interface wallet {
    address: string;
    title: string;
}

export interface emojiAtPage {
    pageType: string;
    redirectURL?: string;
    templateNumber?: number;
    headline?: string;
    bio?: string;
    walletData?: wallet[];
    linkData?: link[];
}

export interface templateProps {
    emojiString: string;
    metaImage: string;
    headline: string;
    bio?: string;
    walletData?: wallet[];
    linkData?: link[];
}

export function createPageData(pageType: string, redirectURL?: string) {
    const ret: emojiAtPage = {
        pageType,
    };

    if (pageType === "redirect") {
        ret.redirectURL = redirectURL;
    }

    return ret;
}
