// src/components/explore/RecentSearches.tsx
import { View, Text, Pressable } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Clock01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

interface Props {
  searches: string[];
  onSelect: (term: string) => void;
  onClear: () => void;
}

export function RecentSearches({ searches, onSelect, onClear }: Props) {
  if (!searches.length) return null;

  return (
    <View className="px-4 py-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-text-primary font-semibold text-sm">Recent</Text>
        <Pressable onPress={onClear}>
          <Text className="text-info text-xs">Clear</Text>
        </Pressable>
      </View>
      <View className="gap-1">
        {searches.map((term) => (
          <Pressable
            key={term}
            onPress={() => onSelect(term)}
            className="flex-row items-center gap-3 py-2"
          >
            <HugeiconsIcon icon={Clock01Icon} size={16} color="#8A8A9E" />
            <Text className="text-text-secondary text-sm">{term}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}