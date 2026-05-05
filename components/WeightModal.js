import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import api from "../services/api";

export default function WeightModal({ visible, onClose, exercise }) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const save = async () => {
    if (!weight || !reps) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await api.post("/progress", {
        exercise,
        weight: Number(weight),
        reps: Number(reps),
      });

      setWeight("");
      setReps("");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* 👉 cerrar tocando afuera */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* evitar cerrar al tocar dentro */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <Text style={styles.title}>{exercise}</Text>

              <TextInput
                placeholder="Peso (kg)"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                style={styles.input}
              />

              <TextInput
                placeholder="Repeticiones"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
                style={styles.input}
              />

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
                  <Text style={styles.textCancel}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSave} onPress={save}>
                  <Text style={styles.textSave}>Guardar 💪</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "85%",
    backgroundColor: "#0f172a",
    padding: 20,
    borderRadius: 16,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#020617",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  btnCancel: {
    padding: 10,
  },

  btnSave: {
    backgroundColor: "#38bdf8",
    padding: 10,
    borderRadius: 10,
  },

  textCancel: {
    color: "#94a3b8",
  },

  textSave: {
    color: "black",
    fontWeight: "bold",
  },
};
