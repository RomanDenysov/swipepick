import { useIsOnboardingCompleted } from "@/stores/app-store";
import { Redirect } from "expo-router";

export default function Index() {
  const isOnboardingCompleted = useIsOnboardingCompleted();

  if (isOnboardingCompleted) {
    return <Redirect href="/(tabs)/swipe" />;
  }

  return <Redirect href="/onboarding" />;
}
