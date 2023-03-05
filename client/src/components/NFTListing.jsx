import React from "react";
import { Link } from "react-router-dom";
import { NftListingData } from "../utils/nftListingData";
import { shortenAddress } from "../utils/shortenAddress";

function NFTListing() {
  return (
    <div>
      <section
        className=" gradient-bg-services collections spacer10 p-10"
        id="collections"
      >
        <div className="container">
          <h1 className="text-white ta-center text-3xl sm:text-5xl py-2 text-gradient mb-20">
            Listed NFTs
          </h1>

          <div className="row spacebottom3 filter-buttons">
            {/* {NftListingData.map(data=>{
                    let filterBtns  = [...new Set(data.dataItem)]
                    console.log("filterBtns ", filterBtns);
                    return(
                        {filterBtns.map(filterBtn=>(<div className="col3 filter col6-xs spacebottom1-xs" data-filter={filterBtn} key={i}>filterBtn</div>))}
                    )
                })} */}
            <div
              className="col3 filter col6-xs spacebottom1-xs"
              data-filter="all"
            >
              All
            </div>
            <div
              className="col3 filter col6-xs spacebottom1-xs"
              data-filter="art"
            >
              Art
            </div>
            <div className="col3 filter col6-xs" data-filter="photography">
              Photograpy
            </div>
            <div className="col3 filter col6-xs" data-filter="pattern">
              Pattern
            </div>
          </div>
          <div className="row box-card jc-evenly-md">
            {NftListingData.map((data, i) => (
              <div
                className="col4 card collect bg-white10 col5-md col6-s"
                data-item={data.dataItem}
                key={i}
              >
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
                <Link to="/nft_info">
                  <a className="bid size2 ta-center">Purchase Item</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NFTListing;
