import React, { useContext, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";
import { BsFillBasketFill, BsShop, BsCurrencyExchange } from "react-icons/bs";
// import {IoGameControllerOutline} from "react-icons//io"
import { GiShop } from "react-icons/gi";
import { FaPiggyBank, FaGamepad } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Link } from "react-router-dom";
import { HiCurrencyYen } from "react-icons/hi";

const NavbarItem = ({ title, classProps, icon, anchor }) => {
  return (
    <Link to={anchor}>
      <li className={`mx-4 cursor-pointer flex  items-center ${classProps}`}>
        {icon} &nbsp;
        <p className="">{title}</p>
      </li>
    </Link>
  );
};
const Navbar = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    disconnectWallet,
    isLoading,
  } = useContext(TransactionContext);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [navItems, setNavItems] = useState([
    {
      title: "Ecommerce",
      anchor: "/",
      icon: (
        <BsFillBasketFill
          fontSize={20}
          className="text-white cursor-pointer mb-1"
        />
      ),
    },
    {
      title: "Stake",
      anchor: "/",
      icon: (
        <FaPiggyBank fontSize={20} className="text-white  cursor-pointer" />
      ),
    },
    {
      title: "Games",
      icon: <FaGamepad fontSize={20} className="text-white  cursor-pointer" />,
    },
    {
      title: "Exchange",
      anchor: "#exchange",
      icon: (
        <RiExchangeDollarLine
          fontSize={20}
          className="text-white  cursor-pointer"
        />
      ),
    },
    {
      title: "NFT Marketplace",
      anchor: "/nft_page  ",
      icon: (
        <BsShop fontSize={20} className="text-white  cursor-pointer mb-1" />
      ),
    },
  ]);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/" className="flex items-center text-2xl font-bold">
          {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
          <HiCurrencyYen fontSize={35} color="#fff" /> &nbsp; YTK DAAP
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navItems.map((item, index) => (
          <NavbarItem
            key={item + index}
            title={item.title}
            icon={item.icon}
            anchor={item.anchor}
          />
        ))}

        {currentAccount ? (
          <li
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={disconnectWallet}
          >
            {shortenAddress(currentAccount)}
          </li>
        ) : (
          <li
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={connectWallet && connectWallet}
          >
            Connect Wallet
          </li>
        )}
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 right-0 p-3 w-[100vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-start rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2 flex justify-end">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {navItems.map((item, index) => (
          <NavbarItem
            key={item + index}
            title={item.title}
            icon={item.icon}
            anchor={item.anchor}
            classProps="my-2 text-lg" 
          />
        ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
