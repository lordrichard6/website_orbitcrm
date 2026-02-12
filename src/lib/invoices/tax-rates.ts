/**
 * Tax/VAT Rates by Country
 * 
 * Standard rates for common European countries.
 * Update as regulations change.
 */

export interface TaxRate {
  label: string;
  rate: number;
  type: 'standard' | 'reduced' | 'zero';
}

export interface CountryTaxRates {
  name: string;
  code: string;
  currency: string;
  vatLabel: string; // e.g., "MWST", "USt", "TVA"
  rates: TaxRate[];
}

export const TAX_RATES: Record<string, CountryTaxRates> = {
  CH: {
    name: 'Switzerland',
    code: 'CH',
    currency: 'CHF',
    vatLabel: 'MWST',
    rates: [
      { label: 'Standard (8.1%)', rate: 8.1, type: 'standard' },
      { label: 'Reduced (2.6%)', rate: 2.6, type: 'reduced' },
      { label: 'Hotel (3.8%)', rate: 3.8, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  DE: {
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    vatLabel: 'USt',
    rates: [
      { label: 'Standard (19%)', rate: 19, type: 'standard' },
      { label: 'Reduced (7%)', rate: 7, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  AT: {
    name: 'Austria',
    code: 'AT',
    currency: 'EUR',
    vatLabel: 'USt',
    rates: [
      { label: 'Standard (20%)', rate: 20, type: 'standard' },
      { label: 'Reduced (10%)', rate: 10, type: 'reduced' },
      { label: 'Super Reduced (13%)', rate: 13, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  FR: {
    name: 'France',
    code: 'FR',
    currency: 'EUR',
    vatLabel: 'TVA',
    rates: [
      { label: 'Standard (20%)', rate: 20, type: 'standard' },
      { label: 'Intermediate (10%)', rate: 10, type: 'reduced' },
      { label: 'Reduced (5.5%)', rate: 5.5, type: 'reduced' },
      { label: 'Super Reduced (2.1%)', rate: 2.1, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  IT: {
    name: 'Italy',
    code: 'IT',
    currency: 'EUR',
    vatLabel: 'IVA',
    rates: [
      { label: 'Standard (22%)', rate: 22, type: 'standard' },
      { label: 'Reduced (10%)', rate: 10, type: 'reduced' },
      { label: 'Super Reduced (4%)', rate: 4, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  NL: {
    name: 'Netherlands',
    code: 'NL',
    currency: 'EUR',
    vatLabel: 'BTW',
    rates: [
      { label: 'Standard (21%)', rate: 21, type: 'standard' },
      { label: 'Reduced (9%)', rate: 9, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  BE: {
    name: 'Belgium',
    code: 'BE',
    currency: 'EUR',
    vatLabel: 'TVA/BTW',
    rates: [
      { label: 'Standard (21%)', rate: 21, type: 'standard' },
      { label: 'Reduced (12%)', rate: 12, type: 'reduced' },
      { label: 'Super Reduced (6%)', rate: 6, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  LU: {
    name: 'Luxembourg',
    code: 'LU',
    currency: 'EUR',
    vatLabel: 'TVA',
    rates: [
      { label: 'Standard (17%)', rate: 17, type: 'standard' },
      { label: 'Intermediate (14%)', rate: 14, type: 'reduced' },
      { label: 'Reduced (8%)', rate: 8, type: 'reduced' },
      { label: 'Super Reduced (3%)', rate: 3, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  ES: {
    name: 'Spain',
    code: 'ES',
    currency: 'EUR',
    vatLabel: 'IVA',
    rates: [
      { label: 'Standard (21%)', rate: 21, type: 'standard' },
      { label: 'Reduced (10%)', rate: 10, type: 'reduced' },
      { label: 'Super Reduced (4%)', rate: 4, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
  PT: {
    name: 'Portugal',
    code: 'PT',
    currency: 'EUR',
    vatLabel: 'IVA',
    rates: [
      { label: 'Standard (23%)', rate: 23, type: 'standard' },
      { label: 'Intermediate (13%)', rate: 13, type: 'reduced' },
      { label: 'Reduced (6%)', rate: 6, type: 'reduced' },
      { label: 'Exempt (0%)', rate: 0, type: 'zero' },
    ],
  },
};

/**
 * Get tax rates for a country
 */
export function getTaxRatesForCountry(countryCode: string): TaxRate[] {
  const country = TAX_RATES[countryCode.toUpperCase()];
  if (!country) {
    // Default to Swiss rates if country not found
    return TAX_RATES.CH.rates;
  }
  return country.rates;
}

/**
 * Get default tax rate for a country (standard rate)
 */
export function getDefaultTaxRate(countryCode: string): number {
  const rates = getTaxRatesForCountry(countryCode);
  const standardRate = rates.find(r => r.type === 'standard');
  return standardRate?.rate || 0;
}

/**
 * Get currency for a country
 */
export function getCurrencyForCountry(countryCode: string): string {
  const country = TAX_RATES[countryCode.toUpperCase()];
  return country?.currency || 'EUR';
}

/**
 * Get VAT label for a country (e.g., "MWST", "USt", "TVA")
 */
export function getVatLabel(countryCode: string): string {
  const country = TAX_RATES[countryCode.toUpperCase()];
  return country?.vatLabel || 'VAT';
}

/**
 * Format a tax rate for display
 */
export function formatTaxRate(rate: number): string {
  return `${rate}%`;
}

/**
 * Get all supported country codes
 */
export function getSupportedCountries(): string[] {
  return Object.keys(TAX_RATES);
}
