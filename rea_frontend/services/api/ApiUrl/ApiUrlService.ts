import { SettingsService } from "../Settings";

const { backendApiUrl } = new SettingsService().settings;
const encode = encodeURIComponent;

export type GusRange = '1y' | '2y' | '3y' | '5y' | '10y' | 'all';

export const ApiUrlService = {
  // GUS historical (zakładamy, że backend przyjmuje variableId i range lub years list)
  getGusHistoricalUrl: (variableId: string, range: GusRange) => {
    if (range === 'all') {
      return `${backendApiUrl}/api/gus/historical?variableId=${encode(variableId)}&range=all`;
    }
    return `${backendApiUrl}/api/gus/historical?variableId=${encode(
      variableId
    )}&range=${encode(range)}`;
  },

  // Alternatywnie: jeśli backend przyjmuje konkretne lata zamiast "range", to
  getGusHistoricalByYearsUrl: (variableId: string, years: number[]) => {
    const yearsParam = years.map(String).map(encode).join(',');
    return `${backendApiUrl}/api/gus/historical?variableId=${encode(
      variableId
    )}&years=${yearsParam}`;
  },

  // Current market listing
  getLatestListingsUrl: (limit = 100) =>
    `${backendApiUrl}/api/market/latest?limit=${limit}`,

  getListingsByVoivodeshipUrl: (wojewodztwo: string, limit = 100) =>
    `${backendApiUrl}/api/market/voivodeship/${encode(
      wojewodztwo
    )}?limit=${limit}`,

  getListingsByCityUrl: (city: string, limit = 100) =>
    `${backendApiUrl}/api/market/city/${encode(city)}?limit=${limit}`,

  getMarketListingsUrl: (filters: Record<string, any>) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.append(k, String(v));
    });
    return `${backendApiUrl}/api/market/listings?${params.toString()}`;
  },
};
