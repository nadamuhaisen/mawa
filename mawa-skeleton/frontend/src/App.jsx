import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import RenterDashboard from './pages/RenterDashboard.jsx'
import OwnerDashboard from './pages/OwnerDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard/renter"
        element={
          <ProtectedRoute allowedRoles={['renter']}>
            <RenterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/owner"
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}