# Wymagania wspólne projektu semestralnego 

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Studia:** I stopnia, semestr 7  
**Forma:** indywidualny projekt zaliczeniowy  

## 1. Cel i zakres

Celem jest samodzielne zaprojektowanie, zaimplementowanie, przetestowanie i zaprezentowanie **mobilnej aplikacji CRUD**. Projekt ma wykazać umiejętność doboru technologii, świadomego projektowania architektury, implementacji logiki biznesowej, stosowania Git i podstaw automatyzacji jakości.

Każdy student otrzymuje **jedną indywidualną kartę biznesową** `MOB-001`–`MOB-050`. Karta definiuje domenę, encje, wymagania funkcjonalne, reguły biznesowe i kryteria akceptacji. **Niniejszy dokument jest wspólny dla wszystkich projektów.** W razie różnic dotyczących zachowania biznesowego szczegółowa karta określa zachowanie aplikacji; wymagania techniczne i zasady zaliczenia określa niniejszy dokument. Wątpliwości należy uzgodnić z prowadzącym i odnotować w dokumentacji.

**Zakres obowiązkowy:** aplikacja dla jednego użytkownika, działająca lokalnie, bez obowiązku tworzenia backendu, logowania, synchronizacji, płatności i publikacji w sklepie. Rozszerzenia nie mogą zastąpić wymagań obowiązkowych.

## 2. Wymagania technologiczne

| ID | Wymaganie | Sposób weryfikacji |
|---|---|---|
| TECH-01 | Wybrać **jedną** technologię: React Native, Flutter lub NativeScript. | Kod źródłowy, konfiguracja, uruchomienie. |
| TECH-02 | Uruchomić aplikację na Androidzie **lub** iOS, na emulatorze/symulatorze albo fizycznym urządzeniu. | Demonstracja na obronie. |
| TECH-03 | Korzystać z języka i ekosystemu właściwego dla wybranego frameworka; dopuszczalne są biblioteki pomocnicze. | Pliki projektu i zależności. |
| TECH-04 | Zapewnić trwałe **lokalne** przechowywanie danych biznesowych. | Ponowne uruchomienie aplikacji bez utraty zapisanych rekordów. |
| TECH-05 | Udokumentować wersje narzędzi, instalację, uruchomienie i sposób odtworzenia środowiska. | `README.md`. |

Rozwiązanie oparte wyłącznie na stronie internetowej lub PWA **nie spełnia** TECH-01. Dopuszczalny jest framework wspierający wybraną technologię (np. narzędzia ułatwiające rozwój React Native), o ile aplikacja pozostaje rzeczywistą aplikacją mobilną.

## 3. Wymagania funkcjonalne wspólne

| ID | Wymaganie | Kryterium minimalne |
|---|---|---|
| FUNC-01 | Pełny CRUD głównej encji wskazanej w karcie biznesowej. | Dodawanie, lista/szczegóły, edycja i usuwanie działają w UI. |
| FUNC-02 | Obsługa powiązanej encji. | Minimum tworzenie, odczyt i edycja encji nadrzędnej; polityka usuwania zdefiniowana i bez utraty spójności. |
| FUNC-03 | Model danych i relacja. | Co najmniej dwie encje biznesowe z relacją zgodną z kartą. |
| FUNC-04 | Nawigacja. | Minimum trzy logiczne widoki: lista, szczegóły, formularz; formularz dodawania i edycji może być wspólny. |
| FUNC-05 | Walidacja. | Pola wymagane, typy/zakresy i co najmniej jedna domenowa reguła biznesowa; błędne dane nie są zapisywane. |
| FUNC-06 | Wyszukiwanie, filtrowanie, sortowanie. | Co najmniej jeden działający wariant każdej operacji, zgodny z domeną. |
| FUNC-07 | Stany interfejsu. | Pusta lista, sukces, błąd i komunikaty walidacji; potwierdzenie operacji destrukcyjnej. |
| FUNC-08 | Trwałość. | Zmiany utrzymują się po zamknięciu i ponownym uruchomieniu aplikacji. |
| FUNC-09 | Reguły i obliczenia biznesowe. | Implementacja wszystkich obowiązkowych reguł karty, w tym jej obliczeń lub pochodnych wartości. |
| FUNC-10 | Integralność danych. | Nie powstają osierocone rekordy; relacje i usuwanie są obsługiwane spójnie. |

**Nie wystarcza** wyświetlanie danych demonstracyjnych ani CRUD oparty wyłącznie na pamięci operacyjnej.

## 4. Architektura i implementacja

| ID | Wymaganie |
|---|---|
| ARCH-01 | Rozdzielić warstwę prezentacji od logiki biznesowej i operacji dostępu do danych. |
| ARCH-02 | Zastosować odpowiedni do frameworka mechanizm zarządzania stanem; wyjaśnić przepływ danych i aktualizację widoków. |
| ARCH-03 | Wydzielić interfejs/moduł dostępu do danych tak, by logika biznesowa nie zależała bezpośrednio od komponentów UI. |
| ARCH-04 | Stosować komponenty wielokrotnego użytku tam, gdzie ograniczają duplikację i poprawiają spójność. |
| ARCH-05 | Obsługiwać błędy odczytu/zapisu i błędy walidacji w przewidywalny sposób. |
| ARCH-06 | Udokumentować strukturę projektu, encje, relacje i przepływ danych w `docs/architecture.md`. |
| ARCH-07 | Uzasadnić wybór frameworka, modelu stanu i przechowywania danych oraz opisać co najmniej jedno ograniczenie decyzji. |

Nie jest narzucony konkretny wzorzec (MVC/MVVM/Clean Architecture), biblioteka stanu ani silnik bazy danych. Wybór ma być proporcjonalny do złożoności aplikacji. **Nie należy sztucznie rozbudowywać architektury.**

## 5. Interfejs, UX i dostępność

| ID | Wymaganie |
|---|---|
| UX-01 | Spójna nawigacja, typografia, odstępy i etykiety pól. |
| UX-02 | Czytelny interfejs na dwóch rozmiarach ekranów mobilnych; bez uciętych kontrolek i poziomego przewijania podstawowych formularzy. |
| UX-03 | Widoczne informacje zwrotne po zapisie, usunięciu i błędzie; komunikaty zrozumiałe dla użytkownika. |
| UX-04 | Podstawowa dostępność: etykiety elementów interaktywnych, kontrast, czytelny tekst i wystarczająco duże obszary dotykowe. |
| UX-05 | Udokumentować i przetestować przynajmniej jeden scenariusz pustego stanu i jeden błędu. |

## 6. Kontrola wersji i metodyka pracy

| ID | Wymaganie | Dowód |
|---|---|---|
| GIT-01 | Indywidualne repozytorium Git z kodem i dokumentacją. | Dostęp prowadzącego do repozytorium. |
| GIT-02 | Systematyczne, opisowe commity w kolejnych etapach semestru. | Historia repozytorium. |
| GIT-03 | Co najmniej dwie krótkotrwałe gałęzie funkcjonalne scalone do gałęzi głównej. | Historia gałęzi i merge. |
| GIT-04 | Co najmniej dwa Pull Requesty z opisem celu i sposobu weryfikacji. | Zamknięte/scalone PR. |
| GIT-05 | Lista zadań w Issues lub analogicznym narzędziu z aktualizowanym statusem. | Tablica/lista zadań. |
| GIT-06 | Poprawny `.gitignore`; bez haseł, tokenów, kluczy i zbędnych plików generowanych. | Przegląd repozytorium. |

Repozytorium może być prywatne, jeśli prowadzący otrzyma dostęp. **Liczba commitów nie jest samodzielnym miernikiem jakości ani autorstwa.**

## 7. Testowanie i weryfikacja

| ID | Wymaganie |
|---|---|
| TEST-01 | Minimum **5 automatycznych przypadków testowych** sprawdzających rzeczywistą logikę aplikacji, w tym walidację poprawnych i błędnych danych oraz operacje tworzenia, aktualizacji i usuwania (dopuszczalne jest łączenie asercji w uzasadnione scenariusze). |
| TEST-02 | Co najmniej jedna **reguła biznesowa specyficzna dla karty** ma test przypadku pozytywnego i negatywnego. Może to wymagać więcej niż pięciu testów łącznie. |
| TEST-03 | Testy powinny być deterministyczne, uruchamiane lokalnie poleceniem opisanym w README, bez zależności od prawdziwych danych użytkowników. |
| TEST-04 | W `docs/testing.md` opisać scenariusze manualne CRUD, walidacji, wyszukiwania/filtrowania, trwałości danych i obsługi błędu; zapisać oczekiwane i uzyskane wyniki. |
| TEST-05 | Na obronie zaprezentować uruchomienie testów i wyjaśnić, co sprawdzają. |

Testy nie muszą obejmować całego interfejsu ani urządzenia E2E. Same testy renderowania pustych komponentów nie wystarczają.

## 8. Continuous Integration

| ID | Wymaganie |
|---|---|
| CI-01 | Pipeline uruchamiany automatycznie przynajmniej dla Pull Requestów do gałęzi głównej. |
| CI-02 | Pipeline instaluje zależności, wykonuje dostępne dla stosu sprawdzenie statyczne/formatowania oraz uruchamia testy automatyczne. |
| CI-03 | Błąd testów lub sprawdzenia jakości powoduje niepowodzenie odpowiedniego zadania CI. |
| CI-04 | Plik konfiguracyjny pipeline znajduje się w repozytorium; README wskazuje, jak sprawdzić wynik. |

**Nie jest wymagane:** podpisywanie aplikacji, automatyczne tworzenie pakietów APK/IPA, dystrybucja, publikacja w sklepach lub CD. Dla platform zależnych od macOS/iOS można wykonać CI logiki, analizy statycznej i testów na dostępnym runnerze bez budowania iOS.

## 9. Bezpieczeństwo, prywatność i etyka

| ID | Wymaganie |
|---|---|
| SEC-01 | Nie przechowywać w repozytorium sekretów ani rzeczywistych danych wrażliwych. |
| SEC-02 | Stosować minimalizację zbieranych danych i prosić o uprawnienia urządzenia tylko wtedy, gdy są potrzebne. |
| SEC-03 | W `docs/security.md` wskazać przetwarzane dane, co najmniej dwa zagrożenia, zastosowane zabezpieczenia i jedno ograniczenie rozwiązania. |
| SEC-04 | Opisać jeden aspekt etyczny lub dostępnościowy związany z aplikacją i sposób jego uwzględnienia. |

W projektach demonstracyjnych należy używać fikcyjnych danych. Zaawansowane mechanizmy kryptograficzne nie są obowiązkowe.

## 10. Dokumentacja i sprawozdania

Minimalna struktura (ścieżki mogą być dostosowane do konwencji frameworka, przy zachowaniu zawartości):

```text
repozytorium/
├── README.md
├── .gitignore
├── docs/
│   ├── requirements.md          # odniesienie do indywidualnej karty i zakresu
│   ├── architecture.md
│   ├── technology-decision.md
│   ├── testing.md
│   └── security.md
├── reports/
│   ├── lab-01.md
│   ├── lab-02.md
│   ├── lab-03.md
│   └── lab-04.md
├── [kod aplikacji zgodny z frameworkiem]
└── [konfiguracja CI i testy]
```

**DOC-01:** `README.md`: cel, technologia i wersje, instalacja, uruchomienie, testy, link do karty biznesowej, lista zrealizowanych funkcji i znanych ograniczeń.  
**DOC-02:** `docs/technology-decision.md`: porównanie React Native/Flutter/NativeScript, wybór i kompromisy.  
**DOC-03:** `docs/architecture.md`: diagram, model danych, relacje, struktura, przepływ danych i zarządzanie stanem.  
**DOC-04:** `docs/testing.md` i `docs/security.md`: zgodnie z sekcjami 7 i 9.  
**DOC-05:** Cztery sprawozdania Markdown, po jednym dla każdego laboratorium, zawierające: cel, zadania, dowody wykonania (np. odnośniki do commitów/PR, wyniki testów, zrzuty ekranów), problemy, decyzje i własne wnioski.  
**DOC-06:** Dokumentacja powinna być aktualizowana wraz z kodem, nie dopiero przed obroną.

Sprawozdania ocenia się za **konkretne rezultaty i analizę własnej pracy**, a nie za objętość lub przepisywanie teorii.

## 11. Harmonogram i kamienie milowe

| Spotkanie | Obszar sylabusa | Rezultat projektu i sprawozdanie |
|---|---|---|
| **Lab 1** | Frameworki i narzędzia (tematy 1+2) | Analiza trzech frameworków, decyzja technologiczna, środowisko, repozytorium, uruchomiony szkielet; `reports/lab-01.md`. |
| **Lab 2** | Natywne/hybrydowe/wieloplatformowe/PWA (temat 3) | Porównanie podejść, architektura, model danych, nawigacja, warstwa danych; `reports/lab-02.md`. |
| **Lab 3** | Ewolucja technologii (temat 4) | Analiza wybranego problemu w ujęciu historycznym, pełny CRUD, walidacja, stan, trwałość; `reports/lab-03.md`. |
| **Lab 4** | Współczesne praktyki, etyka (tematy 5+6) | Testy, CI, przegląd jakości, analiza prywatności, finalizacja; `reports/lab-04.md`. |
| **Lab 5** | Podsumowanie | Prezentacja i obrona aplikacji oraz egzamin z wiedzy przedmiotowej. |

Prace programistyczne i sprawozdania są realizowane także **między spotkaniami**. Terminy oddania określa prowadzący. Indywidualne rozszerzenie biznesowe, jeśli zostanie przydzielone, otrzyma osobny termin i kryteria; nie jest częścią bazowej specyfikacji.

## 12. Kryteria odbioru projektu

Projekt uznaje się za gotowy do obrony, jeśli:

1. Aplikacja uruchamia się na platformach mobilnych.
2. Działa pełny CRUD głównej encji oraz wymagane operacje na encji powiązanej.
3. Dane są trwałe i zachowana jest integralność relacji.
4. Spełnione są reguły biznesowe i scenariusze akceptacji indywidualnej karty.
5. Działają wyszukiwanie, filtrowanie, sortowanie, walidacja i obsługa podstawowych stanów UI.
6. Repozytorium zawiera wymagane artefakty, testy i działający pipeline CI.
7. Student potrafi wyjaśnić kod, architekturę, wybory technologiczne i wyniki testów.

Na obronie prowadzący może poprosić o **modyfikację** istniejącej funkcji (np. dodatkowa walidacja, zmiana sortowania) i uzasadnienie sposobu jej wdrożenia. Nie jest wymagane publikowanie aplikacji w sklepie.

## 13. Zasady oceniania

| Składnik | Punkty |
|---|---:|
| Lab 1 – obecność, zadania i sprawozdanie | 10 |
| Lab 2 – obecność, zadania i sprawozdanie | 10 |
| Lab 3 – obecność, zadania i sprawozdanie | 10 |
| Lab 4 – obecność, zadania i sprawozdanie | 10 |
| Projekt – funkcjonalność i reguły biznesowe | 15 |
| Projekt – architektura, UX i jakość kodu | 10 |
| Projekt – testy i CI | 5 |
| Prezentacja i obrona | 5 |
| Egzamin końcowy | 25 |
| **Razem** | **100** |

**Proponowane warunki konieczne:** demonstracja działającego podstawowego CRUD oraz uzyskanie co najmniej 50% punktów z egzaminu.

## 14. Zasady użycia narzędzi AI

Można korzystać z AI jako wsparcia przy nauce, analizie błędów i dokumentacji. Student pozostaje **odpowiedzialny** za kod i dokumentację, musi rozumieć zastosowane rozwiązania oraz umieć je samodzielnie wyjaśnić i zmodyfikować. W `README` lub `docs/ai-usage.md` należy krótko zadeklarować, czy i do czego wykorzystano narzędzia AI. Sama deklaracja ani historia Git nie dowodzą samodzielności; służy temu również praktyczna obrona.

## 15. Poza zakresem obowiązkowym

Backend, REST API, logowanie, autoryzacja, chmura, powiadomienia push, geolokalizacja, aparat, synchronizacja, testy E2E, zaawansowane animacje, publikacja w sklepach oraz CD są **opcjonalne** i nie zastępują wymagań bazowych. Przed ich realizacją należy upewnić się, że obowiązkowe elementy projektu są kompletne.