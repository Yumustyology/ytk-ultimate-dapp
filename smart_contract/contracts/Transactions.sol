// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;


contract Transactions {
    uint256 transactionCount;
    event Transfer(address from,address reciever, uint256 amount, uint256 timestamp,string description);

    struct TransferStruct{
        address sender;
        address reciever;
        string description;
        uint256 amount;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    function addTranferInfo(address payable reciever, uint256 amount,string memory description) public {
        transactionCount ++;
        transactions.push(TransferStruct(msg.sender,reciever,description,amount,block.timestamp));
        emit Transfer(msg.sender, reciever, amount, block.timestamp, description);
    }

    function getAllTranferInfo() public view returns(TransferStruct[] memory) {
// return TransferStruct[memory.length];
    }

    function getTransactionCount()public view returns(uint256){
        
    }
}
