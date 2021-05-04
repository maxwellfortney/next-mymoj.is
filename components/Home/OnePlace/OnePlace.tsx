import AnimatedStack from "./AnimatedStack";
import ExampleCard from "./ExampleCard";

const OnePlace = () => {
    return (
        <div
            id="OnePlace"
            className="flex flex-col items-center justify-start w-full h-screen bg-black"
            style={{minHeight: "850px"}}
        >
            <h2 className="text-5xl font-black text-center text-white md:text-left mb-14 mt-14 md:text-7xl">
                You, all in one place.
            </h2>
            <div className="flex flex-col items-center justify-center flex-auto w-full mb-10">
                <div className="flex flex-col w-10/12 h-full">
                    <div className="flex flex-col-reverse items-center w-full md:flex-row h-1/2">
                        <div className="flex flex-col justify-center h-full md:w-2/5">
                            <h3 className="text-5xl font-black md:text-6xl text-emojiAtYellow">
                                Payments
                            </h3>
                            <p className="text-2xl font-normal text-white md:text-3xl">
                                Integrate all your crypto or fiat payment
                                addresses.
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-full p-2 my-5 md:mt-0 md:p-10 md:w-3/4 xl:w-2/3">
                            <ExampleCard />
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full h-1/2 md:flex-row">
                        <div className="w-full h-full md:w-1/2">
                            <AnimatedStack />
                        </div>
                        <div className="flex flex-col justify-center w-full h-auto md:w-1/2">
                            <h3 className="text-5xl font-black text-right md:text-6xl text-emojiAtYellow">
                                Link anything
                            </h3>
                            <p className="text-2xl font-normal text-right text-white md:text-3xl">
                                If you can type it, you can link it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnePlace;
