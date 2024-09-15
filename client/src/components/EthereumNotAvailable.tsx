import React from 'react'
import NoEthNav from './NoEthNav'
import { buttonClass } from '@utils/buttonClass'

const EthereumNotAvailable = () => {
  return (
    <main className="min-h-screen overflow-hidden px-9 lg:px-0">
    <NoEthNav />
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-bold text-xl">Ethereum is not available</h1>
        <p>
          Please install MetaMask or another Ethereum provider to use this
          application.
        </p>
        <a
          href="https://metamask.io/download.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={buttonClass}>
          Get MetaMask
          </button>
        </a>
      </div>
    </div>
  </main>
  )
}

export default EthereumNotAvailable