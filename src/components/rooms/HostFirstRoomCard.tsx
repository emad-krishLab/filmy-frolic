import { Pressable, Text, View } from "react-native";

interface Props {
  onHostPress: () => void;
}

export function HostFirstRoomCard({ onHostPress }: Props) {
  return (
    <View className="items-center bg-surface-card border border-border-light rounded-md p-6 mt-4">
      <Text className="text-3xl mb-3">🎙️</Text>
      <Text className="text-text-primary font-bold text-base mb-1">
        Host Your First Room
      </Text>
      <Text className="text-text-secondary text-xs text-center mb-4">
        Invite the community for a watch-along, debate, or live session.
      </Text>
      <Pressable
        onPress={onHostPress}
        className="bg-info px-6 py-3 rounded-md w-full items-center"
      >
        <Text className="text-white text-sm font-semibold">Start a Room</Text>
      </Pressable>
    </View>
  );
}
