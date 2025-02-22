// src/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAWlDQYZS6NFswY7btiNHLi_FgivwxqJs",
  authDomain: "myauthapp-63230.firebaseapp.com",
  projectId: "myauthapp-63230",
  storageBucket: "myauthapp-63230.appspot.com", // ✅ Diperbaiki
  messagingSenderId: "623864982995",
  appId: "1:623864982995:web:a398d08ddac581aa20d326",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
