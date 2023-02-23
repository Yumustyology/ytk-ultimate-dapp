// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract yungToken{

    string public symbol = 'yungToken';
    uint public totalSupply = 20000 * 10 ** 18;
    uint public decimals = 18;
    mapping (address=>uint) balances;
    event Transfer(address indexed _from, address indexed _to, uint value );
    mapping (address => mapping (address => uint)) allowance;
    event Allowance(address indexed _from, address indexed _to, uint value);
 

    constructor(){
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _owner) public view returns(uint){
        return balances[_owner];
    }

    function transfer(address to, uint value) public returns(bool){
        require(balances[msg.sender] >= value, 'Insuficient YungToken Balance');
        balances[to] += value;
        balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;  
    }

    function transferFrom(address from, address to, uint value) public returns(bool) {
        require(balanceOf(from) >= value, 'Insufficient YungToken Balance');
        require(allowance[from][msg.sender] >= value, 'Allowance Too Low');
        balances[to] += value;
        balances[from] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint value) public returns(bool){
        allowance[msg.sender][spender] = value;
        emit Allowance (msg.sender, spender, value);
        return true;
    }







}