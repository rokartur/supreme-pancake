import { useLocalSearchParams } from "expo-router";

import { ServiceActionForm } from "@/components/service-action-form";
import { todayIsoDate } from "@/domain";
import { addServiceAction } from "@/maintenance";

export default function NewServiceActionScreen() {
  const { deviceId } = useLocalSearchParams<{ deviceId: string }>();
  return (
    <ServiceActionForm
      initial={{ date: todayIsoDate(), description: "", cost: "" }}
      save={(form) => addServiceAction(deviceId, form)}
    />
  );
}
