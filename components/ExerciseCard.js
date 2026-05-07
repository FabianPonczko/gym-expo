// components/ExerciseCard.js
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ExerciseHistoryModal from "./ExerciseHistoryModal";
import WeightModal from "./WeightModal";

export default function ExerciseCard({ item }) {
  const [open, setOpen] = useState(false);
const [historyOpen, setHistoryOpen] = useState(false);
const [selectedExercise, setSelectedExercise] = useState("");

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#0f172a",
      padding: 15,
      borderRadius: 12,
      marginTop: 10,
      
    }}>
      <Text style={{ color: "white", fontSize: 16 }}>
        {item.exercise?.name}
      </Text>

      <Text style={{ color: "#94a3b8" }}>
        {item.sets} x {item.reps} 
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
      
      <TouchableOpacity
        style={{
            marginTop: 10,
            backgroundColor: "#38bdf8",
            padding: 10,
            borderRadius: 8,
            alignItems: "center"
          }}
    
          onPress={() => {
          setSelectedExercise(item.exercise.name);
          setHistoryOpen(true);
          }}>
          
          <Text style={{ fontWeight: "bold" }}>
            💪 Historial
          </Text>

      </TouchableOpacity>

        <ExerciseHistoryModal
          visible={historyOpen}
          onClose={() => setHistoryOpen(false)}
          exercise={selectedExercise}
        />
      <WeightModal
        visible={open}
        exercise={item.exercise?.name}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}