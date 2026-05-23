import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/users" replace />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;