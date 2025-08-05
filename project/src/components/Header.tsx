import React from 'react';
import { Calculator } from 'lucide-react';

interface HeaderProps {
  market: 'EU' | 'USA';
  onMarketChange: (market: 'EU' | 'USA') => void;
}

export function Header({ market, onMarketChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">
              Calculateur de Rentabilité Amazon
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Marché :</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onMarketChange('EU')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  market === 'EU'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Europe
              </button>
              <button
                onClick={() => onMarketChange('USA')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  market === 'USA'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                USA
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}