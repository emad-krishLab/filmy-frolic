// src/components/communities/SearchBar.tsx
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { TextInput, View } from "react-native";
interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: Props) {
  return (
    <View className="flex-row items-center bg-surface border border-border-light rounded-md px-3 h-11 mb-4">
      <HugeiconsIcon icon={Search01Icon} size={18} color="#8A8A9E" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search communities..."
        placeholderTextColor="#7A7A8C"
        className="flex-1 ml-2 text-text-primary text-sm"
      />
    </View>
  );
}
