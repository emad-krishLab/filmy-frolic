// src/components/communities/SuggestedStrip.tsx
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SuggestedCommunity } from '@/utils/types';

interface Props {
  data: SuggestedCommunity[];
  onJoin?: (id: string) => void;
}

export function SuggestedStrip({ data, onJoin }: Props) {
  if (!data.length) return null;

  return (
    <View className="mb-5">
      <Text className="text-text-primary font-semibold text-base mb-3">
        Suggested for you
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {data.map((item) => (
          <View
            key={item.id}
            className="bg-surface-card border border-border-light rounded-md p-3 items-center w-28"
          >
            <View className="w-11 h-11 rounded-sm bg-accent-magenta items-center justify-center mb-2">
              <Text className="text-white font-bold">
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              className="text-text-primary text-xs font-medium mb-0.5"
            >
              {item.name}
            </Text>
            <Text className="text-text-muted text-[10px] mb-2">
              {item.memberCount} members
            </Text>
            <Pressable
              onPress={() => onJoin?.(item.id)}
              className="bg-info px-3 py-1 rounded-sm w-full"
            >
              <Text className="text-white text-[11px] font-semibold text-center">
                Join
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}