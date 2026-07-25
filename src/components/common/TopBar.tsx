import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { HugeiconsIcon } from "@hugeicons/react-native";

import {
  Menu02Icon,
  Notification01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { useNavigation } from "expo-router";

export const APP_NAME = "Filmy Frolic";

interface TopBarProps {
  showLogo?: boolean;
  showSettings?: boolean;

  notificationCount?: number;

  onDrawerPress: () => void;
  onNotificationsPress: () => void;
  onSettingsPress?: () => void;
}

export default function TopBar({
  showLogo = false,
  showSettings = false,
  notificationCount = 0,
  onDrawerPress,
  onNotificationsPress,
  onSettingsPress,
}: TopBarProps) {
  const insets = useSafeAreaInsets();


  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
      className="bg-background border-b border-border-light"
    >
      <View className="h-16 flex-row items-center justify-between px-4">
        {/* Left */}

        <View className="flex-row items-center flex-1">
          <Pressable
            onPress={onDrawerPress}
            android_ripple={{ color: "#262635", borderless: true }}
            className="h-11 w-11 items-center justify-center rounded-full active:opacity-70"
          >
            <HugeiconsIcon icon={Menu02Icon} size={24} color="#F0F0F8" />
          </Pressable>

          {showLogo && (
            <View className="ml-3">
              <Text className="text-text-primary text-xl font-bold tracking-wide">
                {APP_NAME}
              </Text>

              <Text className="text-primary text-[10px] font-semibold tracking-[3px] uppercase">
                Premium
              </Text>
            </View>
          )}
        </View>

        {/* Right */}

        <View className="flex-row items-center">
          {/* Notification */}

          <Pressable
            onPress={onNotificationsPress}
            android_ripple={{ color: "#262635", borderless: true }}
            className="mr-2 h-11 w-11 items-center justify-center rounded-full active:opacity-70"
          >
            <HugeiconsIcon
              icon={Notification01Icon}
              size={23}
              color="#F0F0F8"
            />

            {notificationCount > 0 && (
              <View className="absolute right-1 top-1 min-h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1">
                <Text className="text-[10px] font-bold text-white">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Text>
              </View>
            )}
          </Pressable>

          {showSettings && (
            <Pressable
              onPress={onSettingsPress}
              android_ripple={{ color: "#262635", borderless: true }}
              className="h-11 w-11 items-center justify-center rounded-full active:opacity-70"
            >
              <HugeiconsIcon icon={Settings02Icon} size={23} color="#F0F0F8" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
