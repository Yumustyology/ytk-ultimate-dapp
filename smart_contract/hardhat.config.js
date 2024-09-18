require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();


// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };

module.exports = {
  solidity: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  networks:{
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/vtinbB7a8c54eLbILjlyfeIdEtjNdGfc",
      accounts: [process.env.PRIVATE_KEY]
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,  
      accounts: [process.env.PRIVATE_KEY], 
    },
  }
}