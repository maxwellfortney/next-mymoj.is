import { useContext } from "react";
import { EmojiContext } from "../../../pages/create";

const ChoosePageType = () => {
    const {
        inputEmojiArr,
        isCustomizeNFTOpen,
        setIsCustomizeNFTOpen,
        isChoosePageTypeOpen,
        setIsChoosePageTypeOpen,
        chosenPageType,
        setChosenPageType,
    } = useContext(EmojiContext);

    function createRedirect() {
        const newDoc = document.implementation.createHTMLDocument();
        const metaRedirect = newDoc.createElement("meta");
        metaRedirect.httpEquiv = "refresh";

        metaRedirect.content = "0; URL='https://www.google.com'";

        console.log(metaRedirect);
        newDoc.getElementsByTagName("head")[0].appendChild(metaRedirect);
        console.log(newDoc.documentElement.outerHTML);

        // document.open();
        // document.write(newDoc.documentElement.outerHTML);
        // document.close();
        return newDoc.documentElement.outerHTML;
    }

    async function pinToPinata() {
        const blob = new Blob([createRedirect()], { type: "text/html" });

        let formData = new FormData();
        formData.append(
            "file",
            blob,
            `${inputEmojiArr
                .map((emoji: any) => {
                    return emoji.symbol;
                })
                .join("")}.html`
        );

        const pinRes = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YzY2NmFiMi0zNWY3LTRmYmEtODE4Ni02YjRjOTVjOThmM2YiLCJlbWFpbCI6Im1heHdlbGxmb3J0bmV5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5NjIzM2FkZTIwYWYwMjcyNTYyMSIsInNjb3BlZEtleVNlY3JldCI6IjQ5NTBiMTc3YjdmNGYyM2Q1Y2NlMTViMzg1ZjNiMGE4ZWYwYzhhMjE5ZmU0MmFmYjAyZjZlNGVmOTY4M2FiMDYiLCJpYXQiOjE2MTg1MzMxNzl9.ZwFpQdc8-HXbmKTnaCuAyJfQfdgb1V7fNQHgZfKnUTg",
                },
                body: formData,
            }
        );
        console.log(pinRes);
    }

    function goToRedirect() {
        setChosenPageType("redirect");
        setIsChoosePageTypeOpen(false);
    }

    return (
        <div
            className="absolute left-0 z-30 flex flex-col items-center w-full bg-emojiAtYellow"
            style={{
                height: "calc(100vh - 115px)",
                maxHeight: "calc(100vh - 115px)",
                // minHeight: "750px",
            }}
        >
            <svg
                onClick={() => setIsChoosePageTypeOpen(false)}
                className="absolute w-8 h-8 text-black transition-opacity cursor-pointer right-1 sm:right-4 md:right-10 top-1 hover:opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            <h1 className="text-2xl font-black text-black sm:text-3xl md:text-4xl">
                Choose your page type
            </h1>
            <p className="text-xs font-medium text-center text-black md:text-sm">
                In order to change your decision and data after purchase you
                will have to pay a small gas fee. ~$2.50.
            </p>

            <div className="flex flex-auto w-full">
                <div className="flex flex-col items-center justify-center w-3/4 p-10 pr-5 lg:w-2/3 xl:w-3/5">
                    <div className="flex flex-col items-center justify-start w-full h-full p-3 px-4 bg-black rounded-3xl">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-2xl font-bold text-white">
                                Templates
                            </h1>
                            <p className="font-bold text-white">4 total</p>
                        </div>
                        <div className="flex flex-auto w-full mt-2 bg-white rounded-3xl">
                            a
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center flex-auto p-10 pl-5">
                    <div className="flex items-center justify-center flex-1 w-full mb-5 bg-black cursor-pointer rounded-3xl yellow-on-hover">
                        <p className="p-2 text-xl font-black text-center text-white transition-colors md:text-2xl xl:text-3xl">
                            Upload your own code
                        </p>
                    </div>
                    <div
                        onClick={goToRedirect}
                        className="flex items-center justify-center flex-1 w-full mt-5 bg-black cursor-pointer rounded-3xl yellow-on-hover "
                    >
                        <p className="p-2 text-xl font-black text-center text-white transition-colors md:text-2xl xl:text-3xl">
                            Redirect to any URL
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoosePageType;
