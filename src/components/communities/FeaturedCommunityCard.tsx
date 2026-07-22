// src/components/communities/FeaturedCommunityCard.tsx
import { View, Text, ImageBackground, Pressable } from 'react-native';
import { StarIcon, UserGroup02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react-native';;
import { Community } from '@/utils/types';

interface Props {
  community: Community;
  onPress?: () => void;
  onJoin?: () => void;
}

export function FeaturedCommunityCard({ community, onPress, onJoin }: Props) {
  return (
    <Pressable onPress={onPress} className="rounded-md overflow-hidden mb-4">
      <ImageBackground
        source={{ uri: community.bannerUrl }}
        className="w-full h-48 justify-between p-3"
        resizeMode="cover"
      >
        <View className="flex-row items-center gap-1 bg-background/70 self-start px-2 py-1 rounded-full">
          <HugeiconsIcon icon = {StarIcon} size={12} color="#F5C518" />
          <Text className="text-primary text-[10px] font-bold">FEATURED</Text>
        </View>

        <View className="flex-row items-end justify-between">
          <View className="flex-1 mr-3">
            <Text
              className="text-white text-lg font-bold uppercase"
              numberOfLines={2}
            >
              {community.name}
            </Text>
            <View className="flex-row items-center gap-1 mt-1">
              <HugeiconsIcon icon = {UserGroup02Icon} size={12} color="#F0F0F8" />
              <Text className="text-text-primary text-xs">
                {community.memberCount} members
              </Text>
            </View>
          </View>
          <Pressable onPress={onJoin} className="bg-info px-4 py-2 rounded-sm">
            <Text className="text-white text-sm font-semibold">Join</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </Pressable>
  );
}