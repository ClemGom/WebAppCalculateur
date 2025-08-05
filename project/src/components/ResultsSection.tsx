import React from 'react';
import { TrendingUp, DollarSign, Target, Award } from 'lucide-react';
import { CalculationResults } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface ResultsSectionProps {
  results: CalculationResults;
  market: 'EU' | 'USA';
}

export function ResultsSection({ results, market }: ResultsSectionProps) {
  const currency = market === 'EU' ? '€' : '$';

  const resultItems = [
    {
      label: 'Prix de vente HT',
      value: formatCurrency(results.priceHT, currency),
      icon: DollarSign,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800'
    },
    {
      label: 'CA effectif après retours',
      value: formatCurrency(results.effectiveRevenue, currency),
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      textColor: 'text-green-800'
    },
    {
      label: 'Coût de revient total',
      value: formatCurrency(results.totalCostPrice, currency),
      icon: DollarSign,
      bgColor: 'bg-red-50',
      textColor: 'text-red-800'
    },
    {
      label: 'Commission Amazon',
      value: formatCurrency(results.amazonCommission, currency),
      icon: DollarSign,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800'
    },
    {
      label: 'Marge brute HT',
      value: formatCurrency(results.grossMargin, currency),
      icon: TrendingUp,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-800'
    },
    {
      label: 'Budget pub par vente',
      value: formatCurrency(results.adBudgetPerSale, currency),
      icon: Target,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800'
    },
    {
      label: 'Bénéfice après pub',
      value: formatCurrency(results.profitAfterAds, currency),
      icon: Award,
      bgColor: 'bg-green-50',
      textColor: 'text-green-800'
    },
    {
      label: 'CPC MAX',
      value: formatCurrency(results.maxCPC, currency),
      icon: Target,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-800'
    }
  ];

  const kpiItems = [
    {
      label: 'Marge nette',
      value: formatPercentage(results.netMargin),
      bgColor: results.netMargin > 15 ? 'bg-green-100' : results.netMargin > 5 ? 'bg-yellow-100' : 'bg-red-100',
      textColor: results.netMargin > 15 ? 'text-green-800' : results.netMargin > 5 ? 'text-yellow-800' : 'text-red-800'
    },
    {
      label: 'ROI',
      value: formatPercentage(results.roi),
      bgColor: results.roi > 30 ? 'bg-green-100' : results.roi > 10 ? 'bg-yellow-100' : 'bg-red-100',
      textColor: results.roi > 30 ? 'text-green-800' : results.roi > 10 ? 'text-yellow-800' : 'text-red-800'
    },
    {
      label: 'TACOS réel',
      value: formatPercentage(results.realTACOS),
      bgColor: results.realTACOS < 15 ? 'bg-green-100' : results.realTACOS < 25 ? 'bg-yellow-100' : 'bg-red-100',
      textColor: results.realTACOS < 15 ? 'text-green-800' : results.realTACOS < 25 ? 'text-yellow-800' : 'text-red-800'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Récapitulatif des Résultats</h2>
        <p className="text-sm text-gray-600">Calculs basés sur vos données saisies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {resultItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className={`${item.bgColor} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-5 w-5 ${item.textColor}`} />
              </div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {item.label}
              </p>
              <p className={`text-lg font-bold ${item.textColor}`}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicateurs Clés de Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpiItems.map((item, index) => (
            <div key={index} className={`${item.bgColor} rounded-lg p-6 text-center`}>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {item.label}
              </p>
              <p className={`text-3xl font-bold ${item.textColor}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}