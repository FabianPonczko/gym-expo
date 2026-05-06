// components/WeightModal.js
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import api from "../services/api";

export default function WeightModal({ visible, onClose, exercise }) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const save = async () => {
    await api.post("/progress", {
      exercise,
      weight: Number(weight),
      reps: Number(reps),
    });

    setWeight("");
    setReps("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent>
      <View style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000000aa"
      }}>
        <View style={{
          backgroundColor: "#111",
          margin: 20,
          padding: 20,
          borderRadius: 12
        }}>
          <Text style={{ color: "white", marginBottom: 10 }}>
            {exercise}
          </Text>

          <TextInput
            placeholder="Peso"
            placeholderTextColor="#888"
            onChangeText={setWeight}
            style={{ color: "white", marginBottom: 10 }}
          />

          <TextInput
            placeholder="Reps"
            placeholderTextColor="#888"
            onChangeText={setReps}
            style={{ color: "white", marginBottom: 10 }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#38bdf8",
              padding: 10,
              borderRadius: 8
            }}
            onPress={save}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}