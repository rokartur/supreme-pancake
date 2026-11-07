import { Button, Text } from "@expo/ui";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

import { LoadState, Message, Row, Screen, Section } from "@/components/ui";
import { formatCost, nextReviewDate } from "@/domain";
import { getDevice, listServiceActions } from "@/repository";
import { useFocusData } from "@/use-focus-data";

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(() => Promise.all([getDevice(id), listServiceActions(id)]), [id]);
  const { data, error, loading } = useFocusData(load);

  if (!data) return <LoadState loading={loading} error={error} />;

  const [device, actions] = data;
  if (!device) return <Message text="Nie znaleziono urządzenia." />;

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
    </Screen>
  );
}
