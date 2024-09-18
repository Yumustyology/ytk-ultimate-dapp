export async function addTokenToWallet(
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string
) {
  try {
       if (!/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
        throw new Error('Invalid token address.');
      }
      if (typeof tokenSymbol !== 'string' || tokenSymbol.trim() === '') {
        throw new Error('Invalid token symbol.');
      }
  
    if (!/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
      throw new Error('Invalid token address.');
    }

    // MetaMask's `wallet_watchAsset` method allows adding a custom token
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });

    if (wasAdded) {
      console.log('Token added successfully!');
    } else {
      console.log('Token addition was rejected by the user.');
    }
  } catch (error) {
    console.error('Error adding token to wallet:', error);
  }
}
