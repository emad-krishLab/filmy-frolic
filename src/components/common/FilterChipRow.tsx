import { Pressable, ScrollView, Text, View } from "react-native";

interface ChipOption {
  key: string;
  label: string;
}

interface Props {
  options: ChipOption[];
  active: string;
  onChange: (key: string) => void;
}

export function FilterChipRow({ options, active, onChange }: Props) {
  return (
    <View style={{ height: 48 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
          alignItems: "center",
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
