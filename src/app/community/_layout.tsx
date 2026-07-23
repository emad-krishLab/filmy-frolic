import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="create"
        options={{
          presentation: "modal",
        }}
      />

      <Stack.Screen name="[id]" />
    </Stack>
  );
}
