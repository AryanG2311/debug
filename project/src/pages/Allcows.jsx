import React, { useEffect, useState } from 'react';
import { Cog as Cow } from 'lucide-react';
import CowCard from '../components/CowCard';
import { cows } from '../data/cows';
import axios from 'axios';


function Home() {
  const [allCows, setAllCows] = useState([]);
  useEffect(() => {

    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4200/api/owners/67cea83ff2074d36eff08c10/cows`);
        console.log(response.data);
        
       if(response.status == "200")
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
        
          {allCows.map((cow) => (
            <CowCard key={cow._id} cow={cow} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;