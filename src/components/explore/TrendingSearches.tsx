import { FireIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, Text, View } from "react-native";

interface Props {
  searches: string[];
  onSelect: (term: string) => void;
}

export function TrendingSearches({ searches, onSelect }: Props) {
  return (
    <View className="px-4 py-4">
      <Text className="text-text-primary font-semibold text-sm mb-3">
        Trending Searches
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {searches.map((term) => (
          <Pressable
            key={term}
            onPress={() => onSelect(term)}
            className="flex-row items-center gap-1.5 bg-surface-card border border-border-light rounded-full px-3 py-2"
          >
            <HugeiconsIcon icon={FireIcon} size={14} color="#F39C12" />
            <Text className="text-text-secondary text-xs">{term}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
