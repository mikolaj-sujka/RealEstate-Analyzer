import { ApiUrlService, GusRange } from "../ApiUrl";
import { createAxiosInstance } from "../axiosClient";
import { SettingsService } from "../Settings";

export interface GusHistoricalResponse {
  data: any;
  meta?: any;
}

/**
 * Helper: oblicza listę lat dla ostatnich N lat (włącznie z bieżącym rokiem).
 * np. 1 => [2025], 2 => [2024,2025], etc.
 */
function buildLastNYears(n: number): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = n - 1; i >= 0; i--) {
    years.push(currentYear - i);
  }
  return years;
}

// Instancja do twojego .NET backendu (nie GUS BDL bezpośrednio)
const backendAxios = createAxiosInstance(
  new SettingsService().settings.backendApiUrl,
  true // ustaw na true jeżeli potrzebujesz cookies / uwierzytelnienia
);

/**
 * Bazowa funkcja: prosi backend o dane z GUS z uwzględnieniem zakresu.
 * Zakłada, że backend umi interpretuje parametry ?variableId=...&range=... lub ?years=...
 */
async function fetchGusHistorical(
  variableId: string,
  range: GusRange
): Promise<GusHistoricalResponse> {
  try {
    const url = ApiUrlService.getGusHistoricalUrl(variableId, range);
    const resp = await backendAxios.get(url);
    return resp.data;
  } catch (err: any) {
    throw new Error(
      `Błąd pobierania historycznych danych GUS (range=${range}): ${err.response?.data || err.message
      }`
    );
  }
}

/**
 * Wersje pomocnicze
 */
export const GusService = {
  getLast1Year: (variableId: string) =>
    fetchGusHistorical(variableId, '1y'),
  getLast2Years: (variableId: string) =>
    fetchGusHistorical(variableId, '2y'),
  getLast3Years: (variableId: string) =>
    fetchGusHistorical(variableId, '3y'),
  getLast5Years: (variableId: string) =>
    fetchGusHistorical(variableId, '5y'),
  getLast10Years: (variableId: string) =>
    fetchGusHistorical(variableId, '10y'),
  getAllYears: (variableId: string) =>
    fetchGusHistorical(variableId, 'all'),

  /**
   * Jeśli twój .NET backend oczekuje konkretnej listy lat zamiast "range", możesz
   * użyć tej metody jako przykładowej: buildLastNYears(5) => ostatnie 5 lat, i przekazać
   * do endpointu z parametrem years=...
   */
  getLastNYears: async (variableId: string, n: number) => {
    const years = buildLastNYears(n);
    const url = ApiUrlService.getGusHistoricalByYearsUrl(variableId, years);
    try {
      const resp = await backendAxios.get(url);
      return resp.data;
    } catch (err: any) {
      throw new Error(
        `Błąd pobierania historycznych danych GUS (ostatnie ${n} lat): ${err.response?.data || err.message
        }`
      );
    }
  },
};
