import {
  Home01Icon,
  Message02Icon,
  User02Icon,
  UserGroup02Icon,
  LiveStreaming02Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "expo-router/js-top-tabs";
import { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { name: "home", label: "Home", icon: Home01Icon },
  { name: "communities", label: "Communities", icon: UserGroup02Icon },
  { name: "rooms", label: "Rooms", icon: LiveStreaming02Icon },
  { name: "messages", label: "Messages", icon: Message02Icon },
  { name: "profile", label: "Profile", icon: User02Icon },
] as const;

// ─── Custom tab bar ──────────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const [layouts, setLayouts] = useState<
    Record<number, { x: number; width: number }>
  >({});

  const pillX = useSharedValue(0);
  const pillWidth = useSharedValue(44);
  const hasMounted = useRef(false);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillX.value }],
    width: pillWidth.value,
  }));

  const movePill = (index: number) => {
    const layout = layouts[index];
    if (!layout) return;
    // center a 44px pill within the measured tab width
    const target = layout.x + layout.width / 2 - 22;
    pillX.value = withSpring(target, { stiffness: 180 });
    pillWidth.value = withSpring(44, { stiffness: 180 });
  };

  const handleLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setLayouts((prev) => ({ ...prev, [index]: { x, width } }));
  };

  useEffect(() => {
    const layout = layouts[state.index];
    if (!layout) return;

    const target = layout.x + layout.width / 2 - 22;

    if (pillWidth.value === 44 && pillX.value === 0 && !hasMounted.current) {
      // first paint: snap instantly, no animation
      pillX.value = target;
      hasMounted.current = true;
    } else {
      pillX.value = withSpring(target, { stiffness: 180 });
    }
    pillWidth.value = withSpring(44, { stiffness: 180 });
  }, [state.index, layouts]);

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
        style={{
          flexDirection: "row",
          justifyContent: "center", 
          paddingTop: 8,
        }}
      >
        
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0, // ← pins the anchor to the row's left edge
              top: 8,
              height: 44,
              borderRadius: 18,
              backgroundColor: "rgba(245,197,24,0.12)",
            },
            pillStyle,
          ]}
        />

        {state.routes.map((route: any, index: number) => {
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
              onLayout={handleLayout(index)}
              style={{
                alignItems: "center",
                paddingHorizontal: 18,
                paddingBottom: 8,
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 18,
                  alignItems: "center",
                  justifyContent: "center",
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

// ─── Material top tabs, repositioned to the bottom ──────────────────────────
const { Navigator } = createMaterialTopTabNavigator();

const Tabs: any = withLayoutContext(Navigator);

// ─── Tabs Layout ─────────────────────────────────────────────────────────────
export default function TabsLayout() {
  return (
    <Tabs
      tabBarPosition="bottom"
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={{ swipeEnabled: true, lazy: true }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="communities" />
      <Tabs.Screen name="rooms" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
