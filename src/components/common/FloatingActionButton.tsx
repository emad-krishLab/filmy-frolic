import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onPress: () => void;
  icon?: any;
  bottomOffset?: number;
}

export function FloatingActionButton({
  onPress,
  icon = Add01Icon,
  bottomOffset = 0,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="absolute right-5 w-14 h-14 rounded-full bg-primary items-center justify-center"
      style={{
        bottom: bottomOffset + insets.bottom,
        elevation: 6, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      }}
    >
      <HugeiconsIcon icon={icon} size={26} color="#080810" />
    </TouchableOpacity>
  );
}
