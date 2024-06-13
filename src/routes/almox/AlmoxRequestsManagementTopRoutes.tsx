import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AlmoxScreen from "../../screens/almox";
import NewRequests from "../../screens/almox/newRequests";
import WaitingToCancelRequests from "../../screens/almox/waitingToCancelRequests";
import InSeparationRequests from "../../screens/almox/inSeparationRequests";
import WaitingForCollect from "../../screens/almox/waitingForCollect";
import CollectedRequests from "../../screens/almox/collectedRequests";
import CancelledRequests from "../../screens/almox/cancelledRequests";
import { useQuery } from "react-query";
import { useRequests } from "../../hooks/useRequests";
import { reqStatus } from "../../constants/requestsStatus";

const Top = createMaterialTopTabNavigator();

const AlmoxRequestsManagementTopRoutes = () => {
  const { fetchRequestsWithFilters } = useRequests();

  const { data: waitingToCancel } = useQuery(
    "waitingToCancelReqAlmox",
    async () =>
      await fetchRequestsWithFilters({
        itemsPerPage: 20,
        page: 1,
        status: reqStatus.aguardandoCancelamento,
      })
  );

  return (
    <Top.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          width: 300,
          textTransform: "capitalize",
        },
      }}
    >
      <Top.Screen
        name="newRequestsAlmox"
        options={{ title: "Novas" }}
        component={NewRequests}
      />

      {waitingToCancel && (
        <Top.Screen
          name="waitingToCancelRequestsAlmox"
          options={{ title: "Aguardando Cancelamento" }}
          component={WaitingToCancelRequests}
        />
      )}

      <Top.Screen
        name="inSeparationRequests"
        options={{ title: "Em Separação" }}
        component={InSeparationRequests}
      />

      <Top.Screen
        name="waitingForCollectRequests"
        options={{ title: "Aguardando Coleta" }}
        component={WaitingForCollect}
      />

      <Top.Screen
        name="collectedRequestsAlmox"
        options={{ title: "Coletadas" }}
        component={CollectedRequests}
      />

      <Top.Screen
        name="cancelledRequestsAlmox"
        options={{ title: "Canceladas" }}
        component={CancelledRequests}
      />
    </Top.Navigator>
  );
};

export default AlmoxRequestsManagementTopRoutes;
