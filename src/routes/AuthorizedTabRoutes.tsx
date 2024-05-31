import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import RequesterRoutes from "./requester/RequesterRoutes";
import { useAuth } from "../contexts/AuthContext";
import AlmoxScreen from "../screens/almox";
import SettingsScreen from "../screens/settings";
import CreateRequestScreen from "../screens/requests/createRequest";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BillingsTopRoutes from "./billings/BillingsTopRoutes";
import { Platform } from "react-native";

const AuthorizedTabRoutes = () => {
  const Tabs = createBottomTabNavigator();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ddd",
        tabBarHideOnKeyboard: true,
        tabBarStyle:
          Platform.OS === "android"
            ? {
                position: "relative",
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 14,
                marginTop: 5,
                backgroundColor: "rgb(37 99 235)",
                borderRadius: 50,
              }
            : {
                backgroundColor: "rgb(37 99 235)",
              },
      }}
      initialRouteName="requests"
    >
      <Tabs.Screen
        name="newRequest"
        component={CreateRequestScreen}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Nova Solicitção",

          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={!focused ? "add-circle-outline" : "add-circle"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="requests"
        component={RequesterRoutes}
        options={{
          headerTitleAlign: "center",
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
          tabBarLabel: "Compras",
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
      {/* {user?.almox && (
        <Tabs.Screen
          name="almox"
          component={AlmoxScreen}
          options={{
            tabBarLabel: "Alomoxarifado",
            headerTitleAlign: "center",
            tabBarIcon: ({ color, focused, size }) => {
              return (
                <FontAwesome
                  name="archive"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      )}
      {user?.admin && (
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
