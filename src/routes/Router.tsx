import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRoutes from "./AuthRoutes";
import { useAuth } from "../contexts/AuthContext";
import AuthorizedRoutes from "./AuthorizedRoutes";
import LoadingScreen from "../screens/loadingScreen";
import RequestDetailsStackRoute from "./requester/RequesterStackRoutes";

const Router = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      {!user ? <AuthRoutes /> : <RequestDetailsStackRoute />}
    </NavigationContainer>
  );
};

export default Router;
