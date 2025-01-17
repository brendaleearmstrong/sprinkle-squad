import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { Routes } from "./Routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;