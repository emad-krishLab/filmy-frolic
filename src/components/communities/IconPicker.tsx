// src/components/createCommunity/IconPicker.tsx
import { View, Text, Pressable } from 'react-native';
import { COMMUNITY_ICONS } from '@/utils/types';

interface Props {
  selected: string;
  onSelect: (icon: string) => void;
}

export function IconPicker({ selected, onSelect }: Props) {
  return (
    <View>
      <Text className="text-text-secondary text-xs font-semibold uppercase mb-3">
        Community Icon
      </Text>
      <View className="flex-row flex-wrap gap-2.5">
        {COMMUNITY_ICONS.map((icon) => {
          const isActive = icon === selected;
          return (
            <Pressable
              key={icon}
              onPress={() => onSelect(icon)}
              className={`w-14 h-14 rounded-md items-center justify-center border ${
                isActive
                  ? 'bg-info/15 border-info'
                  : 'bg-surface border-border-light'
              }`}
            >
              <Text className="text-2xl">{icon}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}