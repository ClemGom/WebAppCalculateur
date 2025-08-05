import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { AmazonFees as AmazonFeesType } from '../types';
import { InputField } from './InputField';

interface AmazonFeesProps {
  data: AmazonFeesType;
  onChange: (data: AmazonFeesType) => void;
  market: 'EU' | 'USA';
}

export function AmazonFees({ data, onChange, market }: AmazonFeesProps) {
  const updateField = (field: keyof AmazonFeesType, value: number) => {
    onChange({ ...data, [field]: value });
  };

  const currency = market === 'EU' ? '€' : '$';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <ShoppingCart className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Frais Amazon</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Taux commission Amazon (%)"
          value={data.commissionRate}
          onChange={(value) => updateField('commissionRate', value as number)}
          suffix="%"
          tooltip="Pourcentage de commission prélevé par Amazon sur chaque vente"
          min={0}
          max={50}
        />
        
        <InputField
          label={`Frais FBA (${currency})`}
          value={data.fbaFees}
          onChange={(value) => updateField('fbaFees', value as number)}
          suffix={currency}
          tooltip="Frais de traitement et d'expédition Amazon FBA par unité"
        />
      </div>
    </div>
  );
}