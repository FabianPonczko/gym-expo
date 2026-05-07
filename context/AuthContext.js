// context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 auto login
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      

      if (token) {
        try {
          const res = await api.get("/users/me"); // 👉 endpoint que devuelve usuario
          setUser(res.data);
        } catch (err) {
          await AsyncStorage.removeItem("token");
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (name, password) => {
    const res = await api.post("/auth/login", { name, password });

    await AsyncStorage.setItem("token", res.data.token);

    const me = await api.get("/users/me");
    setUser(me.data);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};