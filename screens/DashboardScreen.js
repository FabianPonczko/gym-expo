import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text } from "react-native";
import DayCard from "../components/DayCard";
import api from "../services/api";

export default function Dashboard({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetchRoutine();
  }, []);

  const logout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log("Logging out...");
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  const fetchRoutine = async () => {
    try {
      const res = await api.get("/users");
      setUsuario(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!usuario) return <ActivityIndicator size="large" />;

  return (
    <ScrollView
      style={{
        padding: 15,
        display: "flex",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Rutina:{usuario.routine.name}
      </Text>
      <Text style={{ fontSize: 18, marginTop: 5 }}>
        Usuario: {usuario.name}
      </Text>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
      {usuario.routine.days.map((day, i) => (
        <DayCard key={i} day={day} />
      ))}
    </ScrollView>
  );
}
