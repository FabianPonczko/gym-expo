import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../services/api";
import { colors } from "../theme/colors";
import LoadingOverlay from "../components/LoadingSping";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function ProgressUser({userId}) {
  const [userProgress, setUserProgress] = useState([]);
  const [groupedProgress, setGroupedProgress] = useState({});
  const [visible, setVisible] = useState(false);
  const [cargando, setCargando] = useState(false)
  
  const [selectedExercise, setSelectedExercise] = useState(null);

  useFocusEffect(
  useCallback(() => {
    return () => {
      setVisible(false);
      setSelectedExercise(null);
      setGroupedProgress({});
      setUserProgress([]);
    };

  }, [])
);

  useEffect(() => {
    fetchHistory(userId);
    setSelectedExercise(null)
  }, [userProgress]);

  const fetchHistory = async (userId) => {
    try {
      setCargando(true)
       const res = await api.get(`/progress/user/${userId}`);
       const progreso = [...res.data].filter(c=>c.weight !== 0).sort((a,b)=>a.exercise.localeCompare(b.exercise))
      //  setUserProgress(progreso);
      const grouped = progreso.reduce((acc, item) => {

      if (!acc[item.exercise]) {
        acc[item.exercise] = [];
      }

      acc[item.exercise].push(item);

      return acc;

    }, {});

    setGroupedProgress(grouped);

    } catch (err) {
      console.log(err);
    }finally{
      setCargando(false)
    }
  };
  
  const borrarHistorial = async (user)=>{
    try{
      const res = await api.delete(`/progress/delete/${userId}`);
      setUserProgress([]);
      alert("Historial eliminado");
    }catch(err){
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >

        <Text style={styles.title}>
          📈 Progreso
        </Text>
        <LoadingOverlay cargando={cargando}></LoadingOverlay>

        {/* {userProgress.map((item) => (
          <View key={item._id} style={styles.card}>

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
        ))} */}

      {!visible && Object.keys(groupedProgress).map((exercise) => (
        <TouchableOpacity style={styles.card}
          key={exercise}
          onPress={() => (setSelectedExercise(exercise),setVisible(true))}
        >
          <Text style={styles.exercise}>🏋️ {exercise}</Text>
        </TouchableOpacity>
      ))
    }
    
  {selectedExercise && visible &&
  groupedProgress[selectedExercise]?.map((item) => (
    // <View style={styles.card} key={item._id}>
    //   <View style={styles.weight}>
    //     <Text>{item.weight} KG</Text>
    //     <Text>{item.reps} reps</Text>
    //   </View>  
    
    // </View>
      <View style={styles.cardProgress} key={item._id}>
            <View  >  
              <Text style={{fontSize: 20, fontWeight: "bold", color: colors.text}}>
                🏋️ {item.exercise}
              </Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            <View style={styles.right}>
              <Text style={styles.weight}>
                {item.weight} KG {item.reps} reps
              </Text>
            </View>  
            </View>
      </View>
  ))
}
            {!visible?
              <TouchableOpacity
                 onPress={borrarHistorial}
                style={{
                  display:"flex",
                  alignItems:"center",
                  marginTop: 20,
                  backgroundColor: "#ef4444",
                  padding: 15,
                  borderRadius: 12
                }}
              >
                <Text style={{ color: "white" }}>
                  Borrar historial
                </Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                 onPress={()=>setVisible(false)}
                style={{
                  display:"flex",
                  alignItems:"center",
                  marginTop: 20,
                  backgroundColor: "#22c55e",
                  padding: 15,
                  borderRadius: 12
                }}
              >
                <Text style={{ color: "white" }}>
                  Volver a ejercicios
                </Text>
              </TouchableOpacity>
            }
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#0f172a",
    
    borderRadius: 24,

    padding: 18,

    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 5,
  },
  cardProgress: {
    backgroundColor: "#0f172a",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
   
    
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  exercise: {
    color: "white",
    fontSize: 20,
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
    fontSize: 26,
    fontWeight: "bold",
  },

  reps: {
    color: "#cbd5e1",
    marginTop: 4,
  },
});