require("@nomiclabs/hardhat-waffle");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };

module.exports = {
  solidity: '0.8.9',
  networks:{
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/vtinbB7a8c54eLbILjlyfeIdEtjNdGfc",
      accounts: ['2563aeb7bbf83bf180af4f88b619299c0eab94406fa3abfc2874911a0a7fee19']
    }
  }
}