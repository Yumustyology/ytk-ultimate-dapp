import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

import { useState, useEffect } from "react";

export default function ConnectWallet(props) {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    // initiate web3modal

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          appName: "YTK",
          infuraId: "6a1c468d4a80436a925522496e75c3ba",
        },
      },
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
    setWeb3Modal(newWeb3Modal);
  }, []);

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  async function connectWallet() {
    const provider = await web3Modal.connect();

    addListeners(provider);

    const ethersProvider = new providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    setAddress(userAddress);
  }

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload();
    });
  }

  return {address, connectWallet}

    // <div>
    //   <button onClick={connectWallet}>Connect wallet</button>
    //   <p>{address}</p>
    // </div>
  
}
