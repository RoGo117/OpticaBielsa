"use client"

import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import Loading from "./Loading"

// Componente de segurida para las rutas

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user.rol !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
