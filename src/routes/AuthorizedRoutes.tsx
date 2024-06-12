import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthorizedTabRoutes from "./AuthorizedTabRoutes";
import RequestDetails from "../screens/requests/detail";
import EditUserScreen from "../screens/settings/editUser";
import { useAuth } from "../contexts/AuthContext";
import BillingDetails from "../screens/billings/detail";
import RequestsFilterModal from "../screens/filterModals/requestsFilter";

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
        options={{
          presentation: "modal",
          headerTitle: "Detalhes",
        }}
      />
      <Stack.Screen
        name="billingDetails"
        component={BillingDetails}
        options={{
          presentation: "modal",
          headerTitle: "Detalhes",
        }}
      />
      <Stack.Screen
        name="editUser"
        component={EditUserScreen}
        options={{
          presentation: "modal",
          headerTitle: "Editar Usuário",
        }}
      />
      <Stack.Screen
        name="filterRequests"
        component={RequestsFilterModal}
        options={{
          presentation: "modal",
          headerTitle: "Filtrar Processos de Saída",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthorizedRoutes;
