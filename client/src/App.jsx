import React from "react";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NftLanding from "./pages/NftLanding";
import { Routes, Route } from "react-router-dom";
import ViewNFTInfo from "./pages/ViewNFTInfo";
import MintNFTPage from "./pages/MintNFTPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/nft_page" element={<NftLanding />} />
        <Route path="/nft_info" element={<ViewNFTInfo />} />
        <Route path="/mint_nft" element={<MintNFTPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
