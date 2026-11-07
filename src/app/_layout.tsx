import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Urządzenia" }} />
      <Stack.Screen name="device/new" options={{ title: "Nowe urządzenie" }} />
      <Stack.Screen name="device/[id]" options={{ title: "Urządzenie" }} />
      <Stack.Screen name="action/new" options={{ title: "Nowa czynność" }} />
      <Stack.Screen name="action/[id]" options={{ title: "Czynność serwisowa" }} />
    </Stack>
  );
}
