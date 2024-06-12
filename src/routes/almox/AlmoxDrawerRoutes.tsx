import { createDrawerNavigator } from "@react-navigation/drawer";
import AlmoxRequestsManagementTopRoutes from "./AlmoxRequestsManagementTopRoutes";
import AlmoxBillingsManagementTopRoutes from "./AlmoxBillingsManagementTopRoutes";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const AlmoxDrawerRoutes = () => {
  const navigator = useNavigation();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="solicitacoes"
        options={{
          drawerLabel: "Processos de Separação",
          title: "Processos de Separação",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigator.navigate("filterRequests")}
              className="mr-4"
            >
              <Text className="text-blue-600">Filtrar</Text>
            </TouchableOpacity>
          ),
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
