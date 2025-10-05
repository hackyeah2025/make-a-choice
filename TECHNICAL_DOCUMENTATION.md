# Make a Choice - Dokumentacja Techniczna

## Przegląd Projektu

**Make a Choice** to gra symulacyjna życia zbudowana w React i TypeScript, w której gracze podejmują decyzje wpływające na statystyki ich wirtualnego życia poprzez losowo generowane scenariusze. Gra symuluje kompletny cykl życia od 15 do 65 roku życia, z wydarzeniami generowanymi przez AI i rezultatami opartymi na wyborach gracza.

## Główne Funkcjonalności

### 1. Silnik Symulacji Życia
- **Progresja Wieku**: Gracz starzeje się od 15 do 65 lat
- **Wielowymiarowy System Statystyk**: Cztery główne statystyki (zdrowie, relacje, szczęście, pieniądze) plus szczegółowe metryki życiowe
- **Dynamiczny System Awatarów**: Wizualna reprezentacja zmienia się w zależności od etapu życia (dzieci/dorośli/seniorzy)
- **Warunki Końca Gry**: Gra kończy się gdy jakakolwiek główna statystyka osiągnie 0 lub gracz osiągnie wiek emerytalny

### 2. System Generowania Wydarzeń
- **Wydarzenia Główne**: Predefiniowane ważne wydarzenia życiowe (edukacja, praca, rodzina) przechowywane w JSON
- **Wydarzenia Losowe**: Scenariusze generowane przez AI dla codziennych sytuacji życiowych
- **Ważona Selekcja Wydarzeń**: Wydarzenia są wybierane na podstawie aktualnej sytuacji życiowej gracza i wieku
- **System Konsekwencji**: Każdy wybór wpływa na wiele statystyk z natychmiastowym feedbackiem

### 3. Integracja AI
- **Generowanie Wydarzeń**: Zewnętrzne API generuje kontekstowe scenariusze oparte na statystykach gracza
- **Dynamiczna Zawartość**: Wydarzenia dostosowują się do wykształcenia, pracy, statusu rodzinnego i wieku gracza
- **Podsumowanie Gry**: Generowane przez AI podsumowanie życia po zakończeniu gry

### 4. Interfejs Użytkownika
- **Wybór Trybu**: Szybki start lub niestandardowe tworzenie postaci
- **Tworzenie Postaci**: Kompleksowy formularz do ustawiania początkowych statystyk i preferencji
- **Rozgrywka Oparta na Kartach**: Wydarzenia prezentowane jako interaktywne karty z opcjami wielokrotnego wyboru
- **Śledzenie Postępu**: Wizualne wskaźniki progresji wieku i zmian statystyk
- **Panel Statystyk**: Rozwijany nagłówek pokazujący aktualne statystyki i postęp

### 5. Trwałość Danych
- **Pamięć Lokalna**: Stan gry utrzymuje się między sesjami
- **Śledzenie Historii**: Kompletny zapis wszystkich decyzji i ich konsekwencji
- **Zapis/Wznowienie**: Automatyczne zapisywanie i przywracanie stanu gry

## Architektura Techniczna

### Stos Frontend
- **React 19.2.0**: Główny framework z hooks i context
- **TypeScript 4.9.5**: Bezpieczny typowo rozwój
- **Moduły CSS**: Stylowanie o zasięgu komponentów
- **Recharts 3.2.1**: Wizualizacja danych dla statystyk

### Struktura Projektu

```
src/
├── components/          # Komponenty UI wielokrotnego użytku
├── hooks/              # Niestandardowe hooki React do zarządzania stanem
├── screens/            # Główne ekrany aplikacji
├── services/           # Komunikacja z zewnętrznym API i logika gry
├── Storage/            # Zarządzanie pamięcią lokalną
└── types/              # Definicje typów TypeScript
```

### Kluczowe Komponenty

#### Zarządzanie Stanem (`hooks/`)
- **useStats**: Zarządza statystykami gracza i danymi postaci
- **useHistory**: Śledzi historię decyzji i progresję gry
- **useCards**: Obsługuje kolejkę wydarzeń i generowanie kart

#### Logika Gry (`services/`)
- **GameAlgorithm**: Główna mechanika gry i logika wyboru wydarzeń
- **ApiService**: Komunikacja z zewnętrznym API dla zawartości generowanej przez AI
- **core_events.json**: Baza danych predefiniowanych ważnych wydarzeń życiowych

#### Typy Danych (`types/`)
- **Stats**: Kompletny model postaci gracza (19 różnych atrybutów)
- **Event**: Struktura scenariusza gry z opcjami i konsekwencjami
- **History**: Śledzenie decyzji i historia stanu gry

### Modele Danych

#### Statystyki Gracza
```typescript
interface Stats {
    // Podstawowe Informacje
    name: string
    age: number
    
    // Główne Statystyki (0-100)
    health: number
    relations: number
    happiness: number
    money: number
    
    // Finanse
    income: number
    expenses: number
    savings: number
    ZUS: number
    
    // Kariera i Edukacja
    education: "primary_school" | "job_school" | "high_school" | "university"
    job_experience: number
    job: "unemployed" | "low_paid_job" | "middle_paid_job" | "high_paid_job"
    job_name: string
    
    // Życie Osobiste
    relationship: "single" | "in_a_relationship" | "married" | "divorced"
    children: number
    has_serious_health_issues: boolean
    
    // System Awatarów
    avatar_life_stage: "children" | "adults" | "seniors"
    avatar_sex: "male" | "female"
    avatar_variant: number
}
```

#### System Wydarzeń
```typescript
interface Event {
    title: string
    text: string
    options: Option[]
    extraField: string
    eventType?: string
}

interface Option {
    text: string
    consequences: {
        impacted: keyof Stats
        value: number | string
    }[]
}
```

## Mechanika Gry

### Algorytm Generowania Wydarzeń
1. **Wyzwalacze Oparte na Wieku**: Specyficzne wydarzenia w kluczowych latach (15, 18, 21)
2. **Ważona Selekcja**: Wydarzenia wybierane na podstawie aktualnej sytuacji życiowej
3. **Główne vs Losowe**: Ważne wydarzenia życiowe (edukacja, kariera, rodzina) vs codzienne scenariusze
4. **Adaptacja Oparta na Statystykach**: Prawdopodobieństwo wydarzeń zmienia się w zależności od statystyk gracza

### Logika Obliczania Wag
- **Wydarzenia Edukacyjne**: Wyższa waga w młodszym wieku i przy niższym poziomie wykształcenia
- **Wydarzenia Zawodowe**: Zwiększona waga gdy bezrobotny lub niskie doświadczenie
- **Wydarzenia Rodzinne**: Scenariusze rodzinne odpowiednie do wieku (małżeństwo, dzieci)
- **Wydarzenia Losowe**: Wypełniają luki między ważnymi wydarzeniami życiowymi (co 3 lata)

### System Konsekwencji
- **Wpływ na Wiele Statystyk**: Pojedyncze wybory wpływają na wiele statystyk jednocześnie
- **Ograniczone Wartości**: Główne statystyki (zdrowie, relacje, szczęście, pieniądze) ograniczone do 0-100
- **Progresywna Trudność**: Wydarzenia późniejszego życia mają wyższe stawki i konsekwencje
- **Efekty Kaskadowe**: Niektóre konsekwencje wyzwalają automatyczne aktualizacje statystyk (np. wiek wpływa na awatar)

## Zewnętrzne Zależności

### Integracja API
- **Usługa Backend**: Lokalny serwer na `http://localhost:8000`
- **Generowanie Wydarzeń**: Endpoint `/generate-event` dla losowych scenariuszy
- **Wydarzenia Główne**: `/generate-core-event` dla ważnych wydarzeń życiowych
- **Generowanie Podsumowania**: `/generate-summary` dla analizy zakończenia gry

### Zarządzanie Zasobami
- **System Awatarów**: 63 obrazy postaci w różnych etapach życia i płci
- **Zasoby UI**: Obrazy tła, ikony i elementy wizualne
- **Zasoby Publiczne**: Favicon, manifest i konfiguracja PWA

## Względy Wydajnościowe

### Zarządzanie Stanem
- **Dostawcy Kontekstu**: Efektywne udostępnianie stanu między komponentami
- **Pamięć Lokalna**: Trwałe dane z automatyczną serializacją
- **Kolejka Kart**: Zoptymalizowane ładowanie wydarzeń z konfigurowalnym rozmiarem kolejki

### Zarządzanie Pamięcią
- **Buforowanie Wydarzeń**: Wstępnie załadowane wydarzenia zmniejszające wywołania API
- **Optymalizacja Obrazów**: Efektywne ładowanie i przełączanie awatarów
- **Cykl Życia Komponentów**: Właściwe czyszczenie i zarządzanie pamięcią

## Rozwój i Wdrożenie

### Konfiguracja Budowania
- **Create React App**: Standardowy pipeline budowania React
- **Konfiguracja TypeScript**: Włączone ścisłe sprawdzanie typów
- **Serwer Deweloperski**: Hot reload i raportowanie błędów
- **Budowanie Produkcyjne**: Zoptymalizowany bundle z podziałem kodu

### Konfiguracja Testów
- **Testing Library**: Testowanie komponentów i integracyjne
- **Jest**: Framework testów jednostkowych
- **Bezpieczeństwo Typów**: Zapobieganie błędom w czasie kompilacji

### Skrypty
```json
{
  "start": "react-scripts start",
  "build": "react-scripts build", 
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Możliwości Przyszłych Ulepszeń

### Funkcjonalności Rozgrywki
- **Wiele Poziomów Trudności**: Regulowana dotkliwość konsekwencji
- **System Osiągnięć**: Warunki odblokowania dla różnych ścieżek życia
- **Wartość Powtarzalności**: Różne warunki startowe i scenariusze
- **Funkcje Społecznościowe**: Tabele wyników i porównywanie życia

### Ulepszenia Techniczne
- **Progresywna Aplikacja Webowa**: Możliwość pracy offline i optymalizacja mobilna
- **Analityka Danych**: Śledzenie zachowań graczy i balansowanie
- **Lokalizacja**: Wsparcie wielu języków
- **Optymalizacja Wydajności**: Podział kodu i lazy loading

### Rozszerzenie Zawartości
- **Więcej Ścieżek Życia**: Specjalizacje zawodowe i unikalne historie
- **Wydarzenia Historyczne**: Scenariusze specyficzne dla okresu historycznego
- **Wariacje Kulturowe**: Symulacja życia specyficzna dla regionu
- **Rozszerzona Oś Czasu**: Rozgrywka po przejściu na emeryturę

## Bezpieczeństwo i Prywatność

### Obsługa Danych
- **Tylko Pamięć Lokalna**: Żadne dane osobowe nie są przesyłane na serwery
- **Anonimowa Analityka**: Brak zbierania informacji umożliwiających identyfikację osoby
- **Przetwarzanie Po Stronie Klienta**: Logika gry wykonywana lokalnie

### Bezpieczeństwo API
- **Rozwój na Localhost**: Bezpieczne środowisko deweloperskie
- **Filtrowanie Zawartości**: Generowanie odpowiedniej zawartości
- **Obsługa Błędów**: Graceful degradation przy awariach API

## Podsumowanie

Make a Choice reprezentuje wyrafinowaną grę symulacyjną życia, która łączy tradycyjne mechaniki gry z nowoczesnym generowaniem treści opartym na AI. Modularna architektura pozwala na łatwe rozszerzanie i modyfikację, podczas gdy kompleksowy system statystyk zapewnia głębię i powtarzalność. Projekt demonstruje efektywne wykorzystanie narzędzi ekosystemu React i nowoczesnych praktyk rozwoju web.
