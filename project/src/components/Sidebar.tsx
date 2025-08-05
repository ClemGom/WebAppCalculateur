import React from 'react';
import { Package, Factory, Truck, FileText, ShoppingCart, Target, TrendingUp, Download } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onExport: () => void;
  hasResults: boolean;
}

export function Sidebar({ activeSection, onSectionChange, onExport, hasResults }: SidebarProps) {
  const sections = [
    { id: 'product', label: 'Produit', icon: Package },
    { id: 'costs', label: 'Coûts', icon: Factory },
    { id: 'shipping', label: 'Transport', icon: Truck },
    { id: 'customs', label: 'Douanes', icon: FileText },
    { id: 'amazon', label: 'Amazon', icon: ShoppingCart },
    { id: 'advertising', label: 'Publicité', icon: Target },
    { id: 'results', label: 'Résultats', icon: TrendingUp }
  ];

  return (
    <div className="bg-white shadow-sm border-r w-64 flex-shrink-0">
      <div className="p-6">
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          })}
        </nav>

        {hasResults && (
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={onExport}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span className="font-medium">Export Excel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}