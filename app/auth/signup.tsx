import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet 
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { router } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error: unknown) {
      const err = error as Error;
      Alert.alert("Signup Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Text untuk Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Apakah Anda sudah punya akun? </Text>
        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.loginLink}>Login</Text>
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
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  loginText: {
    fontSize: 14,
    color: "#374151",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3b82f6",
  },
});

