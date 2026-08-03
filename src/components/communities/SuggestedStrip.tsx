import { SuggestedCommunity } from "@/utils/types";
import { FlatList, Text, useWindowDimensions, View } from "react-native";
import { SuggestedCard } from "./SuggestedCard";

interface Props {
  data: SuggestedCommunity[];
  onJoin?: (id: string) => void;
}

const SCREEN_PADDING = 16;
const CARD_GAP = 10;

export function SuggestedStrip({ data, onJoin }: Props) {
  const { width: screenWidth } = useWindowDimensions();

  // Exactly 3 cards fully visible at once, sized to fill the row —
  // scrolling reveals the rest, per the "3 at a time, scrollable" request.
  const cardWidth = (screenWidth - SCREEN_PADDING * 2 - CARD_GAP * 2) / 3;

  if (!data.length) return null;

  return (
    <View className="mb-6">
      <Text className="text-text-primary font-semibold text-base mb-3">
        Suggested for you
      </Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: CARD_GAP }}
        renderItem={({ item }) => (
          <SuggestedCard
            community={item}
            width={cardWidth}
            onJoin={() => onJoin?.(item.id)}
          />
        )}
      />
    </View>
  );
}
