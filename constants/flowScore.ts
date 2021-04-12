import { Emoji } from "../types/Emoji";
import { frequencyTierDict } from "./emojiData";

export function calculateFlowScore(emojiArr: Emoji[]) {
    if (emojiArr.length === 0) return;
    console.log(emojiArr);
    const patternScore = calculatePatternScore(emojiArr);
    const averagePopularity = calculateAveragePopularity(emojiArr);
    console.log(averagePopularity);
    return patternScore;
}

function calculatePatternScore(emojiArr: Emoji[]) {
    console.log(emojiArr);
    const length = emojiArr.length;
    const allRepeating = emojiArr.every((item: Emoji) => {
        return item.symbol === emojiArr[0].symbol;
    });
    const isBookends = emojiArr[0].symbol === emojiArr[length - 1].symbol;
    const modeRepeatingFraction = calculateRepeatingFraction(emojiArr);

    if (length === 1) {
        return 10;
    } else if (length == 2) {
        if (allRepeating) {
            return 9.5;
        } else return 9.2;
    } else if (length === 3) {
        if (allRepeating) {
            return 9;
        } else if (isBookends) {
            return 8.5;
        } else if (modeRepeatingFraction === 2 / 3) {
            return 8;
        } else return 7;
    } else if (length === 4) {
        if (allRepeating) {
            return 8.5;
        } else if (isBookends && emojiArr[1].symbol === emojiArr[2].symbol) {
            return 8.5;
        } else if (isBookends) {
            return 8;
        } else if (
            emojiArr[0].symbol === emojiArr[2].symbol &&
            emojiArr[1].symbol === emojiArr[3].symbol
        ) {
            return 8.3;
        } else if (modeRepeatingFraction === 2 / 4) {
            return 7.9;
        } else return 6.9;
    } else if (length === 5) {
        if (allRepeating) {
            return 7.5;
        } else if (isBookends && emojiArr[2].symbol === emojiArr[0].symbol) {
            if (emojiArr[1].symbol === emojiArr[3].symbol) {
                return 7.2;
            } else return 7;
        } else if (isBookends && modeRepeatingFraction === 3 / 5) {
            return 6.9;
        } else if (modeRepeatingFraction === 3 / 5) {
            return 6.7;
        } else return 5.9;
    }
}

function getMode(emojiArr: Emoji[]) {
    return emojiArr.sort(
        (a: Emoji, b: Emoji) =>
            emojiArr.filter((v: Emoji) => v.symbol === a.symbol).length -
            emojiArr.filter((v: Emoji) => v.symbol === b.symbol).length
    )[emojiArr.length - 1];
}

function calculateRepeatingFraction(emojiArr: Emoji[]) {
    const mode = getMode(emojiArr);
    console.log(mode);
    return (
        emojiArr.filter((x: Emoji) => x.symbol === mode.symbol).length /
        emojiArr.length
    );
}

function calculateAveragePopularity(emojiArr: Emoji[]) {
    let freqs: number[] = [];
    emojiArr.forEach((emoji) => {
        freqs.push((frequencyTierDict as any)[emoji.symbol]);
    });

    return freqs.reduce((a, b) => a + b, 0) / freqs.length;
}
