// contracts/EmojiAt.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EmojiAt is ERC721URIStorage {
    address payable wallet;

    mapping (string => uint256) public emojiStringToID;
    mapping (string => string) public emojiStringToPageCID;

    // string testString0 = unicode"😂❤️";
    // string testString1 = unicode"😍🤣";
    // string testString2 = unicode"😊🙏💕😭😘";
    // string testString3 = unicode"👍😅👏😁♥️🔥💔💖💙😢🤔😆🙄💪😉☺️👌🤗";
    // string testString4 = unicode"💜😔😎😇🌹🤦🎉‼️💞✌️✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣️";
    // string testString5 = unicode"❗😜💋👀😪😑💥🙋😞😩😡🤪👊☀️😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🌈😈🤘";
    // string testString6 = unicode"💦✔️😣🏃💐☹️🎊💘😠☝️😕🌺🎂🌻😐🖕💝🙊😹🗣️💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🧡🎁⚡🌞🎈❌✊👋😲🌿🤫👈😮🙆🍻🍃🐶💁😰🤨😶🤝🚶💰🍓💢";
    // string testString7 = unicode"🇺🇸🤟🙁🚨💨🤬✈️🎀🍺🤓😙💟🌱😖👶▶️➡️❓💎💸⬇️😨🌚🦋😷🕺⚠️🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🚀🌊🤯🐷☎️💧😯💆👆🎤🙇🍑❄️🌴🇧🇷💣🐸💌📍🥀🤢👅💡💩⁉️👐📸👻🤐🤮🎼✍️🚩🍎🍊👼💍📣🥂⤵️📱☔🌙";
    // string testString8 = unicode"🍾🎧🍁⭕🏀☠️⚫🖐️😧🎯📲☘️👁️🍷👄🐟🍰💤🕊️📺💭🐱🐝🇲🇽🧚🔝📢📷🐕🎸🔫🤚🍭🍆💉🌎😦🌀👿☑️🎥🌧️👽🍋🤒🤡🍫📚🏁🤕🦄🍅🚗🚫💵⚾🔪🔔♨️🌳🔊🍬💏🍼🍜🐼🙉🐈🐻🤸🌝👸🍕🍌🍦⚪👩😿🍂📞⏰🔞🌍🌠🙀▪️☁️👹🍉🐥🌶️1️⃣🌵🇮🇳👧🍄👮💮🐰🔷🌾🔹🇹🇷🥇🇮🇹";
    // string testString9 = unicode"🍪🇦🇷🛑🐍🎓🇨🇦🍏🦁😽🚬🍖🍴🆘🤜🍿🍔📝🇯🇵🍮🍇2️⃣🏠🤰🐣🐒👦🍩🍣🤛👯🏳️‍🌈♠️🌲🐴🍛🎆💑🍞🍯☄️😸🍚🎬🎙️🇨🇴🐳🦀🥃🔸💊🐎🍹♦️🔮👨🍸🌏👴🧢🐽🐔🎻⬆️✂️👫👣🐯🎮🍵🐦🇬🇧〰️👭🐬🍟👙✖️📩👵🍨🇫🇷🐖✝️♻️🥊🦅💬🇨🇱🐢🔰🔶🎗️💄👠🥕➖🐺📖🍍🌃✴️🌌🐓👂🍤🐐🔻💻🦐🇩🇪🌛↘️✏️🧘🥁🏖️⚜️❕🅰️🚴💠㊗️🐙♣️🍡⏩🎨🐠🇰🇷🍗🚮▫️🌪️😼👤🏊🌽🎩🇪🇸🎹🍈◀️↔️🏡🇵🇰🎇🥩🐞3️⃣⬅️🌐↗️🍽️🧀🥦🐜⚔️";
    // string testString10 = unicode"😺🥞🏄🔨🏝️🔆👥👓🥒🏈🇵🇭🏋️0️⃣🚘🦖🌕🎭👾🍳🏵️🍧🔗🕋☃️🌅🤴🖖🐊🐘🌤️🥑🥚⛈️🐵🔜🍶🐄🇻🇪🐮🦈🚲⛔🕯️➕🔺💇🧠📻🥤🍝🍥💴🌬️🥓🙍⚓👰🐂📽️🏅⛅🇦🇪🇵🇪🧜📮⛳🔽🚂🏌️🐇🏍️🎲🥛🎣👱🎏🕷️🦍🔘🐅🏇🔐🏩👺🅱️🚙🐧⚖️🎃🌄🎾🐚🎺❇️🎫⌚🌋💒👳❎👟👃🛌🚓⏬📈⛄⏱️😾🛫🤱🍐☮️🚃⏳🌜📹🐛👔👗🐌🎱🌰🌮🕵️🔅✉️🇪🇬🚑📦🤥🔄🤳💲🎋🗓️🤖🥔🆗🔑🇨🇳🐤4️⃣🐑➰👩‍🎓☂️🇦🇹🦆🚌💿🏥🐋🚒🏐🇪🇨🥐🎷🗽🗡️🏏🐭🙎🌑🚔🇮🇩🚿🥝🕌🐀🛡️🔒✳️🕶️👩‍❤️‍💋‍👩🎟️🐉🔱🔎🇦🇺⚰️🐩🦑🧟🆕🦊👕🏹🇩🇿👬🍱📰🥋🚤🏰5️⃣🦉🚢🌨️📆🗝️🎌🧔💳🇺🇾🥗☯️⚙️💶⛩️🗻✒️🇺🇲🇵🇹🍠";
    // string testString11 = unicode"👷🛍️🏎️🔛🔙🗼🎖️🚺🐹🥖🇵🇷🎡🔍🏟️🖥️🌭🇹🇭✡️🏒🛀📅🖋️🇸🇪🎞️🎪🍙🛁📕👒🖇️❔🎄🕸️🥜🕴️🥟↙️◾🐲🏴🦌🆔👛�↪️🇬🇷�,🌫️🌂🕉️🆚📉🗨️🛒📛🇳🇱🐿️🅾️☢️🇲🇦🐃⛽🅿️🦇⤴️⛵👞🔓🧞⛰️📎🦎🔌🏳️🚽🍲⚒️♊👢🧙🇵🇱⛪🇧🇪🎎🔖🔋📡🌇🏉👪👖📊🐆🔁🛩️🐡🃏👩‍💻🌩️🇳🇬🐏6️⃣⛹️🗯️🇨🇭🍢🗺️🚕🇷🇺Ⓜ️⛱️🏫📀🆙🤼🐨🦂💷🥈👨‍💻🛏️◼️🚄🧖🎠🐁🗳️🏮🥪🌥️🚪㊙️🗞️👨‍⚕️🖊️⬛🆒🇨🇺🥧👩‍⚕️🇳🇮👨‍🎓🚧⛓️🛵🥅🚅🖼️♿📏🀄🖌️🉐📬🚁🗑️🤵🏷️🌡️🎐🇯🇲🦒🎒🇵🇾🇺🇦🇲🇨🥉7️⃣⌛🌒🥥🎅🧕🛐♋🧑🇩🇴🇮🇪🛸🧒📧🥢🎢🐪🇮🇱👨‍🍳🚛🥄🤹🏢💈👘🇳🇴🇬🇭🏔️〽️🚦🇿🇦🇹🇳💼♈🦓🚻🎰◽🦗🤾👚👡⛏️9️⃣🛎️🐗🌦️🇸🇦🚹🇾🇪☪️🤺🚣🗿🥘🇩🇰🦕🇱🇷🏕️☣️🌆↕️📨🏨🕹️👩‍🍳🇨🇮";
    // string testString12 = unicode"📯👜🏘️🐫⛺👩‍🏫🕳️🏯🌓🌉8️⃣💂🔉👨‍👩‍👧‍👦🇪🇺🚜🔕📥🌔🏙️🥨🇲🇾📗📜♏🇧🇴🏜️🍘🛬🌯🏗️🏴󠁧󠁢󠁥󠁮󠁧󠁿🚼🏞️🔈🕰️🏓🇨🇷👨‍🌾🦃🔦🔃🇸🇻🛳️🌘🇧🇩🧛👩‍❤️‍👩🔚🔟ℹ️🛢️🏴󠁧󠁢󠁳󠁣󠁴󠁿🇸🇩🔭🇮🇶🎍🥣🌗↖️🎳👨‍❤️‍💋‍👨👨‍🏫📄🇶🇦👨‍👩‍👧🎚️🛠️🆓🇵🇸🏛️♐🧦🗾👩‍🌾🎑🇬🇹🧤🧝➿🇻🇳📒♉♓🚭🔧♌↩️♒🏦🈵🥫🌖🛴🚖🥙🛰️🦏🇸🇬⏺️🖍️⛸️📙👲🏂*️⃣🔲🇭🇺🚐👨‍❤️‍👨🔇🦔🔯🚵🚯🕛📼🧓🎛️🇨🇿🇭🇰💺👩‍🎤⛲⚛️🕒📶🚋🇱🇧📠🚇⏲️⏪🇰🇼🛃🇭🇳👨‍✈️📓👩‍👧♎🏑📋🔼🇨🇵🇯🇴📃🔬🇫🇮🚥🇱🇰♍🇵🇦🇸🇾🚾🇭🇷🇳🇿🚍🏸🔳🛂📵⛑️🏚️🎽🚰🏪⛷️👩‍💼♑🇨🇲🇱🇾⏫🏣🚉🛅⚕️⛴️👁️‍🗨️🏧◻️👩‍🔬⏹️🇷🇴👩‍👦⬜";
    // string testString13 = unicode"#️⃣🇦🇱🇹🇼🛣️🏤🛄🇮🇸🏬👨‍🎤🕐🎦👨‍💼💹☸️📴📐🖱️🇭🇹🇸🇳🔩🈲🎴📳☦️🚆📁📔🇦🇫👩‍🎨🕑🚸🧣👨‍🚀🇧🇭🏭🏺🇬🇳🤽🛥️🇲🇱🌁🤶🇦🇿💽🇦🇴🚎🇮🇷🇳🇵🗒️🇨🇩🛋️⌨️🆎🧗🧥🇰🇪🛶📑👝🇦🇲⏯️🇬🇪💱👨‍🎨🇧🇬🇪🇦👩‍⚖️🕓👩‍🚀🚞👨‍🚒🆖🔀👨‍🔬👨‍⚖️👨‍👩‍👦‍👦🏴󠁧󠁢󠁷󠁬󠁳󠁿🥠🚳🇧🇯🇲🇬🇪🇪⏭️🕎🈚🚡🕕🇷🇸🉑📂🇹🇿📫🕘🚊🚈🔂➗🕗👨‍👩‍👧‍👧🈹🇱🇺🛤️🇺🇬🕖🈴👨‍🔧🔏🇧🇼🚷🇲🇰🇱🇻🕙🇹🇹🇱🇹👩‍❤️‍💋‍👨👨‍👧📟👩‍✈️⏸️👩‍🚒🇿🇼🥡🇸🇰🕔";
    // string testString14 = unicode"🇴🇲💾📤⚗️🔠🚝🆑🇲🇲👨‍👦🇲🇹🕚🇧🇦👩‍👧‍👦🎿🔤🈶🚱🚏🇳🇪👩‍🔧🇧🇸🕍🇰🇭🔢🇨🇾📭📪🈳🇲🇷👩‍❤️‍👨👩‍👩‍👧🇰🇿🖨️⏮️🇬🇾🇸🇮🇧🇾🇸🇴🕠🇦🇼🖲️⚱️🇲🇪🇿🇲🇧🇧🇹🇯🇨🇬🇺🇿🇸🇱🇳🇦🚟🇧🇮🇽🇰🇦🇮🇪🇹👩‍👩‍👧‍👧🇦🇬👨‍🏭👩‍👧‍👧👨‍👨‍👧‍👧🈯🚠🕟👨‍👨‍👦‍👦👩‍👩‍👧‍👦🇷🇼🇦🇽👩‍👦‍👦🇫🇯🥌🇦🇸🇹🇩👨‍👧‍👦🇦🇩🇬🇲🇬🇦🗂️🇧🇲👩‍🏭";

    function compareStrings(string memory a, string memory b) internal pure returns(bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address payable _wallet) ERC721("EmojiAt", "EMOJIAT") {
        wallet = _wallet;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function setCIDForEmojiString(string memory emojiString, string memory newPageCID) public {
        uint256 tokenID = emojiStringToID[emojiString];
        // The token must exits, and the sender must be the owner
        require(_exists(tokenID));
        require(ownerOf(tokenID) == msg.sender);

        emojiStringToPageCID[emojiString] = newPageCID;        
    }

    function mint(string memory emojiString, string memory metaHash, string memory pageHash) public payable {
        // ADD REQUIRES

        // Increment token supply        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        // Map emojiString to tokenID
        emojiStringToID[emojiString] = newItemId;
        // Map emojiString to IPFS CID
        emojiStringToPageCID[emojiString] = pageHash;

        _safeMint(msg.sender, newItemId);        
        _setTokenURI(newItemId, metaHash);

        wallet.transfer(msg.value);
    }
}