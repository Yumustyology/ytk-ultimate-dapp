import React, { useState, useContext, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { Bitski } from "bitski";
// import { BscConnector } from "@binance-chain/bsc-connector";
import { useCookies } from 'react-cookie'



const ConnectWallet = () => {


  // Example for Polygon/Matic:
  // const customNetworkOptions = {
  //   rpcUrl: "https://rpc-mainnet.maticvigil.com",
  //   chainId: 137,
  // };
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState(null);

 
 
  // const bsc = new BscConnector({
  //   supportedChainIds: [1, 56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
  // });

  // invoke method on bsc e.g.
  // useEffect(async () => {
  // await bsc.activate();
  // const account = await bsc.getAccount();
  // const chainId = await bsc.getChainId();
  // console.log("account ", account);
  // await setAccount(account);
  // }, []);

  const providerOptions = {
    // coinbasewallet: {
    //   package: CoinbaseWalletSDK, 
    //   options: {
    //     appName: "Web 3 Modal Demo",
    //     infuraId: process.env.INFURA_KEY 
    //   }
    // },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "Circlein",
        infuraId: {
          3: "https://mainnet.infura.io/v3/1b9e4df8958d4f26996cf7ba95646d54",
        },
      },
    },
    portis: {
      package: Portis,
      options: {
        appName: "Circlein",
        infuraId: {
          3: "https://mainnet.infura.io/v3/1b9e4df8958d4f26996cf7ba95646d54",
        },
      },
    },
    binancechainwallet: {
      package: true,
      options: {
        appName: "Circlein",
        anyNetwork: true,
      },
    },
    // fortmatic: {
    //   package: Fortmatic, // required
    //   options: {
    //     key: "FORTMATIC_KEY", // required
    //     network: customNetworkOptions, // if we don't pass it, it will default to localhost:8454
    //   },
    // },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        appName: "Circlein",
        infuraId: "6a1c468d4a80436a925522496e75c3ba",
      },
    },
    // bitski: {
    //   package: Bitski,
    //   options: {
    //     clientId: "BITSKI_CLIENT_ID", // required
    //     callbackUrl: "BITSKI_CALLBACK_URL", // required
    //   },
    // },
  };

  let web3Modal = new Web3Modal({
    providerOptions,
  });

  const connectWallet = async () => {

    try {
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );
      setWeb3Provider(web3ModalProvider);
      if (!web3ModalProvider) return;
      const accounts = await web3ModalProvider.listAccounts()
      const network = await web3ModalProvider.getNetwork()

  
      if (accounts) {
        setAccount(accounts[0]);
        // console.log("web3ModalProvider a ", web3ModalProvider);
        console.log("accounts ",accounts);
        window.localStorage.setItem(
          "userAddress",
          JSON.stringify(accounts[0])
        );
        setConnected(true);
      }
  
    } catch (error) {
      console.log("error on connect", error);
    }
  };
  const checkWallets = async () => {

    let address = JSON.parse(window.localStorage.getItem("userAddress"));
    console.log("address", address);
    if (address) {
      // alert("addresses");
      console.log("addresses here", address);
      setConnected(true);
      setAccount(address);
    } else {
      console.log("no address");
      setConnected(false);
      setAccount(null);
      // window.localStorage.clear();
      web3Modal.clearCachedProvider();
      // return email to local storage
  
    }
    // setAccount(address);
  };


  // disconnecting from wallet
  async function handleLogout() {
    window.localStorage.clear();
    web3Modal.clearCachedProvider();
    // return email to local storage
    window.localStorage.setItem("email", JSON.stringify(cookies.email));
  }

  const grabNfts = async () => {
    if (!account) return;
    const resp = await fetch(
      `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${account}`
      // `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:0x4765273c477c2dc484da4f1984639e943adccfeb`
    );
    const data = await resp.json();
    setNft(data.items);
    console.log("resp", data);
  };

  // useEffect(() => {
  //   grabNfts();
  // }, [account]);

  // useEffect(() => {
  //   checkWallets();
  // }, []);



  return connectWallet
}

export default ConnectWallet