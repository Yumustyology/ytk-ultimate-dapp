import React from "react";
import AboutImg from "../assets/imgs/nftImgs/about.png";
import AboutInfoImg from "../assets/imgs/nftImgs/collection1.png";
import { shortenAddress } from "../utils/shortenAddress";
import Navbar from "../components/Navbar";

function ViewNFTInfo() {
  return (
    <div>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <div className="flex flex-col mf:flex-row w-full justify-center items-center p-10 pt-0">
            <section id="about" className="spacer10">
              <div className="container">
                <div className="row jc-between flexcol-s">
                  <div className="col5 col10-s spacebottom2-s">
                    <img src={AboutInfoImg} className="img-responsive w-[500px]" alt="" />
                  </div>
                  <div className="col6 col12-s ta-center-s flex flex-col justify-between">
                    <div>
                      <h3 className="size3 bold">Bored Chicken</h3>
                      <p className="size2 spacetop1 spacebottom3 halfwhite">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam eu turpis molestie, dictum est a, mattis tellus.
                        Sed dignissim, metus nec fringilla accumsan, risus sem
                        sollicitudin lacus.x... <span className="text-purple-600 size2">see more</span>
                      </p>

                      <div className="row jc-between spacebottom2">
                  <div>
                    <p className="size2 current halfwhite">
                      Owner
                    </p>
                    <h5 className="size2 bold current">{shortenAddress('fffdvdfffsgkmfbodkpkgbteopeopreoipg')}</h5>
                  </div>
                  <div>
                    <p className="size2 current halfwhite">Cutrent Price</p>
                    <h5 className="size2 bold">2ETH</h5>
                  </div>
                </div>

                    </div>

                    <a
                      href="#collections"
                      className="btn  hover:border-2 hover:border-purple-500 bg-purple text-[1rem] w-[200px] text-center white mr-5 hover:bg-[transparent]"
                    >
                      Buy for 2.5ETH
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNFTInfo;
