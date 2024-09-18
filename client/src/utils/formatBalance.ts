import Big from 'big.js';

export const formatBalance = (balance:number, decimals = 4) => {
  // Create a Big instance from the balance and round it to the specified decimal places
  return new Big(balance).toFixed(decimals);
};
