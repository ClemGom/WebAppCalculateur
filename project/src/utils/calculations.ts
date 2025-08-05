import { CalculatorData, CalculationResults, PriceVariation } from '../types';

export function calculateResults(data: CalculatorData): CalculationResults {
  // Prix HT = Prix TTC / (1 + TVA/100)
  const priceHT = data.product.price / (1 + data.product.vat / 100);
  
  // CA Effectif = Prix HT × (1 - Taux de retour/100)
  const effectiveRevenue = priceHT * (1 - data.product.returnRate / 100);
  
  // Calcul du coût de revient total
  const manufacturingCost = data.costs.items.reduce((total, item) => {
    const itemTotal = item.unitCost * item.quantity;
    const itemWithVat = itemTotal * (1 + item.vatRate / 100);
    return total + itemWithVat;
  }, 0);
  
  const convertedManufacturingCost = data.market === 'EU' ? manufacturingCost * data.costs.exchangeRate : manufacturingCost;
  
  const shippingTotal = data.shipping.qualityControl + 
                       data.shipping.internationalShipping + 
                       data.shipping.amazonShipping + 
                       data.shipping.otherCosts;
  
  const customsTotal = (convertedManufacturingCost + shippingTotal) * 
                      (data.customs.importVat + data.customs.customsDuty) / 100;
  
  const totalCostPrice = convertedManufacturingCost + shippingTotal + customsTotal;
  
  // Commission Amazon = CA Effectif × Taux Commission/100
  const amazonCommission = effectiveRevenue * data.amazon.commissionRate / 100;
  
  // Marge Brute HT = CA Effectif - Coût de revient total - Commission Amazon - Frais FBA
  const grossMargin = effectiveRevenue - totalCostPrice - amazonCommission - data.amazon.fbaFees;
  
  // Formules publicitaires
  const tacosEffective = data.advertising.tacosTarget || 10;
  const conversionEffective = data.advertising.conversionRate || 7;
  
  // Budget pub par vente = Marge Brute HT × (TACOS cible/100)
  const adBudgetPerSale = grossMargin * (tacosEffective / 100);
  
  // Bénéfice après pub = Marge Brute HT - Budget pub par vente
  const profitAfterAds = grossMargin - adBudgetPerSale;
  
  // CPC MAX = Budget pub par vente × (Taux de conversion/100)
  const maxCPC = adBudgetPerSale * (conversionEffective / 100);
  
  // Marge nette (%) = Bénéfice après pub / CA Effectif × 100
  const netMargin = (profitAfterAds / effectiveRevenue) * 100;
  
  // ROI (%) = Bénéfice après pub / Coût de revient total × 100
  const roi = (profitAfterAds / totalCostPrice) * 100;
  
  // TACOS réel (%) = Budget pub par vente / CA Effectif × 100
  const realTACOS = (adBudgetPerSale / effectiveRevenue) * 100;
  
  return {
    priceHT,
    effectiveRevenue,
    totalCostPrice,
    amazonCommission,
    grossMargin,
    adBudgetPerSale,
    profitAfterAds,
    maxCPC,
    netMargin,
    roi,
    realTACOS
  };
}

export function calculatePriceVariations(data: CalculatorData): PriceVariation[] {
  const variations = [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30];
  const basePrice = data.product.price;
  
  return variations.map(variation => {
    const newPrice = basePrice * (1 + variation / 100);
    const modifiedData = {
      ...data,
      product: {
        ...data.product,
        price: newPrice
      }
    };
    
    return {
      variation: variation === 0 ? 'Prix cible' : `${variation > 0 ? '+' : ''}${variation}%`,
      price: newPrice,
      results: calculateResults(modifiedData)
    };
  });
}

export function formatCurrency(value: number, currency: string = '€'): string {
  return `${value.toFixed(2)} ${currency}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}