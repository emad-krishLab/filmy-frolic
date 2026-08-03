// src/app/(drawer)/(tabs)/social/rooms.tsx
import { useMemo, useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Add01Icon } from "@hugeicons/core-free-icons";

import { SlidingTabBar } from "@/components/common/SlidingTabBar";
import { FilterChipRow } from "@/components/common/FilterChipRow";
import { SearchBar } from "@/components/communities/SearchBar"; 
// import { RoomStatsStrip } from "../../../../components/rooms/RoomStatsStrip";
import { RoomCard } from "../../../../components/rooms/RoomCard";
import { HostFirstRoomCard } from "../../../../components/rooms/HostFirstRoomCard";

import { rooms, roomStats } from "@/utils/data";
import { ROOM_CATEGORY_LABELS } from "@/utils/types";

const STATUS_TABS = ["Live", "Scheduled"];

const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: "mine", label: "My Rooms" },
  ...Object.entries(ROOM_CATEGORY_LABELS).map(([key, label]) => ({ key, label })),
];

export default function RoomsScreen() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesStatus = statusIndex === 0 ? room.isLive : !room.isLive;
      const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "mine" && room.isHostedByMe) ||
        room.category === activeFilter;

      return matchesStatus && matchesSearch && matchesFilter;
    });
  }, [statusIndex, activeFilter, search]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center px-4 pt-3 gap-3">
        <View style={{ flex: 1 }}>
          <SlidingTabBar tabs={STATUS_TABS} activeIndex={statusIndex} onTabPress={setStatusIndex} />
        </View>
        <Pressable className="w-9 h-9 rounded-full bg-primary items-center justify-center mb-2">
          <HugeiconsIcon icon={Add01Icon} size={18} color="#080810" />
        </Pressable>
      </View>

      <View className="px-4 pt-3">
        <SearchBar value={search} onChangeText={setSearch} />
      </View>

      <FilterChipRow options={FILTER_OPTIONS} active={activeFilter} onChange={setActiveFilter} />

      {/* <RoomStatsStrip activeRooms={roomStats.activeRooms} watchParties={roomStats.watchParties} /> */}

      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <RoomCard
            room={item}
            onPress={() => {}}
            onFollowHost={() => {}}
            onJoin={() => {}}
          />
        )}
        ListEmptyComponent={<HostFirstRoomCard onHostPress={() => {}} />}
      />
    </View>
  );
}