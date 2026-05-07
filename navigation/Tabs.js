import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProgressUser from "../screens/ProgressUser";

const Tab = createBottomTabNavigator();

export default function Tabs() {
   const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 100,
          paddingTop: 100,
        },

        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "#64748b",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell" size={size} color={color} />
          ),
        }}
      />

        <Tab.Screen
        name="Progreso"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      >
        {() => <ProgressUser userId={user?._id} />}
      </Tab.Screen>

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}