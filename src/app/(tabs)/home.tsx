import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Feather from "@react-native-vector-icons/feather";

const { width: SCREEN_W } = Dimensions.get("window");

// ─── Mock Data ────────────────────────────────────────────────────────────────
const FEATURED = [
  {
    id: "1",
    title: "Dune: Part Two",
    genre: "Sci-Fi • Adventure",
    rating: "8.5",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80",
    tagline: "Long live the fighters.",
  },
  {
    id: "2",
    title: "Oppenheimer",
    genre: "Biography • Drama",
    rating: "8.9",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    tagline: "The world forever changes.",
  },
  {
    id: "3",
    title: "Poor Things",
    genre: "Comedy • Drama",
    rating: "8.0",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&q=80",
    tagline: "A marvellous, surreal adventure.",
  },
];

const TRENDING = [
  {
    id: "t1",
    title: "The Brutalist",
    rating: "7.9",
    genre: "Drama",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80",
  },
  {
    id: "t2",
    title: "Anora",
    rating: "8.1",
    genre: "Romance",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
  },
  {
    id: "t3",
    title: "A Real Pain",
    rating: "7.8",
    genre: "Drama",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
  },
  {
    id: "t4",
    title: "Conclave",
    rating: "7.6",
    genre: "Thriller",
    image: "https://images.unsplash.com/photo-1584985329182-35d6a4a9f0d8?w=400&q=80",
  },
];

const CATEGORIES = [
  { id: "c1", label: "Action", icon: "zap", color: "#F97316" },
  { id: "c2", label: "Drama", icon: "heart", color: "#E91E8C" },
  { id: "c3", label: "Sci-Fi", icon: "cpu", color: "#3B82F6" },
  { id: "c4", label: "Comedy", icon: "smile", color: "#22C55E" },
  { id: "c5", label: "Horror", icon: "moon", color: "#7C5CFC" },
  { id: "c6", label: "Thriller", icon: "alert-triangle", color: "#F5C518" },
];

const COMMUNITY_POSTS = [
  {
    id: "p1",
    user: "CinemaFreak",
    avatar: "https://i.pravatar.cc/100?img=1",
    content: "Dune Part Two is a visual masterpiece. Denis Villeneuve has done it again! 🎬",
    time: "2h ago",
    likes: 142,
    comments: 38,
    movie: "Dune: Part Two",
  },
  {
    id: "p2",
    user: "FilmNerd99",
    avatar: "https://i.pravatar.cc/100?img=5",
    content: "Hot take: Oppenheimer deserved every single Oscar it got. The practical effects alone were unreal.",
    time: "5h ago",
    likes: 89,
    comments: 24,
    movie: "Oppenheimer",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function HeroSlide({ item }: { item: (typeof FEATURED)[0] }) {
  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={{ width: SCREEN_W, height: 420 }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(8,8,16,0.1)", "rgba(8,8,16,0.7)", "#080810"]}
        locations={[0, 0.6, 1]}
        style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}
      >
        <View
          style={{
            backgroundColor: "rgba(245,197,24,0.15)",
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#F5C518",
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: "flex-start",
            marginBottom: 8,
          }}
        >
          <Text style={{ color: "#F5C518", fontSize: 10, fontWeight: "700", letterSpacing: 1 }}>
            ★ {item.rating} · {item.year}
          </Text>
        </View>
        <Text style={{ color: "#F0F0F8", fontSize: 28, fontWeight: "900", lineHeight: 32, marginBottom: 4 }}>
          {item.title}
        </Text>
        <Text style={{ color: "#8A8A9E", fontSize: 13, marginBottom: 4 }}>
          {item.genre}
        </Text>
        <Text style={{ color: "#F0F0F8", fontSize: 12, fontStyle: "italic", opacity: 0.8, marginBottom: 16 }}>
          "{item.tagline}"
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            style={{
              backgroundColor: "#F5C518",
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Feather name="play" size={14} color="#080810" />
            <Text style={{ color: "#080810", fontWeight: "700", fontSize: 13 }}>
              Watch Trailer
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              borderWidth: 1,
              borderColor: "#333344",
            }}
          >
            <Feather name="plus" size={14} color="#F0F0F8" />
            <Text style={{ color: "#F0F0F8", fontWeight: "600", fontSize: 13 }}>
              Watchlist
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

function MovieCard({ item }: { item: (typeof TRENDING)[0] }) {
  return (
    <Pressable style={{ width: 130, marginRight: 12 }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 130, height: 190, borderRadius: 12, marginBottom: 8 }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          top: 8,
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
        <Text style={{ color: "#F5C518", fontSize: 10, fontWeight: "700" }}>
          {item.rating}
        </Text>
      </View>
      <Text style={{ color: "#F0F0F8", fontSize: 12, fontWeight: "700", lineHeight: 16 }} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={{ color: "#8A8A9E", fontSize: 11, marginTop: 2 }}>
        {item.genre}
      </Text>
    </Pressable>
  );
}

function CategoryPill({ item }: { item: (typeof CATEGORIES)[0] }) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: item.color + "44",
        backgroundColor: item.color + "18",
        marginRight: 8,
      }}
    >
      <Feather name={item.icon as any} size={14} color={item.color} />
      <Text style={{ color: item.color, fontWeight: "600", fontSize: 13 }}>
        {item.label}
      </Text>
    </Pressable>
  );
}

function CommunityPostCard({ item }: { item: (typeof COMMUNITY_POSTS)[0] }) {
  const [liked, setLiked] = useState(false);
  return (
    <Pressable
      style={{
        backgroundColor: "#12121E",
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#1A1A26",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#F0F0F8", fontWeight: "700", fontSize: 14 }}>
            {item.user}
          </Text>
          <Text style={{ color: "#8A8A9E", fontSize: 11 }}>{item.time}</Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(245,197,24,0.12)",
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 3,
          }}
        >
          <Text style={{ color: "#F5C518", fontSize: 10, fontWeight: "600" }}>
            {item.movie}
          </Text>
        </View>
      </View>
      <Text style={{ color: "#C8C8D8", fontSize: 14, lineHeight: 20, marginBottom: 12 }}>
        {item.content}
      </Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Pressable
          onPress={() => setLiked((p) => !p)}
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <Feather name="heart" size={15} color={liked ? "#E91E8C" : "#8A8A9E"} />
          <Text style={{ color: liked ? "#E91E8C" : "#8A8A9E", fontSize: 13 }}>
            {liked ? item.likes + 1 : item.likes}
          </Text>
        </Pressable>
        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Feather name="message-circle" size={15} color="#8A8A9E" />
          <Text style={{ color: "#8A8A9E", fontSize: 13 }}>{item.comments}</Text>
        </Pressable>
        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Feather name="share-2" size={15} color="#8A8A9E" />
          <Text style={{ color: "#8A8A9E", fontSize: 13 }}>Share</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#080810" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#8A8A9E", fontSize: 12 }}>Good evening 👋</Text>
            <Text style={{ color: "#F0F0F8", fontSize: 20, fontWeight: "800", marginTop: 1 }}>
              Filmy Frolic
            </Text>
          </View>
          <Pressable
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#12121E",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
              borderWidth: 1,
              borderColor: "#1A1A26",
            }}
          >
            <Feather name="bell" size={18} color="#8A8A9E" />
          </Pressable>
          <Pressable
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#12121E",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#1A1A26",
            }}
          >
            <Feather name="menu" size={18} color="#8A8A9E" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Featured Hero Carousel */}
          <FlatList
            data={FEATURED}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <HeroSlide item={item} />}
            onMomentumScrollEnd={(e) => {
              setActiveSlide(
                Math.round(e.nativeEvent.contentOffset.x / SCREEN_W)
              );
            }}
          />
          {/* Pagination dots */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 12,
              gap: 6,
            }}
          >
            {FEATURED.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === activeSlide ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: i === activeSlide ? "#F5C518" : "#333344",
                }}
              />
            ))}
          </View>

          {/* Categories */}
          <View style={{ marginTop: 24 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#F0F0F8", fontSize: 17, fontWeight: "800" }}>
                Browse Genres
              </Text>
              <Pressable>
                <Text style={{ color: "#F5C518", fontSize: 13, fontWeight: "600" }}>
                  See all
                </Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              {CATEGORIES.map((cat) => (
                <CategoryPill key={cat.id} item={cat} />
              ))}
            </ScrollView>
          </View>

          {/* Trending Now */}
          <View style={{ marginTop: 24 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#F0F0F8", fontSize: 17, fontWeight: "800" }}>
                🔥 Trending Now
              </Text>
              <Pressable onPress={() => router.push("/(tabs)/explore")}>
                <Text style={{ color: "#F5C518", fontSize: 13, fontWeight: "600" }}>
                  See all
                </Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              {TRENDING.map((movie) => (
                <MovieCard key={movie.id} item={movie} />
              ))}
            </ScrollView>
          </View>

          {/* Community Feed Preview */}
          <View style={{ marginTop: 28 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#F0F0F8", fontSize: 17, fontWeight: "800" }}>
                💬 Community Buzz
              </Text>
              <Pressable onPress={() => router.push("/(tabs)/social")}>
                <Text style={{ color: "#F5C518", fontSize: 13, fontWeight: "600" }}>
                  See all
                </Text>
              </Pressable>
            </View>
            {COMMUNITY_POSTS.map((post) => (
              <CommunityPostCard key={post.id} item={post} />
            ))}
          </View>

          {/* Daily Challenge Banner */}
          <Pressable
            onPress={() => router.push("/(tabs)/games")}
            style={{ margin: 16, marginTop: 12 }}
          >
            <LinearGradient
              colors={["#7C5CFC", "#E91E8C"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 16, padding: 20 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: "600", letterSpacing: 1 }}>
                    DAILY CHALLENGE
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 20, fontWeight: "900", marginTop: 4 }}>
                    Film IQ Quiz ⚡
                  </Text>
                  <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 }}>
                    Test your movie knowledge today!
                  </Text>
                </View>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="arrow-right" size={22} color="#fff" />
                </View>
              </View>
            </LinearGradient>
          </Pressable>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
