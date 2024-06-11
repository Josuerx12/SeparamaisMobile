import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AlmoxScreen from "../../screens/almox";

const Top = createMaterialTopTabNavigator();

const AlmoxRequestsManagementTopRoutes = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="requestAlmox" component={AlmoxScreen} />
    </Top.Navigator>
  );
};

export default AlmoxRequestsManagementTopRoutes;
