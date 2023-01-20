import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";
import { BsFillBasketFill, BsShop, BsCurrencyExchange } from "react-icons/bs";
// import {IoGameControllerOutline} from "react-icons//io"
import { GiShop } from "react-icons/gi";
import { FaPiggyBank, FaGamepad } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
const NavbarItem = ({ title, classProps, icon }) => {
  return (
    <li className={`mx-4 cursor-pointer flex  items-center ${classProps}`}>
      {icon} &nbsp;
      <p className="">{title}</p>
    </li>
  );
};
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {[
          {
            title: "Ecommerce",
            icon: (
              <BsFillBasketFill
                fontSize={20}
                className="text-white cursor-pointer mb-1"
              />
            ),
          },
          {
            title: "Stake",
            icon: (
              <FaPiggyBank
                fontSize={20}
                className="text-white  cursor-pointer"
              />
            ),
          },
          {
            title: "DEFI Game",
            icon: (
              <FaGamepad fontSize={20} className="text-white  cursor-pointer" />
            ),
          },
          {
            title: "DEFI Exchange",
            icon: (
              <RiExchangeDollarLine
                fontSize={20}
                className="text-white  cursor-pointer"
              />
            ),
          },
          {
            title: "NFT Marketplace",
            icon: (
              <BsShop
                fontSize={20}
                className="text-white  cursor-pointer mb-1"
              />
            ),
          },
        ].map((item, index) => (
          <NavbarItem key={item + index} title={item.title} icon={item.icon} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Connect Wallet
        </li>
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
            className="z-10 fixed top-0 right-0 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
