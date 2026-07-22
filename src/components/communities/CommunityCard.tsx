// src/components/communities/CommunityCard.tsx
import { Community } from "@/utils/types";
import { File01Icon, UserMultiple03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  community: Community;
  onPress?: () => void;
  onJoin?: () => void;
}

export function CommunityCard({ community, onPress, onJoin }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 bg-surface-card rounded-md overflow-hidden border border-border-light"
    >
      <Image
        source={{ uri: community.bannerUrl }}
        className="w-full h-24"
        resizeMode="cover"
      />

      <View className="p-3">
        <View className="flex-row items-center justify-between mb-2">
          <View className="w-9 h-9 rounded-sm bg-accent-purple items-center justify-center">
            <Text className="text-base">{community.iconEmoji ?? "🎬"}</Text>
          </View>
          <Pressable
            onPress={onJoin}
            className="bg-info px-3 py-1.5 rounded-sm"
          >
            <Text className="text-white text-xs font-semibold">Join</Text>
          </Pressable>
        </View>

        <Text
          numberOfLines={1}
          className="text-text-primary font-semibold text-sm mb-1"
        >
          {community.name}
        </Text>
        <Text numberOfLines={1} className="text-text-secondary text-xs mb-2">
          {community.description}
        </Text>

        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <HugeiconsIcon icon={UserMultiple03Icon} size={12} color="#8A8A9E" />
            <Text className="text-text-muted text-xs">
              {community.memberCount}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <HugeiconsIcon icon={File01Icon} size={12} color="#8A8A9E" />
            <Text className="text-text-muted text-xs">
              {community.postsToday} today
            </Text>
          </View>
        </View>

        {community.genre && (
          <View className="self-start bg-info/15 px-2 py-1 rounded-full mt-2">
            <Text className="text-info text-[10px] font-medium">
              {community.genre}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
