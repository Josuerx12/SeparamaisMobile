import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WaitingCollectRequestScreen from "../../screens/requests/waitingCollect";
import InQuarantineBillingsScreen from "../../screens/billings/inQuarantine";
import CollectedBillingsScreen from "../../screens/billings/collected";
import DeliveredToStockBillingsScreen from "../../screens/billings/deliverdToStock";
import WaitingToCollectBillingsScreen from "../../screens/billings/waitingToCollect";
import { getStatusBarHeight } from "react-native-status-bar-height";

const BillingsTopRoutes = () => {
  const Tabs = createMaterialTopTabNavigator();
  const statusBarHeight = getStatusBarHeight();

  return (
    <Tabs.Navigator
      style={{ marginTop: statusBarHeight }}
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
