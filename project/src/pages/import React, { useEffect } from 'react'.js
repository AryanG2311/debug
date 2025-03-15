import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Dna, 
  HeartPulse, 
  Scale, 
  Share2, 
  Printer, 
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Brain,
  Sparkles,
  Beaker,
  LineChart
} from 'lucide-react';
import axios from 'axios';

const BreedingRecommendation = () => {

  const { cowId } = useParams();

  const navigate = useNavigate();
  
  // Sample recommendation data
  const [recommendation,Setrecommendation] = useState({})
 

    useEffect(() => {

      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:4200/api/cows/${cowId}/cows`);
          console.log(response.data);
          
         if(response.status == "200")
          Setrecommendation(response.data.recommendation);
        
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
    }, []);

  

  return ( 
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-gray-900">
                <Share2 className="h-5 w-5 mr-2" />
                Share Report
              </button>
              <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-gray-900">
                <Printer className="h-5 w-5 mr-2" />
                Print Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-[#4CAF50] bg-opacity-10 rounded-full mb-4">
            <Brain className="h-8 w-8 text-[#4CAF50]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Breeding Recommendation Report</h1>
          <p className="text-gray-600">AI-Powered Analysis for Optimal Breeding Results</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8">
          {/* Confidence Score and Recommended Breed */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">AI Confidence Score</h2>
                <p className="text-gray-600 text-sm">Based on comprehensive data analysis</p>
              </div>
              <div className="flex items-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#4CAF50]">{recommendation.confidenceScore}%</span>
                  </div>
                  <svg className="transform -rotate-90 w-20 h-20">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - recommendation.confidenceScore / 100)}`}
                      className="text-[#4CAF50] transition-all duration-1000 ease-out"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Recommended Breed</h2>
              <div className="flex items-center mt-4">
                <Sparkles className="h-6 w-6 text-[#4CAF50] mr-3" />
                <span className="text-2xl font-bold text-gray-900">{recommendation.recommendedBreed}</span>
              </div>
            </div>
          </div>

          {/* Reasoning Points */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <Brain className="h-6 w-6 text-[#4CAF50] mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">AI Reasoning</h2>
            </div>
            <div className="grid gap-4">
              {recommendation.reasoningPoints.map((point, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-[#4CAF50] mr-3 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Benefits */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <LineChart className="h-6 w-6 text-[#4CAF50] mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Expected Benefits</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Beaker className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <h3 className="font-medium text-gray-900">Milk Production</h3>
                </div>
                <p className="text-gray-700">{recommendation.expectedBenefits.milkProduction}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <HeartPulse className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <h3 className="font-medium text-gray-900">Disease Resistance</h3>
                </div>
                <p className="text-gray-700">{recommendation.expectedBenefits.diseaseResistance}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Scale className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <h3 className="font-medium text-gray-900">Growth</h3>
                </div>
                <p className="text-gray-700">{recommendation.expectedBenefits.growth}</p>
              </div>
            </div>
          </div>

          {/* Health Considerations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <AlertCircle className="h-6 w-6 text-[#4CAF50] mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Health Considerations</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendation.healthConsiderations.map((consideration, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-[#4CAF50] mr-3 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{consideration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              View Detailed Report
            </button>
            <button className="px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors flex items-center gap-2">
              <Dna className="h-5 w-5" />
              Schedule Breeding
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BreedingRecommendation;