import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

import api from "../services/api";
import LoadingOverlay from "../components/LoadingSping";

export default function ProgressScreen() {
  const [history, setHistory] = useState([]);
  const [cargando, setCargando] = useState(true)
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setCargando(true)
      const res = await api.get("/progress/by-exercise");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }finally{
      setCargando(false)
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <LoadingOverlay cargando={cargando}></LoadingOverlay>
      <View>
        <Text style={styles.exercise}>
          🏋️ {item.exercise}
        </Text>

        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.weight}>
          {item.weight} KG
        </Text>

        <Text style={styles.reps}>
          {item.reps} reps
        </Text>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        📈 Historial
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  exercise: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  date: {
    color: "#94a3b8",
    marginTop: 4,
  },

  right: {
    alignItems: "flex-end",
  },

  weight: {
    color: "#22c55e",
    fontSize: 24,
    fontWeight: "bold",
  },

  reps: {
    color: "#cbd5e1",
    marginTop: 4,
  },
});