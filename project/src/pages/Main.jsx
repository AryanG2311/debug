import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  LineChart,
  Loader2
} from 'lucide-react';
import axios from 'axios';

const LoadingScreen = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <div className="relative">
      <Loader2 className="h-16 w-16 text-[#4CAF50] animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="h-8 w-8 text-[#4CAF50]" />
      </div>
    </div>
    <h2 className="mt-6 text-xl font-semibold text-gray-900">Analyzing Breeding Data</h2>
    <p className="mt-2 text-gray-600">Our AI is processing comprehensive genetic information...</p>
    <div className="mt-8 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></div>
        <span className="text-gray-600">Analyzing genetic markers</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse delay-100"></div>
        <span className="text-gray-600">Evaluating breed compatibility</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse delay-200"></div>
        <span className="text-gray-600">Calculating success probability</span>
      </div>
    </div>
  </div>
);

const ErrorScreen = ({ error, onRetry }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
    <h2 className="text-xl font-semibold text-gray-900">Unable to Load Recommendation</h2>
    <p className="mt-2 text-gray-600">{error}</p>
    <button
      onClick={onRetry}
      className="mt-6 px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors flex items-center gap-2"
    >
      <Loader2 className="h-5 w-5" />
      Try Again
    </button>
  </div>
);

const BreedingRecommendation = () => {
  const { cowId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate minimum loading time for better UX
      const [response] = await Promise.all([
        axios.get(`http://localhost:4200/api/cows/${cowId}/cows`),
        new Promise(resolve => setTimeout(resolve, 2000)) // Minimum 2s loading time
      ]);

      if (response.status === 200 && response.data?.recommendation) {
        setRecommendation(response.data.recommendation);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch breeding recommendation'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cowId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <LoadingScreen />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ErrorScreen error={error} onRetry={fetchData} />
        </main>
      </div>
    );
  }

  if (!recommendation) {
    return null;
  }

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
              {recommendation.reasoningPoints?.map((point, index) => (
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
                <p className="text-gray-700">{recommendation.expectedBenefits?.milkProduction}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <HeartPulse className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <h3 className="font-medium text-gray-900">Disease Resistance</h3>
                </div>
                <p className="text-gray-700">{recommendation.expectedBenefits?.diseaseResistance}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Scale className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <h3 className="font-medium text-gray-900">Growth</h3>
                </div>
                <p className="text-gray-700">{recommendation.expectedBenefits?.growth}</p>
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
              {recommendation.healthConsiderations?.map((consideration, index) => (
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