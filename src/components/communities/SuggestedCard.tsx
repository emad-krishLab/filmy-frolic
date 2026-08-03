// src/components/communities/SuggestedCard.tsx
import { SuggestedCommunity } from "@/utils/types";
import { Text, View } from "react-native";
import { CommunityBannerImage } from "../common/CommunityBannerImage";
import { JoinButton } from "./JoinButton";

interface Props {
  community: SuggestedCommunity;
  width: number;
  onJoin?: () => void;
}

export function SuggestedCard({ community, width, onJoin }: Props) {
  return (
    <View
      style={{ width }}
      className="bg-surface-card border border-border-light rounded-2xl overflow-hidden"
    >
      <CommunityBannerImage
        uri={community.iconUrl}
        seed={community.id}
        style={{ height: width * 0.85 }}
      />
      <View className="p-2">
        <Text
          numberOfLines={1}
          className="text-text-primary font-semibold text-xs mb-0.5"
        >
          {community.name}
        </Text>
        <Text className="text-text-muted text-[10px] mb-2">
          {community.memberCount} members
        </Text>
        <JoinButton onPress={onJoin} size="sm" />
      </View>
    </View>
  );
}
