const EmojiAt = artifacts.require("EmojiAt");

module.exports = function (deployer, network, accounts) {
    // console.log(
    //     "Profits will be sent to: 0xb878bb84a0368c6c98d7b3e7f0f805068c2e32af"
    // );
    deployer.deploy(EmojiAt, accounts[0]);
};
