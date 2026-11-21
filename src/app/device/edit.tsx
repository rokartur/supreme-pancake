import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

import { DeviceForm } from "@/components/device-form";
import { LoadState, Message } from "@/components/ui";
import { editDevice } from "@/maintenance";
import { getDevice } from "@/repository";
import { useFocusData } from "@/use-focus-data";

export default function EditDeviceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(async () => ({ device: await getDevice(id) }), [id]);
  const { data, error, loading } = useFocusData(load);

  if (!data) return <LoadState loading={loading} error={error} />;
  const { device } = data;
  if (!device) return <Message text="Nie znaleziono urządzenia." />;

  return (
    <DeviceForm
      initial={{ name: device.name, intervalDays: String(device.intervalDays) }}
      save={(form) => editDevice(id, form)}
    />
  );
}
