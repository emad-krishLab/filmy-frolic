import { Redirect } from "expo-router";

export default function Index() {
  // Root entry point — redirect to auth login screen
  return <Redirect href="/(auth)/login" />;
}
