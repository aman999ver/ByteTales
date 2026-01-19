import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StoryViewer from './pages/StoryViewer';

import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import './App.css';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem' }}>Welcome to ByteTales! 🚀</h1>
      <p style={{ fontSize: '1.5rem' }}>Learn Computer Science with fun stories!</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/register"><button style={{ marginRight: '20px', backgroundColor: '#FF6B6B' }}>Start Adventure</button></Link>
        <Link to="/login"><button>Login</button></Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar removed as per request */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/story/:id" element={<StoryViewer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
