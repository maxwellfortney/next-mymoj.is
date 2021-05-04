const Footer = () => {
    return (
        <div className="z-10 flex flex-col items-center justify-center w-full bg-black">
            <div className="flex flex-col items-center justify-between w-11/12 my-8 md:flex-row text-emojiAtYellow">
                <div className="flex flex-auto w-3/4 h-full">
                    {/* <img className="h-3/4" src="/Logos/Emoji@_Yellow.svg" /> */}
                    a
                </div>
                <div className="flex justify-around w-11/12 text-4xl md:w-1/4 text-emojiAtYellow">
                    <div className="flex flex-col">
                        <a>create</a>
                        <a className="my-8">mission</a>
                        <a>contact</a>
                    </div>
                    <div className="flex flex-col">
                        <a>opensea</a>
                        <a className="my-8">discord</a>
                        <a>terms</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
