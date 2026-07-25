// src/app/(drawer)/articles.tsx  (repeat pattern for gossips/games/memes)
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GossipsScreee() {
  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-lg">Gossips — coming soon</Text>
    </SafeAreaView>
  );
}