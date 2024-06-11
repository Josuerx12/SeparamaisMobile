import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AlmoxScreen from "../../screens/almox";

const Top = createMaterialTopTabNavigator();

const AlmoxBillingsManagementTopRoutes = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="billingsAlmox" component={AlmoxScreen} />
    </Top.Navigator>
  );
};

export default AlmoxBillingsManagementTopRoutes;
