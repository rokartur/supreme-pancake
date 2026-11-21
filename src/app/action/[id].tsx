import { Button } from "@expo/ui";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

import { LoadState, Message, Row, Screen, Section } from "@/components/ui";
import { formatCost } from "@/domain";
import { deleteServiceAction, getDevice, getServiceAction } from "@/repository";
import { useFocusData } from "@/use-focus-data";

export default function ServiceActionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(async () => {
    const action = await getServiceAction(id);
    const device = action ? await getDevice(action.deviceId) : null;
    return { action, device };
  }, [id]);
  const { data, error, loading } = useFocusData(load);

  if (!data) return <LoadState loading={loading} error={error} />;
  const { action, device } = data;
  if (!action) return <Message text="Nie znaleziono czynności." />;

  const confirmDelete = () =>
    Alert.alert("Usunąć czynność?", `„${action.description}” z dnia ${action.date} zostanie trwale usunięta.`, [
      { text: "Anuluj", style: "cancel" },
      { text: "Usuń", style: "destructive", onPress: remove },
    ]);

  async function remove() {
    try {
      await deleteServiceAction(id);
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd usuwania", "Nie udało się usunąć czynności. Spróbuj ponownie.");
    }
  }

  return (
    <Screen>
      <Section title={action.description}>
        <Row title="Urządzenie" detail={device?.name} />
        <Row title="Data" detail={action.date} />
        <Row title="Koszt" detail={formatCost(action.costCents)} />
      </Section>
      <Section>
        <Button
          label="Edytuj czynność"
          onPress={() => router.push({ pathname: "/action/edit", params: { id: action.id } })}
        />
      </Section>
      <Section>
        <Button label="Usuń czynność" variant="text" onPress={confirmDelete} />
      </Section>
    </Screen>
  );
}
