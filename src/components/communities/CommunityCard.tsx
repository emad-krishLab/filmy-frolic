// src/components/communities/CommunityCard.tsx
import { Community } from "@/utils/types";
import { File01Icon, UserGroup02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, Text, View } from "react-native";
import { CommunityBannerImage } from "../common/CommunityBannerImage";
import { JoinButton } from "../communities/JoinButton";

const BANNER_HEIGHT = 110;
const AVATAR_SIZE = 56;
const AVATAR_OVERLAP = 24; // how far the avatar dips below the banner

interface Props {
  community: Community;
  onPress?: () => void;
  onJoin?: () => void;
}

export function CommunityCard({ community, onPress, onJoin }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-surface-card border border-border-light rounded-2xl overflow-hidden mb-4"
    >
      <CommunityBannerImage
        uri={community.bannerUrl}
        seed={community.id}
        style={{ height: BANNER_HEIGHT }}
      />

      <View
        className="bg-accent-purple border-4 border-surface-card rounded-xl items-center justify-center"
        style={{
          position: "absolute",
          top: BANNER_HEIGHT - AVATAR_OVERLAP,
          left: 12,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
        }}
      >
        <Text className="text-2xl">{community.iconEmoji ?? "🎬"}</Text>
      </View>

      <View
        style={{ paddingTop: AVATAR_OVERLAP + 12 }}
        className="px-3.5 pb-3.5"
      >
        <View className="flex-row items-start justify-between mb-1.5">
          <Text
            className="text-text-primary font-bold text-base flex-1 mr-2"
            numberOfLines={1}
          >
            {community.name}
          </Text>
          <JoinButton onPress={onJoin} joined={community.isJoined} size="sm" />
        </View>

        {community.description && (
          <Text
            numberOfLines={2}
            className="text-text-secondary text-xs leading-5 mb-3"
          >
            {community.description}
          </Text>
        )}

        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <HugeiconsIcon icon={UserGroup02Icon} size={13} color="#8A8A9E" />
            <Text className="text-text-muted text-xs">
              {community.memberCount}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <HugeiconsIcon icon={File01Icon} size={13} color="#8A8A9E" />
            <Text className="text-text-muted text-xs">
              {community.postsToday} today
            </Text>
          </View>
          {community.genre && (
            <View className="bg-info/15 px-2 py-0.5 rounded-full ml-auto">
              <Text className="text-info text-[10px] font-medium">
                {community.genre}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
