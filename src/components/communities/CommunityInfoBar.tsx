import { File01Icon, UserGroup02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, Text, View } from "react-native";

interface Props {
  name: string;
  memberCount: number;
  postsToday: number;
  isJoined: boolean;
  onJoinPress: () => void;
}

export function CommunityInfoBar({
  name,
  memberCount,
  postsToday,
  isJoined,
  onJoinPress,
}: Props) {
  return (
    <View className="px-4 pt-12 pb-4">
      <Text className="text-text-primary text-xl font-bold uppercase mb-1">
        {name}
      </Text>

      <View className="flex-row items-center gap-4 mb-3">
        <View className="flex-row items-center gap-1">
          <HugeiconsIcon icon={UserGroup02Icon} size={14} color="#8A8A9E" />
          <Text className="text-text-secondary text-xs">
            {memberCount} members
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <HugeiconsIcon icon={File01Icon} size={14} color="#8A8A9E" />
          <Text className="text-text-secondary text-xs">
            {postsToday} posts today
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onJoinPress}
        className={`self-start px-5 py-2.5 rounded-md ${
          isJoined ? "bg-surface border border-border-light" : "bg-info"
        }`}
      >
        <Text
          numberOfLines={1}
          className={`text-sm font-semibold ${isJoined ? "text-text-primary" : "text-white"}`}
        >
          {isJoined ? "Joined" : "Join Community"}
        </Text>
      </Pressable>
    </View>
  );
}
