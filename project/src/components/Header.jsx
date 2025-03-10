import React from 'react';
import { Cog as Cow, AArrowDown as DNA } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Cow className="h-8 w-8 text-[#4CAF50]" />
            Cow Management System
          </h1>
          <button
            className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold px-6 py-3 rounded-lg 
                     shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <DNA className="h-5 w-5" />
            Get Breeding Recommendation
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;