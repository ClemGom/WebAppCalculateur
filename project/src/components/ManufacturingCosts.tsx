import React from 'react';
import { Factory, Plus, Trash2 } from 'lucide-react';
import { ManufacturingCosts as ManufacturingCostsType, CostItem } from '../types';
import { InputField } from './InputField';

interface ManufacturingCostsProps {
  data: ManufacturingCostsType;
  onChange: (data: ManufacturingCostsType) => void;
  market: 'EU' | 'USA';
}

export function ManufacturingCosts({ data, onChange, market }: ManufacturingCostsProps) {
  const addItem = () => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      name: '',
      unitCost: 0,
      quantity: 1,
      vatRate: 0
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const updateItem = (id: string, field: keyof CostItem, value: number | string) => {
    const updatedItems = data.items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: updatedItems });
  };

  const removeItem = (id: string) => {
    onChange({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const totalCost = data.items.reduce((total, item) => {
    const itemTotal = item.unitCost * item.quantity;
    const itemWithVat = itemTotal * (1 + item.vatRate / 100);
    return total + itemWithVat;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Factory className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Coûts de Fabrication</h2>
        </div>
        <button
          onClick={addItem}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter un article</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.items.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
            <InputField
              label="Nom de l'article"
              value={item.name}
              onChange={(value) => updateItem(item.id, 'name', value)}
              type="text"
              placeholder="Ex: Boîtier plastique"
            />
            
            <InputField
              label={market === 'EU' ? 'Coût unitaire (€)' : 'Coût unitaire ($)'}
              value={item.unitCost}
              onChange={(value) => updateItem(item.id, 'unitCost', value as number)}
              suffix={market === 'EU' ? '€' : '$'}
            />
            
            <InputField
              label="Quantité"
              value={item.quantity}
              onChange={(value) => updateItem(item.id, 'quantity', value as number)}
              min={1}
              step={1}
            />
            
            <InputField
              label="TVA (%)"
              value={item.vatRate}
              onChange={(value) => updateItem(item.id, 'vatRate', value as number)}
              suffix="%"
              tooltip="TVA applicable sur cet article"
            />
            
            <div className="flex items-end">
              <button
                onClick={() => removeItem(item.id)}
                className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {market === 'EU' && (
          <InputField
            label="Taux de change EUR/USD"
            value={data.exchangeRate}
            onChange={(value) => onChange({ ...data, exchangeRate: value as number })}
            tooltip="Si vos coûts sont en USD, indiquez le taux de change"
            step={0.01}
          />
        )}
        
        <div className="flex items-end">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
            <p className="text-sm font-medium text-green-800">Total des coûts de fabrication</p>
            <p className="text-lg font-bold text-green-900">
              {totalCost.toFixed(2)} {market === 'EU' ? '€' : '$'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}