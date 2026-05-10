import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import api from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExerciseHistoryModal({
  visible,
  onClose,
  exercise,
}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (visible && exercise) {
      fetchHistory();
    }
  }, [visible]);

  const fetchHistory = async () => {
    try {
      const res = await api.get(
        `/progress/by-exercise?exercise=${exercise}`
      );
      const pesos = [...res.data].filter(a=>a.weight !==0)

      setHistory(pesos);

    } catch (err) {
      console.log(err);
    }
  };

  return (
  

    <Modal visible={visible} animationType="slide">

      <View style={styles.container}>

        <Text style={styles.title}>
          📈 {exercise}
        </Text>

        <FlatList
          data={history}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>

              <Text style={styles.weight}>
                {item.weight} KG
              </Text>

              <Text style={styles.reps}>
                {item.reps} reps
              </Text>

              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>

            </View>
          )}
          />

        <TouchableOpacity
          style={styles.close}
          onPress={onClose}
          >
          <Text style={{ color: "white" }}>
            Volver
          </Text>
        </TouchableOpacity>

      </View>

    </Modal>
  
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
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },

  weight: {
    color: "#22c55e",
    fontSize: 28,
    fontWeight: "bold",
  },

  reps: {
    color: "white",
    marginTop: 6,
    fontSize: 16,
  },

  date: {
    color: "#94a3b8",
    marginTop: 6,
  },

  close: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },
});