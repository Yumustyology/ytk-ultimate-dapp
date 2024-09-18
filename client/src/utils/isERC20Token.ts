import { ethers } from "ethers"; 
import { AddressString } from "@coinbase/wallet-sdk/dist/types";
import { erc20TokenAbi as ERC20_ABI } from "./constants"; 


  
export async function isERC20Token(tokenContractAddress:AddressString, tokenHolderAddress:AddressString) {
  try {
    // Connect to the Ethereum network
    const network = process.env.ETHEREUM_NETWORK;
    const provider = new ethers.providers.InfuraProvider(
      network,
      "2MbEBaAg9rQvrd1A0QpESsAqpax"
    );

    // Create a contract instance with the ERC-20 ABI
    const contract = new ethers.Contract(tokenContractAddress, ERC20_ABI, provider);

    // Check if the contract is an ERC-20 by calling standard methods
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();

    console.log(`The token's contract name is: ${name}`);
    console.log(`The token's symbol is: ${symbol}`);
    console.log(`The token's decimals are: ${decimals}`);

    // Get the token holder's balance
    const balance = await contract.balanceOf(tokenHolderAddress);
    const balanceFormatted = ethers.utils.formatUnits(balance, decimals);
    console.log(`Holder's balance is ${balanceFormatted} ${symbol}`);

    return true; // Verified as ERC-20 token
  } catch (error) {
    console.error("Error verifying token:", error);
    return false; // Not an ERC-20 token or invalid address
  }
}

