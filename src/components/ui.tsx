import { Button, FieldGroup, Host, ListItem, Text, TextInput } from "@expo/ui";
import type { TextInputProps } from "@expo/ui";
import type { ReactNode } from "react";
import { ActivityIndicator } from "react-native";

// Darker than iOS systemRed for 4.5:1 contrast. Expo Go 57.0.9 on iOS renders it uncolored.
const errorColor = "#C62828";

// Form on iOS (SwiftUI), LazyColumn of grouped rows on Android (Jetpack Compose).
export function Screen({ children }: { children: ReactNode }) {
  return (
    <Host style={{ flex: 1 }}>
      <FieldGroup>{children}</FieldGroup>
    </Host>
  );
}

export const Section = FieldGroup.Section;

type FormFieldProps = Pick<TextInputProps, "defaultValue" | "onChangeText" | "placeholder" | "keyboardType" | "multiline"> & {
  label: string;
  error?: string;
};

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <Section title={label}>
      <TextInput {...inputProps} />
      {error ? <Text textStyle={{ color: errorColor }}>{error}</Text> : null}
    </Section>
  );
}

// Android wraps every section row in its own ListItem, a transparent inner one avoids a double background.
export function Row({ title, detail, onPress }: { title: string; detail?: string; onPress?: () => void }) {
  return (
    <ListItem onPress={onPress} supportingText={detail} colors={{ containerColor: "transparent" }}>
      {title}
    </ListItem>
  );
}

export function SubmitButton({ saving, onPress }: { saving: boolean; onPress: () => void }) {
  return (
    <Section>
      <Button label={saving ? "Zapisywanie..." : "Zapisz"} onPress={onPress} disabled={saving} />
    </Section>
  );
}

export function LoadState({ loading, error }: { loading: boolean; error: unknown }) {
  if (loading) return <ActivityIndicator style={{ padding: 24 }} />;
  if (error) return <Message text="Nie udało się wczytać danych. Uruchom aplikację ponownie." />;
  return null;
}

export function Message({ text }: { text: string }) {
  return (
    <Screen>
      <Section>
        <Text>{text}</Text>
      </Section>
    </Screen>
  );
}
