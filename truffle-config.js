const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");

module.exports = {
    contracts_build_directory: path.join(__dirname, "src/contracts"),
    networks: {
        // mainnet: {
        //     provider: function () {
        //         return new HDWalletProvider(
        //             "7e1cef9859dd7cc0607b4a5885d7b0d1caa6f4640d40a104fa386d8f4816f833",
        //             "https://mainnet.infura.io/v3/ee40d7f08ab54ca1a1dbb7c2d639d7f6"
        //         );
        //     },
        //     network_id: "1",
        // },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(
                    "db687b877edc2939b3f8d4da14f29ed181a08fc59658390013b4e26fe337aa7b",
                    "https://rinkeby.infura.io/v3/48dbaad3d97f4f6abebb51c4df73e834"
                );
            },
            network_id: "*",
        },
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
    },
    compilers: {
        solc: {
            version: "^0.8.0",
            parser: "solcjs",
        },
    },
};
