import React from 'react';
import { Sprout, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBackToHome: () => void;
  currentView: 'home' | 'form' | 'results';
}

const Header: React.FC<HeaderProps> = ({ onBackToHome, currentView }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {currentView !== 'home' && (
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          )}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CropSmart</h1>
              <p className="text-sm text-gray-500">Smart Farming Solutions</p>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
          <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;