import { Button, Text } from "@expo/ui";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

import { LoadState, Message, Row, Screen, Section } from "@/components/ui";
import { formatCost, nextReviewDate } from "@/domain";
import { removeDevice } from "@/maintenance";
import { getDevice, listServiceActions } from "@/repository";
import { useFocusData } from "@/use-focus-data";

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(() => Promise.all([getDevice(id), listServiceActions(id)]), [id]);
  const { data, error, loading } = useFocusData(load);

  if (!data) return <LoadState loading={loading} error={error} />;

  const [device, actions] = data;
  if (!device) return <Message text="Nie znaleziono urządzenia." />;

  const showDeleteBlocked = (actionCount: number) =>
    Alert.alert(
      "Nie można usunąć urządzenia",
      `Urządzenie ma powiązane czynności serwisowe (${actionCount}). Usuń je najpierw, aby nie stracić historii przeglądów.`,
    );

  // MOB-050-BR-04: block before asking, removeDevice checks again in case the list on screen is stale.
  const confirmDelete = () => {
    if (actions.length > 0) return showDeleteBlocked(actions.length);
    Alert.alert("Usunąć urządzenie?", `„${device.name}” zostanie trwale usunięte.`, [
      { text: "Anuluj", style: "cancel" },
      { text: "Usuń", style: "destructive", onPress: remove },
    ]);
  };

  async function remove() {
    try {
      const { deleted, actionCount } = await removeDevice(id);
      if (deleted) return router.back();
      showDeleteBlocked(actionCount);
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd usuwania", "Nie udało się usunąć urządzenia. Spróbuj ponownie.");
    }
  }

  return (
    <Screen>
      <Section title={device.name}>
        <Row title="Interwał" detail={`${device.intervalDays} dni`} />
        <Row title="Ostatni przegląd" detail={device.lastServiceDate ?? "brak"} />
        <Row
          title="Następny przegląd"
          detail={nextReviewDate(device.lastServiceDate, device.intervalDays) ?? "dodaj pierwszą czynność"}
        />
      </Section>
      <Section>
        <Button
          label="Dodaj czynność serwisową"
          onPress={() => router.push({ pathname: "/action/new", params: { deviceId: device.id } })}
        />
        <Button
          label="Edytuj urządzenie"
          variant="outlined"
          onPress={() => router.push({ pathname: "/device/edit", params: { id: device.id } })}
        />
      </Section>
      <Section title="Czynności serwisowe">
        {actions.length === 0 ? <Text>Brak czynności dla tego urządzenia.</Text> : null}
        {actions.map((action) => (
          <Row
            key={action.id}
            title={action.description}
            detail={`${action.date} · ${formatCost(action.costCents)}`}
            onPress={() => router.push({ pathname: "/action/[id]", params: { id: action.id } })}
          />
        ))}
      </Section>
      <Section>
        <Button label="Usuń urządzenie" variant="text" onPress={confirmDelete} />
      </Section>
    </Screen>
  );
}
