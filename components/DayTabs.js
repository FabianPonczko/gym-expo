// components/DayTabs.js
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

export default function DayTabs({ days, selected, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
            padding: 20}} >
      {days?.map((d, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onChange(i)}
          style={{
            padding: 20,
            marginRight: 10,
            borderRadius: 5,
            backgroundColor: selected === i ? colors.primary : "#1e293b",
            minHeight: 80,
            justifyContent: "center",
            alignItems: "center", 
          }}
        >
          <Text style={{ color: selected === i ? "black" : "white" }}>
            {d.day}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}