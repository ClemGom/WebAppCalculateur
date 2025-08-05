import React from 'react';
import { Package } from 'lucide-react';
import { ProductInfo as ProductInfoType } from '../types';
import { InputField } from './InputField';

interface ProductInfoProps {
  data: ProductInfoType;
  onChange: (data: ProductInfoType) => void;
  market: 'EU' | 'USA';
}

export function ProductInfo({ data, onChange, market }: ProductInfoProps) {
  const updateField = (field: keyof ProductInfoType, value: number | string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Package className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Informations Produit</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Nom du produit"
          value={data.name}
          onChange={(value) => updateField('name', value)}
          type="text"
          placeholder="Entrez le nom du produit"
          tooltip="Nom commercial de votre produit"
        />
        
        <InputField
          label={market === 'EU' ? 'Prix de vente TTC (€)' : 'Prix de vente ($)'}
          value={data.price}
          onChange={(value) => updateField('price', value as number)}
          suffix={market === 'EU' ? '€' : '$'}
          tooltip="Prix de vente final au client"
          min={0}
          step={0.01}
        />
        
        {market === 'EU' && (
          <InputField
            label="TVA applicable (%)"
            value={data.vat}
            onChange={(value) => updateField('vat', value as number)}
            suffix="%"
            tooltip="Taux de TVA applicable dans votre pays"
            min={0}
            max={30}
            step={0.1}
          />
        )}
        
        <InputField
          label="Taux de retour (%)"
          value={data.returnRate}
          onChange={(value) => updateField('returnRate', value as number)}
          suffix="%"
          tooltip="Pourcentage estimé de retours clients"
          min={0}
          max={50}
          step={0.1}
        />
      </div>
    </div>
  );
}