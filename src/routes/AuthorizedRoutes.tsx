import React from "react";
import RequestsScreen from "../screens/requests/new";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import RequesterRoutes from "./requester/RequesterRoutes";

const AuthorizedRoutes = () => {
  const Tabs = createBottomTabNavigator();
  const { user } = useAuth();

  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name="requests"
        component={RequesterRoutes}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="tags" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="billings"
        component={RequestsScreen}
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
          component={RequestsScreen}
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
          component={RequestsScreen}
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
        component={RequestsScreen}
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

export default AuthorizedRoutes;
