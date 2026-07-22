// src/components/createCommunity/PrivacyOption.tsx
import { View, Text, Pressable } from 'react-native';
import { PrivacyType } from '@/utils/types';

interface Props {
  type: PrivacyType;
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function PrivacyOption({ icon, title, description, selected, onSelect }: Props) {
  return (
    <Pressable
      onPress={onSelect}
      className={`flex-row items-center gap-3 p-4 rounded-md border mb-3 ${
        selected ? 'bg-info/10 border-info' : 'bg-surface border-border-light'
      }`}
    >
      <View
        className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
          selected ? 'border-info' : 'border-border'
        }`}
      >
        {selected && <View className="w-2.5 h-2.5 rounded-full bg-info" />}
      </View>
      <View className="flex-1">
        <Text className="text-text-primary font-semibold text-sm">
          {icon} {title}
        </Text>
        <Text className="text-text-secondary text-xs mt-0.5">{description}</Text>
      </View>
    </Pressable>
  );
}