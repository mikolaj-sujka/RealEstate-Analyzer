# Security Policy

## Wspierane wersje
Wspierana jest zawsze gałąź `main` oraz ostatnie wydanie `release/*`. Starsze wydania mogą nie otrzymywać poprawek bezpieczeństwa.

## Jak zgłosić lukę
**Nie zakładaj publicznego issue.**  
Użyj przycisku **“Report a vulnerability”** w zakładce **Security** repozytorium, aby przesłać zgłoszenie prywatnie bez ujawniania szczegółów publicznie. Jeśli ta opcja nie jest dostępna, napisz na: **security@twojadomena.pl**. Prosimy o dołączenie kroków reprodukcji, zakresu oddziaływania i sugestii obejścia. (Preferujemy odpowiedzialną, skoordynowaną publikację informacji). :contentReference[oaicite:1]{index=1}

## SLA i komunikacja
- **Potwierdzenie**: do 3 dni roboczych.  
- **Triaż**: ocenimy dotkliwość (np. CVSS), potwierdzimy zakres i zaproponujemy obejście.  
- **Publikacja**: po wydaniu poprawki i upłynięciu rozsądnego „grace period” opublikujemy notkę bezpieczeństwa (Security Advisory). 

## Zakres
- Backend (.NET API), joby w tle (Hangfire), integracje HTTP.  
- Frontend (Next.js).  
- Artefakty CI/CD i konfiguracja deploymentu.  
- Skrypty/Notebooki researchowe (o ile wpływają na produkcyjne dane/sekrety).

## Poświadczenia i sekrety
- **Sekrety nie trafiają do repo ani do `.env` w VCS.**  
- W chmurze używamy **Azure Key Vault** z dostępem przez **Managed Identity**; w kodzie wyłącznie referencje/SDK. Rozważ Microsoft Entra dla uwierzytelniania do Azure Cache for Redis zamiast kluczy statycznych. :contentReference[oaicite:3]{index=3}

## Zależności i łańcuch dostaw
- Włączone **Dependabot alerts + security updates** oraz okresowe aktualizacje wersji. :contentReference[oaicite:4]{index=4}
- **Code scanning (CodeQL)** i **Secret scanning + Push Protection** są aktywne. :contentReference[oaicite:5]{index=5}

## CI/CD
- **Least privilege** dla `GITHUB_TOKEN` (`permissions` ograniczone do niezbędnych).  
- **Approval dla workflowów z forków** oraz pinowanie akcji do wersji/sha. :contentReference[oaicite:6]{index=6}

## Zasady raportów
Doceniamy PoC oraz informacje o wpływie na poufność, integralność lub dostępność. Zgłoszenia dotyczące błędów niepowiązanych z bezpieczeństwem prosimy kierować do Issues.
