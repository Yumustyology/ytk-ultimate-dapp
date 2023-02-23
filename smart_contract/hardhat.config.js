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
      accounts: ['0d22955e64465edb326e631f09eca3b2c4d3098e10c58da57374d3a4c83cbdf5']
    }
  }
}