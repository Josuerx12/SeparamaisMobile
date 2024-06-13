import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import SettingsScreen from "../screens/settings";
import BillingsTopRoutes from "./billings/BillingsTopRoutes";
import AlmoxDrawerRoutes from "./almox/AlmoxDrawerRoutes";
import { Text, TouchableOpacity } from "react-native";
import RequesterDrawerRoutes from "./requester/RequesterDrawerRoutes";

const AuthorizedTabRoutes = () => {
  const Tabs = createBottomTabNavigator();
  const { user } = useAuth();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ddd",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "rgb(37 99 235)",
        },
      }}
      initialRouteName="requests"
    >
      <Tabs.Screen
        name="requests"
        component={RequesterDrawerRoutes}
        options={{
          tabBarLabel: "Solicitações",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialCommunityIcons
                name={!focused ? "truck-delivery-outline" : "truck-delivery"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="billings"
        component={BillingsTopRoutes}
        options={{
          headerShown: true,
          tabBarLabel: "Compras",
          headerTitle: "Solicitações de Compra",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Ionicons
                name={!focused ? "bag-outline" : "bag"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      {user?.almox && (
        <Tabs.Screen
          name="almox"
          component={AlmoxDrawerRoutes}
          options={{
            tabBarLabel: "Alomoxarifado",
            headerTitleAlign: "center",
            tabBarIcon: ({ color, focused, size }) => {
              return (
                <FontAwesome5
                  name={!focused ? "clipboard" : "clipboard-check"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      )}
      {/* {user?.admin && (
        <Tabs.Screen
          name="admin"
          component={AlmoxScreen}
          options={{
            tabBarLabel: "Administração",
            headerTitleAlign: "center",
            tabBarIcon: ({ color, focused, size }) => {
              return (
                <FontAwesome
                  name="shield"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      )} */}
      <Tabs.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Configurações",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <FontAwesome5
                name={!focused ? "user" : "user-alt"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default AuthorizedTabRoutes;
