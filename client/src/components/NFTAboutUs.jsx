import React from "react";
import AboutImg from "../assets/imgs/nftImgs/about.png";

function NFTAboutUs() {
  return (
    <div className="flex flex-col mf:flex-row w-full justify-center items-center gradient-bg-services p-10">
      <section id="about" className="spacer10">
        <div className="container">
          <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient mb-3">
              About YTK NFT Marketplace
            </h1>
          </div>
          <p className="spacebottom3 text-white text-[1.5rem] ta-center">
            Bringing near you the best and creative artworks.
          </p>
          <div className="row ai-center jc-between flexcol-s">
            <div className="col5 col10-s spacebottom2-s">
              <img src={AboutImg} className="img-responsive" alt="" />
            </div>
            <div className="col6 col12-s ta-center-s">
              <h3 className="size3 bold">YTK Marketplace</h3>
              <p className="size2 spacetop1 spacebottom3 halfwhite">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus.x
              </p>
              <a href="#collections" className="btn bg-purple text-[1rem] white mr-5 hover:bg-[#2546bd]">
                Mint Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NFTAboutUs;
