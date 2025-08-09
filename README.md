# :office: RealEstate Analyzer

## :books: Spis Treści
- [Opis projektu](#bookmark_tabs-opis-projektu)
- [Stack technologiczny](#computer-stack-technologiczny)
- [Cel Projektu](#dart-cel-projektu)
- [Instalacja i uruchomienie](#rocket-instalacja-i-uruchomienie)
- [Struktura projektu](#file_folder-struktura-projektu)
- [Funkcjonalności](#chart_with_upwards_trend-funkcjonalności)
- [Research](#microscope-research)
- [Templates](#newspaper-templates-aplikacji)
- [Kontakt](#handshake-kontakt)
- [Licencja](#page_facing_up-licencja)

## :bookmark_tabs: Opis projektu 

RealEstate Analyzer to zaawansowana platforma webowa umożliwiająca kompleksową analizę oraz prognozowanie trendów na polskim rynku nieruchomości. Aplikacja skierowana jest do inwestorów, analityków oraz osób prywatnych, które chcą podejmować świadome decyzje inwestycyjne oparte na precyzyjnych danych rynkowych oraz prognozach cenowych.

Główne funkcjonalności obejmują:

- Szczegółową analizę geograficzną oraz czasową danych rynkowych.
- Zaawansowane modele predykcyjne oparte na uczeniu maszynowym.
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

## :dart: Cel Projektu

Celem RealEstate Analyzer jest dostarczenie użytkownikom zaawansowanego narzędzia do podejmowania trafnych decyzji inwestycyjnych poprzez efektywną analizę oraz prognozowanie cen na rynku nieruchomości w Polsce.

## :rocket: Instalacja i uruchomienie

### Wymagania systemowe
- Node.js (wersja 18 lub nowsza)
- pnpm (menedżer pakietów)
- Python 3.x (dla części research)
- Git

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

### 3. Research Environment (opcjonalne)

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
├── rea_api/                           # Backend API (.NET)
│   ├── rea_api.sln                    # Solution (spina wszystkie projekty)
│   ├── RealEstateAnalyzer-csv/        # Dane wejściowe CSV (GUS) – surowe pliki do importu/testów
│   ├── RealEstateAnalyzer.Api/        # Warstwa prezentacji (ASP.NET Core): Controllers/Minimal API, DI, appsettings, start aplikacji
│   ├── RealEstateAnalyzer.Application/        # Logika use-case’ów (CQRS/MediatR), handlery, validacje, mappingi, DTO/Responses
│   ├── RealEstateAnalyzer.Application.Abstractions/     # Kontrakty dla Application (interfejsy portów: repozytoria, gatewaye, usługi)
│   ├── RealEstateAnalyzer.Domain/             # Model domenowy (encje, value objects, agregaty, eventy domenowe, enumy, reguły)
│   ├── RealEstateAnalyzer.Infrastructure/     # Implementacje portów (EF Core DbContext, repozytoria, migracje, I/O, pliki, integracje)
│   ├── RealEstateAnalyzer.Infrastructure.Http/     # Infrastrukturę HTTP (IHttpClientFactory, DelegatingHandlers, polityki retry, opcje)
│   ├── RealEstateAnalyzer.Infrastructure.Hangfire/ # Konfiguracja i hostowanie Hangfire, dashboard, serwer, job activator
│   ├── RealEstateAnalyzer.Infrastructure.Redis/    # Konfiguracja Redis, cache/adapters, polityki wygasania, helpery
│   ├── RealEstateAnalyzer.WebScraping/             # Implementacje scraperów (Otodom itp.), orkiestracja, wykrywanie stron, workflow scrapingu
│   ├── RealEstateAnalyzer.WebScraping.Domain/      # Prosty model „scrapingowy” (rekordy prymitywów, np. OtodomOfferRecord, helpery)
│   ├── RealEstateAnalyzer.WebScraping.Abstractions/ # Interfejsy dla scrapingu (IScraper<T>, IOfferParser<T>, kontrakty serwisów)
│   └── docker-compose/ # Plik yml zawierający konfiguracje kontenerów dla solution i redis
├── rea_frontend/                      # Frontend (Next.js)
│   ├── app/                          # App Router (Next.js 13+)
│   ├── components/                   # Komponenty React
│   ├── hooks/                        # Custom React hooks
│   ├── services/                     # Serwisy (API calls, PDF generation)
│   ├── models/                       # TypeScript models
│   ├── utils/                        # Funkcje pomocnicze
│   ├── styles/                       # Style CSS
│   ├── i18n/                         # Internationalization
│   ├── providers/                    # Context providers
│   ├── public/                       # Pliki statyczne
│   ├── package.json
│   └── tsconfig.json
└── rea_research/                      # Research & Data Analysis
    ├── rea_research.ipynb            # Jupyter notebook z analizą
    ├── olx_offers_final.csv          # Dane z OLX
    └── otodom_offers_final.csv       # Dane z Otodom
```

## :chart_with_upwards_trend: Funkcjonalności

### Frontend
- **Dashboard analityczny** - Interaktywne wykresy i statystyki
- **Generowanie raportów PDF** - Eksport analiz do formatu PDF
- **Kalkulator inwestycyjny** - Ocena potencjału inwestycyjnego używając metody AHP
- **Help Center** - Centrum pomocy z FAQ
- **Responsywny design** - Optymalizacja na wszystkie urządzenia

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

## :newspaper: Templates aplikacji
<img width="1722" height="891" alt="Zrzut ekranu 2025-07-31 o 15 03 27" src="https://github.com/user-attachments/assets/334ada0d-8e21-4124-9050-9f1228eb070b" />
<img width="1707" height="895" alt="Zrzut ekranu 2025-07-31 o 15 05 30" src="https://github.com/user-attachments/assets/94b6e9b5-5677-48f4-953a-097ec5fb9a65" />
<img width="1728" height="998" alt="Zrzut ekranu 2025-07-31 o 15 05 50" src="https://github.com/user-attachments/assets/3fc90a34-af81-4ba5-a4fc-3d2d3155fa1d" />
<img width="1722" height="991" alt="Zrzut ekranu 2025-07-31 o 15 06 11" src="https://github.com/user-attachments/assets/1ddaf547-455a-40e8-b1c5-e32a780e19c1" />
<img width="1703" height="899" alt="Zrzut ekranu 2025-08-4 o 19 05 26" src="https://github.com/user-attachments/assets/c49b019b-00ca-4bb6-9c3a-bf0ef2d300cf" />
<img width="1705" height="898" alt="Zrzut ekranu 2025-08-4 o 19 06 23" src="https://github.com/user-attachments/assets/e86fc517-5f48-42f3-9366-3d5dcd451f8d" />



---

## :handshake: Kontakt

Jeśli masz pytania lub sugestie dotyczące projektu, skontaktuj się z nami przez Issues na GitHubie.

## :page_facing_up: Licencja

Ten projekt jest objęty licencją zawartą w pliku [`LICENSE`](LICENSE).
