import { SettingsService } from "../Settings";

const { backendApiUrl } = new SettingsService().settings;
const encode = encodeURIComponent;

export type GusRange = "1y" | "2y" | "3y" | "5y" | "10y" | "all";

export const ApiUrlService = {
  getGusListingsByCityUrl: (cityName: string) =>
    `${backendApiUrl}/api/GusListings?cityName=${encode(cityName)}`,

  getGusListingsRecentYearsUrl: (cityName: string, yearsBack: number) =>
    `${backendApiUrl}/api/GusListings/${encode(
      String(yearsBack)
    )}?cityName=${encode(cityName)}`,

  getGusListingsDateRangeUrl: (
    cityName: string,
    yearsFrom: number,
    yearsTo: number,
    monthFrom: number, // 1..12
    monthTo: number // 1..12
  ) =>
    `${backendApiUrl}/api/GusListings/date-range` +
    `?cityName=${encode(cityName)}&yearsFrom=${yearsFrom}&yearsTo=${yearsTo}` +
    `&monthFrom=${monthFrom}&monthTo=${monthTo}`,

  getGusCitiesUrl: () => `${backendApiUrl}/api/GusListings/all-cities`,


  getListingsByVoivodeshipUrl: (wojewodztwo: string) =>
    `${backendApiUrl}/api/OtodomListings/voivodeship/${encode(wojewodztwo)}`,

  getOtodomDistrictsUrl: (cityName: string) =>
    `${backendApiUrl}/api/OtodomListings/districts?cityName=${encode(
      cityName
    )}`,

  getListingsByCityUrl: (city: string) =>
    `${backendApiUrl}/api/OtodomListings/city/${encode(city)}`,

  getOtodomAllVoivodeshipsUrl: () =>
    `${backendApiUrl}/api/OtodomListings/all-voivodeships`,

  getOtodomAllCitiesUrl: () => `${backendApiUrl}/api/OtodomListings/all-cities`,

  getOtodomLatestTransaction: () =>
    `${backendApiUrl}/api/OtodomListings/latest-transactions`,
};
