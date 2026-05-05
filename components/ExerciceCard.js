import { useState } from "react";
import { Button, Text, View } from "react-native";
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
        backgroundColor: "#222",
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>{ex.name}</Text>

      <Text style={{ color: "#aaa" }}>
        {item.sets} x {item.reps}
      </Text>

      <Button title="💪 Registrar peso" onPress={() => setOpen(true)} />
      <Button title="📊 Ver progreso" onPress={loadHistory} />

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
