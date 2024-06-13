import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import InQuarantineBillingsScreen from "../../screens/billings/inQuarantine";
import CollectedBillingsScreen from "../../screens/billings/collected";
import DeliveredToStockBillingsScreen from "../../screens/billings/deliverdToStock";
import WaitingToCollectBillingsScreen from "../../screens/billings/waitingToCollect";

const BillingsTopRoutes = () => {
  const Tabs = createMaterialTopTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          width: 300,
          textTransform: "capitalize",
        },
      }}
    >
      <Tabs.Screen
        name="waitingToCollect"
        options={{
          tabBarLabel: "Aguardando Coleta",
        }}
        component={WaitingToCollectBillingsScreen}
      />
      <Tabs.Screen
        name="inQuarantine"
        options={{ tabBarLabel: "Em quarentena" }}
        component={InQuarantineBillingsScreen}
      />
      <Tabs.Screen
        name="collectedBilling"
        options={{ tabBarLabel: "Coletadas" }}
        component={CollectedBillingsScreen}
      />
      <Tabs.Screen
        name="deliveredToStock"
        options={{ tabBarLabel: "Enviado para estoque" }}
        component={DeliveredToStockBillingsScreen}
      />
    </Tabs.Navigator>
  );
};

export default BillingsTopRoutes;
