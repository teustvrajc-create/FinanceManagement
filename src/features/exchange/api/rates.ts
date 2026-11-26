import { CurrencyCode, CurrencyRates, RateSnapshot, supportedCurrencies } from '../types/rates';

const API_URL = 'https://open.er-api.com/v6/latest/KZT';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseRates(value: unknown): CurrencyRates {
  if (!isRecord(value)) throw new Error('The rates service returned invalid currency data.');

  const rates: Partial<CurrencyRates> = {};
  for (const currency of supportedCurrencies) {
    const rate = value[currency];
    if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) {
      throw new Error(`No current rate is available for ${currency}.`);
    }
    rates[currency] = rate;
  }

  return rates as CurrencyRates;
}

export async function fetchLatestRates(signal?: AbortSignal): Promise<RateSnapshot> {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) throw new Error(`Rates service returned HTTP ${response.status}.`);

  const value: unknown = await response.json();
  if (!isRecord(value) || value.result !== 'success') {
    const reason = isRecord(value) && typeof value['error-type'] === 'string'
      ? ` (${value['error-type']})`
      : '';
    throw new Error(`Rates service could not return current data${reason}.`);
  }

  if (
    value.base_code !== 'KZT' ||
    typeof value.time_last_update_utc !== 'string' ||
    typeof value.time_next_update_utc !== 'string'
  ) {
    throw new Error('The rates service returned an unexpected response.');
  }

  return {
    updatedAtUtc: value.time_last_update_utc,
    nextUpdateAtUtc: value.time_next_update_utc,
    rates: parseRates(value.rates),
  };
}

export function getPairRate(rates: CurrencyRates, from: CurrencyCode, to: CurrencyCode) {
  return rates[to] / rates[from];
}
