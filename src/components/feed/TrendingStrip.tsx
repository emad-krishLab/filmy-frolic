import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { HugeiconsIcon } from "@hugeicons/react-native";

import { FireIcon } from "@hugeicons/core-free-icons";

export interface TrendingItem {
  id: string;
  label: string;
  heatCount: number;
  authorAvatarUrl?: string;
}

interface TrendingStripProps {
  items: TrendingItem[];
  onItemPress?: (item: TrendingItem) => void;
  onSeeAllPress?: () => void;
}

export default function TrendingStrip({
  items,
  onItemPress,
  onSeeAllPress,
}: TrendingStripProps) {
  return (
    <View className="mt-5">
      {/* Header */}

      <View className="mb-3 flex-row items-center justify-between px-4">
        <View className="flex-row items-center">
          <HugeiconsIcon icon={FireIcon} size={18} color="#F97316" />

          <Text className="ml-2 text-lg font-bold text-text-primary">
            Hot Right Now
          </Text>
        </View>

        <Pressable onPress={onSeeAllPress} className="active:opacity-70">
          <Text className="font-semibold text-info">See All</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingRight: 24,
        }}
      >
        {items.map((item) => {
          const initial = item.label.charAt(0).toUpperCase();

          return (
            <Pressable
              key={item.id}
              onPress={() => onItemPress?.(item)}
              className="mr-3 w-32 rounded-xl border border-border-light bg-surface-card p-4 active:opacity-80"
            >
              {/* Avatar */}

              {item.authorAvatarUrl ? (
                <Image
                  source={{
                    uri: item.authorAvatarUrl,
                  }}
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Text className="font-bold text-primary-foreground">
                    {initial}
                  </Text>
                </View>
              )}

              {/* Label */}

              <Text
                numberOfLines={1}
                className="mt-3 text-base font-semibold text-text-primary"
              >
                {item.label}
              </Text>

              {/* Heat */}

              <View className="mt-2 flex-row items-center">
                <HugeiconsIcon icon={FireIcon} size={14} color="#F97316" />

                <Text className="ml-1 text-xs text-text-secondary">
                  {item.heatCount.toLocaleString()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
