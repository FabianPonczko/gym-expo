// components/WeightModal.js
import { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../services/api";

export default function WeightModal({visible,  onClose, exercise }) {
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
    <Modal visible={visible} transparent >
      <View style={{
        flex: 1,
        backgroundColor: "#0a0303e0",
        justifyContent: "center",
        alignItems:"center",
        }}>
        
      
        <View style={{
          display:"flex",
          alignItems:"center",
          backgroundColor: "#111",
          margin: 20,
          padding: 20,
          borderRadius: 12,
          marginBottom:"50%"
        }}>
            <Text style={{ color: "white", marginBottom: 10,fontSize:20 }}>
              {exercise}
            </Text>

            <TextInput 
              placeholder="Peso"
              placeholderTextColor="#888"
              onChangeText={setWeight}
              style={{ color: "white", marginBottom: 10 ,maxWidth:30}}
            />

            <TextInput
              placeholder="Reps"
              placeholderTextColor="#888"
              onChangeText={setReps}
              style={{ color: "white", marginBottom: 10 ,maxWidth:30}}
            />

            <View 
            style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-around",
              minWidth:200
              }}>

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
            
            <TouchableOpacity
              style={{
                backgroundColor: "#d43131",
                padding: 10,
                borderRadius: 8
              }}
              onPress={()=>onClose()}
              >
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </Modal>
  );
}