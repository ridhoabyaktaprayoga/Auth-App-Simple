import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet 
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Success:", userCredential.user); // Cek user di console
      router.push("/home");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Login Error:", err.message); // Debug error di console
      Alert.alert("Login Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Text untuk Sign Up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Apakah Anda belum punya akun? </Text>
        <TouchableOpacity onPress={() => router.push("/auth/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  signupText: {
    fontSize: 14,
    color: "#374151",
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3b82f6", // Warna biru untuk teks Sign Up
  },
});
