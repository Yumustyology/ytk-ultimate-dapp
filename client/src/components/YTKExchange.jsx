import YTKLogo from "../assets/imgs/ytk.png";
import EthLogo from "../assets/imgs/eth-logo.png";
import { TransactionContext } from "../context/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import Loader from "./Loader";
import {
  YTKAbi,
  YTKExchangeAbi,
  ytkContractAddress,
  ytkExchangeContractAddress,
} from "../utils/constants";
import { ethers } from "ethers";

const Input = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
  isYtk,
  readonly,
}) => {
  return (
    <div className="flex items-center">
      {type != "textarea" ? (
        <input
          placeholder={placeholder}
          type={type}
          step="0.0001"
          value={value}
          onChange={(e) => handleChange(e, name)}
          className="my-2 w-[90%] h-[45px] rounded-tl-sm rounded-bl-sm p-2 outline-0 bg-transparent text-white border-none text-sm white-glassmorphism mb-5"
          readOnly={readonly}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          type={type}
          step="0.0001"
          value={value}
          onChange={(e) => handleChange(e, name)}
          className="my-2 w-[78%] rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          readOnly={readonly}
        ></textarea>
      )}
      <div className=" my-2 w-[22%] h-[45px] rounded-tl-none px-3 rounded-bl-none rounded-tr-sm rounded-br-sm p-2 outline-none bg-[#2f3e6a] flex items-center justify-center text-white border-none text-sm mb-5 white-glassmorphism">
        <img src={isYtk ? YTKLogo : EthLogo} width={20} className="ml-1" />
        &nbsp;
        <span className="text-[12px] mr-1"> {isYtk ? "YTK" : "ETH"} </span>
      </div>
    </div>
  );
};

const YTKExchange = () => {
  const [exchangeLoading, setExchangeLoading] = useState(false);
  const [exchangeTab, setExchangeTab] = useState("eth");
  const [provider, setProvider] = useState(null);
  const [ytkBalance, setYTKBalance] = useState(0);
  const { currentAccount, getYTKContract, getYTKExchangeContract } =
    useContext(TransactionContext);

  let { ethereum } = window;

  let exchangeContract = getYTKExchangeContract();
  let ytkContract = getYTKContract();

  const buyYTK = async (ethAmount, ytkAmount) => {
    if (!ethAmount | !ytkAmount) return;
    setExchangeLoading(true);
    console.log("wanna buy ytk ?");
    try {
      const hashed = await exchangeContract.buyTokens({
        from: currentAccount,
        value: ethers.utils.parseEther(ethAmount),
        // gasLimit:'0x5208'
        // gasLimit: 3e7,
        gasLimit: 50000,
      });

      console.log("hashed ", hashed.hash);
      setExchangeLoading(false);
    } catch (e) {
      console.log("error on buy ytk" + e);
      setExchangeLoading(false);
    }
  };

  const sellYTK = async (ethAmount, ytkAmount) => {
    if (!ethAmount | !ytkAmount) return;
    console.log(ytkAmount);
    // setExchangeLoading(true);
    let parsedYtkAmount = ethers.utils.parseEther(ytkAmount.toString());
    console.log("parsed amt ",parsedYtkAmount);
    console.log("wanna sell ytk ?");
    try {
      const hashed = await ytkContract
        .approve(ytkExchangeContractAddress, parsedYtkAmount)
        // .sendTransaction({ from: currentAccount });
      const sellYTKHashed = await exchangeContract
        .sellTokens(parsedYtkAmount)
        .send({ from: this.state.account });
      setExchangeLoading(false);
      console.log(hashed, sellYTKHashed);
    } catch (e) {
      console.log("error on sell ytk" + e);
      setExchangeLoading(false);
    }
  };

  const setExchangeTabFunc = async (tab) => {
    setExchangeTab(tab);
    window.localStorage.setItem("exchangeTab", tab);
    let ytkBalance = await ytkContract.balanceOf(currentAddress);
    setYTKBalance(ytkBalance);
  };

  useEffect(() => {
    let tab = window.localStorage.getItem("exchangeTab");
    setExchangeTab(tab || "buy");
  }, []);
  return (
    <div className="flex flex-col mf:flex-col w-full justify-center items-center gradient-bg-exchange" id="exchange">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            YTK DEFI Exchange
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism -mt-5 mb-5">
          <div className="flex justify-between w-full mb-7 text-[#ddd] items-center">
            <div
              className={`bg-[#121729] py-3 px-7 rounded-full cursor-pointer hover:bg-[#172248] border-[1px] border-[#121729] hover:border-[#3d4f7c] text-sm ${
                exchangeTab === "buy" && "bg-[#172248] border-[#3d4f7c]"
              }`}
              onClick={() =>
                exchangeLoading && exchangeTab === "buy"
                  ? alert("Please wait till the purchase is completed...")
                  : exchangeLoading && exchangeTab === "sell"
                  ? alert("Please wait till the transaction is completed...")
                  : setExchangeTabFunc("buy")
              }
            >
              Buy
            </div>
            {/* <div>
              <CgArrowsExchangeAltV
                fontSize={30}
                className="text-white  cursor-pointer"
              />
            </div> */}
            <div
              className={`bg-[#121729] py-3 px-7 rounded-full cursor-pointer hover:bg-[#172248] border-[1px] border-[#121729] hover:border-[#3d4f7c] text-sm ${
                exchangeTab === "sell" && "bg-[#172248] border-[#3d4f7c]"
              }`}
              onClick={() =>
                exchangeLoading && exchangeTab === "buy"
                  ? alert("Please wait till the purchase is completed...")
                  : exchangeLoading && exchangeTab === "sell"
                  ? alert("Please wait till the transaction is completed...")
                  : setExchangeTabFunc("sell")
              }
            >
              Sell
            </div>
          </div>
          <>
            {exchangeTab === "buy" ? (
              <BuyYTKForm exchangeLoading={exchangeLoading} buyYTK={buyYTK} />
            ) : (
              <SellYTKForm
                exchangeLoading={exchangeLoading}
                sellYTK={sellYTK}
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default YTKExchange;

// Buy and sell forms

function BuyYTKForm({ exchangeLoading, buyYTK }) {
  const [calculatedYTKPrice, setCalculatedYTKPrice] = useState();
  const [ethAmt, setEthAmt] = useState();
  const { connectWallet, currentAccount, ethBal, ytkBal } =
    useContext(TransactionContext);

  let etherBal = parseFloat(ethBal);
  let YtkBal = parseFloat(ytkBal);
  return (
    <>
      <div className="w-full">
        <p className="flex justify-end items-center w-full text-[12px] text-[grey]">
          Balance: {etherBal.toFixed(4)}
        </p>
        <Input
          placeholder="Amount (ETH)"
          name="addressTo"
          value={ethAmt}
          handleChange={(e) => {
            setEthAmt(e.target.value);
            setCalculatedYTKPrice(e.target.value ? e.target.value * 100 : "");
          }}
          isYtk={false}
          type="number"
          readonly={currentAccount ? false : true}
        />
      </div>
      <div>
        <CgArrowsExchangeAltV
          fontSize={30}
          className="text-white  cursor-pointer"
        />
      </div>
      <div className="w-full">
        <p className="flex items-center w-full text-[12px] text-[grey] justify-end">
          Balance: {YtkBal.toFixed(4)}
        </p>
        <Input
          placeholder={`Amount (YTK)`}
          name="amount"
          type="number"
          value={calculatedYTKPrice}
          isYtk={true}
          readonly={true}
        />
      </div>

      <div className="h-[1px] w-full bg-gray-400 my-2" />

      <div className="flex justify-between items-center w-full text-[12px] text-[grey] text-right">
        <span>Exchange Rate</span>
        <span>1ETH = 100YTK</span>
      </div>

      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {exchangeLoading ? (
        <Loader />
      ) : currentAccount ? (
        <button
          type="button"
          onClick={() => buyYTK(ethAmt, calculatedYTKPrice)}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
        >
          Swap
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
    </>
  );
}

function SellYTKForm({ exchangeLoading, sellYTK }) {
  const [calculatedETHPrice, setCalculatedETHPrice] = useState();
  const [ytkAmt, setYtkAmt] = useState();
  const { connectWallet, currentAccount, ethBal, ytkBal } =
    useContext(TransactionContext);
  let etherBal = parseFloat(ethBal);
  let YtkBal = parseFloat(ytkBal);

  return (
    <>
      <div className="w-full">
        <p className="flex items-center w-full text-[12px] text-[grey] justify-end">
          Balance: {YtkBal.toFixed(4)}
        </p>
        <Input
          placeholder={`Amount (YTK)`}
          name="amount"
          type="number"
          handleChange={(e) => {
            setYtkAmt(e.target.value);
            setCalculatedETHPrice(e.target.value ? e.target.value / 100 : "");
          }}
          value={ytkAmt}
          isYtk={true}
          readonly={currentAccount ? false : true}
        />
      </div>
      <div>
        <CgArrowsExchangeAltV
          fontSize={30}
          className="text-white  cursor-pointer"
        />
      </div>
      <div className="w-full">
        <p className="flex justify-end items-center w-full text-[12px] text-[grey]">
          Balance: {etherBal.toFixed(4)}
        </p>
        <Input
          placeholder="Amount (ETH)"
          name="addressTo"
          value={calculatedETHPrice}
          isYtk={false}
          type="number"
          readonly={true}
        />
      </div>

      <div className="h-[1px] w-full bg-gray-400 my-2" />

      <div className="flex justify-between items-center w-full text-[12px] text-[grey] text-right">
        <span>Exchange Rate</span>
        <span>1ETH = 100YTK</span>
      </div>

      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {exchangeLoading ? (
        <Loader />
      ) : currentAccount ? (
        <button
          type="button"
          onClick={() => sellYTK(ytkAmt, calculatedETHPrice)}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
        >
          Swap
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
    </>
  );
}
