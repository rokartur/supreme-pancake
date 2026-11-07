import { Button, Text } from "@expo/ui";
import { router } from "expo-router";

import { LoadState, Row, Screen, Section } from "@/components/ui";
import { nextReviewDate } from "@/domain";
import { listDevices } from "@/repository";
import { useFocusData } from "@/use-focus-data";

export default function DeviceListScreen() {
  const { data: devices, error, loading } = useFocusData(listDevices);

  if (!devices) return <LoadState loading={loading} error={error} />;

  // shortcut: Form/LazyColumn rows are not recycled like FlatList, switch to FlatList past a few hundred devices.
  return (
    <Screen>
      <Section title="Urządzenia">
        {devices.length === 0 ? <Text>Brak urządzeń. Dodaj pierwsze urządzenie, aby planować przeglądy.</Text> : null}
        {devices.map((device) => (
          <Row
            key={device.id}
            title={device.name}
            detail={`Następny przegląd: ${nextReviewDate(device.lastServiceDate, device.intervalDays) ?? "brak przeglądów"}`}
            onPress={() => router.push({ pathname: "/device/[id]", params: { id: device.id } })}
          />
        ))}
      </Section>
      <Section>
        <Button label="Dodaj urządzenie" onPress={() => router.push("/device/new")} />
      </Section>
    </Screen>
  );
}
