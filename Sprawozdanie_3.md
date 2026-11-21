# Laboratorium 3 — sprawozdanie teoretyczne

**Imię i nazwisko:** Artur Rok  
**Grupa:** 43_Inf_FD_NW_7  
**Data:** 2026-11-21

Projekt odniesienia: MOB-050 MaintenanceLog (React Native, Expo SDK 57), encje: urządzenie (`Device`) i czynność serwisowa (`ServiceAction`). Implementacja opisana w `reports/lab-03.md`.

## T1. Ewolucja technologii frontendowych

1. Wybierz **trzy istotne zmiany** w rozwoju interfejsów: od klasycznych stron WWW do współczesnych aplikacji mobilnych.
2. Dla każdej wskaż: problem wcześniejszego podejścia, nowe rozwiązanie oraz nowy koszt/ograniczenie.
3. Wskaż jedną zmianę, która Twoim zdaniem miała największy wpływ na sposób projektowania aplikacji CRUD. Uzasadnij wybór.

| Zmiana / okres | Problem wcześniejszego podejścia | Co się poprawiło? | Jaki nowy problem powstał? |
| -------------- | -------------------------------- | ----------------- | -------------------------- |
| **1. Od przeładowania strony do Ajax** (ok. 2005: `XMLHttpRequest`, później `fetch`) | Każda operacja CRUD była formularzem wysyłanym do serwera, który zwracał całą nową stronę HTML. Zapis jednego wiersza oznaczał przeładowanie strony, utratę pozycji przewijania i wpisanych danych w innych polach, a przy błędzie walidacji serwer musiał odtworzyć cały formularz. | Przeglądarka pobiera tylko dane i podmienia część strony bez przeładowania [5]. Zapis rekordu nie przerywa pracy, walidację da się pokazać od razu przy polu, aplikacja webowa zaczyna zachowywać się jak program, a nie jak zbiór dokumentów. | Stan zaczął żyć w dwóch miejscach: na serwerze i w przeglądarce. Kod JavaScript musiał ręcznie zmieniać DOM po każdej odpowiedzi, a przy rozbudowanej stronie (jQuery, ok. 2006–2012) te zmiany trudno było utrzymać zgodne z danymi. Doszły problemy z przyciskiem Wstecz, adresem URL i stanami „trwa zapis”. |
| **2. Od imperatywnej zmiany widoku do deklaratywnych komponentów** (React 2013, później Vue, Angular 2+, a na urządzeniach SwiftUI 2019 i Jetpack Compose 2021) | Programista opisywał przejścia: po zapisie znajdź element, dodaj wiersz, ukryj komunikat o pustej liście, zmień licznik. Gdy ta sama dana była widoczna w kilku miejscach, łatwo było zapomnieć o jednym z nich [3]. Liczba przejść rosła z liczbą stanów ekranu [1]. | Widok jest funkcją stanu: programista opisuje, jak ekran wygląda dla danych, a framework sam oblicza różnice i zmienia tylko potrzebne elementy [1], [3], [4]. Nie ma osobnego kodu „po dodaniu”, „po edycji” i „po usunięciu”; po każdej operacji wystarczy zmienić dane. Komponenty dają też ponowne użycie (np. jeden formularz do dodawania i edycji). | Narzut abstrakcji i narzędzi (kompilacja JSX, bundler). Ponowne generowanie widoku kosztuje czas procesora i baterię, więc framework musi pomijać niezmienione części, a programista pilnować kluczy elementów list i zbędnych renderów [3]. Pojawił się nowy problem: gdzie trzymać stan współdzielony przez wiele ekranów (Redux, React Query, Zustand) i jak synchronizować go z bazą lub serwerem. |
| **3. Od aplikacji natywnych pisanych osobno i aplikacji w WebView do wieloplatformowych frameworków z natywnym UI** (PhoneGap/Cordova ok. 2009, React Native 2015, Flutter 1.0 2018) | Aplikacja natywna wymagała dwóch baz kodu (Objective-C/Swift i Java/Kotlin) i dwóch zespołów. Aplikacja w WebView (PhoneGap/Cordova) miała jeden kod, ale interfejs strony WWW: wolniejsze listy, inne przewijanie i klawiatura niż w systemie. | Jeden kod w TypeScript lub Dart dla iOS i Androida, z natywnymi kontrolkami (React Native) albo własnym silnikiem rysującym (Flutter), z dostępem do lokalnej bazy i API urządzenia przez moduły. Model deklaratywny z punktu 2 przeszedł z przeglądarki na urządzenia mobilne. | Zależność od warstwy pośredniej: aktualizacje SDK zmieniają API (w moim projekcie konfiguracja lintera z Expo SDK 57 nie działała z ESLint 10, więc został ESLint 9), funkcja bez gotowego modułu wymaga kodu natywnego, a błąd może być w JS, w module natywnym albo w systemie. Różnice między platformami nie znikają (np. Expo Go na iOS nie koloruje tekstu błędu w `@expo/ui`). |

**Uzasadnienie:**

Największy wpływ na projektowanie aplikacji CRUD miała **zmiana 2, przejście na deklaratywne komponenty**. Ajax umożliwił CRUD bez przeładowania strony, ale zostawił programiście ręczną aktualizację widoku po każdej operacji. Aplikacja CRUD to głównie listy i szczegóły, które zmieniają się po dodaniu, edycji i usunięciu, więc każda operacja wymagała osobnego kodu zmieniającego widok we wszystkich miejscach, gdzie dana była widoczna. Model deklaratywny zmienił pytanie z „co zmienić na ekranie po zapisie?” na „skąd ekran bierze dane?”. W MaintenanceLog data czynności wpływa na trzy miejsca (szczegóły czynności, lista czynności z datą ostatniego i następnego przeglądu, karta urządzenia na liście). Te trzy miejsca aktualizują się po dodaniu, edycji i usunięciu jednym mechanizmem: ponownym odczytem z bazy i ponownym renderem. Zmiana 3 jest dla mnie ważna praktycznie (jedna baza kodu), ale dla samego projektu CRUD tylko przeniosła model deklaratywny na telefon.

## T2. Imperatywne i deklaratywne budowanie UI

1. Wyjaśnij różnicę między tymi podejściami, **nie ograniczając się do definicji**.
2. Wymyśl przykład zmiany listy po dodaniu elementu i opisz przebieg w obu podejściach (możesz użyć pseudokodu).
3. Zidentyfikuj **dwie potencjalne trudności** deklaratywnego podejścia.

**Odpowiedź i przykład:**

**Różnica.** W podejściu imperatywnym program przechowuje widoki jako obiekty i wydaje im polecenia: `setText`, `addChild`, `remove`. Programista odpowiada za **przejścia** między stanami ekranu: musi wiedzieć, w jakim stanie ekran jest teraz, i zaplanować kroki do stanu docelowego. W podejściu deklaratywnym programista pisze funkcję, która dla danych zwraca opis całego ekranu, i odpowiada tylko za **stany**. Przejście oblicza framework: porównuje nowy opis z poprzednim i zmienia tylko to, co się różni [1], [4].

Praktyczna konsekwencja: przy N możliwych stanach ekranu podejście imperatywne wymaga obsłużenia przejść między nimi (dla pustej listy, listy z rekordami, błędu, ładowania jest to do 12 kombinacji „z X do Y”), a deklaratywne tylko N opisów. Dokumentacja React ujmuje to tak, że ręczna manipulacja UI działa w izolowanych przykładach, ale w złożonych systemach staje się „wykładniczo trudniejsza” [1]. Dokumentacja Jetpack Compose wskazuje konkretny błąd: dana widoczna w kilku miejscach, z których o jednym zapomniano, albo aktualizacja węzła, który właśnie usunięto z ekranu [3].

**Przykład: dodanie czynności serwisowej do listy w szczegółach urządzenia.** Ekran pokazuje listę czynności (od najnowszej), komunikat „Brak czynności”, gdy lista jest pusta, oraz datę ostatniego i następnego przeglądu.

Imperatywnie (pseudokod w stylu DOM / Android View):

```text
po udanym zapisie(czynność):
  lista = znajdźWidok("actions")
  wiersz = nowyWiersz(czynność.opis + " · " + czynność.data + " · " + czynność.koszt)
  pozycja = pierwszy wiersz listy, którego data < czynność.data   // lista posortowana malejąco
  lista.wstawPrzed(pozycja, wiersz)
  jeżeli znajdźWidok("empty").widoczny: znajdźWidok("empty").ukryj()
  jeżeli czynność.data > ostatniPrzegląd:                         // tylko gdy nowa jest najpóźniejsza
    ostatniPrzegląd = czynność.data
    znajdźWidok("last").ustawTekst(ostatniPrzegląd)
    znajdźWidok("next").ustawTekst(dodajDni(ostatniPrzegląd, interwał))
  // a karta urządzenia na ekranie listy pod spodem? trzeba ją zaktualizować osobno
```

Przebieg: kod musi znać aktualny stan widoku (czy komunikat o pustej liście jest widoczny, jaka jest bieżąca data ostatniego przeglądu), znaleźć pozycję wstawienia i pamiętać o drugim ekranie. Edycja i usuwanie potrzebują osobnych, podobnych procedur; usunięcie ostatniego wiersza musi z powrotem pokazać komunikat „Brak czynności”, a usunięcie najpóźniejszej czynności musi odnaleźć nową najpóźniejszą.

Deklaratywnie (React Native, uproszczony `src/app/device/[id].tsx`):

```tsx
function DeviceDetails({ device, actions }) {
  return (
    <Screen>
      <Row title="Następny przegląd" detail={nextReviewDate(device.lastServiceDate, device.intervalDays) ?? "dodaj pierwszą czynność"} />
      {actions.length === 0 ? <Text>Brak czynności dla tego urządzenia.</Text> : null}
      {actions.map((a) => <Row key={a.id} title={a.description} detail={`${a.date} · ${formatCost(a.costCents)}`} />)}
    </Screen>
  );
}
// po zapisie: nowe dane (w projekcie: ponowny odczyt z SQLite przy powrocie na ekran)
```

Przebieg: zapis zmienia dane, a ekran po powrocie dostaje nową tablicę `actions` i nowe `lastServiceDate` (z `MAX(date)` w zapytaniu). React wywołuje funkcję ponownie, porównuje wynik z poprzednim i po kluczu `a.id` rozpoznaje, że doszedł jeden wiersz: wstawia go, chowa komunikat o pustej liście i zmienia tekst następnego przeglądu. Ten sam kod obsługuje edycję i usunięcie.

**Dwie trudności podejścia deklaratywnego:**

1. **Tożsamość elementów i koszt ponownego renderu.** Framework musi wiedzieć, który element nowej listy odpowiada któremu ze starej. Gdy kluczem jest indeks tablicy, a nie `id`, po wstawieniu wiersza na początek stan (np. rozwinięty wiersz, wpisany tekst) zostaje przy złym rekordzie. Do tego ponowne generowanie ekranu kosztuje czas procesora i baterię [3]; przy długich listach trzeba wirtualizacji (`FlatList`) i unikania zbędnych renderów. W moim projekcie lista jest sekcją natywnego formularza bez recyklingu wierszy, co wystarcza dla kilkudziesięciu urządzeń, ale nie dla tysięcy.
2. **Stan, który „nie słucha” nowych danych.** Deklaratywny opis obowiązuje tylko dla wartości kontrolowanych przez stan. `useState(initial)` bierze wartość początkową tylko przy pierwszym renderze, potem ją ignoruje [2]. Pole tekstowe z `defaultValue` też trzyma własny stan. W MaintenanceLog formularz edycji czynności zamontowany przed odczytem rekordu z bazy zostałby pusty mimo nadejścia danych, bo ani `useState`, ani natywne pole nie reagują na nowe `initial`. Rozwiązanie: renderować formularz dopiero po odczycie. Takie miejsca są trudne do zauważenia, bo kod wygląda deklaratywnie, a zachowuje się jak imperatywny stan zapamiętany przy tworzeniu.

## T3. Stan, komponenty i przepływ danych

1. Wybierz dwie funkcjonalności z przydzielonego projektu, w których pojawia się stan.
2. Określ, które informacje są tymczasowe, współdzielone między ekranami i trwałe.
3. Zaproponuj podział odpowiedzialności na komponenty / warstwy. Uzasadnij, gdzie powinny znajdować się reguły biznesowe.
4. Opisz sytuację, w której nieprawidłowe zarządzanie stanem powoduje niespójność UI.

Funkcjonalność A: **edycja czynności serwisowej** (formularz). Funkcjonalność B: **lista urządzeń z datą następnego przeglądu i usuwanie urządzenia**.

| Funkcjonalność | Rodzaj stanu | Kto nim zarządza? | Ryzyko niespójności |
| -------------- | ------------ | ----------------- | ------------------- |
| A: wpisany tekst pól (`"2026-11-20"`, `"18,00"`), błędy walidacji, flaga „Zapisywanie...” | **Tymczasowy**, lokalny dla ekranu; może być niepoprawny w trakcie pisania | `useState` w komponencie `ServiceActionForm` | Formularz zamontowany przed odczytem rekordu pokazuje puste pola; zamknięcie formularza przed potwierdzeniem zapisu sugeruje sukces, którego nie było; brak blokady przycisku podczas zapisu pozwala wysłać operację dwa razy. |
| A: zapisany rekord czynności (`date`, `description`, `costCents`) | **Trwały** | SQLite przez repozytorium (`updateServiceAction`) | Edycja zapisana w bazie, ale szczegóły czynności i lista urządzenia nadal pokazują stare wartości, jeśli ekran trzyma własną kopię i nie czyta ponownie. |
| B: lista urządzeń z datą ostatniego przeglądu | **Współdzielony między ekranami** (te same dane widzi lista, szczegóły urządzenia i formularze), pochodny od trwałego | Baza jako jedyne źródło prawdy; każdy ekran czyta ją przez `useFocusData` przy wejściu | Karta urządzenia na liście pokazuje następny przegląd sprzed edycji lub usunięcia czynności; urządzenie usunięte na ekranie szczegółów nadal widoczne na liście. |
| B: data następnego przeglądu | **Pochodna**, nie jest przechowywana | Funkcja `nextReviewDate` w domenie, liczona przy każdym renderze z `MAX(date)` i interwału | Gdyby była osobnym polem w bazie lub w stanie, każda edycja daty czynności lub interwału musiałaby ją aktualizować; pominięcie jednego przypadku daje datę niezgodną z historią. |

**Podział odpowiedzialności (zastosowany w projekcie):**

```text
Ekrany (src/app/*.tsx)            parametry trasy, wczytanie danych, wyświetlenie, nawigacja
Komponenty (src/components/)      DeviceForm, ServiceActionForm, Row, FormField: stan formularza i wygląd
Przypadki użycia (maintenance.ts) addServiceAction, editServiceAction, removeDevice: walidacja + zapis
Domena (domain.ts)                parseServiceAction, parseCostCents, nextReviewDate: reguły, czyste funkcje
Repozytorium (repository.ts)      SQL, UUID, CHECK, klucz obcy ON DELETE RESTRICT
```

**Uzasadnienie:** reguły biznesowe powinny być w domenie i przypadkach użycia, a nie w ekranach, z trzech powodów. Po pierwsze, ta sama reguła obowiązuje w kilku miejscach: BR-01 (koszt `>= 0`) dotyczy dodawania i edycji, a dzięki wspólnej `parseServiceAction` jest jedna. Po drugie, reguły w czystych funkcjach testuje się bez symulatora: 11 testów `bun test` trwa poniżej 50 ms. Po trzecie, reguła spójności danych (BR-04) musi działać niezależnie od tego, który ekran wywoła operację, dlatego `removeDevice` sprawdza zależności w bazie, a baza ma jeszcze klucz obcy jako ostatnią blokadę. Ekran decyduje tylko o tym, jak pokazać wynik (komunikat pod polem, `Alert`).

**Sytuacja niespójności:** opiekun otwiera „Wiertarka Bosch” (dwie czynności, ostatnia z 2026-11-20, następny przegląd 2027-02-18), wchodzi w czynność z 2026-11-20 i ją usuwa. Gdyby lista urządzeń trzymała dane pobrane przy starcie aplikacji w swoim stanie, po powrocie nadal pokazywałaby „Następny przegląd: 2027-02-18”, chociaż w bazie ostatni przegląd to 2026-11-07, a następny 2027-02-05. Opiekun zaplanowałby przegląd dwa tygodnie za późno. Ten sam błąd pojawia się, gdy datę następnego przeglądu zapisze się jako osobne pole i zapomni się ją przeliczyć przy usuwaniu. W projekcie zapobiegają temu dwie decyzje: ekrany czytają dane z bazy przy każdym wejściu (`useFocusData`), a data następnego przeglądu jest liczona, a nie przechowywana.

## T4. CRUD, walidacja i reguły biznesowe

1. Dla głównej encji własnego projektu opisz po jednym **nietrywialnym** scenariuszu Create, Read, Update i Delete.
2. Zaproponuj **dwie walidacje techniczne** oraz **jedną regułę biznesową**; wyjaśnij różnicę.
3. Zidentyfikuj problem, jaki może wystąpić przy usunięciu rekordu powiązanego z inną encją. Zaproponuj politykę postępowania.

Encja główna: czynność serwisowa; dla Delete także urządzenie, bo w nim leży problem relacji.

| Operacja | Scenariusz i warunki | Możliwy błąd | Jak powinien zareagować system? |
| -------- | -------------------- | ------------ | ------------------------------- |
| Create | Uzupełnienie historii: urządzenie ma czynność z 2026-11-20, opiekun dopisuje zaległą czynność z 2026-05-01 (koszt `120,5`). | Następny przegląd liczony od ostatnio *dodanej* czynności, a nie najpóźniejszej, cofa się o pół roku. Koszt `120,5` jako `float` daje błędy zaokrągleń w sumach. Urządzenie mogło zostać usunięte na innym ekranie. | Ostatni przegląd = `MAX(date)` z bazy, więc dopisanie starszej czynności nie zmienia następnego przeglądu. Koszt zapisany jako `12050` groszy. Klucz obcy odrzuca `INSERT` do nieistniejącego urządzenia, formularz pokazuje „Błąd zapisu” i zachowuje dane. |
| Read | Lista urządzeń przy pierwszym uruchomieniu i dla urządzenia bez czynności; data `2026-11-07` wyświetlana w strefie UTC+1. | Brak czynności daje `null` i tekst „Invalid Date” albo datę liczoną od dnia dodania urządzenia. `new Date("2026-11-07")` to północ UTC, co w innych strefach może pokazać inny dzień. Błąd odczytu bazy wygląda jak pusta lista. | „brak przeglądów” zamiast wymyślonej daty. Daty jako tekst `RRRR-MM-DD`, obliczenia w UTC. Trzy osobne stany: ładowanie, błąd („Nie udało się wczytać danych”), pusta lista z instrukcją. |
| Update | Opiekun poprawia datę najpóźniejszej czynności z 2026-11-21 na 2026-11-20; w tym czasie ta czynność mogła zostać usunięta. | Szczegóły lub lista pokazują starą datę następnego przeglądu. `UPDATE` bez pasującego wiersza kończy się „sukcesem” bez zmian; formularz się zamyka, a użytkownik myśli, że zapisał. Edycja z kosztem `-1` omija walidację, jeśli była tylko w formularzu dodawania. | Ta sama walidacja co przy dodawaniu. `UPDATE ... WHERE id = ?` z `id` z trasy (bez `INSERT`, więc bez duplikatu). Gdy zmieniono 0 wierszy: błąd zapisu, formularz zostaje otwarty. Ekrany czytają dane ponownie po powrocie. |
| Delete | Opiekun usuwa urządzenie „Wiertarka Bosch”, które ma 2 czynności (67,99 zł kosztów). Osobno: usuwa najpóźniejszą czynność. | Usunięcie kaskadowe kasuje historię kosztów bez ostrzeżenia; bez kaskady czynności zostają osierocone. Po usunięciu najpóźniejszej czynności następny przegląd nie wraca do daty z poprzedniej. Przypadkowe tapnięcie usuwa rekord. | Urządzenie: blokada z komunikatem „Nie można usunąć urządzenia” i liczbą czynności. Czynność: potwierdzenie z opisem i datą rekordu, po usunięciu ponowne obliczenie ostatniego i następnego przeglądu z pozostałych czynności. |

**Walidacje i reguła biznesowa:**

- **Walidacja techniczna 1, data:** tekst w formacie `RRRR-MM-DD` i istniejący dzień kalendarza (`2026-02-30`, `2026-13-01` odrzucone). Chroni przed wartością, której nie da się zapisać ani porównać jako daty.
- **Walidacja techniczna 2, koszt:** liczba z najwyżej dwoma miejscami po przecinku, z przecinkiem lub kropką (`12,345`, `abc` odrzucone), zamieniana na grosze.
- **Reguła biznesowa, MOB-050-BR-04:** urządzenia z czynnościami nie można usunąć; czynności nie można zapisać bez istniejącego urządzenia.

**Różnica:** walidacja techniczna sprawdza, czy pojedyncza wartość ma typ i format, który system potrafi zapisać i przetworzyć; byłaby taka sama w każdej aplikacji z polem daty czy kwoty i da się ją sprawdzić bez znajomości innych danych. Reguła biznesowa wynika z decyzji o domenie i może się zmienić razem z nią (np. firma zdecyduje się na archiwizację zamiast blokady). Często wymaga stanu innych rekordów: BR-04 trzeba sprawdzić w bazie (ile czynności ma urządzenie), a nie w samym formularzu. Granica nie jest ostra: „koszt `>= 0`” (BR-01) wygląda jak ograniczenie zakresu, ale jest w karcie regułą biznesową, bo w innej domenie (np. korekty) ujemna kwota byłaby poprawna.

**Polityka usuwania:** dla urządzenia z czynnościami **blokada (RESTRICT) z czytelnym komunikatem**. Porównanie:

- `CASCADE`: najprostsze dla użytkownika, ale jedno tapnięcie kasuje historię przeglądów i kosztów, której nie da się odtworzyć; dla ewidencji serwisowej to utrata danych;
- `SET NULL`: czynności bez urządzenia nie mają sensu w domenie (nie da się policzyć przeglądu), to osierocone rekordy;
- **blokada**: wymaga świadomego usunięcia czynności (każdej z potwierdzeniem) przed usunięciem urządzenia; zgodna z BR-04;
- archiwizacja (flaga „wycofane”, ukrycie z listy z zachowaniem historii): najlepsza, gdy sprzęt wycofuje się często; wymaga dodatkowego pola i filtra, poza zakresem karty.

Blokada powinna działać na kilku poziomach: komunikat w UI przed potwierdzeniem, sprawdzenie w logice w chwili usuwania (lista na ekranie może być nieaktualna) i klucz obcy w bazie (`ON DELETE RESTRICT`, z włączonym `PRAGMA foreign_keys = ON`, bo SQLite domyślnie nie sprawdza kluczy obcych [7]).

## T5. Trwałość, błędy i jakość rozwiązania

1. Porównaj dwa możliwe sposoby przechowywania danych dla niewielkiej aplikacji CRUD (np. magazyn klucz–wartość i relacyjna baza lokalna). Nie zakładaj, że oba są równie dobre dla wszystkich danych.
2. Zaprojektuj test manualny, który **udowodni trwałość** danych po zamknięciu i ponownym uruchomieniu aplikacji.
3. Opisz zachowanie aplikacji przy nieudanym zapisie oraz przy próbie wprowadzenia danych niepoprawnych.
4. Wskaż, co byłoby trudne do przetestowania, gdyby logika biznesowa znajdowała się wyłącznie w kodzie widoku.

| Kryterium                   | Rozwiązanie A: Async Storage (klucz–wartość, JSON) | Rozwiązanie B: SQLite (`expo-sqlite`) |
| --------------------------- | ---------------------- | ---------------------- |
| Obsługa relacji             | Brak. Relację trzeba zapisać jako `deviceId` w obiektach JSON i pilnować w kodzie: przy usuwaniu urządzenia ręcznie sprawdzić czynności pod innym kluczem. Nic nie chroni przed osieroconym rekordem przy błędzie w kodzie. | Klucz obcy `REFERENCES devices(id) ON DELETE RESTRICT` i `CHECK` w schemacie; baza odrzuca czynność bez urządzenia i usunięcie urządzenia z czynnościami niezależnie od kodu aplikacji [7]. |
| Złożoność implementacji     | Mała na start: `setItem(klucz, JSON.stringify(tablica))`, `getItem`, bez schematu. | Większa: schemat tabel, SQL, migracje przy zmianie modelu (`PRAGMA user_version`), parametry zapytań. |
| Aktualizacja i wyszukiwanie | Edycja jednej czynności = odczyt całej tablicy, zmiana w pamięci, zapis całej tablicy. Dwa szybkie zapisy mogą nadpisać się nawzajem (utracona aktualizacja). Wyszukiwanie, sortowanie i `MAX(date)` w JavaScript na pełnej tablicy. | `UPDATE ... WHERE id = ?` zmienia jeden wiersz i zwraca liczbę zmienionych wierszy. Wyszukiwanie (`LIKE`), sortowanie (`ORDER BY`), agregacja (`MAX`, `SUM`) i indeksy po stronie bazy. Każde polecenie jest atomowe. |
| Ograniczenia                | Dane nieszyfrowane, przeznaczone na ustawienia i drobny stan aplikacji [6]; koszt operacji rośnie z rozmiarem całej kolekcji; brak typów (liczba z JSON może wrócić jako tekst). | Asynchroniczne API i obsługa błędów SQL; schemat trzeba migrować; również bez szyfrowania w podstawowej konfiguracji; za duże narzędzie dla kilku ustawień (dla nich lepszy magazyn klucz–wartość). |

Wniosek: dla danych MaintenanceLog (dwie encje, relacja 1:N, agregacja `MAX(date)` dla BR-02, blokada BR-04) lepsza jest SQLite. Async Storage pasowałby do ustawień, np. ostatnio wybranego kierunku sortowania, gdzie nie ma relacji ani zapytań. SQLite jest projektowana jako lokalny format danych aplikacji na urządzeniach bez administratora [8].

**Test trwałości (kroki, dane, oczekiwany wynik):**

Cel: odróżnić dane w bazie od danych w pamięci. Sam powrót z tła nie jest dowodem, bo proces aplikacji nadal żyje i trzyma stan w pamięci.

1. Warunek wstępny: aplikacja uruchomiona, zapisane ID i stan listy przed testem (zrzut ekranu).
2. Dodaj urządzenie „Kompresor”, interwał `180`.
3. Dodaj czynność: data `2026-11-21`, opis „Wymiana filtra”, koszt `120,00`.
4. Edytuj czynność: koszt `125,50` (sprawdza trwałość `UPDATE`, nie tylko `INSERT`).
5. Dodaj drugą czynność „Próba” i usuń ją z potwierdzeniem (sprawdza trwałość `DELETE`).
6. Sprawdź przed restartem: „Kompresor”, następny przegląd 2027-05-20 (2026-11-21 + 180 dni).
7. Zamknij proces aplikacji: iOS przesunięcie w przełączniku aplikacji (na symulatorze `xcrun simctl terminate <udid> <bundle>`), Android „Wymuś zatrzymanie” w ustawieniach aplikacji. Opcjonalnie uruchom ponownie telefon.
8. Uruchom aplikację ponownie.

Oczekiwany wynik: na liście jest „Kompresor” z „Następny przegląd: 2027-05-20”; w szczegółach jedna czynność „Wymiana filtra, 2026-11-21 · 125,50 zł”; czynności „Próba” nie ma. Wynik negatywny dowolnego punktu (brak rekordu, koszt 120,00 zł, „Próba” wróciła) oznacza, że któraś operacja działała tylko w pamięci. Ten sam scenariusz wykonałem w teście M5 sprawozdania projektowego na danych „Wiertarka Bosch”.

**Obsługa błędów i testowalność:**

*Nieudany zapis* (np. pełny dysk, urządzenie usunięte w międzyczasie, `UPDATE` bez pasującego wiersza): formularz się nie zamyka, pokazuje `Alert` „Błąd zapisu” z krótką przyczyną, wpisane dane zostają, a przycisk „Zapisz” wraca do aktywnego stanu, więc można ponowić. Formularz zamyka się tylko po potwierdzonym zapisie, bo cichy brak zapisu jest najgorszym wynikiem: opiekun byłby przekonany, że przegląd jest zaewidencjonowany.

*Niepoprawne dane* (koszt `-5`, data `2026-02-30`, pusty opis): baza nie jest używana; pod każdym błędnym polem jest komunikat, który mówi, jaka wartość jest poprawna; wszystkie błędy naraz, żeby nie zapisywać kilka razy. Ograniczenia `CHECK` w bazie odrzucą błędne dane także wtedy, gdy walidacja w kodzie zostanie pominięta.

*Testowalność:* gdyby reguły były tylko w kodzie widoku, trudne do przetestowania byłyby:

- obliczenie następnego przeglądu na granicach (31 stycznia + 30 dni, przejście przez koniec roku, rok przestępny), bo każdy przypadek wymagałby wypełnienia formularza na symulatorze i odczytania ekranu; teraz to jedna linijka `expect(nextReviewDate("2026-12-15", 30)).toBe("2027-01-14")`;
- precyzja kwot (`0,1` → `10` groszy, `1,234` odrzucone), bo wymagałaby renderowania ekranu i atrapy bazy;
- spójność reguły między dodawaniem i edycją: przy dwóch kopiach `if` w dwóch ekranach testy jednego ekranu nie mówią nic o drugim;
- reguła BR-04: test wymagałby zbudowania ekranu, nawigacji i bazy, zamiast wywołania `removeDevice` na danych testowych.

Obecnie 11 testów reguł w `src/domain.test.ts` wykonuje się w mniej niż 50 ms bez symulatora.

## Źródła i samodzielność opracowania

Podaj **co najmniej trzy źródła**, w tym **minimum dwa fragmenty oficjalnej dokumentacji** (tytuł, adres, data dostępu). Wskaż, do którego zadania każde źródło zostało wykorzystane (w tym AI, jeśli użyto).

1. [1] React, „Reacting to Input with State”, https://react.dev/learn/reacting-to-input-with-state, dostęp 2026-11-21 (dokumentacja oficjalna). T1 (zmiana 2), T2: porównanie imperatywnej i deklaratywnej obsługi formularza, cytat o „wykładniczo” rosnącej trudności ręcznej manipulacji UI, opis ekranu przez stany wizualne.
2. [2] React, „useState”, https://react.dev/reference/react/useState, dostęp 2026-11-21 (dokumentacja oficjalna). T2 (trudność 2): wartość początkowa jest ignorowana po pierwszym renderze.
3. [3] Android Developers, „Thinking in Compose”, https://developer.android.com/develop/ui/compose/mental-model, dostęp 2026-11-21 (dokumentacja oficjalna). T1 (zmiana 2), T2: ręczna manipulacja widokami zwiększa ryzyko błędów, dana w kilku miejscach, koszt ponownego generowania ekranu.
4. [4] Flutter, „Introduction to declarative UI”, https://docs.flutter.dev/get-started/flutter-for/declarative, dostęp 2026-11-21 (dokumentacja oficjalna). T2: imperatywne `b.setColor(red)`, `b.add(c3)` w porównaniu z opisem `ViewB(color: red, child: ViewC())`.
5. [5] MDN Web Docs, „Ajax”, https://developer.mozilla.org/en-US/docs/Glossary/AJAX, dostęp 2026-11-21. T1 (zmiana 1): aktualizacja części strony bez pełnego przeładowania, `fetch()` zamiast `XMLHttpRequest`.
6. [6] Expo, „Store data”, https://docs.expo.dev/develop/user-interface/store-data/, dostęp 2026-11-21 (dokumentacja oficjalna). T5: opcje przechowywania w Expo; Async Storage jako nieszyfrowany magazyn dla ustawień i stanu aplikacji, `expo-sqlite` jako baza.
7. [7] SQLite, „SQLite Foreign Key Support”, https://www.sqlite.org/foreignkeys.html, dostęp 2026-11-21 (dokumentacja oficjalna). T4, T5: klucze obce są domyślnie wyłączone, znaczenie `RESTRICT`, `CASCADE`, `SET NULL`.
8. [8] SQLite, „Appropriate Uses For SQLite”, https://www.sqlite.org/whentouse.html, dostęp 2026-11-21 (dokumentacja oficjalna). T5: SQLite jako format danych aplikacji na urządzeniach bez administracji („SQLite competes with fopen()”).
9. Własny kod i testy MaintenanceLog (`src/`, `reports/lab-03.md`). T2–T5: przykłady, liczby z testów (11 testów, poniżej 50 ms) i scenariusze błędów sprawdzone na symulatorze.
10. Claude Code (Anthropic), narzędzie AI. Pomoc w doborze przykładów i redakcji tekstu; cytaty i fakty sprawdzone w źródłach [1]–[8], liczby z własnych uruchomień.

**Które stwierdzenie z materiałów źródłowych zweryfikowano w innym źródle i dlaczego?**

Stwierdzenie z dokumentacji React [1], że ręczna, imperatywna manipulacja UI „działa w izolowanych przykładach, ale staje się wykładniczo trudniejsza” w złożonych systemach. Zweryfikowałem je w dokumentacji Jetpack Compose [3] i Fluttera [4], bo źródło [1] pisze zespół, który promuje własny framework deklaratywny, więc mogło przesadzać. Google (dwa niezależne frameworki, inny język i platforma) opisuje ten sam problem konkretniej: dana widoczna w kilku miejscach, z których o jednym łatwo zapomnieć, oraz aktualizacja węzła, który właśnie usunięto z ekranu; złożoność utrzymania rośnie z liczbą widoków do aktualizacji. Compose dodaje też koszt, którego strona React w tym miejscu nie eksponuje: ponowne generowanie ekranu zużywa czas i baterię, dlatego framework musi pomijać niezmienione części. Wniosek: zgadzam się z kierunkiem stwierdzenia, ale słowo „wykładniczo” traktuję jako uproszczenie; rzeczywisty wzrost zależy od liczby miejsc, w których widoczna jest ta sama dana. W MaintenanceLog są to trzy miejsca dla daty czynności, co potwierdziło się w teście M3.
