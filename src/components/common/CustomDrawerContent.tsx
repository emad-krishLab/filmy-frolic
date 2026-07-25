// src/components/common/CustomDrawerContent.tsx
import {
  File01Icon,
  GameController01Icon,
  HelpCircleIcon,
  Logout03Icon,
  Message02Icon,
  Settings02Icon,
  SmileIcon,
  UserAdd02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CONTENT_ITEMS = [
  { label: "Articles", icon: File01Icon, route: "/(drawer)/articles" },
  { label: "Gossips", icon: Message02Icon, route: "/(drawer)/gossips" },
];

const ENTERTAIN_ITEMS = [
  { label: "Games", icon: GameController01Icon, route: "/(drawer)/games" },
  { label: "Memes", icon: SmileIcon, route: "/(drawer)/memes" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="text-text-muted text-xs font-semibold uppercase px-4 mb-2 mt-5">
      {children}
    </Text>
  );
}

function DrawerRow({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 px-4 py-3 active:bg-surface-hover rounded-md mx-2"
    >
      <HugeiconsIcon
        icon={icon}
        size={20}
        color={danger ? "#E84545" : "#8A8A9E"}
      />
      <Text
        className={`text-sm ${danger ? "text-danger" : "text-text-primary"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// `navigation` comes in as a prop from the Drawer's `drawerContent` render function —
// this is the piece that actually knows how to close itself. Don't replace this with
// useNavigation() inside this component; that hook resolves to the wrong navigator
// context here and silently breaks closeDrawer().
interface Props {
  navigation: any;
}

export function CustomDrawerContent({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const closeDrawer = () => navigation.closeDrawer();

  const navigateAndClose = (route: string) => {
    closeDrawer();
    router.push(route as any);
  };

  const handleSignOut = () => {
    Alert.alert("Sign out?", "You'll need to sign in again to continue.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // TODO: wire real sign-out logic (clear auth store, tokens, etc.)
          closeDrawer();
          router.replace("/auth");
        },
      },
    ]);
  };

  const handleInvite = () => {
    // TODO: replace with Share.share({ message: 'Join me on Filmy Frolic!' })
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <Pressable
        onPress={() => navigateAndClose("/(drawer)/(tabs)/profile")}
        className="flex-row items-center gap-3 px-4 py-3 mb-2"
      >
        <View className="w-11 h-11 rounded-full bg-accent-purple items-center justify-center">
          <Text className="text-white font-bold">E</Text>
        </View>
        <View>
          <Text className="text-text-primary font-semibold text-base">
            emad
          </Text>
          <Text className="text-text-muted text-xs">@emad</Text>
        </View>
      </Pressable>

      <View className="h-px bg-border-light mx-4" />

      <SectionLabel>Content</SectionLabel>
      {CONTENT_ITEMS.map((item) => (
        <DrawerRow
          key={item.label}
          icon={item.icon}
          label={item.label}
          onPress={() => navigateAndClose(item.route)}
        />
      ))}

      <SectionLabel>Entertain</SectionLabel>
      {ENTERTAIN_ITEMS.map((item) => (
        <DrawerRow
          key={item.label}
          icon={item.icon}
          label={item.label}
          onPress={() => navigateAndClose(item.route)}
        />
      ))}

      <View className="h-px bg-border-light mx-4 mt-5" />

      <View className="mt-2">
        <DrawerRow
          icon={Settings02Icon}
          label="Settings"
          onPress={() => navigateAndClose("/(drawer)/(tabs)/settings")}
        />
        <DrawerRow
          icon={HelpCircleIcon}
          label="Help & Support"
          onPress={() => {}}
        />
        <DrawerRow
          icon={UserAdd02Icon}
          label="Invite Friends"
          onPress={handleInvite}
        />
        <DrawerRow
          icon={Logout03Icon}
          label="Sign Out"
          onPress={handleSignOut}
          danger
        />
      </View>

      <Text className="text-text-tertiary text-xs text-center mt-8 mb-4">
        Filmy Frolic v1.0.0
      </Text>
    </ScrollView>
  );
}
