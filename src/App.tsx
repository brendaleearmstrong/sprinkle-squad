import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SettingsProvider } from "@/hooks/useSettings";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes } from "./Routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <SettingsProvider>
            <Routes />
            <Toaster />
          </SettingsProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;