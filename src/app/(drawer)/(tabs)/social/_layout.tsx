import { SlidingTabBar } from "@/components/common/SlidingTabBar";
import TopBar from "@/components/common/TopBar";
import { useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "expo-router/react-navigation";
import { useRef, useState } from "react";
import { View } from "react-native";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

import CommunitiesScreen from "./communities";
import RoomsScreen from "./rooms";

const TABS = ["Communities", "Rooms"];

export default function SocialLayout() {
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleTabPress = (index: number) => {
    pagerRef.current?.setPage(index);
  };

  const handlePageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(e.nativeEvent.position);
  };

  return (
    <View className="bg-background flex-1 ">
      <TopBar
        showLogo={false}
        showSettings={false}
        notificationCount={3}
        onDrawerPress={openDrawer}
        onNotificationsPress={() => router.push("/notification")}
        onSearchPress={() => router.push("/explore")}
      />
      <SlidingTabBar
        tabs={TABS}
        activeIndex={activeIndex}
        onTabPress={handleTabPress}
      />

      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <View key="communities" style={{ flex: 1 }}>
          <CommunitiesScreen />
        </View>
        <View key="rooms" style={{ flex: 1 }}>
          <RoomsScreen />
        </View>
      </PagerView>
    </View>
  );
}
