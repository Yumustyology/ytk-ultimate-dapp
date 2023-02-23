import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { TransactionContext } from "../context/TransactionContext";
import { useContext, useState } from "react";

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
  const [currency, setCurrency] = useState("eth");

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;
    e.preventDefault(); //Prevents reload after sending the form
    if (!addressTo | !amount | !message) return;
    sendTransaction();
  };

  return (
    <div className="flex flex-col mf:flex-col w-full justify-center items-center gradient-bg-exchange">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            {/* Services that we
            <br />
            continue to improve */}
            YTK DEFI Exchange
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center ">
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism -mt-5 mb-5">
          <div className="flex justify-between w-full mb-4 text-[#ddd]">
            <div className="bg-[#121729] py-3 px-7  rounded-full cursor-pointer hover:bg-[#172248] border-[1px] border-[#121729] hover:border-[#3d4f7c] text-sm">Buy</div>
            <div className="bg-[#121729] py-3 px-7  rounded-full cursor-pointer hover:bg-[#172248] border-[1px] border-[#121729] hover:border-[#3d4f7c] text-sm">Sell</div>
          </div>

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
              Swap
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default YTKExchange;
