import React from 'react';
import { Milk as MilkBottle, Weight, Activity, AArrowDown as DNA, Heart, Sparkles } from 'lucide-react';

const CowCard = ({ cow }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start">
          <h2 className="text-2xl font-semibold text-gray-900">{cow.name}</h2>
          <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]">
            {cow.breed}
          </span>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
            <Activity className="h-5 w-5 mr-3 text-[#4CAF50]" />
            <span className="font-medium">Age: {cow.age} years</span>
          </div>
          
          <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
            <Weight className="h-5 w-5 mr-3 text-[#4CAF50]" />
            <span className="font-medium">Weight: {cow.weight} kg</span>
          </div>
          
          <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
            <DNA className="h-5 w-5 mr-3 text-[#4CAF50]" />
            <span className="font-medium">Genetic Score: {cow.geneticScore}/10</span>
          </div>
          
          <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
            <Heart className="h-5 w-5 mr-3 text-[#4CAF50]" />
            <span className="font-medium">Health: {cow.healthStatus}</span>
          </div>
          
          <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
            <MilkBottle className="h-5 w-5 mr-3 text-[#4CAF50]" />
            <span className="font-medium">Milk Yield: {cow.milkYield} L/day</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-3 px-4 rounded-lg
                       shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Get Breeding Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default CowCard;