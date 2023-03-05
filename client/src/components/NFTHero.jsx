import React from "react";
import "../styles/nftHero.css";
import heroImg from "../assets/imgs/nftImgs/heroimage.png";
import { Link } from "react-router-dom";
function NFTHero() {
  return (
    <div>
      <section
        id="home"
        className="pb-[1rem] pt-9 pl-10 pr-10"
        style={{ fontSize: "10px" }}
      >
        <div
          className="container flex items-center justify-center"
          style={{ fontSize: "10px" }}
        >
          <div className="row jc-between ai-center col-reverse-s">
            <div className="col5 col6-md col12-s ta-center-s">
              {/* <h1 className="size5 bold spacebottom1"> */}
              <h1 className="text-[3rem] sd:text-5xl text-white text-gradient py-1">
                Create, Sell & List Your Own Creative NFT
              </h1>

              <p className="text-[1rem] text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base spacebottom3">
                Welcome to YTK NFT Marketplace where you get to mint, list and
                sell your creative NFTs.
              </p>

              <div className="row col8 col9-md  spacebottom4 -s col12-s">
                <Link to="/" className="btn bg-purple text-[1rem] white mr-5 hover:bg-[#2546bd]">
                  Explore now
                </Link>
                <Link to='/mint_nft' className="btn bg-white10 text-[1rem] white hover:bg-[#2546bd]">
                  Mint NFT
                </Link>
              </div>

              {/* <div class="row jc-between">
                <div class="ta-center">
                  <p class="size3 bold">37k+</p>
                  <p class="size2 halfwhite">Artworks</p>
                </div>
                <div class="ta-center">
                  <p class="size3 bold">20k+</p>
                  <p class="size2 halfwhite">Artist</p>
                </div>
                <div class="ta-center">
                  <p class="size3 bold">99k+</p>
                  <p class="size2 halfwhite">Sold </p>
                </div>
              </div> */}
              
            </div>
            <div className="col6 col12-s spacebottom3-s">
              <img src={heroImg} alt="" className="img-responsive float" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NFTHero;
