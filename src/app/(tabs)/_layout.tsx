import {
  Home01Icon,
  MeetingRoomIcon,
  Message02Icon,
  User02Icon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { name: "home", label: "Home", icon: Home01Icon },
  { name: "communities", label: "Communities", icon: UserGroup02Icon },
  { name: "rooms", label: "Rooms", icon: MeetingRoomIcon },
  { name: "messages", label: "Messages", icon: Message02Icon },
  { name: "profile", label: "Profile", icon: User02Icon },
] as const;

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        backgroundColor: "#0D0D18",
        borderTopWidth: 1,
        borderTopColor: "#1A1A26",
      }}
    >
      <View
        style={{ flexDirection: "row", paddingTop: 8, paddingHorizontal: 8 }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const tab = TABS.find((t) => t.name === route.name);
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center", paddingBottom: 8 }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
            >
              {/* Active indicator pill
              {isFocused && (
                <View
                  style={{
                    position: "absolute",
                    top: -8,
                    width: 32,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#F5C518",
                  }}
                />
              )} */}
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 18,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isFocused
                    ? "rgba(245,197,24,0.12)"
                    : "transparent",
                }}
              >
                {tab && (
                  <HugeiconsIcon
                    icon={tab.icon}
                    size={22}
                    color={isFocused ? "#F5C518" : "#8A8A9E"}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: isFocused ? "700" : "500",
                  color: isFocused ? "#F5C518" : "#8A8A9E",
                  marginTop: 2,
                }}
              >
                {tab?.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// ─── Tabs Layout ─────────────────────────────────────────────────────────────
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="communities" />
      <Tabs.Screen name="rooms" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
