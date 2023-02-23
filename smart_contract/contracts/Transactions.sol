// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;


contract Transactions {
    uint256 transactionCount;
    event Transfer(address from,address reciever, uint256 amount, uint256 timestamp,string description,string transactionHash);

    struct TransferStruct{
        address sender;
        address reciever;
        string description;
        string transactionHash;
        uint256 amount;
        uint256 timestamp;
    }

    
    mapping (address=> TransferStruct[]) public transactions;


    function addTransferInfo(address payable reciever, uint256 amount,string memory description, string memory transactionHash) public {
        transactionCount ++;
        transactions[msg.sender].push(TransferStruct(msg.sender,reciever,description,transactionHash,amount,block.timestamp));
        emit Transfer(msg.sender, reciever, amount, block.timestamp, description,transactionHash);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions[msg.sender];
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
