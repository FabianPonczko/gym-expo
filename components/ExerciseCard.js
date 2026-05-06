// components/ExerciseCard.js
import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import WeightModal from "./WeightModal";

export default function ExerciseCard({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{
      backgroundColor: "#0f172a",
      padding: 15,
      borderRadius: 12,
      marginTop: 10
    }}>
      <Text style={{ color: "white", fontSize: 16 }}>
        {item.exercise?.name}
      </Text>

      <Text style={{ color: "#94a3b8" }}>
        {item.sets} x {item.reps} • {item.weight || 0} kg
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: "#38bdf8",
          padding: 10,
          borderRadius: 8,
          alignItems: "center"
        }}
        onPress={() => setOpen(true)}
      >
        <Text style={{ fontWeight: "bold" }}>
          💪 Registrar peso
        </Text>
      </TouchableOpacity>

      <WeightModal
        visible={open}
        exercise={item.exercise?.name}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}