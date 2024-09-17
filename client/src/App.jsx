import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NftLanding from "./pages/NftLanding";
import { Routes, Route } from "react-router-dom";
import ViewNFTInfo from "./pages/ViewNFTInfo";
import MintNFTPage from "./pages/MintNFTPage";
import { TransactionContext } from "./context/TransactionContext";
import EthereumNotAvailable from "./components/EthereumNotAvailable";
import Container from "./components/Container";


function App() {
  const { ethereumAvailable } = useContext(TransactionContext);

  return (
    // <Container>
      <BrowserRouter>
        {ethereumAvailable ? (
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/nft_page" element={<NftLanding />} />
            <Route path="/nft_info" element={<ViewNFTInfo />} />
            <Route path="/mint_nft" element={<MintNFTPage />} />
          </Routes>
        ) : (
          <EthereumNotAvailable />
        )}
      </BrowserRouter>
    // </Container>
  );
}

export default App;
