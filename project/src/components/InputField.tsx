import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  type?: 'number' | 'text';
  placeholder?: string;
  suffix?: string;
  tooltip?: string;
  min?: number;
  step?: number;
}

export function InputField({
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  suffix,
  tooltip,
  min = 0,
  step = 0.01
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {tooltip && (
          <div className="group relative">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}