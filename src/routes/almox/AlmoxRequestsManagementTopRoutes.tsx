import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
        itemsPerPage: 1,
        page: 1,
        status: reqStatus.aguardandoCancelamento,
      })
  );
  const { data: waitingCollect } = useQuery(
    "waitingToCollectAlmox",
    async () =>
      await fetchRequestsWithFilters({
        itemsPerPage: 1,
        page: 1,
        status: reqStatus.aguardandoColeta,
      })
  );

  const { data: inSeparationAlmox } = useQuery(
    "inSeparationAlmox",
    async () =>
      await fetchRequestsWithFilters({
        itemsPerPage: 1,
        page: 1,
        status: reqStatus.aguardandoColeta,
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

      {waitingToCancel && waitingToCancel?.requests.length > 0 && (
        <Top.Screen
          name="waitingToCancelRequestsAlmox"
          options={{ title: "Aguardando Cancelamento" }}
          component={WaitingToCancelRequests}
        />
      )}

      {inSeparationAlmox && inSeparationAlmox.requests.length > 0 && (
        <Top.Screen
          name="inSeparationRequests"
          options={{ title: "Em Separação" }}
          component={InSeparationRequests}
        />
      )}

      {waitingCollect && waitingCollect.requests.length > 0 && (
        <Top.Screen
          name="waitingForCollectRequests"
          options={{ title: "Aguardando Coleta" }}
          component={WaitingForCollect}
        />
      )}

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
