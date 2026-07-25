import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomDrawerContent } from "../../components/common/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          swipeEdgeWidth: 0,
          drawerStyle: { backgroundColor: "#080810", width: 280 },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ title: "" }} />
        <Drawer.Screen name="articles" options={{ title: "Articles" }} />
        <Drawer.Screen name="gossips" options={{ title: "Gossips" }} />
        <Drawer.Screen name="games" options={{ title: "Games" }} />
        <Drawer.Screen name="memes" options={{ title: "Memes" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}