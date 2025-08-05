import React from 'react';
import { Truck } from 'lucide-react';
import { ShippingCosts } from '../types';
import { InputField } from './InputField';

interface ShippingSectionProps {
  data: ShippingCosts;
  onChange: (data: ShippingCosts) => void;
  market: 'EU' | 'USA';
}

export function ShippingSection({ data, onChange, market }: ShippingSectionProps) {
  const updateField = (field: keyof ShippingCosts, value: number) => {
    onChange({ ...data, [field]: value });
  };

  const currency = market === 'EU' ? '€' : '$';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Truck className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Transport & Inspection</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label={`Contrôle qualité (${currency})`}
          value={data.qualityControl}
          onChange={(value) => updateField('qualityControl', value as number)}
          suffix={currency}
          tooltip="Coût du contrôle qualité en usine"
        />
        
        <InputField
          label={`Transport international (${currency})`}
          value={data.internationalShipping}
          onChange={(value) => updateField('internationalShipping', value as number)}
          suffix={currency}
          tooltip="Coût de transport depuis l'usine jusqu'au pays de destination"
        />
        
        <InputField
          label={`Transport vers Amazon (${currency})`}
          value={data.amazonShipping}
          onChange={(value) => updateField('amazonShipping', value as number)}
          suffix={currency}
          tooltip="Coût de livraison vers les entrepôts Amazon"
        />
        
        <InputField
          label={`Autres frais (${currency})`}
          value={data.otherCosts}
          onChange={(value) => updateField('otherCosts', value as number)}
          suffix={currency}
          tooltip="Autres frais de transport non listés"
        />
      </div>
    </div>
  );
}