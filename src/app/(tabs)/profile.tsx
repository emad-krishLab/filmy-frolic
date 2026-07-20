import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Feather from "@react-native-vector-icons/feather";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const USER = {
  name: "Alex Chen",
  username: "@alexchen",
  avatar: "https://i.pravatar.cc/150?img=35",
  bio: "Cinema fanatic. Letterboxd addict. If a film makes me cry it's a 10/10.",
  joinedDate: "January 2024",
  moviesWatched: 342,
  reviews: 87,
  followers: 1284,
  following: 412,
  xp: 3750,
  level: 14,
  nextLevelXP: 4000,
  badges: [
    { id: "b1", icon: "🎬", label: "Cinephile", color: "#F5C518" },
    { id: "b2", icon: "⭐", label: "Critic", color: "#7C5CFC" },
    { id: "b3", icon: "🔥", label: "7-Day Streak", color: "#F97316" },
    { id: "b4", icon: "🏆", label: "Top Reviewer", color: "#22C55E" },
  ],
};

const WATCHLIST = [
  { id: "w1", title: "Dune: Part Two", image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80" },
  { id: "w2", title: "The Brutalist", image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80" },
  { id: "w3", title: "Conclave", image: "https://images.unsplash.com/photo-1584985329182-35d6a4a9f0d8?w=400&q=80" },
  { id: "w4", title: "Anora", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80" },
];

const MY_REVIEWS = [
  {
    id: "r1",
    movie: "Oppenheimer",
    rating: 9,
    snippet: "Nolan's magnum opus — a visceral, cerebral experience that demands to be seen on the largest screen possible.",
    time: "3 days ago",
    likes: 145,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
  },
  {
    id: "r2",
    movie: "Poor Things",
    rating: 8,
    snippet: "A delightfully absurd piece of art. Yorgos Lanthimos at his most accessible and Emma Stone in career-best form.",
    time: "1 week ago",
    likes: 98,
    image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&q=80",
  },
];

const SETTINGS_ITEMS = [
  { icon: "user", label: "Edit Profile", color: "#7C5CFC" },
  { icon: "bell", label: "Notifications", color: "#F5C518" },
  { icon: "lock", label: "Privacy & Security", color: "#3B82F6" },
  { icon: "heart", label: "Favorites & Lists", color: "#E91E8C" },
  { icon: "help-circle", label: "Help & Support", color: "#22C55E" },
  { icon: "log-out", label: "Sign Out", color: "#E84545" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ color: "#F0F0F8", fontSize: 20, fontWeight: "900" }}>{value}</Text>
      <Text style={{ color: "#8A8A9E", fontSize: 11, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const router = useRouter();
  const xpProgress = (USER.xp / USER.nextLevelXP) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: "#080810" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Header */}
          <LinearGradient
            colors={["#7C5CFC22", "#080810"]}
            style={{ padding: 20, paddingTop: 16 }}
          >
            {/* Top Row */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ color: "#F0F0F8", fontSize: 20, fontWeight: "900" }}>
                Profile
              </Text>
              <Pressable
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  backgroundColor: "#12121E",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "#1A1A26",
                }}
              >
                <Feather name="settings" size={17} color="#8A8A9E" />
              </Pressable>
            </View>

            {/* Avatar + Name */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <View style={{ position: "relative" }}>
                <Image
                  source={{ uri: USER.avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderWidth: 3,
                    borderColor: "#F5C518",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#F5C518",
                    borderRadius: 10,
                    width: 24,
                    height: 24,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "#080810",
                  }}
                >
                  <Feather name="edit-2" size={11} color="#080810" />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#F0F0F8", fontSize: 20, fontWeight: "900" }}>
                  {USER.name}
                </Text>
                <Text style={{ color: "#8A8A9E", fontSize: 13, marginTop: 2 }}>
                  {USER.username}
                </Text>
                <Text style={{ color: "#C8C8D8", fontSize: 12, marginTop: 6, lineHeight: 17 }}>
                  {USER.bio}
                </Text>
              </View>
            </View>

            {/* Stats Row */}
            <View
              style={{
                backgroundColor: "#12121E",
                borderRadius: 14,
                padding: 16,
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#1A1A26",
                marginBottom: 16,
              }}
            >
              <StatBox label="Watched" value={USER.moviesWatched} />
              <View style={{ width: 1, backgroundColor: "#1A1A26" }} />
              <StatBox label="Reviews" value={USER.reviews} />
              <View style={{ width: 1, backgroundColor: "#1A1A26" }} />
              <StatBox label="Followers" value={USER.followers.toLocaleString()} />
              <View style={{ width: 1, backgroundColor: "#1A1A26" }} />
              <StatBox label="Following" value={USER.following} />
            </View>

            {/* XP / Level Bar */}
            <View
              style={{
                backgroundColor: "#12121E",
                borderRadius: 14,
                padding: 16,
                borderWidth: 1,
                borderColor: "#1A1A26",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View
                    style={{
                      backgroundColor: "#F5C518",
                      borderRadius: 6,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ color: "#080810", fontSize: 11, fontWeight: "900" }}>
                      LVL {USER.level}
                    </Text>
                  </View>
                  <Text style={{ color: "#F0F0F8", fontWeight: "700" }}>Film Buff</Text>
                </View>
                <Text style={{ color: "#8A8A9E", fontSize: 12 }}>
                  {USER.xp} / {USER.nextLevelXP} XP
                </Text>
              </View>
              <View style={{ backgroundColor: "#1A1A26", borderRadius: 6, height: 8, overflow: "hidden" }}>
                <LinearGradient
                  colors={["#F5C518", "#F97316"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ width: `${xpProgress}%`, height: "100%", borderRadius: 6 }}
                />
              </View>
            </View>
          </LinearGradient>

          {/* Badges */}
          <View style={{ paddingHorizontal: 16, marginTop: 4, marginBottom: 24 }}>
            <Text style={{ color: "#F0F0F8", fontSize: 16, fontWeight: "800", marginBottom: 12 }}>
              🏅 Badges
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {USER.badges.map((badge) => (
                <View
                  key={badge.id}
                  style={{
                    backgroundColor: badge.color + "18",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: badge.color + "44",
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    alignItems: "center",
                    gap: 4,
                    minWidth: 80,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{badge.icon}</Text>
                  <Text style={{ color: badge.color, fontSize: 11, fontWeight: "700" }}>
                    {badge.label}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Watchlist */}
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ color: "#F0F0F8", fontSize: 16, fontWeight: "800" }}>
                🎬 My Watchlist
              </Text>
              <Pressable>
                <Text style={{ color: "#F5C518", fontSize: 13, fontWeight: "600" }}>See all</Text>
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {WATCHLIST.map((item) => (
                <Pressable key={item.id}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 140, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* My Reviews */}
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ color: "#F0F0F8", fontSize: 16, fontWeight: "800" }}>
                ⭐ My Reviews
              </Text>
              <Pressable>
                <Text style={{ color: "#F5C518", fontSize: 13, fontWeight: "600" }}>See all</Text>
              </Pressable>
            </View>
            {MY_REVIEWS.map((review) => (
              <Pressable
                key={review.id}
                style={{
                  backgroundColor: "#12121E",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 10,
                  flexDirection: "row",
                  gap: 12,
                  borderWidth: 1,
                  borderColor: "#1A1A26",
                }}
              >
                <Image
                  source={{ uri: review.image }}
                  style={{ width: 60, height: 80, borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#F0F0F8", fontWeight: "700", fontSize: 14, marginBottom: 4 }}>
                    {review.movie}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 6 }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Feather
                        key={i}
                        name="star"
                        size={11}
                        color={i <= Math.round(review.rating / 2) ? "#F5C518" : "#333344"}
                      />
                    ))}
                    <Text style={{ color: "#F5C518", fontSize: 11, fontWeight: "700", marginLeft: 3 }}>
                      {review.rating}/10
                    </Text>
                  </View>
                  <Text style={{ color: "#8A8A9E", fontSize: 12, lineHeight: 17 }} numberOfLines={2}>
                    {review.snippet}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Feather name="heart" size={12} color="#8A8A9E" />
                      <Text style={{ color: "#8A8A9E", fontSize: 11 }}>{review.likes}</Text>
                    </View>
                    <Text style={{ color: "#5C5C6E", fontSize: 11 }}>{review.time}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Settings Menu */}
          <View style={{ paddingHorizontal: 16, marginBottom: 30 }}>
            <Text style={{ color: "#F0F0F8", fontSize: 16, fontWeight: "800", marginBottom: 12 }}>
              ⚙️ Account
            </Text>
            <View
              style={{
                backgroundColor: "#12121E",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#1A1A26",
                overflow: "hidden",
              }}
            >
              {SETTINGS_ITEMS.map((item, i) => (
                <Pressable
                  key={item.label}
                  onPress={() => {
                    if (item.label === "Sign Out") {
                      router.replace("/(auth)/login");
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                    borderBottomWidth: i < SETTINGS_ITEMS.length - 1 ? 1 : 0,
                    borderBottomColor: "#1A1A26",
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: item.color + "18",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Feather name={item.icon as any} size={17} color={item.color} />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      color: item.label === "Sign Out" ? "#E84545" : "#F0F0F8",
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {item.label}
                  </Text>
                  {item.label !== "Sign Out" && (
                    <Feather name="chevron-right" size={16} color="#5C5C6E" />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
