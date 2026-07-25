// src/app/(tabs)/communities.tsx
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommunityCard } from "@/components/communities/CommunityCard";
import { FeaturedCommunityCard } from "@/components/communities/FeaturedCommunityCard";
import { FilterTabs } from "@/components/communities/FilterTabs";
import { SearchBar } from "@/components/communities/SearchBar";
import { SuggestedStrip } from "@/components/communities/SuggestedStrip";

import {
  communities,
  featuredCommunity,
  suggestedCommunities,
} from "@/utils/types";
import { useRouter } from "expo-router";

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
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListHeaderComponent={
          <View className="mb-2">
            {/* Header */}
            <View className="flex-row items-start justify-between mb-1">
              <View>
                <Text className="text-text-primary text-3xl font-bold">
                  Communities
                </Text>
                <Text className="text-text-secondary text-sm mt-1">
                  Find your fandom
                </Text>
              </View>
              <Pressable
                className="bg-primary w-10 h-10 rounded-full items-center justify-center"
                onPress={() => router.push("/community/create")}
              >
                <HugeiconsIcon icon={Add01Icon} size={20} color="#080810" />
              </Pressable>
            </View>

            <View className="mt-4">
              <FilterTabs active={activeFilter} onChange={setActiveFilter} />
              <SearchBar value={search} onChangeText={setSearch} />
            </View>

            <FeaturedCommunityCard
              community={featuredCommunity}
              onJoin={() => console.log("join featured")}
            />

            <SuggestedStrip data={suggestedCommunities} />
            {/* <LiveRoomsStrip data={liveRooms} /> */}

            <Text className="text-text-primary font-semibold text-base mb-1">
              All Communities
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="flex-1">
            <CommunityCard
              community={item}
              onJoin={() => console.log("join", item.id)}
              onPress={() => router.push(`/community/${item.id}`)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-text-muted text-center mt-10">
            No communities found
          </Text>
        }
      />
    </SafeAreaView>
  );
}
