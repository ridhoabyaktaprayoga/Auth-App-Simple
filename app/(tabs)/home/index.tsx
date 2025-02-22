import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Dimensions
} from "react-native";
import { auth } from "@/config/firebase";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        router.replace("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header dengan ikon profil */}
      <View style={styles.header}>
        <Text style={styles.title}>Selamat Datang!</Text>
        <TouchableOpacity 
          onPress={() => router.replace("/profile")} 
          style={styles.profileIcon}
        >
          <Ionicons name="person-circle-outline" size={50} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <Text style={styles.email}>{userEmail}</Text>
    </View>
  );
}

// Ambil ukuran layar untuk menyesuaikan margin responsif
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 50,
    paddingHorizontal: screenWidth * 0.05, // Responsif terhadap lebar layar
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1, // Supaya tidak bertabrakan dengan ikon profil
  },
  profileIcon: {
    alignSelf: "flex-end", // Pastikan ikon tetap di kanan
  },
  email: {
    fontSize: 16,
    color: "#374151",
    marginTop: 40,
  },
});
