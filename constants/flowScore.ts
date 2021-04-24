//import Emoji from "../components/Emoji/Emoji";
import { Emoji } from "../types/Emoji";
import { frequencyTierDict } from "./emojiData";

function isMatch(p1: number[], p2: Emoji[]): boolean {
    if(p1.length != p2.length) return false;
    let table: { [key: number]: String } = {};
    for(let i = 0; i < p1.length; i++) {
        if(p1[i] in table) {
            if(table[p1[i]] != p2[i].symbol) return false;
        } else {
            table[p1[i]] = p2[i].symbol;
        }
    }
    return true;
}

function freq(x: Emoji): number {
    return (frequencyTierDict as any)[x.symbol];
}

// Use when the value of the configuration is more
// important than the value of its constituent emojis.
function clamp(x: number): number {
    if(x == 0) return 0;
    return 3*Math.log(x);
}

function getRepetitions(a: Emoji[]) {
    if(a.length <= 0) return {};
    let rt: { [key: string]: number } = {};
    let currSym = a[0].symbol;
    let count = 0;
    for(let i = 1; i < a.length; i++) {
        if(a[i].symbol == a[i-1].symbol) {
            if(rt[a[i].symbol] == undefined) rt[a[i].symbol] = 0;
            currSym = a[i].symbol;
            if(count == 0) {
                count = 2;
            } else {
                count++;
            }
        } else {
            if(count > 1 && count > rt[currSym]) rt[currSym] = count;
            count = 0;
        }
    }
    if(count > 1 && count > rt[currSym]) rt[currSym] = count;
    return rt;
}

function calculateFlowScore5(a: Emoji[]) {
    let score = 100;
    // XXXXX -> -r
    if(isMatch([1, 1, 1, 1, 1], a)) {
        score -= clamp(freq(a[0]));
    // XXYXX -> -2r
    } else if(isMatch([1, 1, 2, 1, 1], a)) {
        score -= freq(a[0]);
        score -= freq(a[2]);
    // XYYYX -> 2r
    } else if(isMatch([1, 2, 2, 2, 1], a)) {
        score -= freq(a[0]);
        score -= freq(a[1]);
    // XYZYX -> -2.5r
    } else if(isMatch([1, 2, 3, 2, 1], a)) {
        score -= 0.5*freq(a[0]);
        score -= freq(a[1]);
        score -= freq(a[2]);
    // XXXYY -> -3r
    } else if(isMatch([1, 1, 1, 2, 2], a)) {
        score -= 2*freq(a[0]);
        score -= freq(a[3]);
    // XXYYY -> -3r
    } else if(isMatch([1, 1, 2, 2, 2], a)) {
        score -= freq(a[0]);
        score -= 2*freq(a[2]);
    // XYZAB -> -5r
    } else {
        score -= freq(a[0]);
        score -= freq(a[1]);
        score -= freq(a[2]);
        score -= freq(a[3]);
        score -= freq(a[4]);

    }
    return score;
}

function calculateFlowScore4(a: Emoji[]) {
    let score = 100;
    // XXXX -> -r
    if(isMatch([1, 1, 1, 1], a)) {
        score -= clamp(freq(a[0]));
    // XYYX -> -2r
    } else if(isMatch([1, 2, 2, 1], a)) {
        score -= freq(a[0]);
        score -= freq(a[1]);
    // XYYZ -> 3r
    } else if(isMatch([1, 2, 2, 3], a)) {
        score -= freq(a[0]);
        score -= freq(a[1]);
        score -= freq(a[3]);
    // XYYY|XXXY -> 3r
    } else if(isMatch([1, 2, 2, 2], a)) {
        score -= freq(a[0]);
        score -= 2*freq(a[1]);
    } else if(isMatch([1, 1, 1, 2], a)) {
        score -= freq(a[3]);
        score -= 2*freq(a[0]);
    // XYZA -> 4r
    } else {
        score -= freq(a[0]);
        score -= freq(a[1]);
        score -= freq(a[2]);
        score -= freq(a[3]);
    }
    return score;
}

function calculateFlowScore3(a: Emoji[]) {
    let score = 100;
    // XXX -> -r
    if(isMatch([1, 1, 1], a)) {
        score -= clamp(freq(a[0]));
    // XYX -> -1.5r
    } else if(isMatch([1, 2, 1], a)) {
        score -= 0.75*freq(a[0]);
        score -= 0.75*clamp(freq(a[1]));
    // XXY -> -2r
    // XYZ -> -3r
    } else {
        let seen: String[] = [];
        for(let i = 0; i < a.length; i++) {
            if(!seen.includes(a[i].symbol)) {
                score -= freq(a[i]);
            }
            seen.push(a[i].symbol);
        }
    }
    return score;
}

function calculateFlowScore2(a: Emoji[]) {
    let score = 100;
    // XX -> -r
    if(isMatch([1, 1], a)) {
        score -= clamp(freq(a[0]));
    // XY -> -1.5r
    } else {
        score -= 0.75*clamp(freq(a[0]));
        score -= 0.75*clamp(freq(a[1]));
    }
    return score;
}

function calculateFlowScore1(a: Emoji[]) {
    let score = 100;
    // X -> -0.5r
    score -= 0.5*clamp(freq(a[0]));
    return score;
}

export function calculateFlowScore(emojiArr: Emoji[]) {
    getRepetitions(emojiArr);
    switch(emojiArr.length) {
        case 0:
            return;
        case 1:
            return calculateFlowScore1(emojiArr);
        case 2:
            return calculateFlowScore2(emojiArr);
        case 3:
            return calculateFlowScore3(emojiArr);
        case 4:
            return calculateFlowScore4(emojiArr);
        case 5:
            return calculateFlowScore5(emojiArr);
    }
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
