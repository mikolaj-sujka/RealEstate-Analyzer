import axios, { AxiosInstance } from 'axios';

export function createAxiosInstance(
    baseURL: string,
    withCredentials = false
): AxiosInstance {
    const instance = axios.create({
        baseURL,
        timeout: 10000,
        withCredentials,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor: globalne nagłówki / logika przed wysłaniem
    instance.interceptors.request.use(
        config => {
            // np. dodawanie tokenów, logowanie requestów, itp. Rozszerzalne. :contentReference[oaicite:2]{index=2}
            return config;
        },
        error => Promise.reject(error)
    );

    // Response interceptor: centralna obsługa błędów / retry / refresh :contentReference[oaicite:3]{index=3}
    instance.interceptors.response.use(
        response => response,
        error => {
            // Normalizuj błędy, logowanie, ewentualne retry/backoff itd. :contentReference[oaicite:4]{index=4}
            return Promise.reject(error);
        }
    );

    return instance;
}
