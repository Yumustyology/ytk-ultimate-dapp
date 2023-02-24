import React, { useContext, useState } from "react";
import {
  AiFillPlayCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { HiCurrencyYen } from "react-icons/hi";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) =>
  type != "textarea" ? (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outilne-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  ) : (
    <textarea
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outilne-none bg-transparent text-white border-none text-sm white-glassmorphism"
    ></textarea>
  );

const Welcome = () => {
  const changeCurrency = (e) => {
    setCurrency(e.target.value);
  };
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    loading,
  } = useContext(TransactionContext);

  const [balVisible, setBalVisible] = useState(false);
  const [currency, setCurrency] = useState("eth");

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;
    e.preventDefault(); //Prevents reload after sending the form
    if (!addressTo | !amount | !message) return;
    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center md:flex-col">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sd:text-5xl text-white text-gradient py-1">
            Decentralized finance <br /> at your Crypto fingertips
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world with us. Buy and sell cryptoicurrencies
            easily here. <br />
            And do a lot more activities on the blockchain.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex felx-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`sm:rounded-none rounded-tr-2xl ${commonStyles}`}>
              Security
            </div>
            <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Stake</div>
            <div className={`${commonStyles}`}>
              ERC20
            </div>
            <div className={`sm:rounded-none  ${commonStyles}`}>
            Ecommerce
            </div>
            <div className={` ${commonStyles}`}>Ethereum</div>
            <div className={`sm:rounded-bl-2xl  ${commonStyles}`}>
              DEFI Exchange
            </div>
            <div className={`sm:rounded-none rounded-bl-2xl ${commonStyles}`}>
              Game
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>NFT</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-44 sm:w-96 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center cursor-pointer">
                  {currency === "ytk" ? (
                    <HiCurrencyYen fontSize={21} color="#fff" />
                  ) : (
                    <SiEthereum fontSize={21} color="#fff" />
                  )}
                </div>
                {/* <BsInfoCircle fontSize={17} color="#fff" /> */}
                <p>
                  <select
                    className="w-[65px] h-[30px] py-0 px-1 bg-transparent rounded-[5px] text-slate-500 border-gray-500"
                    value={currency}
                    onChange={changeCurrency}
                  >
                    <option value="eth">ETH</option>
                    <option value="ytk">YTK</option>
                  </select>
                </p>
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {currentAccount
                    ? shortenAddress(currentAccount)
                    : "connect your wallet..."}
                </p>
                <div className="flex items-center">
                  <div className="text-white font-semibold text-lg mt-1 flex">
                    Balance: {balVisible ? ethBal : "****"} &nbsp;
                  </div>
                  <div
                    onClick={() => setBalVisible(!balVisible)}
                    className="mt-1"
                  >
                    {balVisible ? (
                      <AiFillEye color="#fff" size={20} />
                    ) : (
                      <AiFillEyeInvisible color="#fff" size={20} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
              value={formData.addressTo}
            />
            <Input
              placeholder={`Amount (${currency.toLocaleUpperCase()})`}
              name="amount"
              type="number"
              handleChange={handleChange}
              value={formData.amount}
            />
            {/* <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            /> */}
            <Input
              placeholder="Enter Payment Description or message."
              name="message"
              type="textarea"
              handleChange={handleChange}
              value={formData.message}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {loading ? (
              <Loader />
            ) : currentAccount ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send Now
              </button>
            ) : (
              <button
                type="button"
                onClick={connectWallet}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
      {/* wel */}
    </div>
  );
};

export default Welcome;
