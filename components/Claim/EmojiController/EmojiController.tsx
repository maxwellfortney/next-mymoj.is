import EmojiSlider from "./EmojiSlider/EmojiSlider";
import CategorySelector from "./CategorySelector/CategorySelector";

const EmojiController = () => {
    return (
        <div className="flex flex-col items-center justify-end w-full">
            <EmojiSlider />
            <CategorySelector />
        </div>
    );
};

export default EmojiController;
