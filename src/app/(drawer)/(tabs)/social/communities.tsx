import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

import { FloatingActionButton } from "@/components/common/FloatingActionButton";
import { CommunityCard } from "@/components/communities/CommunityCard";
import { FeaturedCommunityCard } from "@/components/communities/FeaturedCommunityCard";
import { FilterTabs } from "@/components/communities/FilterTabs";
import { SuggestedStrip } from "@/components/communities/SuggestedStrip";

import {
  communities,
  featuredCommunity,
  suggestedCommunities,
} from "@/utils/types";

export default function CommunitiesScreen() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<
    "All" | "Mine" | "Trending" | "Genre" | "New"
  >("All");
  const [search, setSearch] = useState("");

  const filtered = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}

        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <View>
            <FilterTabs active={activeFilter} onChange={setActiveFilter} />

            <FeaturedCommunityCard
              community={featuredCommunity}
              onJoin={() => {}}
            />
            <SuggestedStrip data={suggestedCommunities} onJoin={() => {}} />

            <Text className="text-text-primary font-semibold text-base mb-3">
              All Communities
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <CommunityCard
            community={item}
            onJoin={() => {}}
            onPress={() => router.push(`/community/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text className="text-text-muted text-center mt-10">
            No communities found
          </Text>
        }
      />

      <FloatingActionButton onPress={() => router.push("/community/create")} />
    </View>
  );
}
