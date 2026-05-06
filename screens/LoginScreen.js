// screens/LoginScreen.js
import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { useContext, useState } from "react";
import { View, TextInput, Button, Text,TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";



export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(name, password);
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Usuario" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />

      {error ? <Text style={{color:"red"}}  >{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}
// screens/LoginScreen.js (styles)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    padding: 20,
  },

  input: {
    backgroundColor: "#334155",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  error: {
    color: colors.danger,
    marginBottom: 10,
  },
});