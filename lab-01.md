# Laboratorium 1 — Technologie mobilne i środowisko programistyczne

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Semestr:** 7, studia I stopnia  
**Forma:** indywidualne ćwiczenia, dyskusja, praca nad projektem semestralnym 

## 1. Cele i rezultaty

Po laboratorium student:
1. Wyjaśnia różnice między React Native, Flutter i NativeScript, w tym język, model UI, dostęp do API platform i narzędzia.
2. Porównuje technologie według wymagań funkcjonalnych i niefunkcjonalnych, bez arbitralnego rankingu „najlepszy framework”.
3. Uzasadnia wybór jednego frameworka do indywidualnego projektu MOB-001–MOB-050.
4. Konfiguruje środowisko, uruchamia minimalną aplikację na emulatorze/symulatorze lub urządzeniu fizycznym.
5. Zakłada repozytorium Git, tworzy Issue, gałąź roboczą i Pull Request.
6. Dokumentuje wykonane działania oraz napotkane problemy w sprawozdaniu.

**Warunek wejściowy:** otrzymana indywidualna karta biznesowa i wspólne `requirements.md` oraz `CONTRIBUTING.md`. Przed zajęciami zaleca się zainstalowanie Git, edytora i narzędzi wymaganych przez wybraną platformę. Instalacja Android SDK/Xcode może potrwać dłużej niż laboratorium.


## 2. Zagadnienia do przygotowania

- **React Native:** JavaScript/TypeScript, React, natywne komponenty platform, ekosystem narzędzi (np. Expo).
- **Flutter:** Dart, widgety i własny mechanizm renderowania, pakiety, narzędzia diagnostyczne.
- **NativeScript:** JavaScript/TypeScript, dostęp do natywnych API i natywne widoki.
- **Porównywanie:** kompetencje zespołu, koszt utrzymania, ekosystem, integracje sprzętowe, testowalność, dostępność, rozmiar i wydajność aplikacji; unikanie twierdzeń bez danych.
- **Narzędzia:** VS Code, Android Studio/Android SDK, Xcode (macOS), emulatory i urządzenia, menedżery pakietów, debugowanie.
- **Git:** repozytorium, commit, branch, merge, remote, Issue, Pull Request; różnica między historią Git a kopią plików.

## 3. Zadanie 1: analiza trzech frameworków

Utwórz `docs/technology-comparison.md` i porównaj wszystkie trzy technologie.

**Obowiązkowe kryteria:** język, sposób tworzenia/renderowania UI, dostęp do natywnych API, wsparcie Android/iOS, narzędzia, testowanie, ekosystem, ograniczenia. Dla każdego kryterium podaj krótkie uzasadnienie, a nie tylko ocenę 1–5. Zaznacz, co jest faktem potwierdzonym w dokumentacji, a co własną oceną.

**Pytania kontrolne:**
1. Dlaczego React Native nie jest tym samym co aplikacja webowa w WebView?
2. Czym różni się podejście Fluttera do interfejsu od React Native?
3. Co oznacza dostęp do natywnego API w NativeScript?
4. Dlaczego liczba pobrań biblioteki nie wystarcza do oceny ryzyka technologicznego?

**Kryterium ukończenia:** porównanie zawiera wszystkie trzy technologie, co najmniej osiem kryteriów i odnośniki do dokumentacji źródłowej.

## 4. Dyskusja: wybór technologii w warunkach ograniczeń

**Przypadek:** czteroosobowy zespół zna TypeScript i React. Ma w sześć miesięcy stworzyć aplikację Android/iOS z aparatem, geolokalizacją i trybem offline. Budżet jest ograniczony; aplikacja ma być utrzymywana przez dwa lata.

Przygotuj samodzielnie decyzję (2 min), następnie porównaj argumenty w grupie. Rozważ: kompetencje, dostępność bibliotek, ryzyko integracji natywnych, testy, koszt utrzymania i alternatywy. **Nie ma jednej obowiązkowej odpowiedzi.**

Do sprawozdania wpisz: wybrany framework, dwa argumenty za, jedno ryzyko oraz warunek, przy którym zmienił(a)byś decyzję.

## 5. Zadanie 2: decyzja dla własnego projektu

1. Przeczytaj przypisaną kartę `MOB-XXX`.
2. Wypisz co najmniej trzy wymagania biznesowe wpływające na implementację (np. lokalna trwałość, obliczenia, formularze).
3. Porównaj dwie realistyczne opcje technologiczne, uwzględniając wszystkie trzy w Zadaniu 1.
4. Wybierz **jedną** z: React Native, Flutter, NativeScript.
5. Utwórz `docs/technology-decision.md` w układzie:

```md
# ADR-001: Wybór frameworka
## Kontekst i wymagania
## Rozważone alternatywy
## Decyzja
## Uzasadnienie (co najmniej 3 argumenty)
## Konsekwencje i ryzyka (co najmniej 2)
## Warunki ponownego rozpatrzenia decyzji
```

**Kryterium ukończenia:** decyzja wynika z wymagań projektu, a nie wyłącznie z osobistych preferencji.

## 6. Zadanie 3: środowisko i uruchomienie

Wybierz instrukcję oficjalną odpowiednią dla technologii:

- React Native: https://reactnative.dev/docs/environment-setup (dopuszczalna ścieżka Expo: https://docs.expo.dev/get-started/create-a-project/).
- Flutter: https://docs.flutter.dev/get-started/install.
- NativeScript: https://docs.nativescript.org/setup/.

**Kroki wspólne:**
1. Sprawdź wersje Git, runtime/SDK i narzędzi wymaganych przez wybraną technologię.
2. Utwórz nowy projekt zgodnie z oficjalną instrukcją (nie kopiuj gotowej aplikacji CRUD).
3. Uruchom aplikację na Androidzie **lub** iOS, w emulatorze/symulatorze lub na urządzeniu.
4. Zmień widoczny tekst startowego ekranu na nazwę własnego projektu `MOB-XXX`.
5. Uruchom ponownie aplikację po zmianie i sprawdź, czy ekran został zaktualizowany.
6. Zapisz w `README.md`: wymagane narzędzia i wersje, polecenia instalacji/uruchomienia, docelową platformę oraz znane ograniczenia.
7. Udokumentuj rezultat zrzutem ekranu (bez danych osobowych i sekretów).

**Kryterium ukończenia:** uruchomiona aplikacja i instrukcja umożliwiająca odtworzenie uruchomienia. Sam zrzut ekranu nie zastępuje demonstracji.

## 7. Zadanie 4: Git i organizacja pracy

1. Utwórz indywidualne repozytorium z gałęzią `main` i właściwym `.gitignore`.
2. Dodaj kod projektu i dokumentację; wykonaj pierwszy commit.
3. Utwórz Issue: „Przygotowanie środowiska i ekranu startowego”, z kryteriami akceptacji.
4. Utwórz gałąź `feature/initial-screen` i na niej zmień ekran startowy (jeśli zmiana była wykonana wcześniej, odtwórz ją na tej gałęzi).
5. Wykonaj commit, opublikuj gałąź i utwórz Pull Request do `main`.
6. W opisie PR podaj cel, sposób testowania, powiązane Issue i zrzut ekranu; wykonaj samoocenę zmian.
7. Scal PR i sprawdź historię Git.

Przykładowe polecenia (dopasuj do własnego repozytorium):

```bash
git init
git branch -M main
git status
git add .
git commit -m "chore: initialize mobile project"
git switch -c feature/initial-screen
# zmień ekran aplikacji
git add .
git commit -m "feat: customize initial screen"
git push -u origin feature/initial-screen
```

Przed `git push` skonfiguruj repozytorium zdalne (`git remote add origin ...`) i opublikuj `main`; PR można utworzyć w interfejsie hostingu. Nie dodawaj do repozytorium tokenów ani plików z sekretami.

**Kryterium ukończenia:** prowadzący ma dostęp do repozytorium, istnieje Issue i scalony PR, a `main` zawiera działający szkielet aplikacji.

## 8. Rezultaty do oddania

- Repozytorium projektu z dostępem dla prowadzącego.
- `README.md` z instrukcją uruchomienia.
- `docs/technology-comparison.md`.
- `docs/technology-decision.md`.
- `reports/lab-01.md` według udostępnionego szablonu.
- Dowód uruchomienia i odnośniki do Issue, PR oraz commitów.

**Termin:** zgodnie z terminem ogłoszonym przez prowadzącego. Zadania z kolejnych laboratoriów rozwijają to samo repozytorium.

## 9. Ocena — 10 punktów

| Obszar | Punkty |
|---|---:|
| Porównanie frameworków: trafność i źródła | 2 |
| Decyzja technologiczna (ADR): zgodność z wymaganiami i argumentacja | 2 |
| Środowisko, uruchomienie i powtarzalna instrukcja | 2 |
| Git: Issue, gałąź, PR, historia | 2 |
| Sprawozdanie: forma, dowody, problemy, wnioski | 2 |
| **Razem** | **10** |

**Samodzielność:** na prośbę prowadzącego student wyjaśnia fragment konfiguracji, decyzję lub historię zmian. Korzystanie z AI dokumentuje zgodnie ze wspólnymi zasadami projektu; nie zastępuje ono samodzielnej weryfikacji.

## 11. Lista kontrolna

- [ ] Porównałem(-am) trzy technologie na podstawie źródeł.
- [ ] Powiązałem(-am) wybór frameworka z wymaganiami MOB-XXX.
- [ ] Uruchomiłem(-am) aplikację na docelowej platformie.
- [ ] Udokumentowałem(-am) instalację i uruchomienie.
- [ ] Utworzyłem(-am) Issue, gałąź i scalony PR.
- [ ] Oddałem(-am) sprawozdanie z dowodami i wnioskami.
