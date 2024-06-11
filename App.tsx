import { StatusBar } from "expo-status-bar";
import Router from "./src/routes/Router";
import { AuthContextProvier } from "./src/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Platform } from "react-native";
import "react-native-gesture-handler";

export default function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvier>
        <StatusBar
          style={Platform.OS === "ios" ? "dark" : "auto"}
          backgroundColor="rgb(37 99 235)"
          animated
          networkActivityIndicatorVisible
          translucent
        />
        <Router />
      </AuthContextProvier>
    </QueryClientProvider>
  );
}
