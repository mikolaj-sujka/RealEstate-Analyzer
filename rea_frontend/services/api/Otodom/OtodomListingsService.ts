import { url } from "inspector/promises";
import { ApiUrlService } from "../ApiUrl";
import { createAxiosInstance } from "../axiosClient";
import { OtodomDistrictStat, GetOtodomCityDistrictsResponse, OtodomCityResponse } from "../models/types/otodom-listings";
import { SettingsService } from "../Settings";

const backendAxios = createAxiosInstance(
    new SettingsService().settings.backendApiUrl,
    false
);

const extractDistricts = (payload: any): OtodomDistrictStat[] => {
    if (Array.isArray(payload)) return payload as OtodomDistrictStat[];

    if (payload?.cityDisctricts && Array.isArray(payload.cityDisctricts)) {
        return payload.cityDisctricts as OtodomDistrictStat[];
    }

    if (payload?.cityDistricts && Array.isArray(payload.cityDistricts)) {
        return payload.cityDistricts as OtodomDistrictStat[];
    }

    if (payload?.data?.cityDisctricts && Array.isArray(payload.data.cityDisctricts)) {
        return payload.data.cityDisctricts as OtodomDistrictStat[];
    }
    if (payload?.data?.cityDistricts && Array.isArray(payload.data.cityDistricts)) {
        return payload.data.cityDistricts as OtodomDistrictStat[];
    }

    return [];
}

const mapCities = (payload: any): OtodomCityResponse[] => {
    var mappedCities: OtodomCityResponse[] = [];
    if (payload?.[0]?.cities) {
        mappedCities = payload[0].cities.map((item: string, index: { toString: () => any; }) => ({
            id: index.toString(), // lub inny unikalny identyfikator
            name: item,
        }));
    }
    return mappedCities;
}

const mapVoivodeships = (payload: any): OtodomCityResponse[] => {
    var mappedVoivodeships: OtodomCityResponse[] = [];
    if (payload?.[0]?.voivodeships) {
        mappedVoivodeships = payload[0].voivodeships.map((item: string, index: { toString: () => any; }) => ({
            id: index.toString(), // lub inny unikalny identyfikator
            name: item,
        }));
    }
    return mappedVoivodeships;
}

export const OtodomListingsService = {
    async getDistrictStats(cityName: string, signal?: AbortSignal): Promise<OtodomDistrictStat[]> {
        const url = ApiUrlService.getOtodomDistrictsUrl(cityName);
        const resp = await backendAxios.get<GetOtodomCityDistrictsResponse | OtodomDistrictStat[]>(
            url,
            { signal }
        );
        return extractDistricts(resp.data);
    },
    
    async getListingsByVoivodeship(wojewodztwo: string, signal?: AbortSignal) {
        const url = ApiUrlService.getListingsByVoivodeshipUrl(wojewodztwo);
        const resp = await backendAxios.get(url, { signal });
        return resp.data;
    },

    async getAllCities(signal?: AbortSignal) : Promise<OtodomCityResponse[]> {
        const url = ApiUrlService.getOtodomAllCitiesUrl();
        const resp = await backendAxios.get(url, { signal });
        const cities = mapCities(resp.data);

        return cities;
    },

    async getAllVoivodeships(signal?: AbortSignal) : Promise<OtodomCityResponse[]> {
        const url = ApiUrlService.getOtodomAllVoivodeshipsUrl();
        const resp = await backendAxios.get(url, { signal });
        const voivodeships = mapVoivodeships(resp.data);

        return voivodeships;
    }
};
