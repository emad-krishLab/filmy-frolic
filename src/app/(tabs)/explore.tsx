import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@react-native-vector-icons/feather";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const FILTERS = ["All", "Movies", "Series", "Anime", "Documentaries"];

const GENRES = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Thriller", "Romance", "Animation"];

const ALL_CONTENT = [
  {
    id: "1", title: "Dune: Part Two", genre: "Sci-Fi", year: "2024", rating: "8.5", type: "Movie",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
  },
  {
    id: "2", title: "Oppenheimer", genre: "Drama", year: "2023", rating: "8.9", type: "Movie",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
  },
  {
    id: "3", title: "The Last of Us", genre: "Drama", year: "2023", rating: "8.7", type: "Series",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
  },
  {
    id: "4", title: "Poor Things", genre: "Comedy", year: "2023", rating: "8.0", type: "Movie",
    image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&q=80",
  },
  {
    id: "5", title: "The Brutalist", genre: "Drama", year: "2024", rating: "7.9", type: "Movie",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80",
  },
  {
    id: "6", title: "Shogun", genre: "Drama", year: "2024", rating: "9.0", type: "Series",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
  },
  {
    id: "7", title: "Anora", genre: "Romance", year: "2024", rating: "8.1", type: "Movie",
    image: "https://images.unsplash.com/photo-1584985329182-35d6a4a9f0d8?w=400&q=80",
  },
  {
    id: "8", title: "Alien: Romulus", genre: "Sci-Fi", year: "2024", rating: "7.3", type: "Movie",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function ContentCard({ item }: { item: (typeof ALL_CONTENT)[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <Pressable
      style={{
        width: "48%",
        marginBottom: 16,
        backgroundColor: "#12121E",
        borderRadius: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#1A1A26",
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 170 }}
          resizeMode="cover"
        />
        {/* Type badge */}
        <View
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "#7C5CFC",
            borderRadius: 4,
            paddingHorizontal: 6,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 9, fontWeight: "700" }}>
            {item.type.toUpperCase()}
          </Text>
        </View>
        {/* Wishlist button */}
        <Pressable
          onPress={() => setWishlisted((p) => !p)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(8,8,16,0.75)",
            borderRadius: 8,
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather
            name={wishlisted ? "bookmark" : "bookmark"}
            size={14}
            color={wishlisted ? "#F5C518" : "#8A8A9E"}
          />
        </Pressable>
        {/* Rating overlay */}
        <View
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(8,8,16,0.85)",
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 2,
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Feather name="star" size={10} color="#F5C518" />
          <Text style={{ color: "#F5C518", fontSize: 11, fontWeight: "700" }}>
            {item.rating}
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{ color: "#F0F0F8", fontWeight: "700", fontSize: 13 }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={{ color: "#8A8A9E", fontSize: 11, marginTop: 3 }}>
          {item.genre} · {item.year}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── Explore Screen ───────────────────────────────────────────────────────────
export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const filtered = ALL_CONTENT.filter((item) => {
    const matchQuery =
      !query.trim() || item.title.toLowerCase().includes(query.toLowerCase());
    const matchFilter =
      activeFilter === "All" ||
      item.type === activeFilter.slice(0, -1); // Movies → Movie, Series stays Series
    const matchGenre = !activeGenre || item.genre === activeGenre;
    return matchQuery && matchFilter && matchGenre;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#080810" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 }}>
          <Text style={{ color: "#F0F0F8", fontSize: 22, fontWeight: "900", marginBottom: 14 }}>
            🔍 Explore
          </Text>

          {/* Search Bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#12121E",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: focused ? "#F5C518" : "#1A1A26",
              paddingHorizontal: 14,
              height: 48,
              gap: 10,
            }}
          >
            <Feather name="search" size={18} color={focused ? "#F5C518" : "#8A8A9E"} />
            <TextInput
              placeholder="Search movies, series, anime..."
              placeholderTextColor="#7A7A8C"
              value={query}
              onChangeText={setQuery}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{ flex: 1, color: "#F0F0F8", fontSize: 14 }}
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")}>
                <Feather name="x" size={16} color="#8A8A9E" />
              </Pressable>
            )}
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Type Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingBottom: 12 }}
          >
            {FILTERS.map((f) => (
              <Pressable
                key={f}
                onPress={() => setActiveFilter(f)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 50,
                  backgroundColor:
                    activeFilter === f ? "#F5C518" : "#12121E",
                  borderWidth: 1,
                  borderColor: activeFilter === f ? "#F5C518" : "#1A1A26",
                }}
              >
                <Text
                  style={{
                    color: activeFilter === f ? "#080810" : "#8A8A9E",
                    fontWeight: "700",
                    fontSize: 13,
                  }}
                >
                  {f}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Genre Tags */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingBottom: 16 }}
          >
            {GENRES.map((g) => (
              <Pressable
                key={g}
                onPress={() => setActiveGenre(activeGenre === g ? null : g)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 50,
                  backgroundColor:
                    activeGenre === g ? "rgba(124,92,252,0.2)" : "transparent",
                  borderWidth: 1,
                  borderColor: activeGenre === g ? "#7C5CFC" : "#333344",
                }}
              >
                <Text
                  style={{
                    color: activeGenre === g ? "#7C5CFC" : "#8A8A9E",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  {g}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Results Count */}
          <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
            <Text style={{ color: "#8A8A9E", fontSize: 13 }}>
              <Text style={{ color: "#F5C518", fontWeight: "700" }}>
                {filtered.length}
              </Text>{" "}
              results found
            </Text>
          </View>

          {/* Grid */}
          {filtered.length === 0 ? (
            <View style={{ alignItems: "center", paddingTop: 60 }}>
              <Feather name="film" size={40} color="#333344" />
              <Text style={{ color: "#8A8A9E", marginTop: 12, fontSize: 15 }}>
                No results found
              </Text>
              <Text style={{ color: "#5C5C6E", marginTop: 4, fontSize: 13 }}>
                Try a different search or filter
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              {filtered.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </View>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
