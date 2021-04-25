// contracts/EmojiAt.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EmojiAt is ERC721URIStorage {
    address payable wallet;

    mapping (string => string) public emojiStrings;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address payable _wallet) ERC721("EmojiAt", "EMOJIAT") {
        wallet = _wallet;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function mint(string memory emojiString, string memory metaHash) public payable {
        emojiStrings[emojiString] = metaHash;
        
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        
        _setTokenURI(newItemId, metaHash);
        wallet.transfer(msg.value);
    }
}