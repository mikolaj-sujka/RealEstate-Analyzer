export type AppSettings = {
    apiCode: string;
    backendApiUrl: string;
};

export class SettingsService {
    get settings(): AppSettings {
        return {
            apiCode:
                process.env.NEXT_PUBLIC_API_CODE ||
                '1pV28j73w1Yokk8hhPX2tD5JptRkjKAhAQIwkZwXGG_fAzFurIqBWw==',
            backendApiUrl:
                process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://localhost:7130',
        };
    }

    get appVersion(): string {
        return process.env.NEXT_PUBLIC_APP_VERSION || 'dev';
    }
}
