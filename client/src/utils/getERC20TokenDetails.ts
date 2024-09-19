import { ethers } from 'ethers';
// import { erc20TokenAbi as ERC20_ABI } from './constants'; // Import the ERC-20 ABI from your constants file
import ERC20_ABI from "erc-20-abi"

// Utility function to get ERC-20 token details, the contract instance, and the token address

export async function getERC20TokenDetails(tokenAddress:string, userAddress:string) {
  try {
    // Check if window.ethereum is available
    if (!window.ethereum) {
      throw new Error('No crypto wallet found. Please install MetaMask.');
    }

    // Create an instance of ethers Web3Provider using window.ethereum (MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account access
    await provider.send('eth_requestAccounts', []);

    // Get the signer (the account interacting with the contract)
    const signer = provider.getSigner();

    // Check if the contract exists at the given address
    const code = await provider.getCode(tokenAddress);
    if (code === '0x') {
      throw new Error('No contract deployed at this address');
    }

    // Create a contract instance using the token's address and the ERC-20 ABI
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

    // Fetch token details (name, symbol, decimals) and user's balance
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();

    // Get the user's token balance
    const rawBalance = await tokenContract.balanceOf(userAddress);
    const balance = ethers.utils.formatUnits(rawBalance, decimals); // Format balance using token decimals

    // Return the token details, token address, and contract instance
    return {
      name,
      symbol,
      decimals,
      balance,
      tokenAddress,   // Return the token address
      contract: tokenContract, // Return the contract instance
    };
  } catch (error) {
    console.log('Error fetching ERC-20 token details:', error);
    throw error;
  }
}
