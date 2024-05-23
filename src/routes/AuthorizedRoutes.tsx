import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthorizedTabRoutes from "./AuthorizedTabRoutes";
import RequestDetails from "../screens/requests/detail";
import EditUserScreen from "../screens/settings/editUser";
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const AuthorizedRoutes = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabBars"
        options={{ headerShown: false }}
        component={AuthorizedTabRoutes}
      />
      <Stack.Screen
        name="requestDetails"
        component={RequestDetails}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="editUser"
        component={EditUserScreen}
        options={{
          presentation: "modal",
          headerTitle: "Editar usuário: " + user?.name,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthorizedRoutes;
