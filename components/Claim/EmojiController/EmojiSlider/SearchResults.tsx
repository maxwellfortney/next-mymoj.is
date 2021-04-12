import SelectEmoji from "./SelectEmoji";
import { EmojiContext } from "../../../../pages/claim";
import { useContext } from "react";

function calculateCols(length: number) {
    if (length % 4 === 0) {
        return length / 4;
    } else {
        return Math.ceil(length / 4);
    }
}

const SearchResults = ({ emojiArr }: any) => {
    return (
        <>
            {emojiArr.length === 0 ? (
                <p className="ml-24 text-4xl font-bold text-mymojisDarkText">
                    No results
                </p>
            ) : (
                <div
                    className={`grid gap-2 py-6 mr-12 ml-24`}
                    style={{
                        gridTemplateRows: "repeat(4, 1fr)",
                        gridTemplateColumns: `repeat(${calculateCols(
                            emojiArr.length
                        )}, 1fr)`,
                    }}
                >
                    {emojiArr.map(({ symbol, label }: any, i: number) => {
                        return (
                            <SelectEmoji
                                key={symbol}
                                symbol={symbol}
                                label={label}
                                inSearch={true}
                                i={i}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default SearchResults;
