// screens/LoginScreen.js
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import api from "../services/api";
import { saveToken } from "../utils/storage";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const res = await api.post("/auth/login", { name, password });

      await saveToken(res.data.token);

      navigation.replace("Dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "", padding: 30 }}>
      <Text style={{ fontSize: 24 }}>Login</Text>

      <TextInput
        placeholder="Name"
        onChangeText={setName}
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <Pressable
        onPress={login}
        style={{ backgroundColor: "#38bdf8", padding: 12, marginTop: 15 }}
      >
        <Text>Ingresar</Text>
      </Pressable>
    </View>
  );
}
