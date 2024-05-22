import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RequestDetails from "../../screens/requests/detail";
import AuthorizedRoutes from "../AuthorizedRoutes";

const Stack = createNativeStackNavigator();

const RequestDetailsStackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabBars"
        options={{ headerShown: false }}
        component={AuthorizedRoutes}
      />
      <Stack.Screen
        name="requestDetails"
        component={RequestDetails}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default RequestDetailsStackRoute;
