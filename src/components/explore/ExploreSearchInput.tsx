import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export function ExploreSearchInput({ value, onChangeText, onSubmit }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="px-4 pb-3 border-b border-border-light"
      style={{ paddingTop: insets.top + 10 }}
    >
      <View className="flex-row items-center bg-surface border border-border-light rounded-full px-4 h-12">
        <HugeiconsIcon icon={Search01Icon} size={18} color="#8A8A9E" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          placeholder="Search movies, people, communities..."
          placeholderTextColor="#7A7A8C"
          className="flex-1 ml-2 text-text-primary text-sm"
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChangeText("")}>
            <HugeiconsIcon icon={Cancel01Icon} size={16} color="#8A8A9E" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
