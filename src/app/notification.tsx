import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className= "flex-1 items-center justify-center">
        <Text className="text-text-primary text-lg font-semibold p-4">
          Notifications screen comming soon! Stay tuned for updates.
        </Text>
      </View>
    </SafeAreaView>
  );
}
