import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import RequesterRoutes from "./requester/RequesterRoutes";
import { useAuth } from "../contexts/AuthContext";
import AlmoxScreen from "../screens/almox";
import SettingsScreen from "../screens/settings";
import CreateRequestScreen from "../screens/requests/createRequest";

const AuthorizedTabRoutes = () => {
  const Tabs = createBottomTabNavigator();
  const { user } = useAuth();

  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="requests"
    >
      <Tabs.Screen
        name="newRequest"
        component={CreateRequestScreen}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Nova Solicitção",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="plus-circle" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="requests"
        component={RequesterRoutes}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Solicitações",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="tags" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="billings"
        component={AlmoxScreen}
        options={{
          tabBarLabel: "Compras",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome name="shopping-bag" size={size} color={color} />
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
              return <FontAwesome name="archive" size={size} color={color} />;
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
              return <FontAwesome name="shield" size={size} color={color} />;
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
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="gear" size={size} color={color} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default AuthorizedTabRoutes;
