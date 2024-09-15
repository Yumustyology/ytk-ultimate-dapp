import React, { useState, createContext, useEffect, ReactNode } from "react";
import { Contract, ethers } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import {
  transactionContractAddress,
  TransactionsAbi,
  ytkExchangeContractAddress,
  YTKExchangeAbi,
  ytkContractAddress,
  YTKAbi,
  ytkNFTContractAddress,
  ytkNFTContractAbi,
  ytkNFTMarketplaceContractAddress,
  ytkNFTMarketplaceContractAbi,
} from "@utils/constants";


interface TransactionContextType {
  connectWallet?: () => void;
  disconnectWallet?: () => void;
  sendTransaction?: () => void;
  currentAccount?: string;
  getYTKExchangeContract?: () => Contract;
  getYTKContract?: () => Contract;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  formData?: { addressTo: string; amount: string; message: string };
  setFormData?: React.Dispatch<
    React.SetStateAction<{ addressTo: string; amount: string; message: string }>
  >;
  transactionCount?: number;
  ethBal?: string;
  ytkBal?: string;
  transactions?: Array<any>;
  currency?: string;
  setCurrency?: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionCount?: React.Dispatch<React.SetStateAction<number>>;
  setTransactions?: React.Dispatch<React.SetStateAction<Array<any>>>;
  setEthBal?: React.Dispatch<React.SetStateAction<string>>;
  setYTKBal?: React.Dispatch<React.SetStateAction<string>>;
  ethereumAvailable?: boolean;
}

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

const TransactionContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [transactionCount, setTransactionCount] = useState<number>(
    parseInt(localStorage.getItem("transactionCount") || "0")
  );
  const [ethBal, setEthBal] = useState<string>("0");
  const [ytkBal, setYTKBal] = useState<string>("0");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currency, setCurrency] = useState<string>("eth");
  const [formData, setFormData] = useState<{
    addressTo: string;
    amount: string;
    message: string;
  }>({
    addressTo: "",
    amount: "",
    message: "",
  });
  const [ethereumAvailable, setEthereumAvailable] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "YTK",
        infuraId: "YOUR_INFURA_ID",
      },
    },
  };

  const newWeb3Modal = new Web3Modal({
    cacheProvider: true,
    network: "mainnet",
    providerOptions,
  });

  let web3Modal = newWeb3Modal;

  const { ethereum } = window as any;
  if (!ethereum) {
    throw new Error("Ethereum object not found");
  }

  const contractsProvider = new ethers.providers.Web3Provider(ethereum);

  const getEthereumContract = () => {
    const signer = contractsProvider.getSigner();
    return new ethers.Contract(
      transactionContractAddress,
      TransactionsAbi,
      signer
    );
  };

  const getYTKExchangeContract = () => {
    const signer = contractsProvider.getSigner();
    return new ethers.Contract(
      ytkExchangeContractAddress,
      YTKExchangeAbi,
      signer
    );
  };

  const getYTKContract = () => {
    const signer = contractsProvider.getSigner();
    return new ethers.Contract(ytkContractAddress, YTKAbi, signer);
  };

  const getYtkNftContract = () => {
    const signer = contractsProvider.getSigner();
    return new ethers.Contract(
      ytkNFTContractAddress,
      ytkNFTContractAbi,
      signer
    );
  };

  const getYtkNftTMarketplaceContract = () => {
    const signer = contractsProvider.getSigner();
    return new ethers.Contract(
      ytkNFTMarketplaceContractAddress,
      ytkNFTMarketplaceContractAbi,
      signer
    );
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction: any) => ({
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
        setTransactions(structuredTransactions.reverse());
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount.toString()
        );
      }
    } catch (error) {
      console.error("Error checking transactions:", error);
      throw new Error("No Ethereum object");
    }
  };

  const getListedNfts = async () => {
    if (ethereum) {
      const nftMarketplace = getYtkNftTMarketplaceContract();
      try {
        const itemCountResp = await nftMarketplace.itemCount();
        const itemCount = itemCountResp.toNumber();
        if (!itemCount) return;
        const nftItems = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await nftMarketplace.items(i);
          const uri = await getYtkNftContract().tokenURI(item.tokenId);
          const response = await fetch(uri);
          const uriMetadata = await response.json();
          const totalPrice = await nftMarketplace.getTotalPrice(item.itemId);

          nftItems.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: uriMetadata.name,
            description: uriMetadata.description,
            image: uriMetadata.image,
          });
        }

        console.log("Listed NFTs:", nftItems);
      } catch (error) {
        console.error("Error getting listed NFTs:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (!ethereumAvailable) {
      console.log("Ethereum object not found");
      return;
    }
    try {
      const provider = await web3Modal.connect();
      if (!provider) {
        console.error("Provider is not available");
        return;
      }
      addListeners(provider);
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();
      setCurrentAccount(userAddress);
      setProvider(ethersProvider);
      const ethBalance = await ethersProvider.getBalance(userAddress);
      setEthBal(ethers.utils.formatEther(ethBalance));
      const ytkBalance = await getYTKContract().balanceOf(userAddress);
      setYTKBal(ethers.utils.formatEther(ytkBalance));
      getAllTransactions();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw new Error("Failed to connect wallet");
    }
  };

  const disconnectWallet = async () => {
    if (!provider) {
      console.error("Provider is not available");
      return;
    }
    try {
      const disconnect = window.confirm("Are you sure you want to disconnect");
      if (disconnect) {
        // TODO: see to this later
        await (provider as any).close();
        web3Modal.clearCachedProvider();
        setProvider(null);
        window.localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      throw new Error("Failed to disconnect wallet");
    }
  };

  async function addListeners(web3ModalProvider: any) {
    web3ModalProvider.on("accountsChanged", () => {
      window.location.reload();
    });

    web3ModalProvider.on("chainChanged", () => {
      window.location.reload();
    });
  }

  if (web3Modal && web3Modal.cachedProvider) {
    connectWallet();
  }

  const sendTransaction = async () => {
    try {
      if (!ethereumAvailable) {
        console.log("Ethereum object not found");
        return;
      }
      setLoading(true);
      const { addressTo, amount, message } = formData;
      const transactionsContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      const tx = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message
      );
      await tx.wait();
      setLoading(false);
      getAllTransactions();
      const ethBalance = await provider?.getSigner().getBalance();
      setEthBal(ethers.utils.formatEther(ethBalance || "0"));
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw new Error("Failed to send transaction");
    }
  };

  useEffect(() => {
    const { ethereum } = window as any;
    if (!ethereum) {
      throw new Error("Ethereum object not found");
    }
    setEthereumAvailable(true);
  }, []);

  if (ethereumAvailable) {
    console.log("Transaction .............");
    return (
      <TransactionContext.Provider
        value={{
          connectWallet,
          disconnectWallet,
          sendTransaction,
          currentAccount,
          getYTKExchangeContract,
          getYTKContract,
          handleChange,
          formData,
          setFormData,
          transactionCount,
          ethBal,
          ytkBal,
          transactions,
          currency,
          setCurrency,
          loading,
          setLoading,
          setTransactionCount,
          setTransactions,
          setEthBal,
          setYTKBal,
          ethereumAvailable,
        }}
      >
        {children}
      </TransactionContext.Provider>
    );
  } else {
    return (
      <TransactionContext.Provider value={{ ethereumAvailable }}>
        {children}
      </TransactionContext.Provider>
    );
  }
};

export default TransactionContextProvider;
