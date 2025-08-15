import { extractDistricts, mapCities, mapLatestTransactions, mapVoivodeships } from "@/utils";
import { ApiUrlService } from "../ApiUrl";
import { createAxiosInstance } from "../axiosClient";
import {
  OtodomDistrictStat,
  GetOtodomCityDistrictsResponse,
  OtodomCityResponse,
} from "../models/types/otodom-listings";
import { SettingsService } from "../Settings";

const backendAxios = createAxiosInstance(
  new SettingsService().settings.backendApiUrl,
  false
);

export const OtodomListingsService = {
  async getDistrictStats(
    cityName: string,
    signal?: AbortSignal
  ): Promise<OtodomDistrictStat[]> {
    const url = ApiUrlService.getOtodomDistrictsUrl(cityName);
    const resp = await backendAxios.get<
      GetOtodomCityDistrictsResponse | OtodomDistrictStat[]
    >(url, { signal });
    return extractDistricts(resp.data);
  },

  async getListingsByVoivodeship(wojewodztwo: string, signal?: AbortSignal) {
    const url = ApiUrlService.getListingsByVoivodeshipUrl(wojewodztwo);
    const resp = await backendAxios.get(url, { signal });
    return resp.data;
  },

  async getAllCities(signal?: AbortSignal): Promise<OtodomCityResponse[]> {
    const url = ApiUrlService.getOtodomAllCitiesUrl();
    const resp = await backendAxios.get(url, { signal });
    const cities = mapCities(resp.data);

    return cities;
  },

  async getAllVoivodeships(
    signal?: AbortSignal
  ): Promise<OtodomCityResponse[]> {
    const url = ApiUrlService.getOtodomAllVoivodeshipsUrl();
    const resp = await backendAxios.get(url, { signal });
    const voivodeships = mapVoivodeships(resp.data);

    return voivodeships;
  },

  async getLatestTransaction(signal?: AbortSignal) {
    const url = ApiUrlService.getOtodomLatestTransaction();
    const resp = await backendAxios.get(url, { signal });
    const latestTransactions = mapLatestTransactions(resp.data);

    console.log("Latest transactions:", latestTransactions);

    return latestTransactions;
  },
};
