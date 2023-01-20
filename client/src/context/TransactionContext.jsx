import React, { useState, createContext, useEffect } from "react";
import ConnectWallet from "../utils/connectWallet";
import {
  transactionContractAddress,
  TransactionsAbi,
} from "../utils/constants";
// import {ethers} from "ethers";
export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("dsvdfassddavda");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // connect user wallet
  const connectWallet = () => {
    console.log(formData);
    ConnectWallet.connectWallet()
  };

  return (
    <TransactionContext.Provider
      value={{
        handleChange,
        currentAccount,
        connectWallet,
        formData,
        setFormData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
