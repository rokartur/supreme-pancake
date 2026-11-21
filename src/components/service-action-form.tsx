import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { FormField, Screen, SubmitButton } from "@/components/ui";
import type { FieldErrors, ServiceActionInput } from "@/domain";
import type { addServiceAction } from "@/maintenance";

type ServiceActionFormProps = {
  initial: ServiceActionInput;
  save: (form: ServiceActionInput) => ReturnType<typeof addServiceAction>;
};

export function ServiceActionForm({ initial, save }: ServiceActionFormProps) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors<ServiceActionInput>>({});
  const [saving, setSaving] = useState(false);

  async function submit() {
    setSaving(true);
    try {
      const result = await save(form);
      setErrors(result.errors);
      if (result.id) router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd zapisu", "Nie udało się zapisać czynności. Sprawdź, czy urządzenie i czynność nadal istnieją.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <FormField
        label="Data (RRRR-MM-DD)"
        defaultValue={form.date}
        onChangeText={(date) => setForm({ ...form, date })}
        keyboardType="numbers-and-punctuation"
        error={errors.date}
      />
      <FormField
        label="Opis"
        defaultValue={form.description}
        onChangeText={(description) => setForm({ ...form, description })}
        placeholder="np. Wymiana szczotek"
        multiline
        error={errors.description}
      />
      <FormField
        label="Koszt (zł)"
        defaultValue={form.cost}
        onChangeText={(cost) => setForm({ ...form, cost })}
        keyboardType="decimal-pad"
        placeholder="np. 49,99"
        error={errors.cost}
      />
      <SubmitButton saving={saving} onPress={submit} />
    </Screen>
  );
}
