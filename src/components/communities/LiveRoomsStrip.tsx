// src/components/communities/LiveRoomsStrip.tsx
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ViewIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { LiveRoom } from '@/utils/types'

interface Props {
  data: LiveRoom[];
  onPress?: (id: string) => void;
}

export function LiveRoomsStrip({ data, onPress }: Props) {
  if (!data.length) return null;

  return (
    <View className="mb-5">
      <View className="flex-row items-center gap-1.5 mb-3">
        <View className="w-2 h-2 rounded-full bg-danger" />
        <Text className="text-text-primary font-semibold text-base">
          Live Rooms
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {data.map((room) => (
          <Pressable
            key={room.id}
            onPress={() => onPress?.(room.id)}
            className="bg-surface border border-border-light rounded-md px-4 py-3 flex-row items-center gap-2"
          >
            <Text className="text-text-primary text-sm font-medium">
              {room.name}
            </Text>
            <View className="flex-row items-center gap-1">
              <HugeiconsIcon icon = {ViewIcon} size={12} color="#8A8A9E" />
              <Text className="text-text-muted text-xs">{room.viewerCount}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}