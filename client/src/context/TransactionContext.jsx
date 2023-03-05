import React, { useState, createContext, useEffect } from "react";
// import ConnectWallet from "../utils/connectWallet";
import {
  transactionContractAddress,
  TransactionsAbi,
  YTKAbi,
  YTKExchangeAbi,
  ytkContractAddress,
  ytkExchangeContractAddress,
  ytkNFTContractAddress,
  ytkNFTContractAbi,
  ytkNFTMarketplaceContractAddress,
  ytkNFTMarketplaceContractAbi,
} from "../utils/constants";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [ethBal, setEthBal] = useState(0);
  const [ytkBal, setYTKBal] = useState(0);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("eth");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const providerOptions = {
    // walletconnect: {
    //   package: WalletConnectProvider, // required
    //   options: {
    //     appName: "YTK",
    //     infuraId: "6a1c468d4a80436a925522496e75c3ba",
    //   },
    // },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "YTK",
        infuraId: {
          3: "https://mainnet.infura.io/v3/1b9e4df8958d4f26996cf7ba95646d54",
        },
      },
    },
  };
  const newWeb3Modal = new Web3Modal({
    cacheProvider: true, // very important
    network: "mainnet",
    providerOptions,
  });

  let web3Modal = newWeb3Modal;

  const { ethereum } = window;

  const contractsProvider = new ethers.providers.Web3Provider(ethereum);

  const getEthereumContract = () => {
    const signers = contractsProvider.getSigner();
    return new ethers.Contract(
      transactionContractAddress,
      TransactionsAbi,
      signers
    );
  };

  const getYTKExchangeContract = () => {
    const signers = contractsProvider.getSigner();
    return new ethers.Contract(
      ytkExchangeContractAddress,
      YTKExchangeAbi,
      signers
    );
  };

  const getYTKContract = () => {
    const signers = contractsProvider.getSigner();
    return new ethers.Contract(ytkContractAddress, YTKAbi, signers);
  };
  const getYtkNftContract = () => {
    const signers = contractsProvider.getSigner();
    console.log(
      new ethers.Contract(ytkNFTContractAddress, ytkNFTContractAbi, signers)
    );
    return new ethers.Contract(
      ytkNFTContractAddress,
      ytkNFTContractAbi,
      signers
    );
  };

  const getYtkNftTMarketplaceContract = () => {
    const signers = contractsProvider.getSigner();
    console.log(
      new ethers.Contract(
        ytkNFTMarketplaceContractAddress,
        ytkNFTMarketplaceContractAbi,
        signers
      )
    );
    return new ethers.Contract(
      ytkNFTMarketplaceContractAddress,
      ytkNFTMarketplaceContractAbi,
      signers
    );
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.reciever,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.description,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
            hash: transaction.transactionHash,
          })
        );
        console.log(structuredTransactions.reverse());

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // checking if we have any transactions
  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  let nftItems = [];
  const getListedNfts = async () => {
    console.log("marketplace contract ", getYtkNftTMarketplaceContract());
    if (ethereum) {
      let nftMarketplace = getYtkNftTMarketplaceContract();
      try {
        const itemCountResp = await nftMarketplace.itemCount();
        // let itemCount = ethers.utils.formatEther(itemCountResp)
        let itemCount = itemCountResp.toNumber()
        console.log("item count ", itemCount);
        // structuring the listed items to a useable array
        if (!itemCount) return;
        for (let i = 1; i <= itemCount; i++) {
          const item = await nftMarketplace.items(i);

          // get uri url from nft contract
          const uri = await getYtkNftContract.tokenURI(item.tokenId);

          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const uriMetadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await nftMarketplace.getTotalPrice(item.itemId);

          // Add nftItem to items array
          nftItems.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: uriMetadata.name,
            description: uriMetadata.description,
            image: uriMetadata.image,
          });
        }

        // let structuredlistedItems = listedItems.map((item) => ({
        //   tokenId: item.itemId,
        //   nft: item.nft,
        //   price: item.price,
        //   seller: item.seller,
        //   isListed: item.listed,
        // }));
        console.log("listed nft ", items);
      } catch (error) {
        console.log("error on getting listed items ", error);
      }
    } else {
      console.log("no ethereum object found");
    }
  };

  // connect user wallet
  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    addListeners(provider);
    const ethersProvider = new providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    setCurrentAccount(userAddress);
    setProvider(ethersProvider);
    let ethBalance = await ethersProvider.getBalance(userAddress);
    setEthBal(ethers.utils.formatEther(ethBalance));
    let ytkBalance = await getYTKContract().balanceOf(userAddress);
    setYTKBal(ethers.utils.formatEther(ytkBalance));
    console.log(ethers.utils.formatEther(ytkBalance));
    getAllTransactions();
  };

  // diconnect wallet
  const disconnectWallet = async () => {
    let disconnect = confirm("Are you sure you want to disconnect");

    if (disconnect) {
      // console.log(provider);
      await provider.close();

      web3Modal.clearCachedProvider();
      setProvider(null);
      window.localStorage.clear();
      window.location.reload();
    }
  };

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload();
    });
  }

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  const sendTransaction = async () => {
    try {
      setLoading(true);
      const { addressTo, amount, message } = formData;
      const transactionsContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      if (currency === "eth") {
        const sentResponse = await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208", // 2100 GWEI
              value: parsedAmount._hex,
            },
          ],
        });

        console.log("sent response", sentResponse);

        const transactionHash = await transactionsContract.addTransferInfo(
          addressTo,
          parsedAmount,
          message,
          sentResponse
        );

        setLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setLoading(false);
        const transactionsCount =
          await transactionsContract.getTransactionCount();
        setTransactionCount(transactionsCount.toNumber());

        // refetch all transactions..
        getAllTransactions();
      } else {
        console.log("transferring for ytk!!!");
        try {
          let YtkTransfer = await getYTKContract().transfer(
            addressTo,
            parsedAmount
          );

          const transactionHash = await transactionsContract.addTransferInfo(
            addressTo,
            parsedAmount,
            message,
            YtkTransfer.hash
          );
          setLoading(true);
          console.log(`Loading - ${YtkTransfer.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${YtkTransfer.hash}`);
          setLoading(false);
          // refetch all transactions..
          getAllTransactions();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      setLoading(false);
      console.log("error on send transaction " + e);
    }
  };

  useEffect(() => {
    getAllTransactions();
    checkIfTransactionsExists();
  }, [transactionCount]);

  useEffect(() => {
    getListedNfts();
  }, [currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        handleChange,
        currentAccount,
        connectWallet,
        formData,
        setFormData,
        setCurrentAccount,
        sendTransaction,
        disconnectWallet,
        loading,
        transactions,
        setTransactions,
        getYTKExchangeContract,
        getYTKContract,
        ethBal,
        ytkBal,
        currency,
        setCurrency,
  getYtkNftTMarketplaceContract,getYtkNftContract
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
