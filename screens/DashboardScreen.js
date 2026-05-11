// screens/Dashboard.js
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DayTabs from "../components/DayTabs";
import ExerciseCard from "../components/ExerciseCard";
import LoadingOverlay from "../components/LoadingSping";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [routine, setRoutine] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [cargando, setCargando] = useState(false);
  
  useEffect(() => {
    fetchRoutine();
  }, []);

  const fetchRoutine = async () => {
    setCargando(true)
    try {
      const res = await api.get("/users/my-routine");
      setRoutine(res.data);
    } catch (err) {
      console.log(err);
    }finally{
      setCargando(false)
    }
  };

  if (!routine) return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.buttonText}>Usuario "{user.name}"sin rutina cargada</Text>
  
    </SafeAreaView>
  );

  const day = routine.days[selectedDay];

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay cargando={cargando}></LoadingOverlay>

      <Text style={styles.buttonText}>{user.name}</Text>

      {/* 👉 Tabs de días */}
      <DayTabs style={styles.dayCard}
        days={routine.days}
        selected={selectedDay}
        onChange={setSelectedDay}
      />

      {/* 👉 Lista ejercicios */}
      <FlatList style={styles.exerciseCard}
        data={day.exercises}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item,index}) => (
          <ExerciseCard 
          item={item}
          numero={index+1}
          />
        )}
      />
  
    </SafeAreaView>
  );
}

// screens/Dashboard styles
export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingbottom: 0,
  },

  dayCard: {
    backgroundColor: "#35b418",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
  },

  dayTitle: {
    color: "#22c55e",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  exerciseCard: {
    // backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
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
    paddingBottom: 10,
    fontSize: 20, 
  },
});