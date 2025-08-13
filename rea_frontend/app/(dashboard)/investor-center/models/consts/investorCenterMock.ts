import { OtodomDistrictStat } from "@/services/api/models";

export type CityDistrictsMap = Record<string, OtodomDistrictStat[]>;

export const investorCityDistricts: CityDistrictsMap = {
    "Warszawa": [
        { district: "Mokotów", averagePricePerSqm: 14500, averageFlatSize: 52, totalBuildingOffers: 320, averageBuildingBuiltYear: 2006 },
        { district: "Śródmieście", averagePricePerSqm: 17500, averageFlatSize: 49, totalBuildingOffers: 210, averageBuildingBuiltYear: 1998 },
        { district: "Wola", averagePricePerSqm: 15500, averageFlatSize: 50, totalBuildingOffers: 280, averageBuildingBuiltYear: 2004 },
        { district: "Praga-Południe", averagePricePerSqm: 12800, averageFlatSize: 55, totalBuildingOffers: 260, averageBuildingBuiltYear: 1989 },
        { district: "Ursynów", averagePricePerSqm: 14200, averageFlatSize: 57, totalBuildingOffers: 190, averageBuildingBuiltYear: 2001 },
        { district: "Bemowo", averagePricePerSqm: 12900, averageFlatSize: 58, totalBuildingOffers: 170, averageBuildingBuiltYear: 1996 },
        { district: "Bielany", averagePricePerSqm: 13500, averageFlatSize: 56, totalBuildingOffers: 160, averageBuildingBuiltYear: 1992 },
        { district: "Ochota", averagePricePerSqm: 15200, averageFlatSize: 51, totalBuildingOffers: 140, averageBuildingBuiltYear: 1978 },
    ],
    "Kraków": [
        { district: "Stare Miasto", averagePricePerSqm: 16100, averageFlatSize: 50, totalBuildingOffers: 180, averageBuildingBuiltYear: 1965 },
        { district: "Krowodrza", averagePricePerSqm: 14700, averageFlatSize: 52, totalBuildingOffers: 210, averageBuildingBuiltYear: 1993 },
        { district: "Podgórze", averagePricePerSqm: 13900, averageFlatSize: 54, totalBuildingOffers: 240, averageBuildingBuiltYear: 1990 },
        { district: "Czyżyny", averagePricePerSqm: 13200, averageFlatSize: 55, totalBuildingOffers: 160, averageBuildingBuiltYear: 2008 },
        { district: "Prądnik Biały", averagePricePerSqm: 12700, averageFlatSize: 56, totalBuildingOffers: 190, averageBuildingBuiltYear: 2002 },
        { district: "Nowa Huta", averagePricePerSqm: 11400, averageFlatSize: 58, totalBuildingOffers: 220, averageBuildingBuiltYear: 1980 },
    ],
};
