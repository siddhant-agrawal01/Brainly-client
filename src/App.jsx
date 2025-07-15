import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { isAuthenticated } from './utils/auth';
import { Toaster } from 'sonner';

function App() {
  return (
   <>
    <Toaster richColors position="top-right" />

<Router>
  <Routes>
    <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
  </Routes>
</Router></>
  );
}

export default App;
