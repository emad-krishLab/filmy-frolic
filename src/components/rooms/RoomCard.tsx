import { Room, ROOM_CATEGORY_LABELS } from "@/utils/types";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ImageBackground, Pressable, Text, View } from "react-native";

interface Props {
  room: Room;
  onPress?: () => void;
  onFollowHost?: () => void;
  onJoin?: () => void;
}

export function RoomCard({ room, onPress, onFollowHost, onJoin }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-md overflow-hidden mb-3 bg-surface-card border border-border-light"
    >
      <ImageBackground
        source={{ uri: room.thumbnailUrl }}
        className="w-full h-40 justify-between p-3"
      >
        {room.isLive && (
          <View className="flex-row justify-between items-start">
            <View className="bg-danger px-2 py-1 rounded-full">
              <Text className="text-white text-[10px] font-bold">LIVE</Text>
            </View>
            <View className="flex-row items-center gap-1 bg-background/70 px-2 py-1 rounded-full">
              <HugeiconsIcon icon={ViewIcon} size={12} color="#F0F0F8" />
              <Text className="text-text-primary text-xs">
                {room.viewerCount}
              </Text>
            </View>
          </View>
        )}
      </ImageBackground>

      <View className="p-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text
            className="text-text-primary font-semibold text-sm flex-1"
            numberOfLines={1}
          >
            {room.name}
          </Text>
          <View className="bg-surface px-2 py-0.5 rounded-full ml-2">
            <Text className="text-text-muted text-[10px]">
              {ROOM_CATEGORY_LABELS[room.category]}
            </Text>
          </View>
        </View>

        {room.description && (
          <Text className="text-text-secondary text-xs mb-2" numberOfLines={1}>
            {room.description}
          </Text>
        )}

        <View className="flex-row items-center gap-2 mb-3">
          <View className="w-6 h-6 rounded-full bg-accent-purple items-center justify-center">
            <Text className="text-white text-[10px] font-bold">
              {room.hostName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-text-secondary text-xs">
            Hosted by {room.hostName}
          </Text>
        </View>

        {/* Join Room is primary and full-width; Follow Host is smaller, secondary,
            sits beside it rather than stacked — fixes the equal-weight issue from web */}
        <View className="flex-row gap-2">
          <Pressable
            onPress={onJoin}
            className="flex-1 bg-info py-2.5 rounded-md items-center"
          >
            <Text className="text-white text-sm font-semibold">Join Room</Text>
          </Pressable>
          <Pressable
            onPress={onFollowHost}
            className={`px-3.5 py-2.5 rounded-md items-center justify-center ${
              room.isFollowingHost
                ? "bg-surface border border-border-light"
                : "bg-surface-hover"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                room.isFollowingHost
                  ? "text-text-primary"
                  : "text-text-secondary"
              }`}
            >
              {room.isFollowingHost ? "Following" : "Follow"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
