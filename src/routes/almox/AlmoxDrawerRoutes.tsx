import { createDrawerNavigator } from "@react-navigation/drawer";
import AlmoxRequestsManagementTopRoutes from "./AlmoxRequestsManagementTopRoutes";
import AlmoxBillingsManagementTopRoutes from "./AlmoxBillingsManagementTopRoutes";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "react-query";
import { reqStatus } from "../../constants/requestsStatus";

const Drawer = createDrawerNavigator();

const AlmoxDrawerRoutes = () => {
  const navigator = useNavigation();
  const query = useQueryClient();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="solicitacoes"
        options={{
          drawerLabel: "Processos de Separação",
          title: "Separação",
          headerRight: () => (
            <View className="flex-row gap-x-2 mr-4">
              <TouchableOpacity
                onPress={() => navigator.navigate("filterRequests")}
                className="flex-row items-center justify-center p-1 rounded-full bg-neutral-600"
              >
                <MaterialIcons
                  name="filter-list-alt"
                  color={"#fff"}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Promise.all([
                    query.resetQueries("almoxRequests" + reqStatus.nova.trim()),
                    query.resetQueries(
                      "almoxRequests" + reqStatus.emSeparacao.trim()
                    ),
                    query.resetQueries(
                      "almoxRequests" + reqStatus.aguardandoColeta.trim()
                    ),
                    query.resetQueries(
                      "almoxRequests" + reqStatus.coletado.trim()
                    ),
                    query.resetQueries(
                      "almoxRequests" + reqStatus.cancelada.trim()
                    ),
                  ])
                }
                className="flex-row items-center justify-center p-1 rounded-full bg-blue-600"
              >
                <MaterialIcons name="refresh" color={"#fff"} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
        component={AlmoxRequestsManagementTopRoutes}
      />
      <Drawer.Screen
        name="compras"
        options={{
          drawerLabel: "Processos de Compra",
          title: "Compras",

          headerRight: () => {
            return (
              <View className="flex-row gap-x-2 mr-4">
                <TouchableOpacity className="flex-row items-center justify-center p-1 rounded-full bg-neutral-600">
                  <MaterialIcons
                    name="filter-list-alt"
                    color={"#fff"}
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center p-1 rounded-full bg-blue-600">
                  <MaterialIcons
                    name="notification-add"
                    color={"#fff"}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
        component={AlmoxBillingsManagementTopRoutes}
      />
    </Drawer.Navigator>
  );
};

export default AlmoxDrawerRoutes;
