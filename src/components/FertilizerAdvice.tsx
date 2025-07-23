import React from 'react';
import { SoilData } from '../App';
import { Beaker, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface FertilizerAdviceProps {
  data: SoilData;
}

const FertilizerAdvice: React.FC<FertilizerAdviceProps> = ({ data }) => {
  const getNutrientStatus = (current: number, optimal: [number, number]) => {
    if (current < optimal[0]) return 'low';
    if (current > optimal[1]) return 'high';
    return 'optimal';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      case 'high':
        return <TrendingUp className="h-5 w-5 text-orange-600" />;
      default:
        return <Minus className="h-5 w-5 text-green-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getRecommendation = (nutrient: string, status: string, current: number, optimal: [number, number]) => {
    const deficiency = optimal[0] - current;
    const excess = current - optimal[1];
    
    switch (nutrient) {
      case 'Nitrogen':
        if (status === 'low') {
          return `Apply ${Math.round(deficiency * 2)} kg/hectare of Urea or ${Math.round(deficiency * 1.5)} kg/hectare of DAP`;
        }
        if (status === 'high') {
          return 'Reduce nitrogen fertilizers. Consider split application or organic alternatives';
        }
        return 'Maintain current nitrogen levels with balanced NPK fertilizer';
        
      case 'Phosphorus':
        if (status === 'low') {
          return `Apply ${Math.round(deficiency * 3)} kg/hectare of Single Super Phosphate (SSP)`;
        }
        if (status === 'high') {
          return 'Avoid phosphorus fertilizers. Focus on nitrogen and potassium';
        }
        return 'Maintain with regular NPK application';
        
      case 'Potassium':
        if (status === 'low') {
          return `Apply ${Math.round(deficiency * 2.5)} kg/hectare of Muriate of Potash (MOP)`;
        }
        if (status === 'high') {
          return 'Reduce potassium fertilizers. Monitor plant health';
        }
        return 'Maintain with balanced fertilization';
        
      default:
        return '';
    }
  };

  const nutrients = [
    { name: 'Nitrogen', current: data.nitrogen, optimal: [30, 60] as [number, number], unit: 'mg/kg' },
    { name: 'Phosphorus', current: data.phosphorus, optimal: [15, 40] as [number, number], unit: 'mg/kg' },
    { name: 'Potassium', current: data.potassium, optimal: [25, 80] as [number, number], unit: 'mg/kg' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Beaker className="h-6 w-6 text-blue-600 mr-2" />
        Fertilizer Recommendations
      </h3>
      
      <div className="space-y-6">
        {nutrients.map((nutrient) => {
          const status = getNutrientStatus(nutrient.current, nutrient.optimal);
          
          return (
            <div key={nutrient.name} className={`border rounded-lg p-4 ${getStatusColor(status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(status)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{nutrient.name}</h4>
                    <p className="text-sm text-gray-600">
                      Current: {nutrient.current} {nutrient.unit} | 
                      Optimal: {nutrient.optimal[0]}-{nutrient.optimal[1]} {nutrient.unit}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>
              
              <div className="bg-white bg-opacity-70 rounded-lg p-3">
                <h5 className="font-semibold text-gray-900 mb-2">Recommendation:</h5>
                <p className="text-sm text-gray-700">
                  {getRecommendation(nutrient.name, status, nutrient.current, nutrient.optimal)}
                </p>
              </div>
            </div>
          );
        })}
        
        {/* pH Adjustment */}
        <div className={`border rounded-lg p-4 ${data.ph >= 6.0 && data.ph <= 7.5 ? 'text-green-600 bg-green-50 border-green-200' : 'text-orange-600 bg-orange-50 border-orange-200'}`}>
          <div className="flex items-center space-x-3 mb-3">
            <Beaker className="h-5 w-5" />
            <div>
              <h4 className="font-semibold text-gray-900">pH Adjustment</h4>
              <p className="text-sm text-gray-600">
                Current pH: {data.ph} | Optimal: 6.0-7.5
              </p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-70 rounded-lg p-3">
            <h5 className="font-semibold text-gray-900 mb-2">Recommendation:</h5>
            <p className="text-sm text-gray-700">
              {data.ph < 6.0 
                ? `Apply ${Math.round((6.0 - data.ph) * 500)} kg/hectare of agricultural lime to increase pH`
                : data.ph > 7.5 
                ? `Apply ${Math.round((data.ph - 7.5) * 200)} kg/hectare of sulfur to decrease pH`
                : 'pH is optimal. Maintain with organic matter and balanced fertilization'
              }
            </p>
          </div>
        </div>
        
        {/* Application Schedule */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Application Schedule</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start space-x-2">
              <span className="font-medium text-blue-600">Pre-planting:</span>
              <span>Apply 50% of phosphorus and potassium fertilizers 2-3 weeks before sowing</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium text-blue-600">At planting:</span>
              <span>Apply remaining phosphorus and 30% of nitrogen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium text-blue-600">Growth stage:</span>
              <span>Apply remaining nitrogen in 2-3 split doses during active growth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerAdvice;