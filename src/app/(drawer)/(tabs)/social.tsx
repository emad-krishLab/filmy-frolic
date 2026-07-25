

import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommunitiesScreen() {
  return (
    <SafeAreaView>
      <Text>this is communities screen</Text>
    </SafeAreaView>
  );
}

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Pressable,
//   Image,
//   TextInput,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";


// // ─── Mock Data ────────────────────────────────────────────────────────────────
// const FEED_TABS = ["All", "Reviews", "Gossip", "Memes", "Rooms"];

// const FEED_POSTS = [
//   {
//     id: "f1",
//     tab: "Reviews",
//     user: "CinemaFreak",
//     avatar: "https://i.pravatar.cc/100?img=1",
//     rating: "9/10",
//     movie: "Dune: Part Two",
//     content:
//       "Denis Villeneuve delivers a stunning conclusion to the Dune saga. The cinematography is breathtaking, Hans Zimmer's score is haunting, and Zendaya absolutely owns the second half. This is science fiction cinema at its very finest. 🎬✨",
//     time: "2h ago",
//     likes: 247,
//     comments: 52,
//     image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80",
//     tags: ["#DunePart2", "#SciFi", "#MustWatch"],
//   },
//   {
//     id: "f2",
//     tab: "Gossip",
//     user: "FilmNerd99",
//     avatar: "https://i.pravatar.cc/100?img=5",
//     movie: null,
//     content:
//       "🚨 Rumour has it that Christopher Nolan is already in pre-production for his next film — and it's a historical epic set in ancient Rome. Sources say Tom Hardy is in talks for the lead. Let's GOOO! 🏛️🎭",
//     time: "4h ago",
//     likes: 1024,
//     comments: 189,
//     image: null,
//     tags: ["#Nolan", "#Hollywood", "#Rumours"],
//   },
//   {
//     id: "f3",
//     tab: "Memes",
//     user: "MemeKing_RN",
//     avatar: "https://i.pravatar.cc/100?img=8",
//     movie: "Oppenheimer",
//     content:
//       "Me watching Oppenheimer for the 3rd time trying to finally understand the plot vs. my brain just vibing to the IMAX sound design 💀",
//     time: "6h ago",
//     likes: 3400,
//     comments: 412,
//     image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
//     tags: ["#Oppenheimer", "#Nolan", "#Relatable"],
//   },
//   {
//     id: "f4",
//     tab: "Rooms",
//     user: "WatchParty_HQ",
//     avatar: "https://i.pravatar.cc/100?img=12",
//     movie: "Poor Things",
//     content:
//       "🎙️ LIVE ROOM OPEN: 'Poor Things' watch party + discussion happening now! 24 people inside. Come join the chaos, beauty, and Bella Baxter appreciation. 🌹",
//     time: "Just now",
//     likes: 56,
//     comments: 24,
//     image: null,
//     tags: ["#PoorThings", "#WatchParty", "#LiveNow"],
//     isLive: true,
//   },
// ];

// const ACTIVE_ROOMS = [
//   {
//     id: "r1",
//     title: "Oscar Predictions 2025",
//     participants: 89,
//     host: "MovieMaven",
//     hostAvatar: "https://i.pravatar.cc/100?img=20",
//     color: "#7C5CFC",
//   },
//   {
//     id: "r2",
//     title: "Nolan Universe Deep Dive",
//     participants: 134,
//     host: "ChrisNFan",
//     hostAvatar: "https://i.pravatar.cc/100?img=25",
//     color: "#E91E8C",
//   },
//   {
//     id: "r3",
//     title: "Horror Movie Tier List",
//     participants: 47,
//     host: "HorrorHead",
//     hostAvatar: "https://i.pravatar.cc/100?img=30",
//     color: "#F97316",
//   },
// ];

// // ─── Sub-components ───────────────────────────────────────────────────────────
// function RoomCard({ room }: { room: (typeof ACTIVE_ROOMS)[0] }) {
//   return (
//     <Pressable
//       style={{
//         width: 200,
//         marginRight: 12,
//         borderRadius: 14,
//         overflow: "hidden",
//         borderWidth: 1,
//         borderColor: room.color + "44",
//       }}
//     >
//       <LinearGradient
//         colors={[room.color + "33", "#12121E"]}
//         style={{ padding: 14 }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginBottom: 8,
//             gap: 6,
//           }}
//         >
//           <View
//             style={{
//               width: 8,
//               height: 8,
//               borderRadius: 4,
//               backgroundColor: "#22C55E",
//             }}
//           />
//           <Text style={{ color: "#22C55E", fontSize: 10, fontWeight: "700" }}>
//             LIVE
//           </Text>
//           <Text style={{ color: "#8A8A9E", fontSize: 10, marginLeft: "auto" }}>
//             {room.participants} 👥
//           </Text>
//         </View>
//         <Text
//           style={{ color: "#F0F0F8", fontWeight: "800", fontSize: 14, marginBottom: 8 }}
//           numberOfLines={2}
//         >
//           {room.title}
//         </Text>
//         <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
//           <Image
//             source={{ uri: room.hostAvatar }}
//             style={{ width: 22, height: 22, borderRadius: 11 }}
//           />
//           <Text style={{ color: "#8A8A9E", fontSize: 11 }}>
//             Hosted by {room.host}
//           </Text>
//         </View>
//       </LinearGradient>
//     </Pressable>
//   );
// }

// function PostCard({ post }: { post: (typeof FEED_POSTS)[0] }) {
//   const [liked, setLiked] = useState(false);
//   return (
//     <View
//       style={{
//         backgroundColor: "#12121E",
//         borderRadius: 16,
//         marginHorizontal: 16,
//         marginBottom: 14,
//         borderWidth: 1,
//         borderColor: "#1A1A26",
//         overflow: "hidden",
//       }}
//     >
//       {/* Live badge */}
//       {(post as any).isLive && (
//         <LinearGradient
//           colors={["#22C55E", "#16A34A"]}
//           style={{
//             paddingHorizontal: 12,
//             paddingVertical: 4,
//             flexDirection: "row",
//             alignItems: "center",
//             gap: 6,
//           }}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//         >
//           <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff" }} />
//           <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>
//             LIVE ROOM
//           </Text>
//         </LinearGradient>
//       )}

//       <View style={{ padding: 14 }}>
//         {/* Header */}
//         <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
//           <Image
//             source={{ uri: post.avatar }}
//             style={{ width: 38, height: 38, borderRadius: 19, marginRight: 10 }}
//           />
//           <View style={{ flex: 1 }}>
//             <Text style={{ color: "#F0F0F8", fontWeight: "700", fontSize: 14 }}>
//               {post.user}
//             </Text>
//             <Text style={{ color: "#8A8A9E", fontSize: 11 }}>{post.time}</Text>
//           </View>
//           <View
//             style={{
//               backgroundColor: "#1A1A2A",
//               borderRadius: 6,
//               paddingHorizontal: 8,
//               paddingVertical: 4,
//               borderWidth: 1,
//               borderColor: "#333344",
//             }}
//           >
//             <Text style={{ color: "#8A8A9E", fontSize: 10, fontWeight: "600" }}>
//               {post.tab}
//             </Text>
//           </View>
//         </View>

//         {/* Movie tag */}
//         {post.movie && (
//           <View
//             style={{
//               backgroundColor: "rgba(245,197,24,0.12)",
//               borderRadius: 6,
//               paddingHorizontal: 8,
//               paddingVertical: 3,
//               alignSelf: "flex-start",
//               marginBottom: 8,
//               borderWidth: 1,
//               borderColor: "rgba(245,197,24,0.25)",
//             }}
//           >
//             <Text style={{ color: "#F5C518", fontSize: 11, fontWeight: "600" }}>
//               🎬 {post.movie}
//             </Text>
//           </View>
//         )}

//         {/* Rating */}
//         {post.rating && (
//           <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6, gap: 4 }}>
//             {[1, 2, 3, 4, 5].map((i) => (
//               <Feather
//                 key={i}
//                 name="star"
//                 size={13}
//                 color={i <= Math.round(parseInt(post.rating) / 2) ? "#F5C518" : "#333344"}
//               />
//             ))}
//             <Text style={{ color: "#F5C518", fontSize: 12, fontWeight: "700", marginLeft: 4 }}>
//               {post.rating}
//             </Text>
//           </View>
//         )}

//         <Text style={{ color: "#C8C8D8", fontSize: 14, lineHeight: 21, marginBottom: 10 }}>
//           {post.content}
//         </Text>

//         {/* Image */}
//         {post.image && (
//           <Image
//             source={{ uri: post.image }}
//             style={{ width: "100%", height: 180, borderRadius: 10, marginBottom: 10 }}
//             resizeMode="cover"
//           />
//         )}

//         {/* Tags */}
//         <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
//           {post.tags.map((tag) => (
//             <Text key={tag} style={{ color: "#7C5CFC", fontSize: 12, fontWeight: "600" }}>
//               {tag}
//             </Text>
//           ))}
//         </View>

//         {/* Actions */}
//         <View style={{ flexDirection: "row", gap: 20, borderTopWidth: 1, borderTopColor: "#1A1A26", paddingTop: 10 }}>
//           <Pressable
//             onPress={() => setLiked((p) => !p)}
//             style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
//           >
//             <Feather name="heart" size={15} color={liked ? "#E91E8C" : "#8A8A9E"} />
//             <Text style={{ color: liked ? "#E91E8C" : "#8A8A9E", fontSize: 13 }}>
//               {liked ? post.likes + 1 : post.likes}
//             </Text>
//           </Pressable>
//           <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
//             <Feather name="message-circle" size={15} color="#8A8A9E" />
//             <Text style={{ color: "#8A8A9E", fontSize: 13 }}>{post.comments}</Text>
//           </Pressable>
//           <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
//             <Feather name="share-2" size={15} color="#8A8A9E" />
//             <Text style={{ color: "#8A8A9E", fontSize: 13 }}>Share</Text>
//           </Pressable>
//           <Pressable style={{ marginLeft: "auto" }}>
//             <Feather name="bookmark" size={15} color="#8A8A9E" />
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );
// }

// // ─── Social Screen ────────────────────────────────────────────────────────────
// export default function SocialScreen() {
//   const [activeTab, setActiveTab] = useState("All");

//   const filteredPosts =
//     activeTab === "All"
//       ? FEED_POSTS
//       : FEED_POSTS.filter((p) => p.tab === activeTab);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#080810" }}>
//       <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
//         {/* Header */}
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             paddingHorizontal: 16,
//             paddingVertical: 12,
//           }}
//         >
//           <Text style={{ flex: 1, color: "#F0F0F8", fontSize: 22, fontWeight: "900" }}>
//             💬 Social Feed
//           </Text>
//           <Pressable
//             style={{
//               width: 38,
//               height: 38,
//               borderRadius: 12,
//               backgroundColor: "#F5C518",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Feather name="edit-2" size={16} color="#080810" />
//           </Pressable>
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false}>
//           {/* Live Rooms Strip */}
//           <View style={{ marginBottom: 16 }}>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingHorizontal: 16,
//                 marginBottom: 10,
//               }}
//             >
//               <View
//                 style={{
//                   width: 8,
//                   height: 8,
//                   borderRadius: 4,
//                   backgroundColor: "#22C55E",
//                   marginRight: 6,
//                 }}
//               />
//               <Text style={{ color: "#F0F0F8", fontWeight: "800", fontSize: 15, flex: 1 }}>
//                 Live Rooms
//               </Text>
//               <Pressable>
//                 <Text style={{ color: "#F5C518", fontSize: 13, fontWeight: "600" }}>
//                   See all
//                 </Text>
//               </Pressable>
//             </View>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             >
//               {ACTIVE_ROOMS.map((room) => (
//                 <RoomCard key={room.id} room={room} />
//               ))}
//             </ScrollView>
//           </View>

//           {/* Feed Tabs */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingBottom: 14 }}
//           >
//             {FEED_TABS.map((tab) => (
//               <Pressable
//                 key={tab}
//                 onPress={() => setActiveTab(tab)}
//                 style={{
//                   paddingHorizontal: 16,
//                   paddingVertical: 8,
//                   borderRadius: 50,
//                   backgroundColor: activeTab === tab ? "#F5C518" : "#12121E",
//                   borderWidth: 1,
//                   borderColor: activeTab === tab ? "#F5C518" : "#1A1A26",
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: activeTab === tab ? "#080810" : "#8A8A9E",
//                     fontWeight: "700",
//                     fontSize: 13,
//                   }}
//                 >
//                   {tab}
//                 </Text>
//               </Pressable>
//             ))}
//           </ScrollView>

//           {/* Posts */}
//           {filteredPosts.map((post) => (
//             <PostCard key={post.id} post={post} />
//           ))}

//           <View style={{ height: 20 }} />
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// }
