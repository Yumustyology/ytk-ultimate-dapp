// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./YTKNFT.sol";

interface YTKNFTContractInterface {
    function mint(address recipient) external;

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable;

    function customTokenAddressValue() external view returns (address);
}

contract YtkNftMarketplace is ReentrancyGuard {
    address customTokenAddress;
    address ytkNftAddress;
    address payable public immutable owner; // the account that receives fees
    uint256 public feePercent; // the fee percentage on sales
    uint256 public itemCount;
    uint256 public soldItemCount;
    YTKNFTContractInterface private nft;

    struct Item {
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool listed;
    }

    struct SoldItemStruct {
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address seller;
        address buyer;
        bool sold;
    }

    // itemId -> Item
    mapping(uint256 => Item) public items;
    mapping(uint256 => SoldItemStruct) public soldItems;

    // minting fee
    mapping(string => uint) public mintingFees;

    event Offered(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        bool listed,
        address indexed seller
    );
    event Bought(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );

    event SoldNewItem(
        uint256 itemId,
        IERC721 nft,
        uint256 indexed tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );

    event FeePercentageChanged(uint256 newFeePercentage);

    constructor(
        uint256 _feePercent,
        address _ytkNftAddress,
        address _customTokenAddress
    ) {
        owner = payable(msg.sender);
        feePercent = _feePercent;
        // mintingFees['etherMint'] = 1e18 / 10;
        mintingFees["etherMint"] = 1000000000000000 wei; //0.001 ether;
        mintingFees["ytkMint"] = 100000000000000000 wei; // 0.1 ether;
        nft = YTKNFTContractInterface(_ytkNftAddress);
        customTokenAddress = _customTokenAddress;
    }

    // ytk contract for payment interaction
    // IERC20 customToken = IERC20(nft.customTokenAddressValue());
    IERC20 customToken = IERC20(customTokenAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    // function to set the feepercentage value
    function setFeePercentage(uint256 newFeePercentage) external onlyOwner {
        require(
            newFeePercentage >= 0,
            "Fee percentage cannot be negative or 0"
        );
        feePercent = newFeePercentage;
        emit FeePercentageChanged(newFeePercentage);
    }

    // function to set minting fee for different minting types
    function setMintingFee(string memory mintingType, uint256 fee)
        public
        onlyOwner
    {
        mintingFees[mintingType] = fee;
    }

    // function that allows marketplace owner to withdraw money from the marketplace
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // this functions allows the minting with ytk  and setting the  amount for listing
    function mintWithYungToken(
        address recipient,
        uint256 _nextTokenId,
        uint256 _tokenAmount,
        uint256 _price,
        IERC721 _ytkNft,
        string memory mintingType
    ) external nonReentrant {
        require(mintingFees[mintingType] > 0, "Invalid minting type");
        require(
            _tokenAmount == mintingFees[mintingType],
            "Incorrect payment amount"
        );
        uint256 tokenBal = customToken.allowance(msg.sender, address(this));
        require(tokenBal >= _tokenAmount, "Insufficient token allowance");
        // minting fees i think
        customToken.transferFrom(msg.sender, address(this), _tokenAmount);
        // mint nft
        nft.mint(recipient);
        // transfer nft
        nft.transferFrom(msg.sender, address(this), _nextTokenId);
        // increase item count
        itemCount++;
        // register new item
        items[itemCount] = Item(
            itemCount,
            _ytkNft,
            _nextTokenId,
            _price,
            payable(msg.sender),
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_ytkNft),
            _nextTokenId,
            _price,
            false,
            msg.sender
        );
    }

    function mintWithEther(
        address recipient,
        uint256 _price,
        uint256 _nextTokenId,
        IERC721 _ytkNft,
        string memory mintingType
    ) external payable nonReentrant {
        require(msg.value > 0, "Ether value must be greater than 0");
        require(mintingFees[mintingType] > 0, "Invalid minting type");
        require(
            msg.value == mintingFees[mintingType],
            "Incorrect payment amount"
        );
        require(recipient != address(0), "Invalid recipient address");
        // mint nft
        nft.mint(recipient);
        //  transfer nft to the marketplace
        // nft.transferFrom(msg.sender, address(this), _nextTokenId);
        // increase item count
        itemCount++;
        // register new item
        items[itemCount] = Item(
            itemCount,
            _ytkNft,
            _nextTokenId,
            _price,
            payable(msg.sender),
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_ytkNft),
            _nextTokenId,
            _price,
            false,
            msg.sender
        );
    }

    function buyWithYungToken(
        IERC721 _ytkNft,
        uint256 _tokenId,
        uint256 _tokenAmount
    ) public nonReentrant {
        // Get the total price of the item
        uint256 _totalPrice = getTotalPrice(_tokenId);

        // Get the item and soldItem structs
        Item storage item = items[_tokenId];
        SoldItemStruct storage soldItem = soldItems[_tokenId];

        // check if the item is for saLe
        require(item.listed, "Item is not listed for sale");

        // Check that the Yung Token contract is correct and the token amount is greater than 0
        // require(address(_ytkNft) == address(nft), "he provided YTK NFT contract address does not match the expected contract addres");
        require(_tokenAmount > 0, "YTK value must be greater than 0");
        require(
            _totalPrice <= _tokenAmount,
            "YTK value must be greater than or equals to amount passed in"
        );
        require(
            _tokenAmount >= _totalPrice,
            "The provided YTK amount is not enough to cover the item price and marketplace fee. Please provide the required amount"
        );

        // Check that the item exists and is listed for sale, and that it hasn't already been sold
        require(
            item.itemId > 0 && item.listed,
            "Item doesn't exist or not listed for sale"
        );
        require(!soldItem.sold, "Item sold already");

        // Check that the buyer is not the seller
        require(item.seller != msg.sender, "Cannot buy your own item");

        // Check that the buyer has given sufficient allowance to the marketplace contract
        uint256 allowedTokenAmount = customToken.allowance(
            msg.sender,
            address(this)
        );
        require(
            allowedTokenAmount >= _tokenAmount,
            "Insufficient token allowance"
        );

        // Transfer the token amount from the buyer to the seller
        customToken.transferFrom(msg.sender, item.seller, _tokenAmount);

        // Calculate the marketplace fee and transfer it to the owner of the marketplace
        // uint256 marketplaceFee = _totalPrice.mul(marketplaceFeePercentage).div(100);
        uint256 marketplaceFee = _tokenAmount - _totalPrice;
        customToken.transferFrom(msg.sender, owner, marketplaceFee);

        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        soldItemCount++;

        soldItems[_tokenId] = SoldItemStruct(
            item.itemId,
            _ytkNft,
            _tokenId,
            item.price,
            item.seller,
            msg.sender,
            true
        );
        // Emit an event for the sale and update the seller and listed state
        emit SoldNewItem(
            item.itemId,
            _ytkNft,
            _tokenId,
            item.price,
            item.seller,
            msg.sender
        );
        item.seller = payable(msg.sender);
        item.listed = false;
    }

    function listWithYungToken(uint256 _tokenId) public {
        Item storage item = items[_tokenId];
        require(
            msg.sender == item.seller,
            "Only the owner can list the token for sale"
        );
        item.listed = true;
    }

    function reListWithYungToken(uint256 _tokenId, uint256 _tokenAmount)
        public
    {
        require(_tokenAmount > 0, "Price must be greater than 0");
        Item storage item = items[_tokenId];
        require(
            msg.sender == item.seller,
            "Only the owner can list the token for sale"
        );
        item.listed = true;
        item.price = _tokenAmount;
    }

    function unListWithItem(uint256 _tokenId) public {
        require(_tokenId > 0, "Item not found in list");
        Item storage item = items[_tokenId];
        require(item.seller != address(0), "Item not found");
        require(item.listed == true, "Item is already unlisted");
        require(
            msg.sender == item.seller,
            "Only the owner can unlist the token from sale"
        );
        require(
            msg.sender == item.seller,
            "Only the owner can unlist the token from sale"
        );
        item.listed = false;
    }

    function buyWithEther(IERC721 _ytkNft, uint256 _tokenId) public payable {
        // require(_ytkNft == nft, "Invalid Yung Token contract");
        uint256 _totalPrice = getTotalPrice(_tokenId);
        Item storage item = items[_tokenId];
        uint256 price = item.price;
        require(msg.value >= _totalPrice, "Sent Ether is not enough");
        require(msg.value == price, "Sent Ether value does not match price");
        payable(item.seller).transfer(price);
        nft.transferFrom(item.seller, msg.sender, _tokenId);
        //TODO still think of this to add adddress or tokenid
        soldItems[_tokenId] = SoldItemStruct(
            item.itemId,
            _ytkNft,
            _tokenId,
            item.price,
            item.seller,
            msg.sender,
            true
        );
        emit SoldNewItem(
            itemCount,
            _ytkNft,
            _tokenId,
            item.price,
            item.seller,
            msg.sender
        );
        // changing the seller to the new owner
        item.seller = payable(msg.sender);
        // update it's listed state to false
        item.listed = false;
    }

    function listWithEther(uint256 _tokenId) public {
        Item storage item = items[_tokenId];
        require(
            msg.sender == item.seller,
            "Only the owner can list the token for sale"
        );
        item.listed = true;
    }

    function reListWitEther(uint256 _tokenId, uint256 _price) public {
        require(_price > 0, "Price must be greater than 0");
        Item storage item = items[_tokenId];
        require(
            msg.sender == item.seller,
            "Only the owner can list the token for sale"
        );
        item.listed = true;
        item.price = _price;
    }

    function getTotalPrice(uint256 _itemId) public view returns (uint256) {
        return ((items[_itemId].price * (100 + feePercent)) / 100);
    }

    function getItems() public view returns (items) {
        return items;
    }

    function getSoldItems() public view returns (soldItems) {
        return soldItems;
    }
}
