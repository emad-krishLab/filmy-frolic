// src/components/communityDetail/CommunityTabBar.tsx
import { CommunityTab } from "@/utils/types";
import { useEffect, useRef } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TABS: CommunityTab[] = [
  "Feed",
  "About",
  "Members",
  "Events",
  "Media",
  "Rules",
];

interface Props {
  active: CommunityTab;
  onChange: (tab: CommunityTab) => void;
}

export function CommunityTabBar({ active, onChange }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef<Record<string, { x: number; width: number }>>({});
  const hasMounted = useRef(false);

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  const moveIndicator = () => {
    const layout = layouts.current[active];
    if (!layout) return;

    if (!hasMounted.current) {
      indicatorX.value = layout.x;
      indicatorWidth.value = layout.width;
      hasMounted.current = true;
    } else {
      indicatorX.value = withSpring(layout.x, { stiffness: 180 });
      indicatorWidth.value = withSpring(layout.width, { stiffness: 180 });
    }

    scrollRef.current?.scrollTo({
      x: Math.max(layout.x - 16, 0),
      animated: true,
    });
  };

  useEffect(() => {
    moveIndicator();
  }, [active]);

  const handleLayout = (tab: CommunityTab) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layouts.current[tab] = { x, width };
    if (tab === active && !hasMounted.current) {
      moveIndicator();
    }
  };

  return (
    <View className="border-b border-border-light" style={{ height: 48 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 20 }}
      >
        <Animated.View
          className="absolute bottom-0 h-0.5 bg-info rounded-full"
          style={indicatorStyle}
        />
        {TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <Pressable
              key={tab}
              onLayout={handleLayout(tab)}
              onPress={() => onChange(tab)}
              className="py-3"
            >
              <Text
                className={`text-sm ${
                  isActive ? "text-info font-semibold" : "text-text-secondary"
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
