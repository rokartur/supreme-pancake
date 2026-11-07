import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

// Reloads on every focus, so a list shows the record saved on the screen popped above it.
export function useFocusData<T>(load: () => Promise<T>) {
  const [state, setState] = useState<{ data: T | null; error: unknown; loading: boolean }>({
    data: null,
    error: null,
    loading: true,
  });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      load().then(
        (data) => active && setState({ data, error: null, loading: false }),
        (error) => active && setState({ data: null, error, loading: false }),
      );
      return () => {
        active = false;
      };
    }, [load]),
  );

  return state;
}
