import React from 'react';
import { SoilData } from '../App';
import { Award, Star, TrendingUp, DollarSign } from 'lucide-react';

interface CropRecommendationsProps {
  data: SoilData;
}

interface Crop {
  name: string;
  suitability: number;
  expectedYield: string;
  marketPrice: string;
  season: string;
  reasons: string[];
  warnings?: string[];
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ data }) => {
  const analyzeCrops = (): Crop[] => {
    const crops: Crop[] = [];
    
    // Rice analysis
    if (data.rainfall >= 100 && data.humidity >= 60 && data.temperature >= 20 && data.temperature <= 35) {
      let suitability = 85;
      const reasons = ['Good rainfall for rice cultivation', 'Suitable humidity levels'];
      const warnings = [];
      
      if (data.nitrogen < 30) {
        suitability -= 15;
        warnings.push('Low nitrogen levels - increase fertilizer');
      }
      if (data.ph < 5.5 || data.ph > 7.0) {
        suitability -= 10;
        warnings.push('pH not optimal for rice');
      }
      
      crops.push({
        name: 'Rice',
        suitability,
        expectedYield: '4-6 tons/hectare',
        marketPrice: '₹20-25/kg',
        season: 'Kharif (Jun-Nov)',
        reasons,
        warnings: warnings.length > 0 ? warnings : undefined
      });
    }
    
    // Wheat analysis
    if (data.temperature >= 15 && data.temperature <= 25 && data.rainfall >= 50 && data.rainfall <= 100) {
      let suitability = 80;
      const reasons = ['Optimal temperature range', 'Suitable rainfall for wheat'];
      const warnings = [];
      
      if (data.nitrogen >= 40) {
        suitability += 10;
        reasons.push('Good nitrogen levels');
      } else {
        warnings.push('Consider nitrogen supplementation');
      }
      
      if (data.ph >= 6.0 && data.ph <= 7.5) {
        suitability += 5;
      } else {
        warnings.push('pH adjustment recommended');
      }
      
      crops.push({
        name: 'Wheat',
        suitability,
        expectedYield: '3-5 tons/hectare',
        marketPrice: '₹18-22/kg',
        season: 'Rabi (Nov-Apr)',
        reasons,
        warnings: warnings.length > 0 ? warnings : undefined
      });
    }
    
    // Maize analysis
    if (data.temperature >= 20 && data.temperature <= 30 && data.rainfall >= 60) {
      let suitability = 75;
      const reasons = ['Good temperature for maize growth'];
      const warnings = [];
      
      if (data.nitrogen >= 35 && data.phosphorus >= 25) {
        suitability += 15;
        reasons.push('Excellent NPK levels for maize');
      }
      
      if (data.ph >= 5.8 && data.ph <= 7.0) {
        suitability += 10;
      } else {
        warnings.push('pH optimization needed');
      }
      
      crops.push({
        name: 'Maize',
        suitability,
        expectedYield: '5-8 tons/hectare',
        marketPrice: '₹15-20/kg',
        season: 'Kharif/Rabi',
        reasons,
        warnings: warnings.length > 0 ? warnings : undefined
      });
    }
    
    // Potato analysis
    if (data.temperature >= 15 && data.temperature <= 25 && data.humidity <= 80) {
      let suitability = 70;
      const reasons = ['Suitable temperature range for potatoes'];
      const warnings = [];
      
      if (data.potassium >= 40) {
        suitability += 15;
        reasons.push('High potassium ideal for tuber development');
      } else {
        warnings.push('Increase potassium fertilization');
      }
      
      if (data.ph >= 5.0 && data.ph <= 6.5) {
        suitability += 10;
      }
      
      crops.push({
        name: 'Potato',
        suitability,
        expectedYield: '25-35 tons/hectare',
        marketPrice: '₹8-15/kg',
        season: 'Rabi (Oct-Mar)',
        reasons,
        warnings: warnings.length > 0 ? warnings : undefined
      });
    }
    
    // Sugarcane analysis
    if (data.temperature >= 20 && data.temperature <= 35 && data.rainfall >= 150) {
      let suitability = 65;
      const reasons = ['High rainfall suitable for sugarcane'];
      const warnings = [];
      
      if (data.nitrogen >= 50) {
        suitability += 20;
        reasons.push('High nitrogen supports sugarcane growth');
      } else {
        warnings.push('Requires high nitrogen fertilization');
      }
      
      crops.push({
        name: 'Sugarcane',
        suitability,
        expectedYield: '60-80 tons/hectare',
        marketPrice: '₹2.5-3.5/kg',
        season: 'Year-round',
        reasons,
        warnings: warnings.length > 0 ? warnings : undefined
      });
    }
    
    // Cotton analysis
    if (data.temperature >= 25 && data.temperature <= 35 && data.rainfall >= 50 && data.rainfall <= 150) {
      let suitability = 60;
      const reasons = ['Warm climate suitable for cotton'];
      const warnings = [];
      
      if (data.potassium >= 35) {
        suitability += 15;
        reasons.push('Good potassium for fiber quality');
      }
      
      if (data.ph >= 5.8 && data.ph <= 8.0) {
        suitability += 10;
      }
      
      crops.push({
        name: 'Cotton',
        suitability,
        expectedYield: '15-25 quintals/hectare',
        marketPrice: '₹50-70/kg',
        season: 'Kharif (Apr-Oct)',
        reasons,
        warnings: warnings.length > 0 ? warnings : undefined
      });
    }
    
    return crops.sort((a, b) => b.suitability - a.suitability).slice(0, 4);
  };

  const crops = analyzeCrops();

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 80) return 'text-green-600 bg-green-100';
    if (suitability >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getSuitabilityText = (suitability: number) => {
    if (suitability >= 80) return 'Excellent';
    if (suitability >= 60) return 'Good';
    return 'Fair';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Award className="h-6 w-6 text-green-600 mr-2" />
        Recommended Crops
      </h3>
      
      <div className="space-y-4">
        {crops.map((crop, index) => (
          <div key={crop.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold text-gray-900">{index + 1}</span>
                  {index === 0 && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{crop.name}</h4>
                  <p className="text-sm text-gray-600">{crop.season}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSuitabilityColor(crop.suitability)}`}>
                {getSuitabilityText(crop.suitability)} ({crop.suitability}%)
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Yield: {crop.expectedYield}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">Price: {crop.marketPrice}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <h5 className="text-sm font-semibold text-gray-900 mb-1">Why this crop:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {crop.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {crop.warnings && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h5 className="text-sm font-semibold text-yellow-800 mb-1">Considerations:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {crop.warnings.map((warning, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-yellow-600 mt-1">⚠</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropRecommendations;