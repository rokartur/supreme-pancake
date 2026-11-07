import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

import { LoadState, Message, Row, Screen, Section } from "@/components/ui";
import { formatCost } from "@/domain";
import { getDevice, getServiceAction } from "@/repository";
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

  return (
    <Screen>
      <Section title={action.description}>
        <Row title="Urządzenie" detail={device?.name} />
        <Row title="Data" detail={action.date} />
        <Row title="Koszt" detail={formatCost(action.costCents)} />
      </Section>
    </Screen>
  );
}
