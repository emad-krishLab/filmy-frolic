// src/components/communities/SearchBar.tsx
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { Pressable, TextInput, View } from "react-native";
interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: Props) {
  const router = useRouter();
  return (
    <View className = "flex-1 flex-row justify-center gap-2 items-center  mb-4">
      <View className=" flex-1 flex-row  items-center bg-surface border border-border-light rounded-xl px-3 h-11 ">
        <HugeiconsIcon icon={Search01Icon} size={18} color="#8A8A9E" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search communities..."
          placeholderTextColor="#7A7A8C"
          className="flex-1 ml-2 text-text-primary text-sm"
        />
      </View>
      <Pressable
        className="bg-primary w-10 h-10 rounded-full items-center justify-center"
        onPress={() => router.push("/community/create")}
      >
        <HugeiconsIcon icon={Add01Icon} size={20} color="#080810" />
      </Pressable>
    </View>
  );
}
