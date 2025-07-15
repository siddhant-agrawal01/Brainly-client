import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { isAuthenticated } from "./utils/auth";
import { Toaster } from "sonner";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-200 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Toaster richColors position="top-right" theme="system" />

        <Router>
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
