// app/profile.tsx
import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { router } from "expo-router";

export default function Profile() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (error: unknown) {
        const err = error as Error;
        Alert.alert("Logout Error", err.message);
      }
      
  };

  return (
    <View>
      <Text>Welcome, {auth.currentUser?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
