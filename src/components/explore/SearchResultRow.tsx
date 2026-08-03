import { SearchResult } from "@/utils/types";
import {
  File01Icon,
  FlimSlateIcon,
  GameController01Icon,
  MeetingRoomIcon,
  Message02Icon,
  User02Icon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, Text, View } from "react-native";

const TYPE_ICONS: Record<string, any> = {
  movie: FlimSlateIcon,
  community: UserGroup02Icon,
  room: MeetingRoomIcon,
  gossip: Message02Icon,
  article: File01Icon,
  game: GameController01Icon,
  person: User02Icon,
};

interface Props {
  result: SearchResult;
  onPress?: () => void;
}

export function SearchResultRow({ result, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 px-4 py-3 active:bg-surface-hover"
    >
      <View className="w-11 h-11 rounded-md bg-surface-card items-center justify-center">
        <HugeiconsIcon
          icon={TYPE_ICONS[result.type]}
          size={20}
          color="#F5C518"
        />
      </View>

      <View className="flex-1">
        <Text
          className="text-text-primary font-medium text-sm"
          numberOfLines={1}
        >
          {result.title}
        </Text>
        {result.subtitle && (
          <Text className="text-text-muted text-xs mt-0.5" numberOfLines={1}>
            {result.subtitle}
          </Text>
        )}
      </View>

      {result.metaLabel && (
        <Text className="text-text-secondary text-xs">{result.metaLabel}</Text>
      )}
    </Pressable>
  );
}
