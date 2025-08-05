import React from 'react';
import { Target } from 'lucide-react';
import { AdvertisingParams } from '../types';
import { InputField } from './InputField';

interface AdvertisingSectionProps {
  data: AdvertisingParams;
  onChange: (data: AdvertisingParams) => void;
}

export function AdvertisingSection({ data, onChange }: AdvertisingSectionProps) {
  const updateField = (field: keyof AdvertisingParams, value: number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Paramètres Publicitaires</h2>
        <span className="text-sm text-gray-500">(Facultatif)</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="TACOS cible (%)"
          value={data.tacosTarget}
          onChange={(value) => updateField('tacosTarget', value as number)}
          suffix="%"
          tooltip="Total Advertising Cost of Sales visé (défaut: 10%)"
          min={0}
          max={100}
        />
        
        <InputField
          label="Taux de conversion (%)"
          value={data.conversionRate}
          onChange={(value) => updateField('conversionRate', value as number)}
          suffix="%"
          tooltip="Pourcentage de visiteurs qui achètent (défaut: 7%)"
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}