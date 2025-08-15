import { OtodomDistrictStat, OtodomCityResponse, OtodomLatestTransaction } from "@/services/api/models";
import { formatDate, parseDate } from "@/utils/date";

export const extractDistricts = (payload: any): OtodomDistrictStat[] => {
  if (Array.isArray(payload)) return payload as OtodomDistrictStat[];

  if (payload?.cityDisctricts && Array.isArray(payload.cityDisctricts)) {
    return payload.cityDisctricts as OtodomDistrictStat[];
  }

  if (payload?.cityDistricts && Array.isArray(payload.cityDistricts)) {
    return payload.cityDistricts as OtodomDistrictStat[];
  }

  if (
    payload?.data?.cityDisctricts &&
    Array.isArray(payload.data.cityDisctricts)
  ) {
    return payload.data.cityDisctricts as OtodomDistrictStat[];
  }
  if (
    payload?.data?.cityDistricts &&
    Array.isArray(payload.data.cityDistricts)
  ) {
    return payload.data.cityDistricts as OtodomDistrictStat[];
  }

  return [];
};

export const mapCities = (payload: any): OtodomCityResponse[] => {
  var mappedCities: OtodomCityResponse[] = [];
  if (payload?.[0]?.cities) {
    mappedCities = payload[0].cities.map(
      (item: string, index: { toString: () => any }) => ({
        id: index.toString(), // lub inny unikalny identyfikator
        name: item,
      })
    );
  }
  return mappedCities;
};

export const mapVoivodeships = (payload: any): OtodomCityResponse[] => {
  var mappedVoivodeships: OtodomCityResponse[] = [];
  if (payload?.[0]?.voivodeships) {
    mappedVoivodeships = payload[0].voivodeships.map(
      (item: string, index: { toString: () => any }) => ({
        id: index.toString(), // lub inny unikalny identyfikator
        name: item,
      })
    );
  }
  return mappedVoivodeships;
};

export const mapLatestTransactions = (
  payload: any
): OtodomLatestTransaction[] => {
  let arr: OtodomLatestTransaction[] = [];
  if (Array.isArray(payload)) {
    arr = payload as OtodomLatestTransaction[];
  } else if (
    payload?.latestTransactions &&
    Array.isArray(payload.latestTransactions)
  ) {
    arr = payload.latestTransactions as OtodomLatestTransaction[];
  } else if (
    payload?.data?.latestTransactions &&
    Array.isArray(payload.data.latestTransactions)
  ) {
    arr = payload.data.latestTransactions as OtodomLatestTransaction[];
  } else {
    arr = [];
  }

  const monthToken = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]{3}\s*'?\d{2,4}$/;

  console.log(arr);

  return arr.map((tx) => {
    const raw = tx.webScrapedDate;
    let d: Date | null = null;

    if (raw instanceof Date) {
      d = raw;
    } else if (typeof raw === "string") {
      const iso = new Date(raw);
      if (!Number.isNaN(iso.getTime())) {
        d = iso;
      } else if (monthToken.test(raw.trim())) {
        d = parseDate(raw);
      }
    }

    const display = d ? formatDate(d) : formatDate(raw as any);

    const marketTypeMapped =
      tx.marketType == "PrimaryMarket" ? "Rynek pierwotny" : "Rynek wtórny";

    const propertyTypeMapped =
      tx.propertyType == "House" ? "Dom" : "Mieszkanie";

    return {
      ...tx,
      transactionDate: display,
      marketType: marketTypeMapped,
      propertyType: propertyTypeMapped,
    };
  });
};

