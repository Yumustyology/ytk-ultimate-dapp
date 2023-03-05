// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract YtkNft is ERC721, Ownable {

    uint256 public nextTokenId;
    address public customTokenAddress;
    // mapping(uint256 => uint256) public tokenPrices;

    constructor(string memory name_, string memory symbol_, address _customTokenAddress) ERC721(name_, symbol_) {
        nextTokenId = 1;
        customTokenAddress = _customTokenAddress;
    }

    function mint(address recipient) public onlyOwner {
        _safeMint(recipient, nextTokenId);
        nextTokenId++;
    }
    
    function customTokenAddressValue() public view returns (address) {
        return customTokenAddress;
    }

}