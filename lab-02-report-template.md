# Sprawozdanie — Laboratorium 2

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Student / identyfikator:** [uzupełnij]  
**Projekt biznesowy:** MOB-[XXX] — [nazwa]  
**Framework:** [React Native / Flutter / NativeScript]  
**Data zajęć:** [RRRR-MM-DD]  
**Repozytorium:** [odnośnik]  
**Commit / tag odpowiadający oddaniu:** [hash / tag]

> Wypełnij na podstawie własnych działań. Odpowiedzi powinny zawierać dowody (pliki, commity, PR, wyniki uruchomienia), nie same deklaracje.

## T1. Analiza podejść do tworzenia aplikacji

**Cel:** świadomy wybór podejścia w kontekście wymagań własnego projektu.

1. Wymień trzy wymagania biznesowe/niefunkcjonalne swojego projektu, które wpływają na wybór technologii.
2. Porównaj podejście natywne, hybrydowe WebView, wieloplatformowe i PWA pod kątem tych wymagań.
3. Uzasadnij, dlaczego wybrany w laboratorium 1 framework pozostaje odpowiedni, albo opisz zmianę decyzji.

| Wymaganie z projektu | Znaczenie dla wyboru technologii | Wniosek   |
| -------------------- | -------------------------------- | --------- |
| [W1]                 | [analiza]                        | [wniosek] |
| [W2]                 | [analiza]                        | [wniosek] |
| [W3]                 | [analiza]                        | [wniosek] |

**Porównanie podejść i uzasadnienie:**

[uzupełnij]

**Wskazane źródła (dokumentacja, artykuły techniczne):**

[uzupełnij]

## T2. Projekt architektury aplikacji

**Cel:** zaprojektowanie struktury umożliwiającej dalszy rozwój i testowanie.

### T2.1. Diagram architektury

Dodaj diagram (np. Mermaid w Markdown lub obraz w `docs/diagrams/`) przedstawiający:

- ekrany i komponenty UI;
- zarządzanie stanem / logikę aplikacyjną;
- warstwę dostępu do danych;
- lokalne trwałe źródło danych;
- kierunek przepływu danych.

**Diagram / odnośnik:**

[uzupełnij]

### T2.2. Model danych

Zdefiniuj co najmniej dwie powiązane encje wynikające z indywidualnych wymagań biznesowych.

| Encja     | Pole | Typ    | Wymagane | Znaczenie |
| --------- | ---- | ------ | -------- | --------- |
| [Encja A] | [id] | [UUID] | Tak      | [opis]    |
| [Encja B] | [id] | [UUID] | Tak      | [opis]    |

**Relacja i sposób zapewnienia spójności (np. usuwanie encji nadrzędnej):**

[uzupełnij]

### T2.3. Decyzje projektowe

| Decyzja                | Wybrane rozwiązanie | Alternatywa | Uzasadnienie |
| ---------------------- | ------------------- | ----------- | ------------ |
| Zarządzanie stanem     | [ ]                 | [ ]         | [ ]          |
| Przechowywanie danych  | [ ]                 | [ ]         | [ ]          |
| Nawigacja              | [ ]                 | [ ]         | [ ]          |
| Separacja logiki od UI | [ ]                 | [ ]         | [ ]          |

**Plik `docs/architecture.md`:** [link do pliku]

## T3. Nawigacja i ekrany

**Cel:** przygotowanie struktury interfejsu aplikacji.

Zaimplementuj minimum trzy ekrany:

1. listę rekordów;
2. szczegóły wybranego rekordu;
3. formularz dodawania (może być później użyty także do edycji).

**Schemat nawigacji:**

[diagram / opis]

| Ekran     | Plik / komponent | Przejście do / z ekranu | Dowód działania |
| --------- | ---------------- | ----------------------- | --------------- |
| Lista     | [ ]              | [ ]                     | [zrzut]         |
| Szczegóły | [ ]              | [ ]                     | [zrzut]         |
| Formularz | [ ]              | [ ]                     | [zrzut]         |

**Dlaczego taki układ nawigacji jest odpowiedni dla użytkownika?**

[uzupełnij]

## T4. Operacje Create i Read

**Cel:** implementacja pierwszych operacji CRUD z trwałym przechowywaniem danych.

Zaimplementuj:

- dodanie rekordu głównej encji;
- walidację minimum dwóch pól;
- zapis rekordu w lokalnym trwałym magazynie danych;
- odczyt i wyświetlenie listy rekordów;
- otwarcie szczegółów wybranego rekordu.

**Powiązanie z wymaganiami biznesowymi (ID wymagań):** [uzupełnij]

| Operacja         | Lokalizacja kodu | Reguła walidacji / zachowanie | Wynik |
| ---------------- | ---------------- | ----------------------------- | ----- |
| Create           | [ ]              | [ ]                           | [ ]   |
| Read (lista)     | [ ]              | [ ]                           | [ ]   |
| Read (szczegóły) | [ ]              | [ ]                           | [ ]   |

**Wyjaśnij przepływ danych po naciśnięciu przycisku „Zapisz”:**

[od UI przez logikę i repozytorium do zapisu, a następnie odświeżenia widoku]

## T5. Weryfikacja działania i wnioski

Przeprowadź testy manualne i podaj rzeczywiste wyniki.

| ID    | Scenariusz                           | Oczekiwany rezultat             | Wynik (PASS/FAIL) | Dowód / uwagi |
| ----- | ------------------------------------ | ------------------------------- | ----------------- | ------------- |
| TC-01 | Dodanie poprawnego rekordu           | Rekord jest zapisany i widoczny | [ ]               | [ ]           |
| TC-02 | Próba zapisu pustego wymaganego pola | Zapis zablokowany, komunikat    | [ ]               | [ ]           |
| TC-03 | Otwarcie szczegółów rekordu          | Poprawne dane rekordu           | [ ]               | [ ]           |
| TC-04 | Ponowne uruchomienie aplikacji       | Rekord pozostaje dostępny       | [ ]               | [ ]           |
| TC-05 | Brak rekordów                        | Czytelny stan pustej listy      | [ ]               | [ ]           |

**Najważniejszy napotkany problem i sposób rozwiązania:**

[uzupełnij]

**Co wymaga dalszej pracy przed laboratorium 3?**

[uzupełnij]

**Wnioski (3–6 zdań, odnoszące się do własnej implementacji):**

[uzupełnij]

## Materiały dowodowe i historia pracy

- Issue(s): [linki]
- Pull Request(s): [linki]
- Commity związane z laboratorium: [SHA / linki]
- Diagramy: [ścieżki]
- Zrzuty ekranu: [ścieżki, np. `reports/assets/lab-02/`]
- Instrukcja uruchomienia: [link do README]


## Użycie narzędzi AI (jeżeli dotyczy)

**Narzędzie i zakres wsparcia:** [np. wyjaśnienie błędu konfiguracji / propozycja porównania]  
**Jak zweryfikowano wynik:** [dokumentacja, uruchomienie, test]  
**Elementy wykonane samodzielnie:** [opis]

**Warunki formalne:** sprawozdanie w Markdown, czytelne odnośniki do działającego kodu i diagramów, zrzuty ekranu renderujące się w repozytorium, identyfikacja autora i projektu. Oceniana jest zarówno implementacja, jak i zdolność wyjaśnienia własnych decyzji. Brak dowodów wykonania może ograniczyć liczbę punktów.