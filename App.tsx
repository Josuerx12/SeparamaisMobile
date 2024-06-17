import { StatusBar } from "expo-status-bar";
import Router from "./src/routes/Router";
import { AuthContextProvier } from "./src/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Platform } from "react-native";
import "react-native-gesture-handler";
import { FilterContextProvider } from "./src/contexts/FilterContext";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  const client = new QueryClient();
  return (
    <AuthContextProvier>
      <FilterContextProvider>
        <QueryClientProvider client={client}>
          <StatusBar
            style={Platform.OS === "ios" ? "dark" : "auto"}
            backgroundColor="rgb(37 99 235)"
            animated
            networkActivityIndicatorVisible
            translucent
          />
          <ToastProvider
            style={{
              marginTop: 30,
            }}
            dangerColor="#ff0000"
            successColor="#09ff00"
            placement="top"
          >
            <Router />
          </ToastProvider>
        </QueryClientProvider>
      </FilterContextProvider>
    </AuthContextProvier>
  );
}
