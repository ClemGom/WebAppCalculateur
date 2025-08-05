import { useState, useEffect } from 'react';
import { CalculatorData, CalculationResults, PriceVariation } from '../types';
import { calculateResults, calculatePriceVariations } from '../utils/calculations';

const initialData: CalculatorData = {
  market: 'EU',
  product: {
    name: '',
    price: 0,
    vat: 20,
    returnRate: 5
  },
  costs: {
    items: [],
    exchangeRate: 1.1
  },
  shipping: {
    qualityControl: 0,
    internationalShipping: 0,
    amazonShipping: 0,
    otherCosts: 0
  },
  customs: {
    taricCode: '',
    importVat: 20,
    customsDuty: 0
  },
  amazon: {
    commissionRate: 15,
    fbaFees: 0
  },
  advertising: {
    tacosTarget: 10,
    conversionRate: 7
  }
};

export function useCalculator() {
  const [data, setData] = useState<CalculatorData>(() => {
    const saved = localStorage.getItem('amazon-calculator-data');
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [priceVariations, setPriceVariations] = useState<PriceVariation[]>([]);

  useEffect(() => {
    localStorage.setItem('amazon-calculator-data', JSON.stringify(data));
    
    try {
      const newResults = calculateResults(data);
      const variations = calculatePriceVariations(data);
      setResults(newResults);
      setPriceVariations(variations);
    } catch (error) {
      console.error('Calculation error:', error);
      setResults(null);
      setPriceVariations([]);
    }
  }, [data]);

  const updateData = (updates: Partial<CalculatorData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
    localStorage.removeItem('amazon-calculator-data');
  };

  return {
    data,
    results,
    priceVariations,
    updateData,
    resetData
  };
}