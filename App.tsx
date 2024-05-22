import { StatusBar } from "expo-status-bar";
import Router from "./src/routes/Router";
import { AuthContextProvier } from "./src/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvier>
        <StatusBar style="auto" />
        <Router />
      </AuthContextProvier>
    </QueryClientProvider>
  );
}
