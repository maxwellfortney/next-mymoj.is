import SelectEmoji from "./SelectEmoji";
import { EmojiContext } from "../../../../pages/create";
import { useContext } from "react";
import { Emoji } from "../../../../types/Emoji";

interface CategoryMatrixProps {
    emojiArr: Emoji[];
    isFirst?: boolean;
    isLast?: boolean;
    id?: string;
}

function calculateCols(length: number) {
    if (length % 4 === 0) {
        return length / 4;
    } else {
        return Math.ceil(length / 4);
    }
}

const CategoryMatrix = ({
    emojiArr,
    isFirst,
    isLast,
    id,
}: CategoryMatrixProps) => {
    const { searchString, setSearchString } = useContext(EmojiContext);

    return (
        <div
            id={id}
            className={`grid gap-2 py-6 mr-12 ${isFirst ? "ml-24" : ""} ${
                isLast ? "pr-24" : ""
            }`}
            style={{
                gridTemplateRows: "repeat(4, 1fr)",
                gridTemplateColumns: `repeat(${calculateCols(
                    emojiArr?.length
                )}, 1fr)`,
            }}
        >
            {emojiArr?.map(({ symbol, label }, i) => {
                return (
                    <SelectEmoji key={symbol} symbol={symbol} label={label} />
                );
            })}
        </div>
    );
};

export default CategoryMatrix;
