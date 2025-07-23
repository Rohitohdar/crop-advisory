import React, { useState } from 'react';
import { SoilData } from '../App';
import { MapPin, Thermometer, Droplets, CloudRain, TestTube } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: SoilData) => void;
  onBack: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<SoilData>({
    nitrogen: 40,
    phosphorus: 30,
    potassium: 35,
    ph: 6.5,
    temperature: 25,
    humidity: 65,
    rainfall: 150,
    location: '',
    farmSize: 2.5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof SoilData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'location' ? e.target.value : parseFloat(e.target.value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Soil & Weather Analysis
        </h2>
        <p className="text-lg text-gray-600">
          Enter your farm's current conditions for personalized crop recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
        {/* Farm Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-green-600" />
            Farm Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={handleChange('location')}
                placeholder="e.g., Punjab, India"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Size (acres)
              </label>
              <input
                type="number"
                value={formData.farmSize}
                onChange={handleChange('farmSize')}
                step="0.1"
                min="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Soil Parameters */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TestTube className="h-5 w-5 mr-2 text-blue-600" />
            Soil Analysis (NPK & pH)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nitrogen (N) mg/kg
              </label>
              <input
                type="number"
                value={formData.nitrogen}
                onChange={handleChange('nitrogen')}
                min="0"
                max="200"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Typical range: 20-80</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phosphorus (P) mg/kg
              </label>
              <input
                type="number"
                value={formData.phosphorus}
                onChange={handleChange('phosphorus')}
                min="0"
                max="150"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Typical range: 10-50</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Potassium (K) mg/kg
              </label>
              <input
                type="number"
                value={formData.potassium}
                onChange={handleChange('potassium')}
                min="0"
                max="300"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Typical range: 20-100</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                pH Level
              </label>
              <input
                type="number"
                value={formData.ph}
                onChange={handleChange('ph')}
                step="0.1"
                min="3"
                max="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Optimal: 6.0-7.5</p>
            </div>
          </div>
        </div>

        {/* Weather Conditions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Thermometer className="h-5 w-5 mr-2 text-orange-600" />
            Weather Conditions
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                value={formData.temperature}
                onChange={handleChange('temperature')}
                min="-10"
                max="50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Humidity (%)
              </label>
              <input
                type="number"
                value={formData.humidity}
                onChange={handleChange('humidity')}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Rainfall (mm)
              </label>
              <input
                type="number"
                value={formData.rainfall}
                onChange={handleChange('rainfall')}
                min="0"
                max="3000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Analyze & Get Recommendations
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;