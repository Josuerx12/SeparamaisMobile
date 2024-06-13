import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RequesterRoutes from "./RequesterRoutes";
import CreateRequestScreen from "../../screens/requests/createRequest";

const Drawer = createDrawerNavigator();

const RequesterDrawerRoutes = () => {
  return (
    <Drawer.Navigator initialRouteName="userRequests">
      <Drawer.Screen
        name="newRequest"
        component={CreateRequestScreen}
        options={{
          title: "Nova Solicitação",
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="userRequests"
        options={{
          title: "Solicitações",
          headerTitle: "Processos de Saída",
          headerRight: () => (
            <TouchableOpacity className="mx-4">
              <Text className="text-blue-600">Filtrar</Text>
            </TouchableOpacity>
          ),
        }}
        component={RequesterRoutes}
      />
    </Drawer.Navigator>
  );
};

export default RequesterDrawerRoutes;
