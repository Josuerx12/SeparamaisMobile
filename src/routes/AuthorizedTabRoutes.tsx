import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import RequesterRoutes from "./requester/RequesterRoutes";
import { useAuth } from "../contexts/AuthContext";
import AlmoxScreen from "../screens/almox";
import SettingsScreen from "../screens/settings";
import CreateRequestScreen from "../screens/requests/createRequest";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BillingsTopRoutes from "./billings/BillingsTopRoutes";

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
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom + 14,
          right: 10,
          left: 10,
          elevation: 0,
          backgroundColor: "rgb(37 99 235)",
          borderRadius: 50,
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
              <FontAwesome
                name="plus-circle"
                size={!focused ? size : size + 10}
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
              <FontAwesome
                name="tags"
                size={!focused ? size : size + 10}
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
              <FontAwesome
                name="shopping-bag"
                size={!focused ? size : size + 10}
                color={color}
              />
            );
          },
        }}
      />
      {user?.almox && (
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
                  size={!focused ? size : size + 10}
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
                  size={!focused ? size : size + 10}
                  color={color}
                />
              );
            },
          }}
        />
      )}
      <Tabs.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Configurações",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <FontAwesome
                name="user"
                size={!focused ? size : size + 10}
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
