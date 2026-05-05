import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import api from "../services/api";
import WeightModal from "./WeightModal";

export default function ExerciseCard({ item }) {
  const ex = item.exercise;

  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);

  const loadHistory = async () => {
    const res = await api.get(`/progress/by-exercise?exercise=${ex.name}`);
    setHistory(res.data);
  };

  return (
    <View
      style={{
        marginTop: 10,
        padding: 10,
        backgroundColor: "#b2b0d781",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>{ex.name}</Text>

      <Text style={{ color: "#d3d2d2", marginBottom: 10 }}>
        {item.sets} x {item.reps}
      </Text>

      <TouchableOpacity style={styles.botones} onPress={() => setOpen(true)}>
        <Text style={styles.texto}>💪 Registrar peso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botones} onPress={loadHistory}>
        <Text style={styles.texto}>📊 Ver progreso</Text>
      </TouchableOpacity>

      {history.map((h, i) => (
        <Text key={i} style={{ color: "#ccc" }}>
          {h.weight}kg x {h.reps}
        </Text>
      ))}

      <WeightModal
        visible={open}
        exercise={ex.name}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}

const styles = {
  botones: {
    backgroundColor: "#1c80af",
    padding: 12,
    margin: 5,
    borderRadius: 12,
    alignItems: "center",
  },
};
