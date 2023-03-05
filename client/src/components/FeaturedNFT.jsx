import React from "react";
import { FeaturedNftListingData } from "../utils/nftListingData";
import { shortenAddress } from "../utils/shortenAddress";

function FeaturedNFT() {
  return (
    <section className="featured spacer10 gradient-bg-services -mt-20" id="featured">
      <div className="container">
        <h1 className="text-white ta-center text-3xl sm:text-5xl py-2 text-gradient mb-20">
            Featured Artworks</h1>
        <div className="swiper card-slider row">
          <div className="swiper-wrapper">
            {FeaturedNftListingData.map((data, i) => (
              <div className="col4 col5-md col7-s swiper-slide" key={i}>
                <div className="card bg-white10">
                  <img src={data.img} className="img-responsive" alt="" />
                  <div className="row jc-between spacetop2">
                    <div>
                      <p className="size2 current halfwhite">
                        {shortenAddress(data.OwnerAddress)}
                      </p>
                      <h5 className="size2 bold">{data.NftName}</h5>
                    </div>
                    <div>
                      <p className="size2 current halfwhite">Current bid</p>
                      <h5 className="size2 bold">{data.amount}</h5>
                    </div>
                  </div>
                  <a className="bid size2 ta-center">Place a bid</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedNFT;
