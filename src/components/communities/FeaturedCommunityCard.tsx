// src/components/communities/FeaturedCommunityCard.tsx
import { Community } from "@/utils/types";
import { StarIcon, UserGroup02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, View } from "react-native";
import { CommunityBannerImage } from "../common/CommunityBannerImage";
import { JoinButton } from "../communities/JoinButton";

interface Props {
  community: Community;
  onPress?: () => void;
  onJoin?: () => void;
}

export function FeaturedCommunityCard({ community, onPress, onJoin }: Props) {
  return (
    <CommunityBannerImage
      uri={community.bannerUrl}
      seed={community.id}
      overlay
      style={{
        height: 200,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      <View className="flex-1 justify-between p-4">
        <View className="flex-row items-center gap-1.5 bg-background/60 self-start px-2.5 py-1 rounded-full">
          <HugeiconsIcon icon={StarIcon} size={12} color="#F5C518" />
          <Text className="text-primary text-[10px] font-bold tracking-widest">
            FEATURED
          </Text>
        </View>

        <View>
          <Text
            className="text-white text-2xl font-extrabold tracking-tight mb-1.5"
            numberOfLines={2}
          >
            {community.name}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <HugeiconsIcon icon={UserGroup02Icon} size={16} color="#ffffff" />
              <Text className="text-text-primary text-xs">
                {community.memberCount} members
              </Text>
            </View>
            <JoinButton onPress={onJoin} joined={community.isJoined} />
          </View>
        </View>
      </View>
    </CommunityBannerImage>
  );
}
