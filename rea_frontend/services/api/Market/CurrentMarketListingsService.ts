import { ApiUrlService } from "../ApiUrl";
import { createAxiosInstance } from "../axiosClient";
import { SettingsService } from "../Settings";

export interface Listing {
    id: string;
    title: string;
    price: number;
    city?: string;
    voivodeship?: string;
    timestamp: string;
    [key: string]: any;
}

export interface MarketListingResponse {
    listings: Listing[];
    total?: number;
    meta?: any;
}

const backendAxios = createAxiosInstance(
    new SettingsService().settings.backendApiUrl,
    false // zależnie od autoryzacji; ustaw true jeśli trzeba cookies
);

export const MarketListingService = {
    getLatestListings: async (limit = 100): Promise<MarketListingResponse> => {
        try {
            const url = ApiUrlService.getLatestListingsUrl(limit);
            const resp = await backendAxios.get(url);
            return resp.data;
        } catch (err: any) {
            throw new Error(
                `Błąd pobierania latest listings: ${err.response?.data || err.message}`
            );
        }
    },

    getListingsByVoivodeship: async (
        voivodeship: string,
        limit = 100
    ): Promise<MarketListingResponse> => {
        try {
            const url = ApiUrlService.getListingsByVoivodeshipUrl(
                voivodeship,
                limit
            );
            const resp = await backendAxios.get(url);
            return resp.data;
        } catch (err: any) {
            throw new Error(
                `Błąd pobierania listings dla województwa "${voivodeship}": ${err.response?.data || err.message
                }`
            );
        }
    },

    getListingsByCity: async (
        city: string,
        limit = 100
    ): Promise<MarketListingResponse> => {
        try {
            const url = ApiUrlService.getListingsByCityUrl(city, limit);
            const resp = await backendAxios.get(url);
            return resp.data;
        } catch (err: any) {
            throw new Error(
                `Błąd pobierania listings dla miasta "${city}": ${err.response?.data || err.message
                }`
            );
        }
    },

    getListings: async (
        filters: Record<string, any>
    ): Promise<MarketListingResponse> => {
        try {
            const url = ApiUrlService.getMarketListingsUrl(filters);
            const resp = await backendAxios.get(url);
            return resp.data;
        } catch (err: any) {
            throw new Error(
                `Błąd pobierania listings z filtrami ${JSON.stringify(filters)}: ${err.response?.data || err.message
                }`
            );
        }
    },
};
