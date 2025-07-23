import React from 'react';
import { Sprout, ArrowRight, Leaf } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartAnalysis }) => {
  return (
    <section className="pt-16 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="h-4 w-4" />
            <span>AI-Powered Crop Recommendations</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Farming Starts with
            <span className="text-green-600 block">Data-Driven Decisions</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Optimize your crop selection and maximize yield with our advanced soil analysis 
            and weather integration system. Get personalized recommendations tailored to 
            your farm's unique conditions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStartAnalysis}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start Soil Analysis</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button className="text-gray-600 hover:text-green-600 px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
              <span>Learn More</span>
            </button>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">N</span>
                </div>
                <h3 className="font-semibold text-gray-900">Nitrogen</h3>
                <p className="text-sm text-gray-600">Essential for leaf growth</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">P</span>
                </div>
                <h3 className="font-semibold text-gray-900">Phosphorus</h3>
                <p className="text-sm text-gray-600">Root development</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">K</span>
                </div>
                <h3 className="font-semibold text-gray-900">Potassium</h3>
                <p className="text-sm text-gray-600">Disease resistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;