// src/components/communityDetail/tabs/EmptyTab.tsx
import { View, Text } from 'react-native';

export function EmptyTab({ label }: { label: string }) {
  return (
    <View className="items-center justify-center py-16">
      <Text className="text-text-muted text-sm">{label} coming soon.</Text>
    </View>
  );
}