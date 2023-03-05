import React from 'react'
import { Footer, Navbar } from '../components'
import FeaturedNFT from '../components/FeaturedNFT'
import NFTAboutUs from '../components/NFTAboutUs'
import NFTHero from '../components/NFTHero'
import NFTListing from '../components/NFTListing'
import '../styles/nftStyles.css'
function NftLanding() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <NFTHero />
      </div>
      <NFTAboutUs />
      <FeaturedNFT />
      <NFTListing />
      {/* <Services />
      <YTKExchange />
      <Transactions /> */}
      <Footer />
    </div>
  )
}

export default NftLanding