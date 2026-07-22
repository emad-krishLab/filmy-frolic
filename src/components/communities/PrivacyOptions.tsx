// src/components/createCommunity/PrivacyOptions.tsx
import { PrivacyType } from "@/utils/types";
import { Text, View } from "react-native";
import { PrivacyOption } from "./PrivacyOption";

interface Props {
  selected: PrivacyType;
  onSelect: (type: PrivacyType) => void;
}

const OPTIONS: {
  type: PrivacyType;
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    type: "public",
    icon: "🌐",
    title: "Public",
    description: "Anyone can join and post",
  },
  {
    type: "private",
    icon: "🔒",
    title: "Private",
    description: "Members must be approved",
  },
  {
    type: "invite-only",
    icon: "✉️",
    title: "Invite Only",
    description: "Only invited members can join",
  },
];

export function PrivacyOptions({ selected, onSelect }: Props) {
  return (
    <View className="mb-5">
      <Text className="text-text-secondary text-xs font-semibold uppercase mb-2">
        Privacy
      </Text>
      {OPTIONS.map((opt) => (
        <PrivacyOption
          type={opt.type}
          key={opt.type}
          icon={opt.icon}
          title={opt.title}
          description={opt.description}
          selected={selected === opt.type}
          onSelect={() => onSelect(opt.type)}
        />
      ))}
    </View>
  );
}
