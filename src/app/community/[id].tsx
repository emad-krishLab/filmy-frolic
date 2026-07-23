import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommunityBanner } from "@/components/communities/CommunityBanner";
import { CommunityInfoBar } from "@/components/communities/CommunityInfoBar";
import { CommunityTabBar } from "@/components/communities/CommunityTabBar";
import { EmptyTab } from "@/components/communities/EmptyTab";
import { FeedTab } from "@/components/communities/FeedTab";

import {
  CommunityTab,
  mockCommunityDetail,
  mockCommunityPosts,
} from "@/utils/types";

const TABS: CommunityTab[] = [
  "Feed",
  "About",
  "Members",
  "Events",
  "Media",
  "Rules",
];

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isJoined, setIsJoined] = useState(mockCommunityDetail.isJoined);

  const community = mockCommunityDetail;

  const handleJoin = () => setIsJoined((prev) => !prev);

  const handleMorePress = () => {
    Alert.alert("Community options", undefined, [
      { text: "Report community", style: "destructive", onPress: () => {} },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleTabPress = (tab: CommunityTab) => {
    pagerRef.current?.setPage(TABS.indexOf(tab));
  };

  const handlePageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(e.nativeEvent.position);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <CommunityBanner
        bannerUrl={community.bannerUrl}
        icon={community.icon}
        onMorePress={handleMorePress}
      />
      <CommunityInfoBar
        name={community.name}
        memberCount={community.memberCount}
        postsToday={community.postsToday}
        isJoined={isJoined}
        onJoinPress={handleJoin}
      />
      <CommunityTabBar active={TABS[activeIndex]} onChange={handleTabPress} />

      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <ScrollView
          key="feed"
          contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
        >
          <FeedTab posts={mockCommunityPosts} />
        </ScrollView>
        <ScrollView
          key="about"
          contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
        >
          <EmptyTab label="About" />
        </ScrollView>
        <ScrollView
          key="members"
          contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
        >
          <EmptyTab label="Members list" />
        </ScrollView>
        <ScrollView
          key="events"
          contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
        >
          <EmptyTab label="Events" />
        </ScrollView>
        <ScrollView
          key="media"
          contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
        >
          <EmptyTab label="Media" />
        </ScrollView>
        <ScrollView
          key="rules"
          contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
        >
          <EmptyTab label="Rules" />
        </ScrollView>
      </PagerView>
    </SafeAreaView>
  );
}
