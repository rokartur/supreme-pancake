# Specyfikacje biznesowa 50
**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Poziom:** studia I stopnia, semestr 7  
**Data:** 2026-10-18

## Zasady wspólne i interpretacja
- Każda aplikacja realizuje pełny CRUD **głównej encji podrzędnej** (druga encja w karcie) oraz co najmniej tworzenie, odczyt i edycję encji nadrzędnej; usuwanie nadrzędnej encji musi mieć zdefiniowaną politykę dla istniejących rekordów zależnych (np. blokada usunięcia).
- Wymagane są: lista, szczegóły, formularz, wyszukiwanie po nazwie/tytule, filtr po atrybucie domenowym, sortowanie po dacie/nazwie oraz trwały zapis lokalny.
- Wszystkie identyfikatory są lokalnymi UUID; pola oznaczone `?` są opcjonalne. Wymagane są też pola techniczne `id` i klucz obcy encji podrzędnej. Kwoty przechowuje się jako wartości dziesiętne, a nie binarne float; daty i strefy czasowe obsługuje się spójnie.
- Minimum trzy walidacje domenowe: wymagane nazwy, ograniczenia typów/zakresów oraz reguła specyficzna z karty. Co najmniej jedna reguła biznesowa musi mieć automatyczny test pozytywny i negatywny.
- Zakres: jedna osoba, dane lokalne, bez backendu, logowania, płatności i integracji zewnętrznych. Dane demonstracyjne są fikcyjne. Dodatkowe rozszerzenia są przekazywane dopiero w późniejszym laboratorium i nie wchodzą do podstawowego zakresu.
- Kryteria akceptacji są przykładowymi scenariuszami obowiązkowymi; nie zastępują testów całego CRUD ani testów sytuacji pustych/błędnych.

## MOB-050 – MaintenanceLog
**Kontekst i problem:** Planowanie okresowych przeglądów sprzętu. Brak uporządkowanej ewidencji utrudnia przegląd informacji i podejmowanie decyzji.  
**Użytkownik docelowy:** opiekun urządzeń.  
**Cel biznesowy:** Umożliwić prowadzenie ewidencji „czynność serwisowa” w kontekście „urządzenie”, kontrolę poprawności danych oraz uzyskanie użytecznego podsumowania.

### Model danych
- **Urządzenie** (`id:uuid`; nazwa:text; interwałDni:int).
- **Czynność serwisowa** (`id:uuid`; `parentId:uuid`; data:date; opis:text; koszt:decimal).
- **Relacja:** `Urządzenie (1) → (N) Czynność serwisowa`. Rekord podrzędny musi wskazywać istniejący rekord nadrzędny. Usunięcie nadrzędnego rekordu z powiązaniami jest blokowane z czytelnym komunikatem.

### Wymagania biznesowe
- **MOB-050-FR-01:** Dodawanie, wyświetlanie, edycja i usuwanie rekordów „czynność serwisowa”.
- **MOB-050-FR-02:** Tworzenie, przeglądanie i edycja rekordów „urządzenie”.
- **MOB-050-FR-03:** Przypisywanie każdego rekordu „czynność serwisowa” do wybranego rekordu nadrzędnego.
- **MOB-050-FR-04:** Wyświetlanie listy rekordów wraz z widokiem szczegółów.
- **MOB-050-FR-05:** Wyszukiwanie po nazwie/tytule (dla encji bez takiego pola: po podstawowym polu tekstowym).
- **MOB-050-FR-06:** Filtrowanie po encji nadrzędnej oraz co najmniej jednym polu domenowym, jeżeli występuje; w przeciwnym razie po dacie.
- **MOB-050-FR-07:** Sortowanie według daty lub nazwy; określenie kierunku sortowania.
- **MOB-050-FR-08:** Walidacja pól obowiązkowych, zakresów liczbowych i reguł biznesowych.
- **MOB-050-FR-09:** Prezentowanie komunikatów błędów, pustej listy oraz potwierdzenia usunięcia.
- **MOB-050-FR-10:** Wyliczanie i prezentacja: Następny przegląd = ostatni przegląd + interwał.
- **MOB-050-FR-11:** Zachowanie danych po ponownym uruchomieniu aplikacji.

### Reguły biznesowe
- **MOB-050-BR-01:** Interwał > 0; koszt >= 0.
- **MOB-050-BR-02:** Następny przegląd = ostatni przegląd + interwał.
- **MOB-050-BR-03:** Puste nazwy/tytuły są niedozwolone; wartości liczbowe i daty muszą odpowiadać deklarowanym typom i zakresom.
- **MOB-050-BR-04:** Nie można zapisać rekordu podrzędnego bez istniejącego powiązania; usunięcie rekordu nadrzędnego z zależnościami jest blokowane.

### Kryteria akceptacji (Given–When–Then)
1. **CRUD:** **Mając** utworzony rekord „urządzenie”, **gdy** użytkownik doda poprawny rekord „czynność serwisowa”, **wtedy** jest on widoczny na liście i w szczegółach; po edycji prezentuje nowe wartości, a po potwierdzonym usunięciu znika z listy.
2. **Walidacja:** **Mając** formularz „czynność serwisowa”, **gdy** użytkownik poda wartości sprzeczne z regułą `MOB-050-BR-01`, **wtedy** zapis zostaje zablokowany, a aplikacja pokazuje przyczynę.
3. **Logika domenowa:** **Mając** co najmniej dwa poprawne rekordy testowe, **gdy** użytkownik otworzy podsumowanie, **wtedy** aplikacja wyświetla wynik zgodny z zasadą: Następny przegląd = ostatni przegląd + interwał.
4. **Relacje:** **Mając** rekord „urządzenie” z powiązanym rekordem „czynność serwisowa”, **gdy** użytkownik spróbuje usunąć rekord nadrzędny, **wtedy** operacja zostaje zablokowana z informacją o istniejących zależnościach.
5. **Trwałość:** **Mając** zapisane dane, **gdy** użytkownik zamknie i uruchomi aplikację ponownie, **wtedy** rekordy oraz ich relacje pozostają dostępne.
