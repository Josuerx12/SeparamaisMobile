import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import InSeparationScreen from "../../screens/requests/inSeparation";
import NewRequestScreen from "../../screens/requests/new";
import WaitingCollectRequestScreen from "../../screens/requests/waitingCollect";
import CollectedScreen from "../../screens/requests/collected";

const Tab = createMaterialTopTabNavigator();

const RequesterRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{ animationEnabled: true, tabBarScrollEnabled: true }}
      style={{ marginTop: 30, overflow: "scroll" }}
    >
      <Tab.Screen
        name="new"
        component={NewRequestScreen}
        options={{
          tabBarLabel: "Novas",
        }}
      />
      <Tab.Screen
        name="inSeparation"
        component={InSeparationScreen}
        options={{
          tabBarLabel: "Em separação",
        }}
      />
      <Tab.Screen
        name="waitingCollect"
        component={WaitingCollectRequestScreen}
        options={{
          tabBarLabel: "Aguardando Coleta",
        }}
      />
      <Tab.Screen
        name="collected"
        component={CollectedScreen}
        options={{
          tabBarLabel: "Coletadas",
        }}
      />
    </Tab.Navigator>
  );
};

export default RequesterRoutes;
