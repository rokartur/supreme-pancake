# Laboratorium 3 — sprawozdanie projektowe

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Student / identyfikator:** Artur Rok, grupa 43_Inf_FD_NW_7  
**Projekt biznesowy:** MOB-050 — MaintenanceLog  
**Framework:** React Native (Expo SDK 57)  
**Data zajęć:** 2026-11-21  
**Repozytorium:** https://github.com/rokartur/supreme-pancake  
**Commit / tag odpowiadający oddaniu:** commit z plikiem `reports/lab-03.md` (https://github.com/rokartur/supreme-pancake/commits/main)

> Wypełnione na podstawie własnych działań. Testy manualne wykonano 2026-11-21 na symulatorze iPhone 18 Pro (iOS 27) w Expo Go dla SDK 57; zrzuty ekranu są w `reports/assets/lab-03/`. Testy automatyczne: `bun test src` (11 testów, 0 błędów).

## Zasady opracowania

1. Odpowiedz samodzielnie, korzystając z materiałów udostępnionych na Moodle oraz dodatkowych źródeł technicznych (np. oficjalnej dokumentacji).
2. Nie ograniczaj odpowiedzi do definicji. Wyjaśniaj własnymi słowami, uzasadniaj wnioski i podawaj przykłady.
3. W zadaniach odnoszących się do projektu użyj **własnego, przydzielonego tematu aplikacji**.
4. Podaj źródła wykorzystane do opracowania odpowiedzi. Sam link bez wskazania, do czego został wykorzystany, nie wystarcza.

## T1. Analiza zmian w architekturze interfejsu

1. Wybierz jeden problem z własnej aplikacji (np. odświeżenie listy po zapisie, aktualizacja szczegółów, synchronizacja formularza).
2. Opisz, jak ten problem można byłoby rozwiązać przez ręczną manipulację widokiem, a jak jest rozwiązany w wybranym frameworku.
3. Wskaż **konkretny plik i funkcję/komponent** oraz uzasadnij korzyści i koszty przyjętego podejścia.

**Odpowiedź:**

**Problem:** aktualizacja trzech widoków po edycji lub usunięciu czynności serwisowej. Data czynności wpływa na wartość pokazywaną w trzech miejscach: w szczegółach czynności, na liście czynności w szczegółach urządzenia (razem z „Ostatni przegląd” i „Następny przegląd”) oraz na karcie urządzenia na liście startowej („Następny przegląd: ...”). Przykład z testu M3: zmiana daty z 2026-11-21 na 2026-11-20 musi zmienić następny przegląd z 2027-02-19 na 2027-02-18 we wszystkich miejscach naraz.

**Ręczna manipulacja widokiem (podejście imperatywne).** Po udanym `UPDATE` kod formularza musiałby:

1. znaleźć w szczegółach czynności etykiety daty, opisu i kosztu i ustawić im nowy tekst;
2. na ekranie urządzenia znaleźć wiersz o danym `id`, zmienić jego tekst, przesunąć go w liście, jeżeli zmieniła się kolejność dat, oraz przeliczyć „Ostatni przegląd” (najpóźniejsza data) i „Następny przegląd”;
3. na liście urządzeń znaleźć kartę urządzenia i zmienić datę następnego przeglądu.

Przy usuwaniu dochodzi usunięcie węzła wiersza i wstawienie tekstu „Brak czynności dla tego urządzenia.”, gdy był to ostatni wiersz. Każda operacja (dodanie, edycja, usunięcie) potrzebuje własnej wersji tych kroków, a pominięcie jednego miejsca daje ekran, który pokazuje stare dane.

**Rozwiązanie w React Native.** Ekran jest funkcją danych: `DeviceDetailsScreen` (`src/app/device/[id].tsx:12`) nie zmienia żadnego wiersza, tylko z wyniku `getDevice` i `listServiceActions` generuje opis całego ekranu, w tym `nextReviewDate(device.lastServiceDate, device.intervalDays)` liczone w trakcie renderowania. Dane dostarcza hook `useFocusData` (`src/use-focus-data.ts:5`), który przy każdym wejściu na ekran (także po powrocie z formularza) ponownie czyta je z SQLite. Po zapisie formularz robi tylko `router.back()` (`src/components/service-action-form.tsx:24`); React porównuje nowy opis ekranu z poprzednim i sam zmienia natywne widoki, które się różnią. Ta sama ścieżka obsługuje dodanie, edycję i usunięcie.

**Korzyści:**

- jeden kod widoku dla wszystkich operacji; nie ma kodu „po edycji zmień wiersz X”, więc nie ma miejsca, o którym można zapomnieć;
- pusty stan, data ostatniego przeglądu i data następnego przeglądu wynikają z danych, a nie z historii operacji na widoku; po usunięciu ostatniej czynności komunikat o pustej liście pojawia się sam (test M4);
- źródłem prawdy jest baza, więc widok nie może pokazywać rekordu, którego nie ma w bazie.

**Koszty:**

- każdy powrót na ekran to zapytanie do bazy i ponowne zbudowanie całej listy, nawet gdy nic się nie zmieniło; przy kilkuset rekordach będzie to zauważalne (lista jest sekcją natywnego formularza, bez recyklingu wierszy jak w `FlatList`);
- mniejsza kontrola nad tym, co dokładnie się zmienia: animacja pojedynczego usuwanego wiersza wymagałaby dodatkowej biblioteki lub kluczy i układu animacji;
- dane na ekranie mogą być nieaktualne między wejściami na ekran (np. ekran otwarty pod spodem nie wie o zmianie, dopóki nie odzyska fokusu). Dlatego operacje, w których to ma znaczenie, sprawdzają stan jeszcze raz w bazie (np. `removeDevice`, T3).

**Dowód w repozytorium:** `src/use-focus-data.ts`, `src/app/device/[id].tsx`, `src/components/service-action-form.tsx`; zrzuty [m3-edit-details.png](assets/lab-03/m3-edit-details.png) i [m3-edit-list.png](assets/lab-03/m3-edit-list.png).

## T2. Implementacja Create i Read oraz przepływ danych

> Operacje C/R powstały w laboratorium 2 (commit `b2a3a27`, PR #1). W laboratorium 3 nie zostały przepisane; formularze z `action/new.tsx` i `device/new.tsx` przeniesiono tylko do wspólnych komponentów, żeby edycja używała tego samego kodu.

- Encja główna: **czynność serwisowa (`ServiceAction`), encja podrzędna z karty MOB-050; encja nadrzędna: urządzenie (`Device`).**
- Model danych i identyfikator rekordu: **typ `ServiceAction` w `src/domain.ts:7` (`id`, `deviceId`, `date` jako tekst `RRRR-MM-DD`, `description`, `costCents` jako liczba całkowita groszy). Identyfikator to UUID v4 z `randomUUID()` (`expo-crypto`), generowany w `insertServiceAction` (`src/repository.ts:79`). Tabela `service_actions` ma `id TEXT PRIMARY KEY` i `deviceId ... REFERENCES devices(id) ON DELETE RESTRICT` (`src/repository.ts:16`).**
- Ścieżka operacji Create (ekran → walidacja → logika → zapis): **`src/app/action/new.tsx` (`deviceId` z parametru trasy) → `ServiceActionForm.submit` (`src/components/service-action-form.tsx:19`) → `addServiceAction` (`src/maintenance.ts:33`) → `parseServiceAction` (`src/domain.ts:33`: data, opis, koszt) → `insertServiceAction` (`src/repository.ts:79`, `INSERT` przez `db.runAsync`) → SQLite `maintenance-log.db`. Po sukcesie `router.back()`.**
- Ścieżka operacji Read (źródło → lista → szczegóły): **SQLite → `listDevices` (`src/repository.ts:28`, `LEFT JOIN` z `MAX(date)` jako data ostatniego przeglądu) → lista `src/app/index.tsx` → `getDevice` + `listServiceActions` (sortowanie `date DESC`) → szczegóły urządzenia `src/app/device/[id].tsx` z listą czynności → `getServiceAction` → szczegóły czynności `src/app/action/[id].tsx`.**
- Jak odróżniasz pustą listę od błędu odczytu? **`useFocusData` zwraca trzy pola: `data`, `error`, `loading`. Gdy `data === null`, `LoadState` (`src/components/ui.tsx:51`) pokazuje wskaźnik ładowania albo przy `error` tekst „Nie udało się wczytać danych. Uruchom aplikację ponownie.”. Pusta lista to `data = []` po udanym zapytaniu: ekran pokazuje wtedy „Brak urządzeń. Dodaj pierwsze urządzenie, aby planować przeglądy.” albo „Brak czynności dla tego urządzenia.”. Błąd nigdy nie jest więc pokazany jako pusta lista.**

**Dowody:** `src/app/action/new.tsx`, `src/components/service-action-form.tsx`, `src/maintenance.ts`, `src/domain.ts`, `src/repository.ts`, `src/use-focus-data.ts`; zrzuty [m1-create.png](assets/lab-03/m1-create.png), [lab-02/tc05-empty-list.png](assets/lab-02/tc05-empty-list.png).

## T3. Implementacja Update i Delete

1. Opisz sposób identyfikacji edytowanego rekordu i zabezpieczenie przed przypadkowym utworzeniem duplikatu.
2. Opisz, co dzieje się po zatwierdzeniu edycji i jak aktualizowane są lista oraz szczegóły.
3. Opisz sposób usuwania rekordu, ewentualne potwierdzenie i wpływ na encję powiązaną.
4. Wyjaśnij, dlaczego wybrana polityka usuwania jest właściwa dla domeny projektu.

**Odpowiedź:**

**1. Identyfikacja i ochrona przed duplikatem.** Przycisk „Edytuj czynność” w szczegółach przechodzi na trasę `/action/edit?id=<uuid>`. Ekran `src/app/action/edit.tsx` odczytuje `id` przez `useLocalSearchParams`, pobiera rekord `getServiceAction(id)` i dopiero wtedy montuje `ServiceActionForm` z wartościami z bazy (koszt zamieniony na tekst `"49,99"` przez `costText`, `src/domain.ts:57`). Zapis wywołuje `editServiceAction(id, form)` (`src/maintenance.ts:39`), a ta `updateServiceAction` (`src/repository.ts:92`), czyli `UPDATE service_actions ... WHERE id = ?`. Ścieżka edycji nie zawiera `INSERT`, więc nie może utworzyć nowego rekordu. Dodatkowo:

- `UPDATE` zwraca liczbę zmienionych wierszy; gdy jest `0` (rekord usunięto w międzyczasie), repozytorium rzuca błąd, a formularz pokazuje „Błąd zapisu” zamiast zamknąć się jak po sukcesie;
- przycisk „Zapisz” jest zablokowany w trakcie zapisu („Zapisywanie...”), więc podwójne tapnięcie nie wyśle dwóch operacji;
- `UPDATE` nie zmienia `deviceId`, więc edycja nie może przepiąć czynności do nieistniejącego urządzenia (BR-04).

Edycja urządzenia działa tak samo: `/device/edit?id=...`, `DeviceForm`, `editDevice` → `updateDevice` (`src/repository.ts:54`).

**2. Po zatwierdzeniu edycji.** Dane przechodzą tę samą walidację co przy dodawaniu (`parseServiceAction`, `parseDevice`), więc reguła BR-01 obowiązuje też w edycji (test M6, koszt `-1`). Po udanym `UPDATE` formularz robi `router.back()`. Szczegóły czynności odzyskują fokus, `useFocusData` czyta rekord ponownie i pokazuje nowe wartości. Po powrocie do urządzenia lista czynności, „Ostatni przegląd” (`MAX(date)`) i „Następny przegląd” są liczone od nowa. W teście M3: opis „Smarowanie przekladni” → „Smarowanie przekladni i uchwytu”, data 2026-11-21 → 2026-11-20, koszt 15,50 zł → 18,00 zł; następny przegląd 2027-02-19 → 2027-02-18, na liście nadal 2 czynności (brak duplikatu). W teście M7 zmiana interwału urządzenia z 90 na 60 dni zmieniła następny przegląd na 2027-01-06.

**3. Usuwanie.**

- *Czynność serwisowa:* przycisk „Usuń czynność” w `src/app/action/[id].tsx` otwiera systemowy `Alert` „Usunąć czynność?” z opisem i datą rekordu oraz przyciskami „Anuluj” i „Usuń” (styl `destructive`, czerwony). Dopiero „Usuń” wywołuje `deleteServiceAction` (`src/repository.ts:103`) i wraca do urządzenia. Wpływ na urządzenie: zmienia się jego data ostatniego przeglądu, a więc i następnego. W teście M4 po usunięciu czynności z 2026-11-20 ostatnim przeglądem znów jest 2026-11-07, a następny przegląd wrócił do 2027-02-05. Błąd bazy pokazuje „Błąd usuwania”, a rekord zostaje na ekranie.
- *Urządzenie:* `confirmDelete` w `src/app/device/[id].tsx:29`. Gdy urządzenie ma czynności, aplikacja od razu pokazuje „Nie można usunąć urządzenia” z liczbą czynności i nie pyta o potwierdzenie (test M6). Urządzenie bez czynności: potwierdzenie „Usunąć urządzenie?”, potem `removeDevice` (`src/maintenance.ts:25`) i powrót do listy (test M8). Blokada działa na trzech poziomach: ekran sprawdza listę, którą wyświetla; `removeDevice` sprawdza bazę jeszcze raz, bo lista na ekranie może być nieaktualna; klucz obcy `ON DELETE RESTRICT` odrzuci `DELETE` nawet przy błędzie w kodzie aplikacji.

**4. Dlaczego blokada.** Karta wymaga jej wprost (MOB-050-BR-04, kryterium akceptacji 4), ale jest też uzasadniona domeną. Historia czynności to ewidencja kosztów i podstawa obliczenia następnego przeglądu (BR-02). Alternatywy:

- `CASCADE` usunąłby całą historię jednym tapnięciem; po pomyłce opiekun traci np. 2 przeglądy i 67,99 zł kosztów bez możliwości odtworzenia;
- `SET NULL` zostawiłby czynności bez urządzenia, czyli osierocone rekordy, których nie da się wyświetlić ani policzyć (narusza FUNC-10);
- blokada wymaga świadomej decyzji: najpierw usunięcia czynności, każdej z potwierdzeniem.

Koszt blokady: usunięcie urządzenia z długą historią wymaga wielu kroków. Gdyby to było częste (np. wycofanie sprzętu), lepsze byłoby archiwizowanie urządzenia (flaga ukrywająca je na liście z zachowaniem historii) niż usuwanie; to jest poza obecnym zakresem karty.

**Dowody:** `src/app/action/edit.tsx`, `src/app/device/edit.tsx`, `src/app/action/[id].tsx`, `src/app/device/[id].tsx`, `src/components/device-form.tsx`, `src/components/service-action-form.tsx`, `src/maintenance.ts`, `src/repository.ts`, `docs/architecture.md` (sekcja „Zarządzanie stanem i przepływ danych”); zrzuty w tabeli T6.

## T4. Walidacja i reguła biznesowa

Wybierz **co najmniej trzy** przypadki walidacji, w tym **minimum jedną regułę biznesową z indywidualnej specyfikacji**.

| Pole / operacja | Warunek poprawności | Zachowanie przy błędzie | Lokalizacja implementacji |
| --------------- | ------------------- | ----------------------- | ------------------------- |
| Czynność: koszt, przy dodawaniu i edycji (**MOB-050-BR-01**) | Liczba `>= 0`, najwyżej 2 miejsca po przecinku, przecinek lub kropka; zapis w groszach. | Zapis zablokowany, pod polem „Koszt musi być liczbą większą lub równą 0, maks. 2 miejsca po przecinku.”, formularz otwarty z wpisanymi danymi (M2, M6). | `parseCostCents` `src/domain.ts:50`, wywoływane z `parseServiceAction` `src/domain.ts:33`; w bazie `CHECK (costCents >= 0)` `src/repository.ts:21` |
| Usunięcie urządzenia (**MOB-050-BR-04**) | Urządzenie nie ma żadnej czynności serwisowej. | `Alert` „Nie można usunąć urządzenia” z liczbą czynności, rekord zostaje (M6). | `confirmDelete` `src/app/device/[id].tsx:29`, `removeDevice` `src/maintenance.ts:25`, klucz obcy `ON DELETE RESTRICT` `src/repository.ts:18` |
| Urządzenie: interwał (**MOB-050-BR-01**, BR-03) | Liczba całkowita `> 0` dni. | „Interwał musi być liczbą całkowitą większą od 0.” pod polem. | `parseDevice` `src/domain.ts:19`; `CHECK (intervalDays > 0)` |
| Czynność: data (BR-03) | Format `RRRR-MM-DD` i istniejący dzień kalendarza (`2026-02-30` odrzucone). | „Podaj poprawną datę w formacie RRRR-MM-DD.” pod polem (M2). | `isIsoDate` `src/domain.ts:67` |
| Czynność: opis, urządzenie: nazwa (BR-03) | Niepuste po usunięciu spacji z początku i końca. | „Opis czynności jest wymagany.” / „Nazwa urządzenia jest wymagana.” (M2). | `parseServiceAction`, `parseDevice`; `CHECK (length(trim(...)) > 0)` |
| Edycja rekordu | Rekord nadal istnieje (`UPDATE` zmienia 1 wiersz). | `Alert` „Błąd zapisu”, formularz nie zamyka się. | `updateServiceAction` `src/repository.ts:100`, `updateDevice` `src/repository.ts:61` |

Reguły BR-01 i BR-03 mają testy automatyczne z przypadkiem poprawnym i błędnym w `src/domain.test.ts` (np. koszt `0` przyjęty, `-10` odrzucony).

**Dlaczego sama blokada przycisku w UI nie wystarcza?**

1. **Przycisk to tylko jedno wejście.** Te same dane trafiają do bazy z formularza dodawania i z formularza edycji, a trasy da się otworzyć bezpośrednio linkiem (`maintenancelog:///action/new?deviceId=<nieistniejące id>`). Gdyby reguła była tylko w jednym przycisku, druga droga by ją omijała. Dlatego walidacja jest w `parseServiceAction`, którą wywołuje każdy przypadek użycia, a ostatnią linią są `CHECK` i klucz obcy w bazie.
2. **Stan UI może być nieaktualny.** Ekran urządzenia decyduje na podstawie listy pobranej przy wejściu na ekran. `removeDevice` sprawdza bazę jeszcze raz w chwili usuwania.
3. **Wyszarzony przycisk nie mówi, co jest źle.** Kryterium akceptacji 2 wymaga, żeby aplikacja pokazała przyczynę. Dlatego „Zapisz” jest aktywny, a po naciśnięciu pod każdym błędnym polem pojawia się komunikat z poprawną wartością. Przycisk jest blokowany tylko w trakcie zapisu, przed podwójnym wysłaniem.

## T5. Stan aplikacji, trwałość i obsługa błędów

- Wskaż przykład stanu tymczasowego i stanu trwałego: **Tymczasowy: `form`, `errors` i `saving` w `useState` komponentu `ServiceActionForm` (`src/components/service-action-form.tsx:15`). Może być niepoprawny w trakcie pisania (koszt `"49,"`) i znika po zamknięciu formularza. Trwały: wiersze tabel `devices` i `service_actions` w pliku `maintenance-log.db`. Pośredni: dane ekranu w `useFocusData`, czyli kopia z bazy ważna do następnego wejścia na ekran.**
- Jak dane są odczytywane po ponownym uruchomieniu aplikacji? **`openDatabaseSync("maintenance-log.db")` (`src/repository.ts:6`) otwiera ten sam plik w katalogu danych aplikacji; `CREATE TABLE IF NOT EXISTS` nie zmienia istniejących tabel. Pierwszy ekran wywołuje `listDevices` przez `useFocusData`, więc lista jest budowana z bazy, nie z pamięci. Test M5: po zamknięciu Expo Go (`xcrun simctl terminate`) i ponownym otwarciu projektu widoczne były edytowany interwał 60 dni, pozostała czynność i brak usuniętego urządzenia.**
- Jak obsługujesz stany: pusto, ładowanie (jeśli operacja asynchroniczna), błąd, sukces? **Ładowanie: `ActivityIndicator` z `LoadState`, osobny od pustego stanu, więc przy starcie nie miga komunikat o pustej liście. Pusto: „Brak urządzeń. Dodaj pierwsze urządzenie, aby planować przeglądy.”, „Brak czynności dla tego urządzenia.”, „dodaj pierwszą czynność” w miejscu daty następnego przeglądu. Błąd odczytu: „Nie udało się wczytać danych. Uruchom aplikację ponownie.”; rekord usunięty w międzyczasie: „Nie znaleziono czynności.”. Błąd walidacji: komunikat pod polem; błąd zapisu lub usunięcia: `Alert`. Sukces: powrót do poprzedniego ekranu, na którym widać nowy rekord albo nowe wartości; osobnego komunikatu „Zapisano” jeszcze nie ma (ograniczenie, patrz podsumowanie).**
- Co stanie się, gdy zapis do magazynu danych się nie powiedzie? **`db.runAsync` odrzuca obietnicę, `submit` łapie wyjątek, zapisuje go w konsoli i pokazuje `Alert` „Błąd zapisu”. Formularz się nie zamyka, wpisane dane zostają, a `saving` wraca do `false`, więc można spróbować ponownie. `UPDATE`, który nie zmienił żadnego wiersza, jest traktowany jak błąd. Każda operacja to jedno polecenie SQL, które SQLite wykonuje atomowo, więc nieudany zapis nie zostawia połowy rekordu. Najgorszy przypadek, którego unikam, to formularz zamknięty jak po sukcesie, chociaż nic nie zapisano: użytkownik nie dostałby przypomnienia o przeglądzie.**

**Dowody:** `src/use-focus-data.ts`, `src/components/ui.tsx` (`LoadState`, `Message`), `src/components/service-action-form.tsx`, `src/repository.ts`; zrzuty [m5-after-restart-list.png](assets/lab-03/m5-after-restart-list.png), [m5-after-restart-device.png](assets/lab-03/m5-after-restart-device.png). Ścieżki błędu bazy (pełny dysk, `UPDATE` bez wiersza) nie zostały wywołane ręcznie, opis wynika z kodu.

## T6. Weryfikacja manualna i refleksja

Przeprowadź testy **na uruchomionej aplikacji**; w tabeli wpisz rzeczywisty wynik.

Środowisko: symulator iPhone 18 Pro (iOS 27), Expo Go dla SDK 57, Metro z `bunx expo start`, 2026-11-21. Dane startowe: urządzenie „Wiertarka Bosch” (90 dni) z czynnością „Wymiana szczotek” z 2026-11-07 (49,99 zł) z laboratorium 2 oraz urządzenie „1@#” bez czynności, pozostałe po wcześniejszych próbach.

| ID  | Scenariusz i dane testowe              | Oczekiwany rezultat | Faktyczny rezultat | PASS/FAIL | Dowód |
| --- | -------------------------------------- | ------------------- | ------------------ | --------- | ----- |
| M1  | Dodanie poprawnego rekordu: „Wiertarka Bosch” → „Dodaj czynność serwisową”, data 2026-11-21, opis „Smarowanie przekladni”, koszt `15,50` | Powrót do urządzenia, czynność na liście, ostatni przegląd 2026-11-21, następny 2026-11-21 + 90 dni = 2027-02-19 | Czynność „Smarowanie przekladni, 2026-11-21 · 15,50 zł” na górze listy, ostatni przegląd 2026-11-21, następny 2027-02-19 | PASS | [m1-create.png](assets/lab-03/m1-create.png) |
| M2  | Próba dodania niepoprawnego rekordu: data `2026-02-30`, pusty opis, koszt `-5` | Zapis zablokowany, trzy komunikaty pod polami, formularz otwarty | Trzy komunikaty: data, „Opis czynności jest wymagany.”, koszt; ekran nie zamknięty, rekord nie dodany | PASS | [m2-invalid.png](assets/lab-03/m2-invalid.png) |
| M3  | Edycja istniejącego rekordu: „Smarowanie przekladni” → „Edytuj czynność”, data 2026-11-20, opis „Smarowanie przekladni i uchwytu”, koszt `18,00` | Szczegóły z nowymi wartościami; na liście urządzenia ten sam rekord (bez duplikatu), następny przegląd 2027-02-18 | Szczegóły: nowy opis, 2026-11-20, 18,00 zł; urządzenie: 2 czynności, ostatni przegląd 2026-11-20, następny 2027-02-18 | PASS | [m3-edit-details.png](assets/lab-03/m3-edit-details.png), [m3-edit-list.png](assets/lab-03/m3-edit-list.png) |
| M4  | Usunięcie rekordu: szczegóły „Smarowanie przekladni i uchwytu” → „Usuń czynność” → „Usuń” | Pytanie o potwierdzenie z opisem i datą; po „Usuń” rekord znika, ostatni przegląd wraca do 2026-11-07, następny do 2027-02-05 | Alert „Usunąć czynność?” z opisem i datą; po „Usuń” powrót do urządzenia, 1 czynność, ostatni 2026-11-07, następny 2027-02-05 | PASS | [m4-delete-confirm.png](assets/lab-03/m4-delete-confirm.png), [m4-delete-result.png](assets/lab-03/m4-delete-result.png) |
| M5  | Restart aplikacji i odczyt danych: po M4, M7 i M8 `xcrun simctl terminate` Expo Go, ponowne otwarcie `exp://127.0.0.1:8081` | Zmiany z edycji i usuwania zachowane | Lista: tylko „Wiertarka Bosch”, następny przegląd 2027-01-06; szczegóły: interwał 60 dni, czynność „Wymiana szczotek” | PASS | [m5-after-restart-list.png](assets/lab-03/m5-after-restart-list.png), [m5-after-restart-device.png](assets/lab-03/m5-after-restart-device.png) |
| M6  | Przypadek naruszenia reguły biznesowej: (a) „Usuń urządzenie” dla „Wiertarka Bosch” z 2 czynnościami (BR-04); (b) edycja czynności z kosztem `-1` (BR-01) | (a) usunięcie zablokowane z informacją o liczbie czynności; (b) zapis zablokowany, przyczyna pod polem | (a) Alert „Nie można usunąć urządzenia”, „(2)”, urządzenie zostało; (b) komunikat pod polem kosztu, formularz edycji otwarty | PASS | [m6-delete-blocked.png](assets/lab-03/m6-delete-blocked.png), [m6b-edit-negative-cost.png](assets/lab-03/m6b-edit-negative-cost.png) |
| M7  | Edycja urządzenia: „Edytuj urządzenie”, interwał 90 → `60` | Szczegóły: 60 dni, następny przegląd 2026-11-07 + 60 = 2027-01-06 | 60 dni, następny przegląd 2027-01-06; formularz miał wpisane aktualne wartości | PASS | [m7-device-edit-form.png](assets/lab-03/m7-device-edit-form.png), [m7-device-edit-result.png](assets/lab-03/m7-device-edit-result.png) |
| M8  | Usunięcie urządzenia bez czynności: „1@#” → „Usuń urządzenie” → „Usuń” | Potwierdzenie, potem urządzenie znika z listy | Alert „Usunąć urządzenie?”; po „Usuń” lista zawiera tylko „Wiertarka Bosch” | PASS | [m8-delete-device-confirm.png](assets/lab-03/m8-delete-device-confirm.png), [m8-delete-device-result.png](assets/lab-03/m8-delete-device-result.png) |

**Błąd wykryty w trakcie testów:** pierwsza wersja usuwania urządzenia najpierw pytała „Usunąć urządzenie?”, a dopiero po „Usuń” informowała, że się nie da. Użytkownik potwierdzał operację, która i tak nie mogła się wykonać. Poprawka: ekran sprawdza czynności przed pytaniem i od razu pokazuje komunikat o blokadzie (`src/app/device/[id].tsx:29`); M6 wykonano na poprawionej wersji. Drugi zauważony problem, nienaprawiony: komunikaty walidacji są czarne zamiast czerwonych, bo Expo Go 57.0.9 na iOS ignoruje kolor tekstu w `@expo/ui` (widać to na zrzutach M2 i M6).

**Najtrudniejszy problem i sposób jego rozwiązania (3–6 zdań):** Wspólny formularz dla dodawania i edycji. `useState(initial)` bierze wartość początkową tylko przy pierwszym renderze, a pola `@expo/ui` używają `defaultValue`, więc formularz zamontowany przed odczytem rekordu z bazy zostałby pusty i nie uzupełniłby się po nadejściu danych. Ekrany edycji renderują więc formularz dopiero po wczytaniu rekordu (`if (!data) return <LoadState ... />`), a przy braku rekordu pokazują „Nie znaleziono”. Drugą częścią był koszt: w bazie jest `4999` groszy, a w polu ma być `49,99`, więc doszła funkcja `costText`, a test sprawdza, że `parseCostCents(costText(x))` zwraca `x`. Trzecią było rozróżnienie „zapisano” od „nic nie zapisano”: `UPDATE` bez pasującego wiersza nie jest w SQLite błędem, więc repozytorium sprawdza `changes` i samo rzuca wyjątek.

## Podsumowanie i samoocena

- Zaimplementowane funkcjonalności: **pełny CRUD czynności serwisowej (FR-01); tworzenie, odczyt i edycja urządzenia (FR-02) oraz usuwanie urządzenia bez czynności; blokada usunięcia urządzenia z czynnościami z komunikatem (BR-04, kryterium akceptacji 4); potwierdzenie usunięcia (FR-09); walidacja przy dodawaniu i edycji (FR-08, BR-01, BR-03); przeliczanie następnego przeglądu po każdej zmianie (FR-10, BR-02); trwałość zmian po restarcie (FR-11); wspólne formularze `DeviceForm` i `ServiceActionForm` (ARCH-04); aktualizacja `docs/architecture.md`.**
- Znane ograniczenia / błędy: **brak wyszukiwania, filtrowania i sortowania z wyborem kierunku (FR-05..FR-07); brak osobnego komunikatu sukcesu po zapisie i usunięciu (UX-03 spełnione tylko przez powrót z widocznym wynikiem); komunikaty walidacji nie są czerwone w Expo Go na iOS; data wpisywana jako tekst zamiast systemowego selektora; czynności nie da się przenieść do innego urządzenia; testy automatyczne (11) obejmują walidację i obliczenia, ale nie operacje repozytorium (wymagają natywnego `expo-sqlite`); aplikacja testowana tylko na symulatorze iOS; dla tego laboratorium nie ma jeszcze Issue ani PR (GIT-04, GIT-05).**
- Co pozostaje do laboratorium 4: **wyszukiwanie po opisie, filtr po urządzeniu i dacie, sortowanie po dacie i nazwie z kierunkiem; testy operacji Create/Update/Delete (TEST-01), np. repozytorium uruchamiane w teście na `bun:sqlite`; pipeline CI (lint, typecheck, testy) dla PR; `docs/testing.md`, `docs/security.md`, `docs/ai-usage.md`; komunikat sukcesu; sprawdzenie na Androidzie; Issues i PR dla zmian z laboratorium 3.**

### Kryteria zaliczenia

- Pełny CRUD głównej encji i zapis trwały; aplikacja uruchamia się i działa.
- Co najmniej jedna reguła biznesowa zgodna z przydzieloną specyfikacją.
- Obsługa błędów i czytelne stany interfejsu.
- Uzupełnione odpowiedzi oraz dowody możliwe do zweryfikowania w repozytorium.
- Wyniki testów odzwierciedlają rzeczywiste działanie; wykryte błędy nie są ukrywane.

## Źródła

1. React, „useState”, https://react.dev/reference/react/useState, dostęp 2026-11-21. Wykorzystane w T6: „This argument is ignored after the initial render”, czyli powód, dla którego formularz edycji montuje się dopiero po odczycie rekordu.
2. Expo, „SQLite (expo-sqlite)”, SDK 57, https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/, dostęp 2026-11-21. Wykorzystane w T3 i T5: `runAsync` zwraca `changes`, czyli liczbę zmienionych wierszy, użytą do wykrycia edycji usuniętego rekordu.
3. SQLite, „SQLite Foreign Key Support”, https://www.sqlite.org/foreignkeys.html, dostęp 2026-11-21. Wykorzystane w T3: działanie `RESTRICT`, `CASCADE` i `SET NULL` przy porównaniu polityk usuwania.
4. React Native, „Alert”, https://reactnative.dev/docs/alert, dostęp 2026-11-21. Wykorzystane w T3: okno potwierdzenia z przyciskami `cancel` i `destructive`.
5. Expo Router, „URL parameters”, https://docs.expo.dev/router/reference/url-parameters/, dostęp 2026-11-21. Wykorzystane w T3: `useLocalSearchParams` do odczytu `id` edytowanego rekordu.
6. Karta `business-requirements_50.md` (MOB-050) i `requirements.md` w repozytorium. Wykorzystane w T3, T4, T6: wymagania FR, BR i kryteria akceptacji.

## Użycie narzędzi AI (jeżeli dotyczy)

**Narzędzie i zakres wsparcia:** Claude Code (Anthropic): kod edycji i usuwania, wydzielenie wspólnych formularzy, przeprowadzenie testów M1–M8 na symulatorze przez narzędzie Argent (tapnięcia, wpisywanie tekstu, zrzuty ekranu), szkic sprawozdania i aktualizacja `docs/architecture.md`.  
**Jak zweryfikowano wynik:** `bunx tsc --noEmit` (bez błędów), `bunx expo lint` (bez błędów), `bun test src` (11/11), testy manualne M1–M8 ze zrzutami ekranu, dokumentacja z listy źródeł (`changes` w `expo-sqlite`, `useState`, klucze obce SQLite). Test M6 ujawnił błąd w kolejności potwierdzenia i blokady, który został poprawiony przed ponownym testem.  
**Elementy wykonane samodzielnie:** wybór polityki usuwania (blokada zamiast kaskady) na podstawie karty, przegląd i zrozumienie kodu przed oddaniem.

**Warunki formalne:** sprawozdanie w Markdown, czytelne odnośniki do działającego kodu i diagramów, zrzuty ekranu renderujące się w repozytorium, identyfikacja autora i projektu. Oceniana jest zarówno implementacja, jak i zdolność wyjaśnienia własnych decyzji. Brak dowodów wykonania może ograniczyć liczbę punktów.
