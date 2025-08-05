import * as XLSX from 'xlsx';
import type { CalculatorData, CalculationResults } from '../types';

export function generateExcelFile(data: CalculatorData, results: CalculationResults | null): void {
  if (!results) {
    console.error('No results available for Excel generation');
    return;
  }

  const workbook = XLSX.utils.book_new();
  
  // Create summary sheet
  const summaryData = [
    ['Calculateur de Rentabilité Amazon', '', '', ''],
    ['Marché', data.market === 'EU' ? 'Europe' : 'USA', '', ''],
    ['Date de génération', new Date().toLocaleDateString('fr-FR'), '', ''],
    ['', '', '', ''],
    ['INFORMATIONS PRODUIT', '', '', ''],
    ['Nom du produit', data.product.name || 'Non spécifié', '', ''],
    ['Prix de vente', `${data.product.price.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ...(data.market === 'EU' ? [['TVA applicable', `${data.product.vat}%`, '', '']] : []),
    ['Taux de retour', `${data.product.returnRate}%`, '', ''],
    ['', '', '', ''],
    ['RÉSULTATS PRINCIPAUX', '', '', ''],
    ['Prix HT', `${results.priceHT.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['CA effectif', `${results.effectiveRevenue.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['Coût de revient total', `${results.totalCostPrice.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['Commission Amazon', `${results.amazonCommission.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['Marge brute HT', `${results.grossMargin.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['Budget pub par vente', `${results.adBudgetPerSale.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['Bénéfice après pub', `${results.profitAfterAds.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['CPC MAX', `${results.maxCPC.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['', '', '', ''],
    ['INDICATEURS CLÉS', '', '', ''],
    ['Marge nette', `${results.netMargin.toFixed(1)}%`, '', ''],
    ['ROI', `${results.roi.toFixed(1)}%`, '', ''],
    ['TACOS réel', `${results.realTACOS.toFixed(1)}%`, '', ''],
    ['', '', '', ''],
    ['PARAMÈTRES AMAZON', '', '', ''],
    ['Taux commission', `${data.amazon.commissionRate}%`, '', ''],
    ['Frais FBA', `${data.amazon.fbaFees.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, '', ''],
    ['', '', '', ''],
    ['PARAMÈTRES PUBLICITAIRES', '', '', ''],
    ['TACOS cible', `${data.advertising.tacosTarget}%`, '', ''],
    ['Taux de conversion', `${data.advertising.conversionRate}%`, '', ''],
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  
  // Set column widths
  summarySheet['!cols'] = [
    { wch: 25 }, // Column A
    { wch: 20 }, // Column B
    { wch: 15 }, // Column C
    { wch: 15 }  // Column D
  ];

  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Résumé');

  // Create costs breakdown sheet if there are manufacturing costs
  if (data.costs.items && data.costs.items.length > 0) {
    const costsData = [
      ['DÉTAIL DES COÛTS DE FABRICATION', '', '', '', ''],
      ['', '', '', '', ''],
      ['Nom', 'Coût unitaire', 'Quantité', 'TVA (%)', 'Total TTC'],
      ...data.costs.items.map((item) => [
        item.name,
        `${item.unitCost.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`,
        item.quantity,
        `${item.vatRate}%`,
        `${(item.unitCost * item.quantity * (1 + item.vatRate / 100)).toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`
      ]),
      ['', '', '', '', ''],
      ['TOTAL FABRICATION', '', '', '', 
       `${data.costs.items.reduce((total, item) => {
         const itemTotal = item.unitCost * item.quantity;
         const itemWithVat = itemTotal * (1 + item.vatRate / 100);
         return total + itemWithVat;
       }, 0).toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`
      ]
    ];

    const costsSheet = XLSX.utils.aoa_to_sheet(costsData);
    costsSheet['!cols'] = [
      { wch: 20 }, // Nom
      { wch: 15 }, // Coût unitaire
      { wch: 10 }, // Quantité
      { wch: 10 }, // TVA
      { wch: 15 }  // Total
    ];

    XLSX.utils.book_append_sheet(workbook, costsSheet, 'Coûts détaillés');
  }

  // Create shipping and other costs sheet
  const otherCostsData = [
    ['AUTRES COÛTS', '', ''],
    ['', '', ''],
    ['TRANSPORT & INSPECTION', '', ''],
    ['Contrôle qualité', `${data.shipping.qualityControl.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, ''],
    ['Transport international', `${data.shipping.internationalShipping.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, ''],
    ['Transport vers Amazon', `${data.shipping.amazonShipping.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, ''],
    ['Autres frais', `${data.shipping.otherCosts.toFixed(2)} ${data.market === 'EU' ? '€' : '$'}`, ''],
    ['', '', ''],
    ...(data.market === 'EU' ? [
      ['DOUANES IMPORT', '', ''],
      ['Code Taric', data.customs.taricCode || 'Non spécifié', ''],
      ['Taux TVA import', `${data.customs.importVat}%`, ''],
      ['Droits de douane', `${data.customs.customsDuty}%`, ''],
      ['', '', '']
    ] : []),
    ['TAUX DE CHANGE', '', ''],
    ['EUR/USD', data.costs.exchangeRate.toFixed(4), '']
  ];

  const otherCostsSheet = XLSX.utils.aoa_to_sheet(otherCostsData);
  otherCostsSheet['!cols'] = [
    { wch: 25 }, // Description
    { wch: 20 }, // Valeur
    { wch: 15 }  // Extra
  ];

  XLSX.utils.book_append_sheet(workbook, otherCostsSheet, 'Autres coûts');

  // Generate and download the file
  const fileName = `calcul-rentabilite-amazon-${data.market.toLowerCase()}-${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}