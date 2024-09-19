import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SiEthereum, SiPoly } from "react-icons/si";
import Loader  from "./Loader";
import {
  TransactionContext,
  TransactionContextType,
} from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { HiCurrencyYen } from "react-icons/hi";
import { buttonClass } from "@utils/buttonClass";
import { CiBitcoin } from "react-icons/ci";
import { getERC20TokenDetails } from "../utils/getERC20TokenDetails";
import ERC20_ABI from "erc-20-abi";
import { ethers } from "ethers";
import { formatBalance } from "../utils/formatBalance";
import cn from "../utils/cn";

// Define types for token info
interface TokenInfo {
  balance: string;
  name: string;
  symbol: string;
}

// Define types for the input props
interface InputProps {
  placeholder: string;
  name: string;
  type: string;
  value: string | number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
  disabled,
}) =>
  type !== "textarea" ? (
    <input
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      min={type === "number" ? "0" : undefined}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  ) : (
    <textarea
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome: React.FC = () => {
  const context = useContext<TransactionContextType>(TransactionContext as any);

  if (!context) {
    throw new Error(
      "TransactionContext must be used within a TransactionProvider"
    );
  }

  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    loading,
    setLoading,
    ethBal,
    ytkBal,
    currency,
    setCurrency,
    ethereumAvailable,
  } = context;

  const [balVisible, setBalVisible] = useState(false);
  const [otherTokenAddress, setOtherTokenAddress] = useState("");
  const [otherTokenInfo, setOtherTokenInfo] = useState<TokenInfo | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { addressTo, amount, message } = formData;
    if (currency === "others" && otherTokenAddress && currentAccount) {
      try {
        setLoading(true);
        const erc20 = await getERC20TokenDetails(otherTokenAddress, currentAccount);
    
        const { balance, decimals, name, symbol, contract, tokenAddress } = erc20;
    
        console.log("Balance:", balance);
        console.log("Balance Type:", typeof balance);
    
        // Ensure balance is correctly formatted using the token's decimals
        const formattedBalance = ethers.utils.parseUnits(balance.toString(), decimals);
    
        setOtherTokenInfo({ balance: formattedBalance.toString(), name, symbol });
    
        // Parse the amount to be transferred as per the token's decimals
        const transferAmount = ethers.utils.parseUnits(amount.toString(), decimals);
    
        // Perform the token transfer - remove the 'value' field
        const transaction = await contract.transfer(
            addressTo,
            transferAmount,
            {
              gasLimit: ethers.utils.hexlify(8000000),
            }
        );
    
        await transaction.wait();
    } catch (error) {
        setTokenError("Invalid token address or not an ERC-20 token.");
        console.log(error);
    }
    finally{
      setLoading(false);
    }
    
    } else if (currency == "eth" || currency == "matic") {
      // For ETH or MATIC transactions, send as normal
      sendTransaction!("eth");
    } else {
      // For YTK transactions, send as normal
      if (!addressTo || !amount || !message) return;
      sendTransaction!();
    }
  };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency!(e.target.value);
    setOtherTokenAddress("");
    setOtherTokenInfo(null);
    setTokenError(null);
  };

  const checkOtherTokenInfo = async (otherTokenAddress: string) => {
    if (!otherTokenAddress) return;
    setTokenError(null);
    try {
      if (!ethers.utils.isAddress(otherTokenAddress)) {
        throw new Error("Invalid Ethereum address.");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const tokenContract = new ethers.Contract(
        otherTokenAddress,
        ERC20_ABI,
        provider
      );

      const balance = await tokenContract.balanceOf(currentAccount);
      const decimals = await tokenContract.decimals();
      const name = await tokenContract.name();
      const symbol = await tokenContract.symbol();

      const formattedBalance = ethers.utils.formatUnits(balance, decimals);

      setOtherTokenInfo({ balance: formattedBalance, name, symbol });
      setTokenError(null);
    } catch (error) {
      setOtherTokenInfo(null);
      setTokenError("Invalid token address or not an ERC-20 token.");
      console.log("Error fetching token info:", error);
    }
  };

  return (
    <div className="flex w-full justify-between items-stretch md:flex-col">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-[3rem] sd:text-5xl text-white text-gradient py-1">
            Decentralized finance <br /> at your Crypto fingertips
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world with us. Buy and sell cryptoicurrencies
            easily here.
            <br />
            And do a lot more activities on the blockchain.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex felx-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] w-60 text-white text-base font-semibold "
            >
              Connect Wallet
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`sm:rounded-none rounded-tr-2xl ${commonStyles}`}>
              Security
            </div>
            <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Stake</div>
            <div className={`${commonStyles}`}>ERC20</div>
            <div className={`sm:rounded-none  ${commonStyles}`}>Ecommerce</div>
            <div className={`${commonStyles}`}>Ethereum</div>
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
                  ) : currency === "matic" ? (
                    <SiPoly fontSize={21} color="#fff" />
                  ) : currency === "others" ? (
                    <CiBitcoin fontSize={28} color="#fff" />
                  ) : (
                    <SiEthereum fontSize={21} color="#fff" />
                  )}
                </div>
                <p>
                  <select
                    className={cn(
                      "w-[65px] h-[30px] py-0 px-1 bg-transparent rounded-[5px] text-slate-500 border-gray-500",
                      currency === "others" && "w-[89px]"
                    )}
                    value={currency}
                    onChange={handleCurrencyChange}
                  >
                    <option value="eth">ETH</option>
                    <option value="ytk">YTK</option>
                    <option value="matic">MATIC</option>
                    <option value="others">
                      {otherTokenInfo?.symbol ?? "Others"}
                    </option>
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
                    Balance:{" "}
                    {balVisible ? (
                      currency === "eth" ? (
                        <span>
                          {ethBal ? formatBalance(parseInt(ethBal)) : "0.0000"}{" "}
                          ETH
                        </span>
                      ) : currency === "ytk" ? (
                        <span>
                          {ytkBal ? formatBalance(parseInt(ytkBal)) : "0.0000"}{" "}
                          YTK
                        </span>
                      ) : otherTokenInfo ? (
                        <span>
                          {parseFloat(otherTokenInfo.balance).toFixed(4)}{" "}
                          {otherTokenInfo.symbol}
                        </span>
                      ) : (
                        "N/A"
                      )
                    ) : (
                      "****"
                    )}
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
            {currency === "others" && (
              <>
                <Input
                  disabled={!ethereumAvailable || !currentAccount}
                  placeholder="Token Address"
                  name="tokenAddress"
                  type="text"
                  value={otherTokenAddress}
                  handleChange={async (e) => {
                    setOtherTokenAddress(e.target.value);
                    checkOtherTokenInfo(e.target.value);
                  }}
                />

                {tokenError && <p className="text-red-500">{tokenError}</p>}
                {otherTokenInfo && (
                  <p className="text-white text-sm">
                    Token: {otherTokenInfo.name} ({otherTokenInfo.symbol}) -{" "}
                    Balance: {parseFloat(otherTokenInfo.balance).toFixed(4)}{" "}
                    {otherTokenInfo.symbol}
                  </p>
                )}
              </>
            )}

            <Input
              disabled={!ethereumAvailable || !currentAccount}
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange as any}
              value={formData?.addressTo ?? ""}
            />
            <Input
              disabled={!ethereumAvailable || !currentAccount}
              placeholder="Amount (ETH/YTK)"
              name="amount"
              type="number"
              handleChange={handleChange as any}
              value={formData?.amount ?? ""}
            />

            <Input
              disabled={!ethereumAvailable || !currentAccount}
              placeholder="Enter Message"
              name="message"
              type="textarea"
              handleChange={handleChange as any}
              value={formData?.message ?? ""}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {loading ? (
              <Loader />
            ) : currentAccount ? (
              <button
                type="button"
                onClick={handleSubmit}
                className={buttonClass}
              >
                Send Now
              </button>
            ) : (
              <button
                type="button"
                onClick={connectWallet}
                className={buttonClass}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
