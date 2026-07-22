import { CircleCheckBigIcon, CircleXIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DAILY_CHALLENGE = {
  question:
    "Which director made 'Inception', 'Interstellar', and 'Oppenheimer'?",
  options: [
    "Steven Spielberg",
    "Christopher Nolan",
    "Denis Villeneuve",
    "Ridley Scott",
  ],
  correct: 1,
  xpReward: 150,
  streak: 7,
};

const QUIZ_CATEGORIES = [
  {
    id: "q1",
    title: "Box Office Trivia",
    icon: "dollar-sign",
    color: "#F5C518",
    questions: 15,
    difficulty: "Medium",
  },
  {
    id: "q2",
    title: "Directors' Cut",
    icon: "video",
    color: "#7C5CFC",
    questions: 20,
    difficulty: "Hard",
  },
  {
    id: "q3",
    title: "Classic Cinema",
    icon: "film",
    color: "#3B82F6",
    questions: 12,
    difficulty: "Easy",
  },
  {
    id: "q4",
    title: "Plot Twists",
    icon: "alert-triangle",
    color: "#E91E8C",
    questions: 10,
    difficulty: "Hard",
  },
  {
    id: "q5",
    title: "Soundtrack IQ",
    icon: "music",
    color: "#1FD1A8",
    questions: 8,
    difficulty: "Easy",
  },
  {
    id: "q6",
    title: "Actor Spotlight",
    icon: "user",
    color: "#F97316",
    questions: 18,
    difficulty: "Medium",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    user: "QuizMaster",
    avatar: "https://i.pravatar.cc/100?img=15",
    score: 4820,
    badge: "🥇",
  },
  {
    rank: 2,
    user: "CineGeek",
    avatar: "https://i.pravatar.cc/100?img=20",
    score: 4510,
    badge: "🥈",
  },
  {
    rank: 3,
    user: "FilmFreak",
    avatar: "https://i.pravatar.cc/100?img=25",
    score: 4130,
    badge: "🥉",
  },
  {
    rank: 4,
    user: "MovieNerd99",
    avatar: "https://i.pravatar.cc/100?img=30",
    score: 3980,
    badge: "",
  },
  {
    rank: 5,
    user: "You",
    avatar: "https://i.pravatar.cc/100?img=35",
    score: 3750,
    badge: "",
    isMe: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function QuizCard({ quiz }: { quiz: (typeof QUIZ_CATEGORIES)[0] }) {
  const difficultyColor =
    {
      Easy: "#22C55E",
      Medium: "#F5C518",
      Hard: "#E84545",
    }[quiz.difficulty] ?? "#8A8A9E";

  return (
    <Pressable
      style={{
        width: (W - 48) / 2,
        marginBottom: 12,
        backgroundColor: "#12121E",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: quiz.color + "33",
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: quiz.color + "20",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <HugeiconsIcon icon={quiz.icon as any} size={22} color={quiz.color} />
      </View>
      <Text
        style={{
          color: "#F0F0F8",
          fontWeight: "800",
          fontSize: 14,
          marginBottom: 4,
        }}
        numberOfLines={2}
      >
        {quiz.title}
      </Text>
      <Text style={{ color: "#8A8A9E", fontSize: 11, marginBottom: 8 }}>
        {quiz.questions} questions
      </Text>
      <View
        style={{
          backgroundColor: difficultyColor + "20",
          borderRadius: 4,
          paddingHorizontal: 8,
          paddingVertical: 3,
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{ color: difficultyColor, fontSize: 10, fontWeight: "700" }}
        >
          {quiz.difficulty}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── Games Screen ─────────────────────────────────────────────────────────────
export default function GamesScreen() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#080810" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View
          style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}
        >
          <Text style={{ color: "#F0F0F8", fontSize: 22, fontWeight: "900" }}>
            ⚡ Games & Trivia
          </Text>
          <Text style={{ color: "#8A8A9E", fontSize: 13, marginTop: 2 }}>
            Test your film IQ and climb the leaderboard
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Streak Banner */}
          <LinearGradient
            colors={["#F97316", "#F5C518"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              margin: 16,
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "rgba(0,0,0,0.7)",
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                🔥 CURRENT STREAK
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 28,
                  fontWeight: "900",
                  marginTop: 2,
                }}
              >
                {DAILY_CHALLENGE.streak} Days
              </Text>
              <Text style={{ color: "rgba(0,0,0,0.6)", fontSize: 12 }}>
                Keep it up! Don't break the chain.
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 48 }}>🔥</Text>
            </View>
          </LinearGradient>

          {/* Daily Challenge */}
          <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#F0F0F8",
                  fontSize: 17,
                  fontWeight: "800",
                  flex: 1,
                }}
              >
                🎯 Daily Challenge
              </Text>
              <View
                style={{
                  backgroundColor: "rgba(245,197,24,0.15)",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderColor: "rgba(245,197,24,0.3)",
                }}
              >
                <Text
                  style={{ color: "#F5C518", fontSize: 11, fontWeight: "700" }}
                >
                  +{DAILY_CHALLENGE.xpReward} XP
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#12121E",
                borderRadius: 16,
                padding: 18,
                borderWidth: 1,
                borderColor: "#1A1A26",
              }}
            >
              <Text
                style={{
                  color: "#F0F0F8",
                  fontSize: 16,
                  fontWeight: "700",
                  lineHeight: 22,
                  marginBottom: 16,
                }}
              >
                {DAILY_CHALLENGE.question}
              </Text>
              {DAILY_CHALLENGE.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === DAILY_CHALLENGE.correct;
                const showResult = answered;

                let borderColor = "#333344";
                let bgColor = "transparent";
                let textColor = "#C8C8D8";

                if (showResult) {
                  if (isCorrect) {
                    borderColor = "#22C55E";
                    bgColor = "rgba(34,197,94,0.1)";
                    textColor = "#22C55E";
                  } else if (isSelected && !isCorrect) {
                    borderColor = "#E84545";
                    bgColor = "rgba(232,69,69,0.1)";
                    textColor = "#E84545";
                  }
                } else if (isSelected) {
                  borderColor = "#F5C518";
                  bgColor = "rgba(245,197,24,0.1)";
                  textColor = "#F5C518";
                }

                return (
                  <Pressable
                    key={idx}
                    onPress={() => handleAnswer(idx)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor,
                      backgroundColor: bgColor,
                      borderRadius: 10,
                      padding: 14,
                      marginBottom: 8,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor:
                          showResult && isCorrect ? "#22C55E" : "#1A1A26",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: showResult && isCorrect ? "#fff" : "#8A8A9E",
                          fontWeight: "700",
                          fontSize: 12,
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: textColor,
                        fontWeight: "600",
                        fontSize: 14,
                        flex: 1,
                      }}
                    >
                      {opt}
                    </Text>
                    {showResult && isCorrect && (
                      <HugeiconsIcon
                        icon={CircleCheckBigIcon}
                        size={18}
                        color="#22C55E"
                      />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <HugeiconsIcon icon = {CircleXIcon} size={18} color="#E84545" />
                    )}HugeiconsIcon
                  </Pressable>
                );
              })}

              {answered && (
                <Pressable
                  onPress={() => {
                    setAnswered(false);
                    setSelectedOption(null);
                  }}
                  style={{
                    marginTop: 8,
                    backgroundColor: "#F5C518",
                    borderRadius: 10,
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#080810",
                      fontWeight: "700",
                      fontSize: 14,
                    }}
                  >
                    Next Question →
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* Quiz Categories */}
          <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
            <Text
              style={{
                color: "#F0F0F8",
                fontSize: 17,
                fontWeight: "800",
                marginBottom: 14,
              }}
            >
              📚 Quiz Categories
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {QUIZ_CATEGORIES.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </View>
          </View>

          {/* Leaderboard */}
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                color: "#F0F0F8",
                fontSize: 17,
                fontWeight: "800",
                marginBottom: 14,
              }}
            >
              🏆 Leaderboard
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
              {LEADERBOARD.map((entry, i) => (
                <View
                  key={entry.rank}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 14,
                    borderBottomWidth: i < LEADERBOARD.length - 1 ? 1 : 0,
                    borderBottomColor: "#1A1A26",
                    backgroundColor: (entry as any).isMe
                      ? "rgba(245,197,24,0.05)"
                      : "transparent",
                  }}
                >
                  <Text style={{ fontSize: 20, width: 32 }}>
                    {entry.badge || `#${entry.rank}`}
                  </Text>
                  <Image
                    source={{ uri: entry.avatar }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      marginHorizontal: 10,
                    }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      color: (entry as any).isMe ? "#F5C518" : "#F0F0F8",
                      fontWeight: "700",
                      fontSize: 14,
                    }}
                  >
                    {entry.user}
                    {(entry as any).isMe && " (You)"}
                  </Text>
                  <Text
                    style={{
                      color: "#8A8A9E",
                      fontWeight: "700",
                      fontSize: 14,
                    }}
                  >
                    {entry.score.toLocaleString()} XP
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
