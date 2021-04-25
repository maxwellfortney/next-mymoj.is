export function createJSONMetadata(emojiString: string, SVGHash: string) {
    const ret = {
        name: emojiString,
        image: `ipfs://${SVGHash}`,
    };

    return ret;
}

export interface emojiAtPage {
    pageType: string;
    redirectURL?: string;
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
