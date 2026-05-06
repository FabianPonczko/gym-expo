// components/DayTabs.js
import { ScrollView, TouchableOpacity, Text } from "react-native";

export default function DayTabs({ days, selected, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {days.map((d, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onChange(i)}
          style={{
            padding: 10,
            marginRight: 10,
            borderRadius: 10,
            backgroundColor: selected === i ? "#38bdf8" : "#1e293b",
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