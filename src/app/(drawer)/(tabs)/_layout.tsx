import {
  Archive02Icon,
  Home01Icon,
  Search01Icon,
  User02Icon,
  UserGroup02Icon,
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
  { name: "feed", label: "Feed", icon: Home01Icon },
  { name: "social", label: "Social", icon: UserGroup02Icon },
  { name: "explore", label: "Explore", icon: Search01Icon },
  { name: "archive", label: "Archive", icon: Archive02Icon },
  { name: "profile", label: "Profile", icon: User02Icon },
] as const;

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
      pillX.value = withSpring(target, { stiffness: 250 });
    }
    pillWidth.value = withSpring(44, { stiffness: 250 });
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
          paddingTop: 8,
          justifyContent: "space-between",
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
                paddingHorizontal: 20,
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

const { Navigator } = createMaterialTopTabNavigator();

const Tabs: any = withLayoutContext(Navigator);

export default function TabsLayout() {
  return (
    <Tabs
      tabBarPosition="bottom"
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={{ swipeEnabled: false, lazy: true , headerShown: false}}
    >
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="social" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="archive" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
