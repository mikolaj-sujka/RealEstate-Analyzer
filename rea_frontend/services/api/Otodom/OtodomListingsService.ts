import { ApiUrlService } from "../ApiUrl";
import { createAxiosInstance } from "../axiosClient";
import { OtodomDistrictStat, GetOtodomCityDistrictsResponse } from "../models/types/otodom-listings";
import { SettingsService } from "../Settings";

const backendAxios = createAxiosInstance(
    new SettingsService().settings.backendApiUrl,
    false
);

function extractDistricts(payload: any): OtodomDistrictStat[] {
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
};
