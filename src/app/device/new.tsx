import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { FormField, Screen, SubmitButton } from "@/components/ui";
import type { DeviceInput, FieldErrors } from "@/domain";
import { addDevice } from "@/maintenance";

export default function NewDeviceScreen() {
  const [form, setForm] = useState<DeviceInput>({ name: "", intervalDays: "" });
  const [errors, setErrors] = useState<FieldErrors<DeviceInput>>({});
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const result = await addDevice(form);
      setErrors(result.errors);
      if (result.id) router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd zapisu", "Nie udało się zapisać urządzenia. Spróbuj ponownie.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <FormField
        label="Nazwa"
        defaultValue={form.name}
        onChangeText={(name) => setForm({ ...form, name })}
        placeholder="np. Wiertarka Bosch"
        error={errors.name}
      />
      <FormField
        label="Interwał przeglądów (dni)"
        defaultValue={form.intervalDays}
        onChangeText={(intervalDays) => setForm({ ...form, intervalDays })}
        keyboardType="number-pad"
        placeholder="np. 90"
        error={errors.intervalDays}
      />
      <SubmitButton saving={saving} onPress={save} />
    </Screen>
  );
}
