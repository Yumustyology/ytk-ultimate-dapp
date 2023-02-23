import { BsShieldFillCheck } from "react-icons/bs";
import YTKLogo from "../assets/imgs/ytk.png";
import EthLogo from "../assets/imgs/eth-logo.png";
import { TransactionContext } from "../context/TransactionContext";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Input = ({ placeholder, name, type, value, handleChange, isYtk }) => {
  return (
    <div className="flex items-center">
      {type != "textarea" ? (
        <input
          placeholder={placeholder}
          type={type}
          step="0.0001"
          value={value}
          onChange={(e) => handleChange(e, name)}
          className="my-2 w-[90%] h-[45px] rounded-tl-sm rounded-bl-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism mb-5"
        />
      ) : (
        <textarea
          placeholder={placeholder}
          type={type}
          step="0.0001"
          value={value}
          onChange={(e) => handleChange(e, name)}
          className="my-2 w-[78%] rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
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
    // ethBal
  } = useContext(TransactionContext);

  const [balVisible, setBalVisible] = useState(false);
  const [exchangeLoading, setExchangeLoading] = useState(false);
  const [exchangeTab, setExchangeTab] = useState("eth");

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;
    e.preventDefault(); //Prevents reload after sending the form
    if (!addressTo | !amount | !message) return;
    sendTransaction();
  };

  const setExchangeTabFunc = (tab) => {
    setExchangeTab(tab);
    window.localStorage.setItem("exchangeTab", tab);
  };

  useEffect(() => {
    let tab = window.localStorage.getItem("exchangeTab");
    setExchangeTab(tab || "buy");
  }, []);
  return (
    <div className="flex flex-col mf:flex-col w-full justify-center items-center gradient-bg-exchange">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            YTK DEFI Exchange
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism -mt-5 mb-5">
          <div className="flex justify-between w-full mb-7 text-[#ddd]">
            <div
              className="bg-[#121729] py-3 px-7 rounded-full cursor-pointer hover:bg-[#172248] border-[1px] border-[#121729] hover:border-[#3d4f7c] text-sm"
              onClick={() => setExchangeTabFunc("buy")}
            >
              Buy
            </div>
            <div
              className="bg-[#121729] py-3 px-7 rounded-full cursor-pointer hover:bg-[#172248] border-[1px] border-[#121729] hover:border-[#3d4f7c] text-sm"
              onClick={() => setExchangeTabFunc("sell")}
            >
              Sell
            </div>
          </div>
          <>
            {exchangeTab === "buy" ? (
              <BuyYTKForm exchangeLoading={false} />
            ) : (
              <SellYTKForm exchangeLoading={false} />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default YTKExchange;

function SellYTKForm({ exchangeLoading }) {
  const [currency, setCurrency] = useState("eth");
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    loading,
    // ethBal
  } = useContext(TransactionContext);
  return (
    <>
      <div className="w-full">
        <p className="flex items-center w-full text-[12px] text-[grey] justify-end">
          Balance 250
        </p>
        <Input
          placeholder={`Amount (${currency.toLocaleUpperCase()})`}
          name="amount"
          type="number"
          handleChange={handleChange}
          value={formData.amount}
          isYtk={true}
        />
      </div>

      <div className="w-full">
        <p className="flex justify-end items-center w-full text-[12px] text-[grey]">
          Balance: 95.999
        </p>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={handleChange}
          value={formData.addressTo}
          isYtk={false}
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
      ) : (
        <button
          type="button"
          onClick={connectWallet}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
        >
          Swap
        </button>
      )}
    </>
  );
}

function BuyYTKForm({ exchangeLoading }) {
  const [currency, setCurrency] = useState("eth");
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    loading,
    // ethBal
  } = useContext(TransactionContext);
  return (
    <>
      <div className="w-full">
        <p className="flex justify-end items-center w-full text-[12px] text-[grey]">
          Balance: 95.999
        </p>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={handleChange}
          value={formData.addressTo}
          isYtk={false}
        />
      </div>

      <div className="w-full">
        <p className="flex items-center w-full text-[12px] text-[grey] justify-end">
          Balance 250
        </p>
        <Input
          placeholder={`Amount (${currency.toLocaleUpperCase()})`}
          name="amount"
          type="number"
          handleChange={handleChange}
          value={formData.amount}
          isYtk={true}
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
      ) : (
        <button
          type="button"
          onClick={connectWallet}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
        >
          Swap
        </button>
      )}
    </>
  );
}
