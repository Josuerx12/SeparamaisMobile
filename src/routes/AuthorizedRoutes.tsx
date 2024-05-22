import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import RequesterRoutes from "./requester/RequesterRoutes";
import AlmoxScreen from "../screens/almox";

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
        component={AlmoxScreen}
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
