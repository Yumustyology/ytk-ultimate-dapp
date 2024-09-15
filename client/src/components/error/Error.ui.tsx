import React from 'react';
import NoEthNav from '../NoEthNav';
import { buttonClass } from '@/utils/buttonClass';

const ErrorUI = ({ errMsg }: { errMsg: string }) => {
  // Function to refresh the page
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen overflow-hidden px-9 lg:px-0">
      <NoEthNav />
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-bold text-xl">An error occurred!</h1>
          <p className="mt-4 mb-6 text-lg text-red-600">
            {errMsg}
          </p>
          <p className="mb-6">
            {errMsg.includes('MetaMask') ? (
              <>
                Please install MetaMask or ensure it is properly configured.
              </>
            ) : (
              <>
                Please try refreshing the page or check back later.
              </>
            )}
          </p>
          <button 
            className={buttonClass} 
            onClick={handleRefresh}
          >
            Refresh Page
          </button>
          <div className="mt-4">
            {errMsg.includes('MetaMask') && (
              <a
                href="https://metamask.io/download.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={buttonClass}>
                  Get MetaMask
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorUI;
