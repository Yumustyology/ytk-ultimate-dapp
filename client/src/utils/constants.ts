import YTKTrasactionAbi from '../abi/TransactionsAbi.json'
import YTKContractAbi from '../abi/yungToken.json'
import YTKExchangeContractAbi from '../abi/YTKExchange.json'
import YTKNFTContractAbi from '../abi/YtkNft.json'
import YTKNFTMarketplaceContractAbi from '../abi/YtkNftMarketplace.json'
import ERC20_TOKEN_ABI from '../abi/Erc20Abi.json'

// npx hardhat run scripts/deploy.js --network sepoli
// 0x61E777684790Cbc55deBE58359076C5DC0388056

export const transactionContractAddress = "0xf4778263F50f984a0E276580523143e7AaeFB4b8"
export const TransactionsAbi = YTKTrasactionAbi.abi
export const YTKAbi = YTKContractAbi.abi

export const ytkContractAddress = '0xC0c14736d4235448275a987aDAC80eEa893C5Db1'
// 2
export const YTKExchangeAbi = YTKExchangeContractAbi.abi
export const ytkExchangeContractAddress = '0x2C8F042e30cdAcfA5e33dc478024C6eb9E0C82b2'
export const ytkNFTContractAddress = '0x9183DB55C15F31079b4AdA5584abD708Ee923A68'
export const ytkNFTContractAbi = YTKNFTContractAbi.abi
export const ytkNFTMarketplaceContractAddress = '0x27779c79dd9e2298a45Cc4eD9B932c35970A3334'
export const ytkNFTMarketplaceContractAbi = YTKNFTMarketplaceContractAbi.abi
export const erc20TokenAbi = ERC20_TOKEN_ABI.abi


export const networks = {
    sepolia: {
      chainId: `0x${Number(11155111).toString(16)}`,
      chainName: "Sepolia",
      nativeCurrency: {
        name: "SepoliaETH",
        symbol: "SepoliaETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.infura.io/v3/"],
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
    holesky: {
      chainId: `0x${Number(17000).toString(16)}`,
      chainName: "Holesky",
      nativeCurrency: {
        name: "holesky",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
      blockExplorerUrls: ["https://holesky.etherscan.io/"],
    },
    polygon_amoy: {
      chainId: `0x${Number(80002).toString(16)}`,
      chainName: "Polygon Amoy",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-amoy.polygon.technology/"],
      blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },
    polygon_mumbai: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Mumbai",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/bsc"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    base_mainnet: {
      chainId: `0x${Number(8453).toString(16)}`,
      chainName: "Base Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org/"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    base_sepolia: {
      chainId: `0x${Number(84532).toString(16)}`,
      chainName: "Base Sepolia",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.base.org"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    localhost: {
      chainId: `0x${Number(31337).toString(16)}`,
      chainName: "localhost",
      nativeCurrency: {
        name: "GO",
        symbol: "GO",
        decimals: 18,
      },
      rpcUrls: ["http://127.0.0.1:8545/"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  };