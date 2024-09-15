import React from 'react'; // Ensure React is imported
import { HiCurrencyYen } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const NoEthNav: React.FC = () => {
  return (
    <nav className="w-full flex p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/" className="flex items-center text-2xl font-bold text-white">
          <HiCurrencyYen size={35} /> &nbsp; YTK DAAP
        </Link>
      </div>
    </nav>
  );
};

export default NoEthNav;
