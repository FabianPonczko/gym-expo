// components/ExerciseCard.js
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";
import ExerciseHistoryModal from "./ExerciseHistoryModal";
import WeightModal from "./WeightModal";

export default function ExerciseCard({ item ,numero}) {
  const [open, setOpen] = useState(false);
const [historyOpen, setHistoryOpen] = useState(false);
const [selectedExercise, setSelectedExercise] = useState("");

  return (
  
    <View style={{
      flex: 1,
      backgroundColor: "#1e293b",
      padding: 5,
      borderRadius: 12,
      marginTop: 0,
      marginBottom:10
          
    }}>
      <Text style={{ color: "white", fontSize: 16 }}>
        {numero} - {item.exercise?.name} 
      </Text>

      <Text style={{ color: "#94a3b8" }}>
        {item.sets} x {item.reps} 
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 8,
          alignItems: "center"
        }}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color:colors.text}}>
          💪 Registrar peso
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 8,
          alignItems: "center"
        }}
        
        onPress={() => {
          setSelectedExercise(item.exercise.name);
          setHistoryOpen(true);
        }}>
          
          <Text style={{ color:colors.text}}>
            📈  Historial
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