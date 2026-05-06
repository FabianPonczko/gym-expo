// services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.100.135:5000/api",
});

// 🔐 request → agrega token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🚨 response → auto logout si 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      console.log("⚠️ Token expirado → logout");

      await AsyncStorage.removeItem("token");

      // 👉 podés usar evento global o navigation reset
    }

    return Promise.reject(err);
  }
);

export default api;