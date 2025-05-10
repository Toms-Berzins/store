// VAT rates for EU countries as of 2023
// Source: https://europa.eu/youreurope/business/taxation/vat/vat-rules-rates/

export interface CountryVATRate {
  code: string;
  name: string;
  standardRate: number;
  reducedRates: number[];
}

export const euVATRates: CountryVATRate[] = [
  { code: 'AT', name: 'Austria', standardRate: 20, reducedRates: [10, 13] },
  { code: 'BE', name: 'Belgium', standardRate: 21, reducedRates: [6, 12] },
  { code: 'BG', name: 'Bulgaria', standardRate: 20, reducedRates: [9] },
  { code: 'HR', name: 'Croatia', standardRate: 25, reducedRates: [5, 13] },
  { code: 'CY', name: 'Cyprus', standardRate: 19, reducedRates: [5, 9] },
  { code: 'CZ', name: 'Czech Republic', standardRate: 21, reducedRates: [10, 15] },
  { code: 'DK', name: 'Denmark', standardRate: 25, reducedRates: [] },
  { code: 'EE', name: 'Estonia', standardRate: 22, reducedRates: [9] },
  { code: 'FI', name: 'Finland', standardRate: 24, reducedRates: [10, 14] },
  { code: 'FR', name: 'France', standardRate: 20, reducedRates: [5.5, 10] },
  { code: 'DE', name: 'Germany', standardRate: 19, reducedRates: [7] },
  { code: 'GR', name: 'Greece', standardRate: 24, reducedRates: [6, 13] },
  { code: 'HU', name: 'Hungary', standardRate: 27, reducedRates: [5, 18] },
  { code: 'IE', name: 'Ireland', standardRate: 23, reducedRates: [9, 13.5] },
  { code: 'IT', name: 'Italy', standardRate: 22, reducedRates: [5, 10] },
  { code: 'LV', name: 'Latvia', standardRate: 21, reducedRates: [5, 12] },
  { code: 'LT', name: 'Lithuania', standardRate: 21, reducedRates: [5, 9] },
  { code: 'LU', name: 'Luxembourg', standardRate: 17, reducedRates: [8, 14] },
  { code: 'MT', name: 'Malta', standardRate: 18, reducedRates: [5, 7] },
  { code: 'NL', name: 'Netherlands', standardRate: 21, reducedRates: [9] },
  { code: 'PL', name: 'Poland', standardRate: 23, reducedRates: [5, 8] },
  { code: 'PT', name: 'Portugal', standardRate: 23, reducedRates: [6, 13] },
  { code: 'RO', name: 'Romania', standardRate: 19, reducedRates: [5, 9] },
  { code: 'SK', name: 'Slovakia', standardRate: 20, reducedRates: [10] },
  { code: 'SI', name: 'Slovenia', standardRate: 22, reducedRates: [5, 9.5] },
  { code: 'ES', name: 'Spain', standardRate: 21, reducedRates: [4, 10] },
  { code: 'SE', name: 'Sweden', standardRate: 25, reducedRates: [6, 12] }
];

// Function to calculate price with VAT based on country
export function calculatePriceWithVAT(
  priceBeforeVAT: number,
  countryCode: string,
  useReducedRate = false
): { priceWithVAT: number; vatAmount: number; vatRate: number } {
  // Find the country's VAT rate
  const country = euVATRates.find(country => country.code === countryCode);
  
  // Default to 0% if country not found (non-EU)
  if (!country) {
    return {
      priceWithVAT: priceBeforeVAT,
      vatAmount: 0,
      vatRate: 0
    };
  }
  
  // Use first reduced rate if specified and available, otherwise use standard rate
  const vatRate = useReducedRate && country.reducedRates.length > 0 
    ? country.reducedRates[0]
    : country.standardRate;
  
  const vatAmount = priceBeforeVAT * (vatRate / 100);
  const priceWithVAT = priceBeforeVAT + vatAmount;
  
  return {
    priceWithVAT,
    vatAmount,
    vatRate
  };
} 