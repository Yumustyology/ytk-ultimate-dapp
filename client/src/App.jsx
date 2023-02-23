import './init'
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Footer, Navbar, Services, Transactions, Welcome } from "./components";
import YTKExchange from './components/YTKExchange';

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />  
        <Welcome />
      </div>
      <Services />
      <YTKExchange />
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
