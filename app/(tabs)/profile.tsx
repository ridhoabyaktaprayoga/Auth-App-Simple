import { StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/config/firebase"; // Pastikan path ini sesuai dengan konfigurasi Firebase Anda

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/auth/login"); // Redirect ke halaman login setelah logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="person.circle"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <ThemedText>Your account details and settings.</ThemedText>

      <Collapsible title="User Information">
        <ThemedText>
          Your profile contains details like username, email, and account settings.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Edit Profile">
        <ThemedText>
          You can update your personal details in the profile settings.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Security & Privacy">
        <ThemedText>
          Manage your password, authentication methods, and privacy settings.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Notifications">
        <ThemedText>
          Customize notification preferences for emails, alerts, and push notifications.
        </ThemedText>
      </Collapsible>

      {Platform.select({
        ios: (
          <Collapsible title="iOS Exclusive Features">
            <ThemedText>
              On iOS, you can use Face ID and Apple Sign-In for authentication.
            </ThemedText>
          </Collapsible>
        ),
      })}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText type="defaultSemiBold" style={styles.logoutText}>
          Logout
        </ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  logoutButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#ef4444",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
