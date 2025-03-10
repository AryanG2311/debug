import React, { useEffect, useState } from 'react';
import { Cog as Cow } from 'lucide-react';
import CowCard from '../components/CowCard';
import { cows } from '../data/cows';
import axios from 'axios';


function Home() {
  const [allCows, setAllCows] = useState({});
  useEffect(() => {

    async function fetchData() {
      try {
        const response = await axios.get(("https://api.example.com/data"),);
        setAllCows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cows.map((cow) => (
            <CowCard key={cow.id} cow={cow} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;