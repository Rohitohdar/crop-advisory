import React, { useState } from 'react';
import { Sprout, BarChart3, Leaf, Sun, Droplets, Users } from 'lucide-react';
import InputForm from './components/InputForm';
import Results from './components/Results';
import Header from './components/Header';
import Hero from './components/Hero';

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  location: string;
  farmSize: number;
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'results'>('home');
  const [soilData, setSoilData] = useState<SoilData | null>(null);

  const handleStartAnalysis = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = (data: SoilData) => {
    setSoilData(data);
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSoilData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header onBackToHome={handleBackToHome} currentView={currentView} />
      
      {currentView === 'home' && (
        <>
          <Hero onStartAnalysis={handleStartAnalysis} />
          
          {/* Features Section */}
          <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Empowering Farmers with Science
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered system analyzes soil conditions and weather data to provide 
                personalized crop recommendations and fertilizer guidance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Soil Analysis</h3>
                <p className="text-gray-600">
                  Comprehensive analysis of NPK levels, pH, and soil conditions for optimal crop selection.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Integration</h3>
                <p className="text-gray-600">
                  Real-time weather data analysis including temperature, humidity, and rainfall patterns.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-gray-600">
                  Personalized crop suggestions with fertilizer guidance to maximize yield and profitability.
                </p>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Transforming Agriculture
                </h2>
                <p className="text-lg text-gray-600">
                  See how our system is making a difference for farmers worldwide
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
                  <p className="text-gray-600">Farmers Helped</p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">25%</h3>
                  <p className="text-gray-600">Yield Increase</p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplets className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">30%</h3>
                  <p className="text-gray-600">Water Savings</p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">40%</h3>
                  <p className="text-gray-600">Cost Reduction</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      
      {currentView === 'form' && (
        <InputForm onSubmit={handleFormSubmit} onBack={handleBackToHome} />
      )}
      
      {currentView === 'results' && soilData && (
        <Results data={soilData} onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;