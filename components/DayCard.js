import { Text, View } from "react-native";
import ExerciseCard from "./ExerciseCard";

export default function DayCard({ day }) {
  return (
    <View
      style={{
        marginTop: 20,
        padding: 15,
        backgroundColor: "#0e1302",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 18 }}>{day.day}</Text>

      {day.exercises.map((item, i) => (
        <ExerciseCard key={i} item={item} />
      ))}
    </View>
  );
}
