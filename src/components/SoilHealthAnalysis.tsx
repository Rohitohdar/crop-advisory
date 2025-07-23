import React from 'react';
import { SoilData } from '../App';
import { Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface SoilHealthAnalysisProps {
  data: SoilData;
}

const SoilHealthAnalysis: React.FC<SoilHealthAnalysisProps> = ({ data }) => {
  const calculateHealthScore = (): number => {
    let score = 0;
    let factors = 0;
    
    // pH score (0-25 points)
    if (data.ph >= 6.0 && data.ph <= 7.5) {
      score += 25;
    } else if (data.ph >= 5.5 && data.ph <= 8.0) {
      score += 20;
    } else if (data.ph >= 5.0 && data.ph <= 8.5) {
      score += 15;
    } else {
      score += 10;
    }
    factors++;
    
    // Nitrogen score (0-25 points)
    if (data.nitrogen >= 30 && data.nitrogen <= 60) {
      score += 25;
    } else if (data.nitrogen >= 20 && data.nitrogen <= 80) {
      score += 20;
    } else if (data.nitrogen >= 15 && data.nitrogen <= 100) {
      score += 15;
    } else {
      score += 10;
    }
    factors++;
    
    // Phosphorus score (0-25 points)
    if (data.phosphorus >= 15 && data.phosphorus <= 40) {
      score += 25;
    } else if (data.phosphorus >= 10 && data.phosphorus <= 50) {
      score += 20;
    } else if (data.phosphorus >= 8 && data.phosphorus <= 60) {
      score += 15;
    } else {
      score += 10;
    }
    factors++;
    
    // Potassium score (0-25 points)
    if (data.potassium >= 25 && data.potassium <= 80) {
      score += 25;
    } else if (data.potassium >= 20 && data.potassium <= 100) {
      score += 20;
    } else if (data.potassium >= 15 && data.potassium <= 120) {
      score += 15;
    } else {
      score += 10;
    }
    factors++;
    
    return Math.round(score / factors);
  };

  const getHealthStatus = (score: number) => {
    if (score >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100', icon: CheckCircle };
    if (score >= 60) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: Info };
    if (score >= 40) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: AlertTriangle };
    return { status: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100', icon: AlertTriangle };
  };

  const getEnvironmentalFactors = () => {
    const factors = [];
    
    // Temperature analysis
    if (data.temperature < 15) {
      factors.push({ type: 'warning', message: 'Low temperature may limit crop growth' });
    } else if (data.temperature > 35) {
      factors.push({ type: 'warning', message: 'High temperature may stress plants' });
    } else {
      factors.push({ type: 'good', message: 'Temperature is favorable for most crops' });
    }
    
    // Humidity analysis
    if (data.humidity < 40) {
      factors.push({ type: 'warning', message: 'Low humidity may require irrigation management' });
    } else if (data.humidity > 80) {
      factors.push({ type: 'warning', message: 'High humidity increases disease risk' });
    } else {
      factors.push({ type: 'good', message: 'Humidity levels are optimal' });
    }
    
    // Rainfall analysis
    if (data.rainfall < 50) {
      factors.push({ type: 'warning', message: 'Low rainfall requires irrigation planning' });
    } else if (data.rainfall > 200) {
      factors.push({ type: 'good', message: 'Good rainfall for rain-fed agriculture' });
    } else {
      factors.push({ type: 'good', message: 'Moderate rainfall suitable for various crops' });
    }
    
    return factors;
  };

  const healthScore = calculateHealthScore();
  const healthStatus = getHealthStatus(healthScore);
  const environmentalFactors = getEnvironmentalFactors();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Activity className="h-6 w-6 text-purple-600 mr-2" />
        Soil Health Analysis
      </h3>
      
      {/* Health Score */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${healthStatus.bgColor} mb-4`}>
          <span className={`text-3xl font-bold ${healthStatus.color}`}>{healthScore}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <healthStatus.icon className={`h-5 w-5 ${healthStatus.color}`} />
          <span className={`font-semibold ${healthStatus.color}`}>{healthStatus.status}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Overall soil health score</p>
      </div>
      
      {/* Nutrient Balance Chart */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Nutrient Balance</h4>
        <div className="space-y-3">
          {[
            { name: 'Nitrogen (N)', value: data.nitrogen, max: 100, color: 'bg-green-500' },
            { name: 'Phosphorus (P)', value: data.phosphorus, max: 60, color: 'bg-blue-500' },
            { name: 'Potassium (K)', value: data.potassium, max: 120, color: 'bg-orange-500' }
          ].map((nutrient) => (
            <div key={nutrient.name}>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{nutrient.name}</span>
                <span>{nutrient.value} mg/kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${nutrient.color}`}
                  style={{ width: `${Math.min((nutrient.value / nutrient.max) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Environmental Factors */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Environmental Conditions</h4>
        <div className="space-y-3">
          {environmentalFactors.map((factor, index) => (
            <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
              factor.type === 'good' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              {factor.type === 'good' ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              )}
              <span className={`text-sm ${factor.type === 'good' ? 'text-green-700' : 'text-yellow-700'}`}>
                {factor.message}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Improvement Suggestions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Improvement Suggestions</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {healthScore < 60 && (
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Consider soil testing every 6 months to monitor improvements</span>
            </li>
          )}
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Add organic matter (compost, manure) to improve soil structure</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Practice crop rotation to maintain soil fertility</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Use cover crops during fallow periods</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SoilHealthAnalysis;