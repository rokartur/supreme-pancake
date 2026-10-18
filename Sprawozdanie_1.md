# Sprawozdanie 1 – Budowa aplikacji mobilnych z użyciem technologii frontendowych

**Imię i nazwisko studenta:**  Artur Rok
**Grupa:**  43_Inf_FD_NW_7
**Data:**  18.10.2026


## Temat zajęć
**Główne technologie i frameworki frontendowe do budowy aplikacji mobilnych**

Omówienie kluczowych technologii frontendowych wykorzystywanych w tworzeniu aplikacji mobilnych, takich jak **React Native**, **Flutter**, **NativeScript**.  
Porównanie i kontrastowanie tych technologii pod kątem **wydajności**, **łatwości użycia** i **wsparcia społeczności**.  
Omówienie najważniejszych **narzędzi deweloperskich** i **systemów kontroli wersji** (VS Code, Android Studio, Xcode, Git).


## Cele ćwiczenia
1. Zrozumienie różnic między frameworkami React Native, Flutter i NativeScript.  
2. Poznanie podstawowych narzędzi deweloperskich wykorzystywanych w tworzeniu aplikacji mobilnych.  
3. Poznanie zasad pracy zespołowej z wykorzystaniem systemu Git.  
4. Wyciągnięcie wniosków dotyczących doboru technologii do konkretnego typu projektu mobilnego.


## Pytania kontrolne i odpowiedzi

### Technologie i frameworki frontendowe

1. **Jakie są główne różnice między React Native, Flutter i NativeScript?**  
_Odpowiedź:_  
React Native (Meta) używa JavaScript/TypeScript i Reacta, a UI składa z natywnych komponentów platformy. Flutter (Google) używa języka Dart i rysuje cały interfejs własnym silnikiem graficznym. NativeScript używa JavaScript/TypeScript (Angular, Vue, czysty JS), renderuje natywne komponenty i daje bezpośredni dostęp do natywnych API z kodu JS. Najmniejszą społeczność ma NativeScript.

2. **Jak każdy z tych frameworków renderuje interfejs użytkownika na urządzeniach mobilnych?**  
_Odpowiedź:_  
- React Native: komponenty (`View`, `Text`) są mapowane na natywne kontrolki (`UIView`, `android.view.View`) przez warstwę JSI/Fabric.  
- Flutter: nie używa natywnych kontrolek, rysuje każdy piksel na GPU silnikiem Skia/Impeller.  
- NativeScript: tworzy natywne kontrolki bezpośrednio z JavaScriptu przez wygenerowane powiązania do SDK platformy.

3. **Kiedy warto wybrać Fluttera, a kiedy React Native lub NativeScript?**  
_Odpowiedź:_  
Flutter: gdy liczy się identyczny wygląd na wszystkich platformach, własny design i płynne animacje. React Native: gdy zespół zna JavaScript/React, chce współdzielić kod z aplikacją webową i korzystać z ekosystemu npm/Expo. NativeScript: gdy zespół pracuje w Angularze lub Vue i potrzebuje częstego, bezpośredniego dostępu do natywnych API.

4. **Jakie są mocne i słabe strony React Native w porównaniu do Fluttera?**  
_Odpowiedź:_  
Mocne strony: popularny język (JS/TS), ogromny ekosystem npm, natywny wygląd kontrolek, aktualizacje OTA (np. Expo/EAS Update), łatwe przejście z Reacta webowego.  
Słabe strony: wydajność przy złożonych animacjach zwykle gorsza niż we Flutterze, różnice w wyglądzie i zachowaniu między platformami, zależność od bibliotek zewnętrznych o różnej jakości.

5. **Jak Flutter radzi sobie z wydajnością w porównaniu do innych rozwiązań hybrydowych?**  
_Odpowiedź:_  
Bardzo dobrze, często blisko aplikacji natywnych. Kod Dart jest kompilowany AOT do kodu maszynowego, a UI rysuje silnik Skia/Impeller bez WebView i bez mostu do natywnych kontrolek, co daje płynne 60/120 FPS. Jest wyraźnie szybszy od rozwiązań opartych o WebView (Cordova, Ionic). Wadą jest większy rozmiar aplikacji, bo silnik jest dołączony do każdej aplikacji.

6. **Jak NativeScript integruje się z natywnymi API urządzenia?**  
_Odpowiedź:_  
NativeScript przy budowaniu generuje metadane z natywnych SDK (Android i iOS). Dzięki temu w JavaScript/TypeScript można bezpośrednio wywoływać klasy i metody natywne, np. `android.os.Build` czy `UIDevice.currentDevice`, bez pisania wrapperów w Javie, Kotlinie, Objective-C czy Swifcie. Popularne funkcje (aparat, GPS, pliki) są też dostępne jako gotowe pluginy.

7. **Który framework ma obecnie największe wsparcie społeczności i dlaczego?**  
_Odpowiedź:_  
Największe wsparcie mają Flutter i React Native. Flutter prowadzi w liczbie gwiazdek na GitHubie i w ankietach Stack Overflow, bo Google mocno go rozwija i promuje. React Native ma największy ekosystem bibliotek dzięki npm i społeczności React/JavaScript, wspiera go Meta i Expo. NativeScript ma znacznie mniejszą społeczność.

8. **W jakich przypadkach lepiej wybrać framework natywny zamiast hybrydowego?**  
_Odpowiedź:_  
Gdy aplikacja wymaga maksymalnej wydajności (gry, przetwarzanie wideo, AR), głębokiej integracji z systemem (widżety, rozszerzenia, Apple Watch, usługi w tle), natychmiastowego dostępu do nowych API po premierze systemu albo w pełni natywnego wyglądu i zachowania. Natywnie warto pisać też wtedy, gdy aplikacja powstaje tylko na jedną platformę.

9. **Jakie języki programowania są używane w poszczególnych frameworkach?**  
_Odpowiedź:_  
- React Native: JavaScript lub TypeScript (moduły natywne w Kotlinie/Javie i Swifcie/Objective-C).  
- Flutter: Dart.  
- NativeScript: JavaScript lub TypeScript, z Angularem, Vue, Svelte lub bez frameworka.  
- Natywnie: Kotlin/Java (Android), Swift/Objective-C (iOS).

10. **Jak wygląda proces budowania i publikacji aplikacji w każdym z frameworków?**  
_Odpowiedź:_  
We wszystkich trzech schemat jest podobny: budowanie wersji release, podpisanie aplikacji (keystore na Androida, certyfikat i profil na iOS) i wysłanie do Google Play oraz App Store. Na iOS potrzebny jest Xcode na macOS albo usługa w chmurze.  
- React Native: `./gradlew bundleRelease` (Android) i Archive w Xcode (iOS) albo w Expo `eas build` i `eas submit` (budowanie w chmurze), aktualizacje OTA przez `eas update`.  
- Flutter: `flutter build apk`/`appbundle` i `flutter build ipa`.  
- NativeScript: `ns build android --release` i `ns build ios --release`, potem publikacja w sklepach.


### Techniki i narzędzia programistyczne

11. **Jakie funkcje Visual Studio Code są szczególnie przydatne w tworzeniu aplikacji mobilnych?**  
_Odpowiedź:_  
IntelliSense (podpowiedzi i autouzupełnianie), wbudowany debugger z breakpointami, zintegrowany terminal do uruchamiania Metro, Expo czy Fluttera, wbudowana obsługa Gita, rozszerzenia dla frameworków, formatowanie i lint przy zapisie oraz lekkość w porównaniu do pełnych IDE.

12. **Czym różni się Android Studio od Xcode?**  
_Odpowiedź:_  
Android Studio (Google, na bazie IntelliJ) służy do aplikacji na Androida w Kotlinie/Javie. Używa Gradle, ma emulator Androida i działa na Windows, macOS i Linuksie. Xcode (Apple) służy do aplikacji na iOS/macOS w Swifcie/Objective-C. Ma symulator iOS, Interface Builder i narzędzia do podpisywania i wysyłki do App Store, ale działa tylko na macOS.


13. **Jakie rozszerzenia VS Code usprawniają pracę z React Native lub Flutterem?**  
_Odpowiedź:_  
- React Native: Expo Tools, React Native Tools, ESLint, Prettier.  
- Flutter: Flutter i Dart (oficjalne rozszerzenia z hot reload, debugowaniem i DevTools).  
- Ogólne: GitLens, Error Lens, Android iOS Emulator.

14. **Jak przebiega proces debugowania aplikacji mobilnej w VS Code lub Android Studio?**  
_Odpowiedź:_  
Aplikację uruchamia się w trybie debug na emulatorze lub urządzeniu i podłącza debugger. Następnie ustawia się breakpointy, przechodzi kod krok po kroku, podgląda zmienne i stos wywołań oraz czyta logi w konsoli (Logcat w Android Studio). Do tego dochodzą narzędzia frameworków: React Native DevTools, Flutter DevTools (inspektor widgetów, profiler wydajności), a w Android Studio Layout Inspector i Profiler (CPU, pamięć, sieć).

15. **Jakie są zalety używania emulatorów i symulatorów w procesie testowania aplikacji?**  
_Odpowiedź:_  
Nie trzeba mieć wielu fizycznych urządzeń. Można szybko testować różne rozmiary ekranów, wersje systemu i orientację, a także symulować GPS, słabą sieć czy powiadomienia. Emulatory łatwo zresetować i można je uruchamiać w CI. Ograniczenie: nie oddają w pełni wydajności, czujników ani aparatu prawdziwego urządzenia, dlatego końcowe testy robi się na fizycznym sprzęcie.

16. **Jakie problemy mogą wystąpić przy konfiguracji środowiska deweloperskiego i jak je rozwiązać?**  
_Odpowiedź:_  
- Niezgodne wersje Node.js, JDK, Gradle, CocoaPods lub SDK: trzymać się wersji z dokumentacji, użyć menedżera wersji (nvm, fvm) i narzędzi diagnostycznych (`flutter doctor`, `npx expo-doctor`).  
- Brak zmiennych środowiskowych (`ANDROID_HOME`, `JAVA_HOME`, `PATH`): ustawić je w konfiguracji powłoki.  
- Emulator nie startuje: włączyć wirtualizację sprzętową w BIOS, zainstalować obraz systemu w AVD Manager.  
- Błędy podpisywania na iOS: poprawnie wybrać zespół i profil w Xcode.  
- Problemy z cache i zależnościami: wyczyścić cache (`flutter clean`, `npx expo start -c`, usunąć `node_modules`) i zainstalować zależności ponownie.

17. **Jak działa system kontroli wersji Git i dlaczego jest istotny w projektach zespołowych?**  
_Odpowiedź:_  
Git to rozproszony system kontroli wersji: każdy programista ma pełną kopię repozytorium z historią. Zmiany zapisuje się jako commity, a równoległą pracę prowadzi na gałęziach (branch), które potem się scala (merge). W zespole pozwala to pracować jednocześnie nad różnymi funkcjami, śledzić kto i dlaczego coś zmienił, cofać błędne zmiany i rozwiązywać konflikty w kodzie.

18. **Jakie korzyści daje korzystanie z GitHub lub GitLab w pracy zespołowej?**  
_Odpowiedź:_  
Wspólne zdalne repozytorium dostępne dla całego zespołu, pull/merge requesty z code review, zgłoszenia (issues) i tablice zadań, wbudowane CI/CD (GitHub Actions, GitLab CI), kontrola uprawnień i ochrona gałęzi, a także wiki i dokumentacja projektu w jednym miejscu.

19. **Na czym polega workflow oparty o branchowanie, pull requesty i code review?**  
_Odpowiedź:_  
Każda zmiana powstaje na osobnej gałęzi utworzonej z gałęzi głównej (np. `feature/logowanie`). Po skończeniu pracy autor otwiera pull request. CI uruchamia testy i lint, a inni członkowie zespołu przeglądają kod (code review): zgłaszają uwagi, autor poprawia. Po akceptacji i zielonych testach gałąź jest scalana do `main`. Dzięki temu do głównej gałęzi trafia tylko sprawdzony kod.

20. **Jak zintegrować Git z procesem CI/CD w projekcie mobilnym?**  
_Odpowiedź:_  
Pipeline CI/CD (np. GitHub Actions, GitLab CI, Bitrise, EAS Workflows) uruchamia się automatycznie na zdarzenia w Gicie. Przy pull requeście wykonuje lint, testy i budowanie aplikacji. Po scaleniu do `main` lub po utworzeniu tagu wersji buduje podpisaną wersję release (np. `eas build`, `flutter build`, fastlane) i wysyła ją do testerów (TestFlight, Firebase App Distribution) lub do sklepów. Klucze i certyfikaty przechowuje się w sekretach CI, nie w repozytorium.


## Wnioski końcowe

Podsumuj najważniejsze wnioski z ćwiczenia:  
- Który framework wybrałbyś do własnego projektu i dlaczego?  
- Jakie narzędzia najbardziej ułatwiły pracę?  
- Jakie problemy napotkałeś i jak je rozwiązałeś?

_Odpowiedź:_  
- **Wybór frameworka:** do własnego projektu wybrałbym React Native z Expo. Znam JavaScript/TypeScript i Reacta, mam dostęp do ogromnego ekosystemu npm, a Expo upraszcza konfigurację, budowanie w chmurze (EAS) i aktualizacje OTA. Fluttera wybrałbym przy aplikacji z bardzo rozbudowaną grafiką i animacjami, a NativeScript tylko w zespole pracującym w Angularze lub Vue.
- **Narzędzia:** najbardziej pomogły VS Code z rozszerzeniami do React Native i Expo, Expo Go do szybkiego podglądu na telefonie, emulator Androida i symulator iOS oraz Git z GitHubem do wersjonowania i pracy na gałęziach.
- **Problemy i rozwiązania:** główne trudności dotyczyły konfiguracji środowiska: niezgodnych wersji pakietów z wersją Expo SDK i cache bundlera. Rozwiązałem je, instalując pakiety przez `npx expo install` (dobiera zgodne wersje), sprawdzając projekt przez `npx expo-doctor` i czyszcząc cache (`npx expo start -c`).