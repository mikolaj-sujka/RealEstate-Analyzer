import { ApiUrlService } from "../ApiUrl";
import { createAxiosInstance } from "../axiosClient";
import { GusHousingListingData } from "../models/types/gus-listings";
import { SettingsService } from "../Settings";

const backendAxios = createAxiosInstance(
  new SettingsService().settings.backendApiUrl,
  false
);

export function mapGusListings(payload: any): GusHousingListingData[] {
  let arr: any[] = [];
  if (Array.isArray(payload)) arr = payload;
  else if (payload?.listings && Array.isArray(payload.listings))
    arr = payload.listings;
  else if (payload?.data?.listings && Array.isArray(payload.data.listings))
    arr = payload.data.listings;
  else if (payload?.data && Array.isArray(payload.data)) arr = payload.data;
  else arr = [];

  return arr.map((x) => ({
    cityCode: String(x.cityCode ?? x.CityCode ?? ""),
    quarter: Number(x.quarter ?? x.Quarter ?? 0),
    year: Number(x.year ?? x.Year ?? 0),
    medianPricePerSqm: Number(x.medianPricePerSqm ?? x.MedianPricePerSqm ?? 0),
    averagePricePerSqm: Number(
      x.averagePricePerSqm ?? x.AveragePricePerSqm ?? 0
    ),
    flatsCompleted: Number(x.flatsCompleted ?? x.FlatsCompleted ?? 0),
    flatsSold: Number(x.flatsSold ?? x.FlatsSold ?? 0),
    totalValueSold: Number(x.totalValueSold ?? x.TotalValueSold ?? 0),
    averageTotalPrice: Number(x.averageTotalPrice ?? x.AverageTotalPrice ?? 0),
  })) as GusHousingListingData[];
}

export const GusListingsService = {
  async getByCity(
    cityName: string,
    signal?: AbortSignal
  ): Promise<GusHousingListingData[]> {
    const url = ApiUrlService.getGusListingsByCityUrl(cityName);
    const resp = await backendAxios.get(url, { signal });
    return mapGusListings(resp.data);
  },

  async getRecentYears(
    cityName: string,
    yearsBack: number,
    signal?: AbortSignal
  ): Promise<GusHousingListingData[]> {
    const url = ApiUrlService.getGusListingsRecentYearsUrl(cityName, yearsBack);
    const resp = await backendAxios.get(url, { signal });
    return mapGusListings(resp.data);
  },

  async getByDateRange(
    cityName: string,
    yearsFrom: number,
    yearsTo: number,
    monthFrom: number,
    monthTo: number,
    signal?: AbortSignal
  ): Promise<GusHousingListingData[]> {
    const url = ApiUrlService.getGusListingsDateRangeUrl(
      cityName,
      yearsFrom,
      yearsTo,
      monthFrom,
      monthTo
    );
    const resp = await backendAxios.get(url, { signal });
    return mapGusListings(resp.data);
  },

  async getCities(signal?: AbortSignal): Promise<string[]> {
    const url = ApiUrlService.getGusCitiesUrl();
    const resp = await backendAxios.get(url, { signal });
    const payload = resp.data;
    if (Array.isArray(payload)) return payload.map(String);
    if (Array.isArray(payload?.cities)) return payload.cities.map(String);
    if (Array.isArray(payload?.data?.cities))
      return payload.data.cities.map(String);
    return [];
  },
};

