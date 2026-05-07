import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#020617",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{ color: "white", fontSize: 24 }}>
        👤 {user?.name}
      </Text>

      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 20,
          backgroundColor: "#ef4444",
          padding: 15,
          borderRadius: 12
        }}
      >
        <Text style={{ color: "white" }}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}