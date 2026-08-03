// src/components/explore/CategoryFilterChips.tsx
import { CATEGORIES, SearchCategory } from "@/utils/types";
import { Pressable, ScrollView, Text, View } from "react-native";

interface Props {
  active: SearchCategory | "all";
  onChange: (filter: SearchCategory | "all") => void;
}

export function CategoryFilterChips({ active, onChange }: Props) {
  const options: { key: SearchCategory | "all"; label: string }[] = [
    { key: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ key: c.type, label: c.pluralLabel })),
  ];

  return (
    <View className="border-b border-border-light" style={{ height: 56 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
          alignItems: "center", // ← stops chips from stretching to fill the row's height
        }}
        style={{ flex: 1 }}
      >
        {options.map((opt) => {
          const isActive = opt.key === active;
          return (
            <Pressable
              key={opt.key}
              onPress={() => onChange(opt.key)}
              className={`px-4 py-2 rounded-full border ${
                isActive
                  ? "bg-info/15 border-info"
                  : "bg-surface border-border-light"
              }`}
            >
              <Text
                className={`text-sm font-medium ${isActive ? "text-info" : "text-text-secondary"}`}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
