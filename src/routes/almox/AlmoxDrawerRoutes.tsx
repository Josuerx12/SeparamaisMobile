import { createDrawerNavigator } from "@react-navigation/drawer";
import AlmoxScreen from "../../screens/almox";
import AlmoxRequestsManagementTopRoutes from "./AlmoxRequestsManagementTopRoutes";
import AlmoxBillingsManagementTopRoutes from "./AlmoxBillingsManagementTopRoutes";

const Drawer = createDrawerNavigator();

const AlmoxDrawerRoutes = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="solicitacoes"
        options={{
          drawerLabel: "Processos de Separação",
          title: "Processos de Separação",
        }}
        component={AlmoxRequestsManagementTopRoutes}
      />
      <Drawer.Screen
        name="compras"
        options={{
          drawerLabel: "Processos de Compra",
          title: "Processos de Compra",
        }}
        component={AlmoxBillingsManagementTopRoutes}
      />
    </Drawer.Navigator>
  );
};

export default AlmoxDrawerRoutes;
