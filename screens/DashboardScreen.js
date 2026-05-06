// screens/Dashboard.js
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import api from "../services/api";
import DayTabs from "../components/DayTabs";
import ExerciseCard from "../components/ExerciseCard";

export default function Dashboard() {
  const [routine, setRoutine] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    fetchRoutine();
  }, []);

  const fetchRoutine = async () => {
    try {
      const res = await api.get("/users/my-routine");
      setRoutine(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!routine) return <ActivityIndicator size="large" />;

  const day = routine.days[selectedDay];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.name}</Text>

      {/* 👉 Tabs de días */}
      <DayTabs
        days={routine.days}
        selected={selectedDay}
        onChange={setSelectedDay}
      />

      {/* 👉 Lista ejercicios */}
      <FlatList
        data={day.exercises}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <ExerciseCard item={item} />
        )}
      />
    </View>
  );
}

// screens/Dashboard styles
export const styles = StyleSheet.create({
  dayCard: {
    backgroundColor: "#020617",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
  },

  dayTitle: {
    color: "#22c55e",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  exerciseCard: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  exerciseName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  exerciseInfo: {
    color: "#94a3b8",
  },

  button: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    alignItems: "center",
  },

  buttonDanger: {
    backgroundColor: "#ef4444",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});