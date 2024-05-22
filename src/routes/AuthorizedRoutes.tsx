import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/signIn";
import RequestsScreen from "../screens/requests";

const AuthorizedRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="requests"
        component={RequestsScreen}
        options={{
          title: "Pagina de Solicitações",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="almox"
        component={RequestsScreen}
        options={{
          title: "Gerenciamento de Solicitações",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthorizedRoutes;
