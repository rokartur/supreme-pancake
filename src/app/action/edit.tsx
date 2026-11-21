import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

import { ServiceActionForm } from "@/components/service-action-form";
import { LoadState, Message } from "@/components/ui";
import { costText } from "@/domain";
import { editServiceAction } from "@/maintenance";
import { getServiceAction } from "@/repository";
import { useFocusData } from "@/use-focus-data";

export default function EditServiceActionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(async () => ({ action: await getServiceAction(id) }), [id]);
  const { data, error, loading } = useFocusData(load);

  if (!data) return <LoadState loading={loading} error={error} />;
  const { action } = data;
  if (!action) return <Message text="Nie znaleziono czynności." />;

  return (
    <ServiceActionForm
      initial={{ date: action.date, description: action.description, cost: costText(action.costCents) }}
      save={(form) => editServiceAction(id, form)}
    />
  );
}
