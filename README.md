# MaintenanceLog

Aplikacja mobilna do planowania okresowych przeglądów sprzętu (karta MOB-050). Opiekun urządzeń prowadzi ewidencję urządzeń i czynności serwisowych. Dane są zapisywane lokalnie, bez backendu i logowania.

## Technologia

| Narzędzie | Wersja |
| --- | --- |
| React Native | 0.86.3 |
| Expo SDK | 57 (expo-router 57) |
| React | 19.2.3 |
| TypeScript | 6.0.3 |
| Bun | 1.4.3 |
| Node.js | 26.12.0 |

## Wymagania

- Bun 1.4 lub nowszy (Node.js jest potrzebny dla Expo CLI).
- Telefon z Androidem lub iOS z aplikacją Expo Go dla SDK 57.
- Telefon i komputer w tej samej sieci Wi-Fi.

## Instalacja i uruchomienie

```sh
bun install
bun run start
```

Zeskanuj kod QR: na Androidzie w Expo Go, na iOS aparatem.

## Sprawdzenia

```sh
bunx tsc --noEmit
bunx expo-doctor
```

## Docelowa platforma

Android i iOS przez Expo Go. Demonstracja odbywa się na telefonie.

## Znane ograniczenia

- Expo Go obsługuje tylko moduły z Expo SDK. Własny kod natywny wymaga development builda.
- Gdy sieć blokuje połączenie telefonu z komputerem, użyj `bunx expo start --tunnel`.
