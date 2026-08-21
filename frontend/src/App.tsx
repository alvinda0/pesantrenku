import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

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

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tahfidz"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <TahfidzList />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/shalat"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ShalatList />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/kehadiran"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <KehadiranList />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/pelanggaran"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <PelanggaranList />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['pengajar']}>
                <MainLayout>
                  <UserList />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
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
