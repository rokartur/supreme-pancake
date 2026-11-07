import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { FormField, Screen, SubmitButton } from "@/components/ui";
import { type FieldErrors, type ServiceActionInput, todayIsoDate } from "@/domain";
import { addServiceAction } from "@/maintenance";

export default function NewServiceActionScreen() {
  const { deviceId } = useLocalSearchParams<{ deviceId: string }>();
  const [form, setForm] = useState<ServiceActionInput>({ date: todayIsoDate(), description: "", cost: "" });
  const [errors, setErrors] = useState<FieldErrors<ServiceActionInput>>({});
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const result = await addServiceAction(deviceId, form);
      setErrors(result.errors);
      if (result.id) router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd zapisu", "Nie udało się zapisać czynności. Sprawdź, czy urządzenie nadal istnieje.");
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
      <SubmitButton saving={saving} onPress={save} />
    </Screen>
  );
}
