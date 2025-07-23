import React from 'react';
import { SoilData } from '../App';
import { Award, TrendingUp, Droplets, Thermometer, TestTube, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import CropRecommendations from './CropRecommendations';
import FertilizerAdvice from './FertilizerAdvice';
import SoilHealthAnalysis from './SoilHealthAnalysis';

interface ResultsProps {
  data: SoilData;
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ data, onBack }) => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Farm Analysis Results
        </h2>
        <p className="text-lg text-gray-600">
          Based on your soil and weather data from {data.location}
        </p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TestTube className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{data.ph}</span>
          </div>
          <h3 className="font-semibold text-gray-700">Soil pH</h3>
          <p className={`text-sm ${data.ph >= 6.0 && data.ph <= 7.5 ? 'text-green-600' : 'text-orange-600'}`}>
            {data.ph >= 6.0 && data.ph <= 7.5 ? 'Optimal' : 'Needs Adjustment'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Thermometer className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">{data.temperature}°C</span>
          </div>
          <h3 className="font-semibold text-gray-700">Temperature</h3>
          <p className="text-sm text-gray-600">Current average</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Droplets className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{data.humidity}%</span>
          </div>
          <h3 className="font-semibold text-gray-700">Humidity</h3>
          <p className="text-sm text-gray-600">Relative humidity</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{data.rainfall}mm</span>
          </div>
          <h3 className="font-semibold text-gray-700">Rainfall</h3>
          <p className="text-sm text-gray-600">Annual average</p>
        </div>
      </div>

      {/* Main Analysis Sections */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <CropRecommendations data={data} />
          <FertilizerAdvice data={data} />
        </div>
        
        <div className="space-y-8">
          <SoilHealthAnalysis data={data} />
          
          {/* Action Plan */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Recommended Action Plan
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-sm font-bold text-green-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Soil Preparation</h4>
                  <p className="text-gray-600 text-sm">
                    {data.ph < 6.0 ? 'Apply lime to increase pH levels' : 
                     data.ph > 7.5 ? 'Apply sulfur to decrease pH levels' : 
                     'Maintain current pH with organic matter'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-sm font-bold text-green-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fertilizer Application</h4>
                  <p className="text-gray-600 text-sm">
                    Apply recommended NPK fertilizers 2-3 weeks before planting
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-sm font-bold text-green-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Planting Schedule</h4>
                  <p className="text-gray-600 text-sm">
                    Follow crop-specific planting calendar based on local weather patterns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200"
        >
          Analyze Another Farm
        </button>
      </div>
    </div>
  );
};

export default Results;