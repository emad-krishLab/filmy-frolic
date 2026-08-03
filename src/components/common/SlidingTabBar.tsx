// src/components/common/SlidingTabBar.tsx
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

interface Props {
  tabs: string[];
  activeIndex: number;
  onTabPress: (index: number) => void;
  scrollable?: boolean; 
}

export function SlidingTabBar({
  tabs,
  activeIndex,
  onTabPress,
  scrollable = false,
}: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef<Record<number, { x: number; width: number }>>({});
  const hasMounted = useRef(false);

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  const moveIndicator = () => {
    const layout = layouts.current[activeIndex];
    if (!layout) return;

    if (!hasMounted.current) {
      indicatorX.value = layout.x;
      indicatorWidth.value = layout.width;
      hasMounted.current = true;
    } else {
      indicatorX.value = withSpring(layout.x, { stiffness: 180 });
      indicatorWidth.value = withSpring(layout.width, { stiffness: 180 });
    }

    if (scrollable) {
      scrollRef.current?.scrollTo({
        x: Math.max(layout.x - 16, 0),
        animated: true,
      });
    }
  };

  useEffect(() => {
    moveIndicator();
  }, [activeIndex]);

  const handleLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layouts.current[index] = { x, width };
    if (index === activeIndex && !hasMounted.current) {
      moveIndicator();
    }
  };

  const content = (
    <>
      <Animated.View
        className="absolute bottom-0 h-0.5 bg-info rounded-full left-0"
        style={indicatorStyle}
      />
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <Pressable
            key={tab}
            onLayout={handleLayout(index)}
            onPress={() => onTabPress(index)}
            className={scrollable ? "py-3" : "flex-1 items-center py-3"}
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
    </>
  );

  if (scrollable) {
    return (
      <View className="border-b border-border-light" style={{ height: 48 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 20 }}
        >
          {content}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      className="flex-row border-b border-border-light"
      style={{ height: 48 }}
    >
      {content}
    </View>
  );
}
