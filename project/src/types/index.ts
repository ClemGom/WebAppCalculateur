export interface ProductInfo {
  name: string;
  price: number;
  vat: number;
  returnRate: number;
}

export interface CostItem {
  id: string;
  name: string;
  unitCost: number;
  quantity: number;
  vatRate: number;
}

export interface ManufacturingCosts {
  items: CostItem[];
  exchangeRate: number;
}

export interface ShippingCosts {
  qualityControl: number;
  internationalShipping: number;
  amazonShipping: number;
  otherCosts: number;
}

export interface CustomsCosts {
  taricCode: string;
  importVat: number;
  customsDuty: number;
}

export interface AmazonFees {
  commissionRate: number;
  fbaFees: number;
}

export interface AdvertisingParams {
  tacosTarget: number;
  conversionRate: number;
}

export interface CalculatorData {
  market: 'EU' | 'USA';
  product: ProductInfo;
  costs: ManufacturingCosts;
  shipping: ShippingCosts;
  customs: CustomsCosts;
  amazon: AmazonFees;
  advertising: AdvertisingParams;
}

export interface CalculationResults {
  priceHT: number;
  effectiveRevenue: number;
  totalCostPrice: number;
  amazonCommission: number;
  grossMargin: number;
  adBudgetPerSale: number;
  profitAfterAds: number;
  maxCPC: number;
  netMargin: number;
  roi: number;
  realTACOS: number;
}

export interface PriceVariation {
  variation: string;
  price: number;
  results: CalculationResults;
}