import React from 'react';
import { FileText } from 'lucide-react';
import { CustomsCosts } from '../types';
import { InputField } from './InputField';

interface CustomsSectionProps {
  data: CustomsCosts;
  onChange: (data: CustomsCosts) => void;
  market: 'EU' | 'USA';
}

export function CustomsSection({ data, onChange, market }: CustomsSectionProps) {
  const updateField = (field: keyof CustomsCosts, value: number | string) => {
    onChange({ ...data, [field]: value });
  };

  if (market === 'USA') {
    return null; // Pas de douanes spécifiques pour le marché USA dans cette version
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Douanes Import</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputField
          label="Code Taric"
          value={data.taricCode}
          onChange={(value) => updateField('taricCode', value)}
          type="text"
          placeholder="Ex: 8517120000"
          tooltip="Code de classification douanière (optionnel)"
        />
        
        <InputField
          label="Taux TVA import (%)"
          value={data.importVat}
          onChange={(value) => updateField('importVat', value as number)}
          suffix="%"
          tooltip="Taux de TVA applicable à l'importation"
          min={0}
          max={30}
        />
        
        <InputField
          label="Droits de douane (%)"
          value={data.customsDuty}
          onChange={(value) => updateField('customsDuty', value as number)}
          suffix="%"
          tooltip="Taux des droits de douane selon le code Taric"
          min={0}
          max={50}
        />
      </div>
    </div>
  );
}