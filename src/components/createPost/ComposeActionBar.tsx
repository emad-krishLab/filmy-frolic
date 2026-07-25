import { View, Pressable, Text } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { UserGroup02Icon } from "@hugeicons/core-free-icons";

interface Props {
  onPickCommunity: () => void;
  communityTag: string | null;
}

export function ComposeActionBar({ onPickCommunity, communityTag }: Props) {
  return (
    <View className="flex-row items-center gap-2 px-4 py-3 border-t border-border-light">
      <Pressable
        onPress={onPickCommunity}
        className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface"
      >
        <HugeiconsIcon icon={UserGroup02Icon} size={16} color="#F5C518" />
        <Text className="text-text-secondary text-xs">
          {communityTag ?? "Post to..."}
        </Text>
      </Pressable>
    </View>
  );
}