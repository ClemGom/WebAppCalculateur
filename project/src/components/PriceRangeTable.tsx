import React from 'react';
import { BarChart3 } from 'lucide-react';
import { PriceVariation } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface PriceRangeTableProps {
  variations: PriceVariation[];
  market: 'EU' | 'USA';
}

export function PriceRangeTable({ variations, market }: PriceRangeTableProps) {
  const currency = market === 'EU' ? '€' : '$';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Fourchette de Prix</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marge Nette
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bénéfice
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variations.map((variation, index) => {
              const isTarget = variation.variation === 'Prix cible';
              const isPositive = variation.results.profitAfterAds > 0;
              
              return (
                <tr 
                  key={index} 
                  className={`${isTarget ? 'bg-blue-50 border-2 border-blue-200' : ''} ${
                    !isPositive ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      isTarget ? 'text-blue-800' : 'text-gray-900'
                    }`}>
                      {variation.variation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(variation.price, currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      variation.results.netMargin > 15 ? 'text-green-600' :
                      variation.results.netMargin > 5 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {formatPercentage(variation.results.netMargin)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      variation.results.roi > 30 ? 'text-green-600' :
                      variation.results.roi > 10 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {formatPercentage(variation.results.roi)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(variation.results.profitAfterAds, currency)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}