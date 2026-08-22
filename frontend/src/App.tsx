import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';

// Tahfidz
import TahfidzList from './pages/tahfidz/TahfidzList';

// Shalat
import ShalatList from './pages/shalat/ShalatList';

// Kehadiran
import KehadiranList from './pages/kehadiran/KehadiranList';

// Pelanggaran
import PelanggaranList from './pages/pelanggaran/PelanggaranList';

// Users
import UserList from './pages/users/UserList';

// Profile
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Mobile Only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tahfidz"
            element={
              <ProtectedRoute>
                <TahfidzList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shalat"
            element={
              <ProtectedRoute>
                <ShalatList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kehadiran"
            element={
              <ProtectedRoute>
                <KehadiranList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pelanggaran"
            element={
              <ProtectedRoute>
                <PelanggaranList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['pengajar']}>
                <UserList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
