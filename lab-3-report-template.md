# Laboratorium 3 — sprawozdanie projektowe

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Student / identyfikator:** [uzupełnij]  
**Projekt biznesowy:** MOB-[XXX] — [nazwa]  
**Framework:** [React Native / Flutter / NativeScript]  
**Data zajęć:** [RRRR-MM-DD]  
**Repozytorium:** [odnośnik]  
**Commit / tag odpowiadający oddaniu:** [hash / tag]

> Wypełnij na podstawie własnych działań. Odpowiedzi powinny zawierać dowody (pliki, commity, PR, wyniki uruchomienia), nie same deklaracje.

## Zasady opracowania

1. Odpowiedz samodzielnie, korzystając z materiałów udostępnionych na Moodle oraz dodatkowych źródeł technicznych (np. oficjalnej dokumentacji).
2. Nie ograniczaj odpowiedzi do definicji. Wyjaśniaj własnymi słowami, uzasadniaj wnioski i podawaj przykłady.
3. W zadaniach odnoszących się do projektu użyj **własnego, przydzielonego tematu aplikacji**.
4. Podaj źródła wykorzystane do opracowania odpowiedzi. Sam link bez wskazania, do czego został wykorzystany, nie wystarcza.

## T1. Analiza zmian w architekturze interfejsu

1. Wybierz jeden problem z własnej aplikacji (np. odświeżenie listy po zapisie, aktualizacja szczegółów, synchronizacja formularza).
2. Opisz, jak ten problem można byłoby rozwiązać przez ręczną manipulację widokiem, a jak jest rozwiązany w wybranym frameworku.
3. Wskaż **konkretny plik i funkcję/komponent** oraz uzasadnij korzyści i koszty przyjętego podejścia.

**Odpowiedź:** [uzupełnij]

**Dowód w repozytorium:** [ścieżka/commit]

## T2. Implementacja Create i Read oraz przepływ danych

> Operacje C/R powstały w laboratorium 2, zweryfikuj je i wskaż ich aktualną implementację; nie przepisuj rozwiązania tylko na potrzeby sprawozdania.

- Encja główna: **[uzupełnij]**
- Model danych i identyfikator rekordu: **[uzupełnij]**
- Ścieżka operacji Create (ekran → walidacja → logika → zapis): **[uzupełnij]**
- Ścieżka operacji Read (źródło → lista → szczegóły): **[uzupełnij]**
- Jak odróżniasz pustą listę od błędu odczytu? **[uzupełnij]**

**Dowody:** [ścieżki/commity/zrzuty ekranu jako względne linki]

## T3. Implementacja Update i Delete

1. Opisz sposób identyfikacji edytowanego rekordu i zabezpieczenie przed przypadkowym utworzeniem duplikatu.
2. Opisz, co dzieje się po zatwierdzeniu edycji i jak aktualizowane są lista oraz szczegóły.
3. Opisz sposób usuwania rekordu, ewentualne potwierdzenie i wpływ na encję powiązaną.
4. Wyjaśnij, dlaczego wybrana polityka usuwania jest właściwa dla domeny projektu.

**Odpowiedź:** [uzupełnij]

**Dowody:** [ścieżki/commity]

## T4. Walidacja i reguła biznesowa

Wybierz **co najmniej trzy** przypadki walidacji, w tym **minimum jedną regułę biznesową z indywidualnej specyfikacji**.

| Pole / operacja | Warunek poprawności | Zachowanie przy błędzie | Lokalizacja implementacji |
| --------------- | ------------------- | ----------------------- | ------------------------- |
| [uzupełnij]     | [uzupełnij]         | [uzupełnij]             | [uzupełnij]               |
| [uzupełnij]     | [uzupełnij]         | [uzupełnij]             | [uzupełnij]               |
| [uzupełnij]     | [uzupełnij]         | [uzupełnij]             | [uzupełnij]               |

**Dlaczego sama blokada przycisku w UI nie wystarcza?** [uzupełnij]

## T5. Stan aplikacji, trwałość i obsługa błędów

- Wskaż przykład stanu tymczasowego i stanu trwałego: **[uzupełnij]**
- Jak dane są odczytywane po ponownym uruchomieniu aplikacji? **[uzupełnij]**
- Jak obsługujesz stany: pusto, ładowanie (jeśli operacja asynchroniczna), błąd, sukces? **[uzupełnij]**
- Co stanie się, gdy zapis do magazynu danych się nie powiedzie? **[uzupełnij]**

**Dowody:** [ścieżki/commity]

## T6. Weryfikacja manualna i refleksja

Przeprowadź testy **na uruchomionej aplikacji**; w tabeli wpisz rzeczywisty wynik.

| ID  | Scenariusz i dane testowe              | Oczekiwany rezultat | Faktyczny rezultat | PASS/FAIL | Dowód |
| --- | -------------------------------------- | ------------------- | ------------------ | --------- | ----- |
| M1  | Dodanie poprawnego rekordu             | [uzupełnij]         | [uzupełnij]        | [ ]       | [ ]   |
| M2  | Próba dodania niepoprawnego rekordu    | [uzupełnij]         | [uzupełnij]        | [ ]       | [ ]   |
| M3  | Edycja istniejącego rekordu            | [uzupełnij]         | [uzupełnij]        | [ ]       | [ ]   |
| M4  | Usunięcie rekordu                      | [uzupełnij]         | [uzupełnij]        | [ ]       | [ ]   |
| M5  | Restart aplikacji i odczyt danych      | [uzupełnij]         | [uzupełnij]        | [ ]       | [ ]   |
| M6  | Przypadek naruszenia reguły biznesowej | [uzupełnij]         | [uzupełnij]        | [ ]       | [ ]   |

**Najtrudniejszy problem i sposób jego rozwiązania (3–6 zdań):** [uzupełnij]

## Podsumowanie i samoocena

- Zaimplementowane funkcjonalności: **[uzupełnij]**
- Znane ograniczenia / błędy: **[uzupełnij]**
- Co pozostaje do laboratorium 4: **[uzupełnij]**

### Kryteria zaliczenia

- Pełny CRUD głównej encji i zapis trwały; aplikacja uruchamia się i działa.
- Co najmniej jedna reguła biznesowa zgodna z przydzieloną specyfikacją.
- Obsługa błędów i czytelne stany interfejsu.
- Uzupełnione odpowiedzi oraz dowody możliwe do zweryfikowania w repozytorium.
- Wyniki testów odzwierciedlają rzeczywiste działanie; wykryte błędy nie są ukrywane.

## Użycie narzędzi AI (jeżeli dotyczy)

**Narzędzie i zakres wsparcia:** [np. wyjaśnienie błędu konfiguracji / propozycja porównania]  
**Jak zweryfikowano wynik:** [dokumentacja, uruchomienie, test]  
**Elementy wykonane samodzielnie:** [opis]

**Warunki formalne:** sprawozdanie w Markdown, czytelne odnośniki do działającego kodu i diagramów, zrzuty ekranu renderujące się w repozytorium, identyfikacja autora i projektu. Oceniana jest zarówno implementacja, jak i zdolność wyjaśnienia własnych decyzji. Brak dowodów wykonania może ograniczyć liczbę punktów.