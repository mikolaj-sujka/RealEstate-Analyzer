import { SettingsService } from "../Settings";

const { backendApiUrl } = new SettingsService().settings;
const encode = encodeURIComponent;

export type GusRange = '1y' | '2y' | '3y' | '5y' | '10y' | 'all';

export const ApiUrlService = {
  getGusHistoricalUrl: (variableId: string, range: GusRange) => {
    if (range === 'all') {
      return `${backendApiUrl}/api/gus/historical?variableId=${encode(variableId)}&range=all`;
    }
    return `${backendApiUrl}/api/gus/historical?variableId=${encode(
      variableId
    )}&range=${encode(range)}`;
  },

  getGusHistoricalByYearsUrl: (variableId: string, years: number[]) => {
    const yearsParam = years.map(String).map(encode).join(',');
    return `${backendApiUrl}/api/gus/historical?variableId=${encode(
      variableId
    )}&years=${yearsParam}`;
  },


  getListingsByVoivodeshipUrl: (wojewodztwo: string) =>
    `${backendApiUrl}/api/OtodomListings/voivodeship/${encode(
      wojewodztwo)}`,

  getOtodomDistrictsUrl: (cityName: string) =>
    `${backendApiUrl}/api/OtodomListings/districts?cityName=${encode(cityName)}`,

  getListingsByCityUrl: (city: string) =>
    `${backendApiUrl}/api/OtodomListings/city/${encode(city)}`,
};
