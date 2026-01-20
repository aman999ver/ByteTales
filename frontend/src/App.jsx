import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StoryViewer from './pages/StoryViewer';

import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import './App.css';

import Home from './pages/Home';

// Route Guard Component
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to={role === 'admin' ? "/admin/login" : "/login"} replace />;
  }

  if (role && role !== userRole) {
    // Simple role check based on localStorage data
    // If trying to access admin but role is student (or missing)
    return <Navigate to={role === 'admin' ? "/admin/login" : "/dashboard"} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar removed as per request */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Student Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute role="student">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/story/:id" element={
            <ProtectedRoute role="student">
              <StoryViewer />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
