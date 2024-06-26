import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRoutes from "./AuthRoutes";
import { useAuth } from "../contexts/AuthContext";
import AuthorizedRoutes from "./AuthorizedRoutes";
import LoadingScreen from "../screens/loadingScreen";

const Router = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      {!user ? <AuthRoutes /> : <AuthorizedRoutes />}
    </NavigationContainer>
  );
};

export default Router;
