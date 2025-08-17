import { SettingsService } from "../Settings";

const { backendApiUrl } = new SettingsService().settings;
const encode = encodeURIComponent;

export type GusRange = "1y" | "2y" | "3y" | "5y" | "10y" | "all";

export const ApiUrlService = {
  getGusListingsByCityUrl: (cityName: string) =>
    `${backendApiUrl}/api/v1/GusListings?cityName=${encode(cityName)}`,

  getGusListingsRecentYearsUrl: (cityName: string, yearsBack: number) =>
    `${backendApiUrl}/api/v1/GusListings/${encode(
      String(yearsBack)
    )}?cityName=${encode(cityName)}`,

  getGusListingsDateRangeUrl: (
    cityName: string,
    yearsFrom: number,
    yearsTo: number,
    monthFrom: number, // 1..12
    monthTo: number // 1..12
  ) =>
    `${backendApiUrl}/api/v1/GusListings/date-range` +
    `?cityName=${encode(cityName)}&yearsFrom=${yearsFrom}&yearsTo=${yearsTo}` +
    `&monthFrom=${monthFrom}&monthTo=${monthTo}`,

  getGusCitiesUrl: () => `${backendApiUrl}/api/v1/GusListings/all-cities`,


  getListingsByVoivodeshipUrl: (wojewodztwo: string) =>
    `${backendApiUrl}/api/v1/OtodomListings/voivodeship/${encode(wojewodztwo)}`,

  getOtodomDistrictsUrl: (cityName: string) =>
    `${backendApiUrl}/api/v1/OtodomListings/districts?cityName=${encode(
      cityName
    )}`,

  getListingsByCityUrl: (city: string) =>
    `${backendApiUrl}/api/v1/OtodomListings/city/${encode(city)}`,

  getOtodomAllVoivodeshipsUrl: () =>
    `${backendApiUrl}/api/v1/OtodomListings/all-voivodeships`,

  getOtodomAllCitiesUrl: () => `${backendApiUrl}/api/v1/OtodomListings/all-cities`,

  getOtodomLatestTransaction: () =>
    `${backendApiUrl}/api/v1/OtodomListings/latest-transactions`,
};
