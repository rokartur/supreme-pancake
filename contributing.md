# CONTRIBUTING.md — zasady realizacji projektu semestralnego

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Studia:** I stopnia, semestr 7  
**Tryb:** projekt indywidualny  
**Dopuszczone technologie:** React Native, Flutter, NativeScript

## 1. Cel dokumentu

Dokument określa obowiązkowy sposób organizacji pracy nad indywidualną aplikacją mobilną CRUD. Obowiązuje niezależnie od wybranego frameworka i tematu biznesowego. Uzupełnia wspólny dokument `requirements.md` i indywidualną specyfikację biznesową. W razie rozbieżności merytorycznych należy zgłosić je prowadzącemu przed implementacją.

Ocena uwzględnia **zarówno działającą aplikację, jak i udokumentowany proces jej wytwarzania**. Nie jest wymagane stosowanie rozbudowanego GitFlow ani sztuczne mnożenie commitów.

## 2. Repozytorium i dostęp

1. Projekt jest wykonywany **indywidualnie** w jednym repozytorium Git.
2. Repozytorium musi być dostępne do wglądu prowadzącemu przez cały okres realizacji (np. poprzez zaproszenie do repozytorium prywatnego i nadanie odpowiednich uprawnień).
3. Główną gałęzią jest `main`; powinna zawierać wersję stabilną.
4. Należy dodać `.gitignore` właściwy dla technologii, nie umieszczać w repozytorium plików generowanych, cache, lokalnych konfiguracji IDE ani danych uwierzytelniających.
5. Nie wolno umieszczać sekretów, tokenów, kluczy prywatnych ani danych osobowych użytkowników w kodzie, commitach, Issues i sprawozdaniach. W przypadku przypadkowego ujawnienia sekretu należy go unieważnić i zgłosić incydent prowadzącemu.
6. Dozwolone są biblioteki zewnętrzne, ale ich zastosowanie musi być uzasadnione, a zależności możliwe do odtworzenia z pliku lockfile (jeśli narzędzie go używa).
7. Domyślnym językiem przy nazewnictwie: plików, folderów, zmiennych, commitów, branchy, jest język angielski.

## 3. Zalecana struktura repozytorium

```text
root/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── pull_request_template.md
├── docs/
│   ├── architecture.md
│   ├── technology-decision.md
│   ├── testing.md
│   └── security.md
├── reports/
│   ├── lab-01.md
│   ├── lab-02.md
│   ├── lab-03.md
│   └── lab-04.md
├── src/                 # albo lib/ / app/ zgodnie z frameworkiem
├── tests/               # albo katalog testów właściwy dla frameworka
├── README.md
├── requirements.md      # odwołanie/kopia wymagań wspólnych
├── CONTRIBUTING.md
└── .gitignore
```

Struktura katalogów aplikacji ma być zgodna z konwencjami wybranej technologii; nie należy tworzyć pustych katalogów tylko dla zgodności z przykładem.

## 4. Zadania (Issues) i organizacja pracy

Każda większa funkcjonalność, poprawka lub zadanie dokumentacyjne powinny mieć Issue. Minimum wymaganych pól:

- **Tytuł:** krótki i konkretny, np. `Implementacja walidacji formularza wydatku`.
- **Opis:** cel i zakres prac.
- **Powiązanie:** identyfikator wymagania biznesowego lub technicznego, jeśli istnieje.
- **Kryteria ukończenia:** weryfikowalne punkty.
- **Typ:** `feature`, `bug`, `docs`, `test` lub `chore` (etykiety albo prefiks tytułu).

Zalecany przepływ: `To do → In progress → Review → Done`. 

W pracy indywidualnej etap Review oznacza samodzielną kontrolę zmian, a nie fikcyjną recenzję innej osoby. Issue należy zamknąć po scaleniu i weryfikacji rozwiązania.

### Szablon Issue

```md
## Cel

## Powiązane wymaganie

## Zakres prac
- [ ] ...

## Kryteria akceptacji
- [ ] ...

## Uwagi / ryzyka
```

## 5. Gałęzie i przebieg pracy

Dla każdej istotnej funkcjonalności należy utworzyć krótkotrwałą gałąź od aktualnego `main`:

- `feature/<opis>` — nowa funkcjonalność;
- `fix/<opis>` — poprawka błędu;
- `docs/<opis>` — dokumentacja;
- `test/<opis>` — testy;
- `chore/<opis>` — prace techniczne.

Przykłady: `feature/expense-form`, `fix/delete-validation`, `docs/architecture`.

**Standardowy cykl:**

1. Utwórz lub wybierz Issue.
2. Zaktualizuj `main` i utwórz gałąź roboczą.
3. Implementuj zmianę w logicznych, możliwych do wyjaśnienia commitach.
4. Uruchom lokalne testy i analizę statyczną.
5. Otwórz Pull Request do `main` i wykonaj samoocenę na podstawie checklisty.
6. Upewnij się, że CI zakończyło się sukcesem.
7. Scal Pull Request; zamknij powiązane Issue.
8. Sprawdź działanie aplikacji po scaleniu.

Nie wolno przepisywać historii `main` w celu ukrycia wcześniejszych etapów prac. Dopuszczalne jest poprawianie historii własnej gałęzi przed scaleniem, o ile nie utrudnia to weryfikacji postępu.

## 6. Commity

Wymagane są czytelne, tematyczne commity. Zalecany format zgodny z Conventional Commits:

```text
<type>(<scope>): <krótki opis>
```

Dozwolone typy: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`.

Przykłady:

```text
feat(expenses): add expense creation form
fix(validation): reject negative amounts
test(expenses): cover delete operation
ci: run static checks and unit tests
```

Commit powinien opisywać **co** zmieniono; należy unikać komunikatów `update`, `fix stuff`, `final` i zbiorczych commitów obejmujących cały semestr. Nie ustala się sztucznej minimalnej liczby commitów — liczy się ciągłość i jakość historii.

## 7. Pull Requesty i samoocena zmian

**Minimum: dwa merytoryczne Pull Requesty** w trakcie semestru, dotyczące implementacji funkcjonalności, nie wyłącznie kosmetycznych zmian. Zaleca się korzystanie z PR przy każdej większej funkcjonalności.

Opis PR powinien zawierać:

- cel i zakres zmian;
- powiązane Issue i wymagania;
- sposób przetestowania;
- wyniki testów i CI;
- zrzuty ekranu lub krótkie nagranie, jeśli zmienia się UI;
- znane ograniczenia.

### Szablon Pull Requesta

```md
## Cel zmiany

## Powiązane Issue / wymagania
Closes #...

## Zmiany
- ...

## Weryfikacja
- [ ] Aplikacja uruchamia się lokalnie
- [ ] Testy automatyczne przechodzą
- [ ] Analiza statyczna przechodzi
- [ ] Sprawdzono scenariusze błędne i brzegowe
- [ ] Zaktualizowano dokumentację, jeśli potrzeba

## Dowody działania

## Ograniczenia / uwagi
```

Student wykonuje **self-review**: sprawdza diff, usuwa niepotrzebny kod, weryfikuje wymagania i opisuje kompromisy. Nie należy deklarować recenzji wykonanej przez inną osobę, jeśli taka nie miała miejsca.

## 8. Standardy implementacji

1. Kod musi być czytelny i spójny ze standardami wybranego frameworka.
2. Logika biznesowa powinna być oddzielona od komponentów UI w zakresie uzasadnionym rozmiarem projektu.
3. Warstwa dostępu do danych musi być wydzielona i możliwa do testowania.
4. Formularze wymagają walidacji; błędy powinny być komunikowane użytkownikowi.
5. Należy obsłużyć puste listy, błędne dane i niepowodzenia operacji.
6. Nie należy dodawać bibliotek ani wzorców architektonicznych bez uzasadnienia.
7. Zmiany strukturalne powinny zostać odzwierciedlone w `docs/architecture.md`.
8. W kodzie i dokumentacji należy stosować jednolite nazewnictwo. Język kodu i commitów może być angielski; dokumentację i sprawozdania można przygotować po polsku.

## 9. Testy i CI

Wymagane są **minimum 5 sensownych testów automatycznych** obejmujących reguły biznesowe i operacje CRUD zgodnie z `requirements.md`. Testy nie mogą sprowadzać się wyłącznie do sprawdzenia, czy komponent się renderuje.

Należy także opisać scenariusze manualne dla podstawowych ścieżek użytkownika. Przed scaleniem PR student powinien uruchomić dostępne kontrole lokalnie.

Pipeline CI musi uruchamiać się przynajmniej dla Pull Requestów do `main` i wykonywać:

1. Instalację zależności.
2. Analizę statyczną lub sprawdzenie formatowania właściwe dla frameworka.
3. Testy automatyczne.

Nie jest wymagane publikowanie aplikacji w sklepach ani automatyczne budowanie artefaktów na wszystkich platformach. Jeśli wybrane narzędzia wymagają systemu macOS lub innych zasobów, ograniczenie należy opisać; podstawowy CI nadal musi być działający.

## 10. Dokumentacja i sprawozdania

`README.md` powinien umożliwiać prowadzącemu uruchomienie aplikacji bez zgadywania konfiguracji. Musi zawierać: opis projektu, wybrany framework i wersje narzędzi, wymagania środowiskowe, instrukcję instalacji, uruchomienia i testowania, zakres funkcji oraz znane ograniczenia.

Dokumentacja techniczna obejmuje co najmniej:

- `docs/technology-decision.md` — porównanie technologii i uzasadnienie wyboru;
- `docs/architecture.md` — komponenty, przepływ danych, przechowywanie i zarządzanie stanem;
- `docs/testing.md` — zakres testów i instrukcję uruchomienia;
- `docs/security.md` — dane, uprawnienia, ryzyka i podstawowe środki ochrony.

Po każdym z czterech laboratoriów student zapisuje sprawozdanie `reports/lab-0X.md` obejmujące: cel, wykonane zadania, dowody działania, napotkane problemy, rozwiązania, wnioski i odnośniki do Issue/PR/commitów. Sprawozdanie ma opisywać **własne wyniki**, a nie przepisywać definicje.

## 11. Kamienie milowe

| Termin | Oczekiwany stan | Dowód w repozytorium |
|---|---|---|
| Po laboratorium 1 | Wybór technologii, uruchomiony szkielet aplikacji | README, decyzja technologiczna, historia Git, `lab-01.md` |
| Po laboratorium 2 | Architektura, modele danych, nawigacja i początek CRUD | Diagram/opis architektury, kod, `lab-02.md` |
| Po laboratorium 3 | Działający CRUD, walidacja, trwałość danych | Kod, testy/scenariusze, `lab-03.md` |
| Po laboratorium 4 | Testy automatyczne, CI, audyt jakości i prywatności | Wyniki CI, dokumentacja, `lab-04.md` |
| Laboratorium 5 | Wersja do prezentacji i obrony | Stabilny `main`, oznaczona wersja, instrukcja uruchomienia |

Po zakończeniu projektu należy oznaczyć wersję prezentowaną na zaliczeniu tagiem np. `v1.0.0`. Po terminie oddania zmiany należy wprowadzać wyłącznie zgodnie z zasadami ogłoszonymi przez prowadzącego.

## 12. Korzystanie z narzędzi AI i źródeł zewnętrznych

Korzystanie z AI jest dopuszczalne jako wsparcie w nauce, analizie problemów, wyszukiwaniu błędów i przygotowaniu rozwiązań, o ile prowadzący nie określi inaczej dla konkretnego zadania. Student ponosi pełną odpowiedzialność za kod i dokumentację.

W `docs/ai-usage.md` należy odnotować istotne użycia AI: narzędzie, zakres wsparcia, sposób weryfikacji rezultatu i ewentualne ograniczenia. Nie trzeba dokumentować każdej drobnej korekty językowej.

Zabronione jest przedstawianie cudzego projektu jako własnego, kopiowanie prac innych studentów oraz deklarowanie testów lub wyników, których faktycznie nie przeprowadzono. Podczas obrony student musi potrafić wyjaśnić kod i samodzielnie wykonać niewielką modyfikację.

Należy przestrzegać licencji wykorzystywanych bibliotek, grafik i fragmentów kodu oraz podawać źródła materiałów zewnętrznych.

## 13. Checklista przed oddaniem

- [ ] Wszystkie obowiązkowe wymagania biznesowe i techniczne są zrealizowane.
- [ ] Aplikacja uruchamia się zgodnie z README.
- [ ] CRUD działa, dane są trwałe, formularze walidują dane.
- [ ] Repozytorium zawiera czytelną historię zmian i minimum dwa merytoryczne PR.
- [ ] Issues dokumentują główne zadania.
- [ ] Minimum pięć testów automatycznych przechodzi.
- [ ] CI kończy się sukcesem.
- [ ] Dokumentacja techniczna jest aktualna.
- [ ] Wszystkie cztery sprawozdania są dostępne.
- [ ] Nie ma sekretów ani danych wrażliwych w repozytorium.
- [ ] Wykorzystanie AI i materiałów zewnętrznych zostało ujawnione zgodnie z zasadami.
- [ ] Oznaczono wersję prezentowaną na zaliczeniu.
- [ ] Student potrafi zademonstrować i wyjaśnić działanie aplikacji.

## 14. Kryteria oceny procesu

Prowadzący ocenia w szczególności: regularność pracy, jakość podziału zadań, sensowność commitów, kompletność opisów PR, jakość testów, skuteczność CI, aktualność dokumentacji oraz umiejętność wyjaśnienia podjętych decyzji. Sama liczba commitów, Issues lub PR **nie podnosi oceny**, jeśli nie przekłada się na jakość procesu i projektu.