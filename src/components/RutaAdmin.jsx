import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function RutaAdmin({ children }) {
  const { esAdmin } = useAuth()
  const location = useLocation()

  if (!esAdmin) {
    return <Navigate to="/admin" replace state={{ desde: location.pathname }} />
  }

  return children
}
