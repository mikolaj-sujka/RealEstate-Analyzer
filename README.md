# :office: RealEstate Analyzer

## :books: Spis Treści
- [Opis projektu](#bookmark_tabs-opis-projektu)
- [Stack technologiczny](#computer-stack-technologiczny)
- [Cel Projektu](#dart-cel-projektu)
- [Instalacja i uruchomienie](#rocket-instalacja-i-uruchomienie)
- [Struktura projektu](#file_folder-struktura-projektu)
- [Funkcjonalności](#chart_with_upwards_trend-funkcjonalności)
- [Research](#microscope-research)
- [Templates](#newspaper-moduły-aplikacji)
- [Kontakt](#handshake-kontakt)
- [Licencja](#page_facing_up-licencja)

## :bookmark_tabs: Opis projektu 

RealEstate Analyzer to zaawansowana platforma webowa umożliwiająca kompleksową analizę oraz prognozowanie trendów na polskim rynku nieruchomości. Aplikacja skierowana jest do inwestorów, analityków oraz osób prywatnych, które chcą podejmować świadome decyzje inwestycyjne oparte na precyzyjnych danych rynkowych oraz prognozach cenowych.

Główne funkcjonalności obejmują:

- Szczegółową analizę geograficzną oraz czasową danych rynkowych.
- Monitoring rynku, który posiada najnowsze jak i dane historyczne z interaktywnymi wizualizacjami.
- Kalkulatory rentowności i potencjału inwestycyjnego.

## :computer: Stack technologiczny

#### Backend
- .NET (Web API, Entity Framework Core)
- Web scraping i przetwarzanie danych z Hangfire
- Filtrowanie danych, stronicowanie (paging)
- Monitorowanie i telemetria z wykorzystaniem OpenTelemetry
- Wykorzystanie danych historycznych z GUS (pliki w formie csv)
- Redis Cache
- Polly Retry (strategia/”polityka” w bibliotece Polly, która automatycznie ponawia nieudane operacje (np. żądania HTTP) przy błędach przejściowych, z konfigurowaną liczbą prób i opóźnieniami (np. exponential backoff))

#### Frontend
- Next.js (SSR, optymalizacja SEO)
- TypeScript
- Mantine UI (responsywność i estetyka)
- Vanilla Extract CSS
- React hooks

#### Research & Data Analysis
- Python (Jupyter Notebook)
- Web scraping (BeautifulSoup, requests)
- Data analysis (pandas)
- CSV data processing

#### Baza danych
- MSSQL

#### DevOps i hosting
- Azure
- Docker
- Vercel

## :dart: Cel Projektu

Celem RealEstate Analyzer jest dostarczenie użytkownikom zaawansowanego narzędzia do podejmowania trafnych decyzji inwestycyjnych poprzez efektywną analizę oraz prognozowanie cen na rynku nieruchomości w Polsce.

## :rocket: Instalacja i uruchomienie

### Wymagania systemowe
- Node.js (wersja 18 lub nowsza)
- pnpm (menedżer pakietów)
- Python 3.x (dla części research)
- Git
- .NET 9 SDK
- Docker / Docker Desktop
- (opcjonalnie) SQL Server lokalnie lub w Dockerze

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/mikolaj-sujka/RealEstate-Analyzer.git
cd RealEstate-Analyzer
```

### 2. Instalacja i uruchomienie Frontend

```bash
# Przejdź do katalogu frontend
cd rea_frontend

# Zainstaluj zależności
pnpm install

# Uruchom serwer deweloperski
pnpm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

#### Dostępne skrypty dla frontend:
```bash
pnpm build      # Zbuduj aplikację produkcyjną
pnpm start      # Uruchom aplikację produkcyjną
pnpm lint       # Sprawdź kod pod kątem błędów
pnpm type-check # Sprawdź typy TypeScript
```
### 3. Instalacja i uruchomienie Backend (wraz z Redis cache na dockerze)
#### Przygotowanie środowiska
```bash
# Przejdź do katalogu backendu (solution rea_api)
cd rea_api

# Przywróć i zbuduj
dotnet restore
dotnet build
```

Skonfiguruj zmienne środowiskowe lub wykorzystaj `appsettings.Development.json`

#### Redis w Dockerze
Opcja A - szybki start (pojedynczy kontener):
```bash
docker run -d --name rea-redis -p 6379:6379 redis:latest
```
To uruchamia Redis i mapuje port 6379 na hosta.

Opcja B – docker compose (jeśli używasz dołączonego pliku docker-compose.yml):
```bash
# start wszystkich usług zdefiniowanych w compose
docker compose up -d

# lub tylko usługi redis (jeśli jest tak nazwana)
docker compose up -d redis
```
`docker compose up -d` tworzy i uruchamia usługi z pliku Compose.

#### Baza danych (opcjonalnie: SQL Server w Dockerze)
Jeśli nie masz lokalnego SQL Servera, możesz uruchomić kontener Developerski:
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<SilneHaslo123!>" \
  -e "MSSQL_PID=Developer" -p 1433:1433 \
  --name rea-sql -d mcr.microsoft.com/mssql/server:2022-latest
```
Następnie użyj connection stringa z hostem `localhost,1433`.

#### Uruchomienie API
```bash
# z katalogu projektu API
cd RealEstateAnalyzer.Api
dotnet run
```

Dostępne „skrypty”/polecenia dla backendu
```bash
dotnet build                         # zbuduj backend
dotnet run                           # uruchom backend (dev)
dotnet test                          # uruchom testy (jeśli są)
dotnet ef migrations add <Nazwa> \
  -p RealEstateAnalyzer.Infrastructure \
  -s RealEstateAnalyzer.Api          # dodaj migrację
dotnet ef database update \
  -p RealEstateAnalyzer.Infrastructure \
  -s RealEstateAnalyzer.Api          # zastosuj migracje
docker compose up -d                 # start usług pomocniczych (np. Redis)
docker compose down                  # zatrzymanie usług
```
### 4. Research Environment (opcjonalne)

Jeśli chcesz uruchomić część badawczą projektu:

```bash
# Przejdź do katalogu research
cd rea_research

# Zainstaluj wymagane pakiety Python
pip install requests beautifulsoup4 pandas jupyter

# Uruchom Jupyter Notebook
jupyter notebook rea_research.ipynb
```

## :file_folder: Struktura projektu

```
RealEstate-Analyzer/
├── .gitignore
├── LICENSE
├── README.md
├── rea_api/                           
│   ├── rea_api.sln                    
│   ├── RealEstateAnalyzer-csv/        
│   ├── RealEstateAnalyzer.Api/        
│   ├── RealEstateAnalyzer.Application/        
│   ├── RealEstateAnalyzer.Application.Abstractions/    
│   ├── RealEstateAnalyzer.Domain/             
│   ├── RealEstateAnalyzer.Infrastructure/     
│   ├── RealEstateAnalyzer.Infrastructure.Http/     
│   ├── RealEstateAnalyzer.Infrastructure.Hangfire/ 
│   ├── RealEstateAnalyzer.Infrastructure.Redis/    
│   ├── RealEstateAnalyzer.WebScraping/             
│   ├── RealEstateAnalyzer.WebScraping.Domain/      
│   ├── RealEstateAnalyzer.WebScraping.Abstractions/ 
│   └── docker-compose/ 
├── rea_frontend/                      
│   ├── app/                          
│   ├── components/                   
│   ├── hooks/                        
│   ├── services/                     
│   ├── models/                       
│   ├── utils/                        
│   ├── styles/                       
│   ├── i18n/                         
│   ├── providers/                    
│   ├── public/                       
│   ├── package.json
│   └── tsconfig.json
└── rea_research/                     
    ├── rea_research.ipynb            
    ├── olx_offers_final.csv          
    └── otodom_offers_final.csv       
```
## :outbox_tray: Endpointy
| Method | URL                                                                 | Parametry                                                                                                                                                                    | Opis                                              |
| ------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| GET    | `{BASE_URL}/api/listings/gus-housing-listings`                      | `cityName` (query, required)                                                                                                                                                 | GUS – listingi dla miasta (z cache Redis).        |
| GET    | `{BASE_URL}/api/listings/gus-housing-listings/{yearsBack}`          | `yearsBack` (route, uint, required), `cityName` (query, required)                                                                                                            | GUS – dane z ostatnich *N* lat dla miasta.        |
| GET    | `{BASE_URL}/api/listings/gus-housing-listings/date-range`           | `cityName` (query, required), `yearsFrom` (query, uint, required), `yearsTo` (query, uint, required), `monthFrom` (query, 1–12, required), `monthTo` (query, 1–12, required) | GUS – niestandardowy zakres (rok/miesiąc).        |
| GET    | `{BASE_URL}/api/listings/otodom-listings/districts`                 | `cityName` (query, required)                                                                                                                                                 | Otodom – agregaty dla dzielnic wskazanego miasta. |
| GET    | `{BASE_URL}/api/listings/otodom-listings/voivodeship/{voivodeship}` | `voivodeship` (route, required)                                                                                                                                              | Otodom – agregaty dla województwa.                |
| GET    | `{BASE_URL}/api/listings/otodom-listings/city/{cityName}`           | `cityName` (route, required)                                                                                                                                                 | Otodom – agregaty dla miasta.                     |


## :chart_with_upwards_trend: Funkcjonalności

### Frontend
- **Dashboard analityczny** - Interaktywne wykresy i statystyki
- **Generowanie raportów PDF** - Eksport analiz do formatu PDF
- **Kalkulator inwestycyjny** - Ocena potencjału inwestycyjnego używając metody AHP
- **Help Center** - Centrum pomocy z FAQ
- **Responsywny design** - Optymalizacja na wszystkie urządzenia

### Backend
- **REST API (ASP.NET Core Web API)** – ListingsController z endpointami dla GUS (miasto, ostatnie N lat, niestandardowy zakres) oraz Otodom (miasto, województwo, dzielnice).
- **Persistencja (MSSQL + EF Core)** – zapisy i odczyty ofert/statystyk; migracje; indeksy po najczęstszych filtrach (miasto/województwo/okres); projekcje (Select) i AsNoTracking dla szybkich odczytów; idempotentne upserty (deduplikacja po OfferId/Url).
- **Cache rozproszony (Redis)** – wzorzec cache-aside (np. GUS dla miasta), spójne klucze (REA:{entity}:{key}), kontrola TTL, pre-warm najpopularniejszych lokalizacji, opcjonalna invalidacja po imporcie.
- **Odporność na błędy (Polly)** – retry z exponential/jitter backoff, honorowanie Retry-After, timeout, (opcjonalnie) circuit breaker/bulkhead dla integracji HTTP i scrapera.
- **Web scraping (Otodom)** – IHttpClientFactory + SocketsHttpHandler, nagłówki „jak przeglądarka”, CookieContainer, limiter RPS (token-bucket), jitter, AIMD; wykrywanie liczby stron, batchowanie i deduplikacja rekordów; parsowanie HTML (Html Agility Pack / AngleSharp).
- **Import/ETL danych CSV (GUS)** – walidacja i konwersje typów, mapowanie nagłówków na Value Objects (Money, Area, PricePerSqm, Location), obsługa braków danych i wartości odstających; batch insert/bulk (gdzie ma sens).
- **Zadania w tle (Hangfire)** – harmonogram: scraping (okno N najnowszych stron), import CSV, odświeżanie cache, rekalkulacje agregatów/forecastów; dashboard, retry jobów, chunking dużych wsadów.
- **Wydajność** – paginacja i stabilne sortowanie; zapytania skompilowane; (opcjonalnie) Dapper do ciężkich raportów; strategie redukcji payloadu (seletywne pola, kompresja transportu).
- **Telemetria i monitoring** – OpenTelemetry (traces/metrics), korelacja żądań, Serilog; health-checki dla SQL/Redis/HTTP (/healthz, /readyz).
- **Bezpieczeństwo** – CORS dla frontendu, HTTPS, (opcjonalnie) ograniczenie pochodzenia/klucz aplikacyjny, rate limiting po IP dla endpointów publicznych.

### Research & Data Collection
- **Web scraping** - Automatyczne pobieranie danych z portali (Otodom, OLX)
- **Analiza danych** - Przetwarzanie i analiza zebranych danych
- **Statystyki rynkowe** - Szczegółowe statystyki miast, dzielnic, cen

## :microscope: Research

Projekt zawiera zaawansowaną część badawczą w katalogu [`rea_research`](rea_research), która obejmuje:

### Web Scraping
- Automatyczne scraping portali Otodom i OLX
- Pobieranie danych o cenach, lokalizacjach, metrażu
- Wykrywanie liczby dostępnych stron
- Ekstraktowanie szczegółowych informacji (pokoje, piętra, dzielnice)

### Analiza danych
- Przetwarzanie zebranych danych w formacie CSV
- Analiza jakości i kompletności danych
- Porównanie wyników między portalami
- Statystyki geograficzne i cenowe

### Wyniki badań
- **Otodom**: ~2,200+ ofert z wysoką jakością danych
- **OLX**: ~3,640+ ofert z różną jakością danych
- Pliki wynikowe: [`olx_offers_final.csv`](rea_research/olx_offers_final.csv), [`otodom_offers_final.csv`](rea_research/otodom_offers_final.csv)

## :newspaper: Moduły aplikacji
<img width="1722" height="891" alt="Zrzut ekranu 2025-07-31 o 15 03 27" src="https://github.com/user-attachments/assets/334ada0d-8e21-4124-9050-9f1228eb070b" />
<img width="1447" height="739" alt="Zrzut ekranu 2025-08-18 112630" src="https://github.com/user-attachments/assets/410572e2-fb1b-40aa-9750-35b9c84e696d" />
<img width="1443" height="717" alt="Zrzut ekranu 2025-08-18 113936" src="https://github.com/user-attachments/assets/d066c55a-6439-43eb-bb57-f8cffb5d726e" />
<img width="806" height="828" alt="Zrzut ekranu 2025-08-18 120233" src="https://github.com/user-attachments/assets/a1f12c5e-1132-478b-ad1f-25f9fb05a67f" />
<img width="1072" height="689" alt="Zrzut ekranu 2025-08-18 125613" src="https://github.com/user-attachments/assets/073e2663-9c53-48ca-ae28-f887b0067836" />
<img width="1286" height="790" alt="Zrzut ekranu 2025-08-19 103406" src="https://github.com/user-attachments/assets/44a3dacf-0c6a-4b01-a647-e5c80b0c1640" />
<img width="1445" height="662" alt="Zrzut ekranu 2025-08-19 175657" src="https://github.com/user-attachments/assets/d4cf39c5-ff25-413e-92e0-760b1b3d49d7" />
<img width="1283" height="574" alt="Zrzut ekranu 2025-08-19 175909" src="https://github.com/user-attachments/assets/2ca813d9-46db-4daa-9f32-060763527aa3" />
<img width="1395" height="377" alt="Zrzut ekranu 2025-08-19 175704" src="https://github.com/user-attachments/assets/bf410706-f254-4c70-b47d-0d00e31d0313" />
<img width="1286" height="739" alt="Zrzut ekranu 2025-08-19 175739" src="https://github.com/user-attachments/assets/af8de74f-0b7e-4c70-b7ff-5482aa560c66" />

---

## :handshake: Kontakt

Jeśli masz pytania lub sugestie dotyczące projektu, skontaktuj się z nami przez Issues na GitHubie.

##  :rocket: Deployment linki
https://real-estate-analyzer-bay.vercel.app
- dokumentacja API: https://app-rea-apps-api-prod-plc-ggfjcfh3hzbcdfge.polandcentral-01.azurewebsites.net/scalar/
<img width="1891" height="861" alt="Zrzut ekranu 2025-08-21 123754" src="https://github.com/user-attachments/assets/4330ee1e-32c7-403d-b48c-43a735f5cf1d" />


## :page_facing_up: Licencja

Ten projekt jest objęty licencją zawartą w pliku [`LICENSE`](LICENSE).
