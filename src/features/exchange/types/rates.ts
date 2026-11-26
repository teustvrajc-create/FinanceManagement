export const supportedCurrencies = ['KZT', 'USD', 'EUR', 'GBP', 'RUB'] as const;

export type CurrencyCode = (typeof supportedCurrencies)[number];
export type CurrencyRates = Record<CurrencyCode, number>;

export type RateSnapshot = {
  updatedAtUtc: string;
  nextUpdateAtUtc: string;
  rates: CurrencyRates;
};

export type RateStatus = 'loading' | 'refreshing' | 'success' | 'error';
