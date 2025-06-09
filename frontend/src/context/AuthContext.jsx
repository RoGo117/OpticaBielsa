"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { apiService } from "../services/api"

// Trata la autentificación de usuasios según el contexto (login, register, logout, isAdmin y loading)

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        apiService.setAuthToken(token)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password)

      if (response.success) {
        const { token, user: userData } = response.data

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))

        setUser(userData)
        apiService.setAuthToken(token)

        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Error de conexión" }
    }
  }

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData)
      return response
    } catch (error) {
      console.error("Register error:", error)
      return { success: false, message: "Error de conexión" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    apiService.setAuthToken(null)
  }

  const isAdmin = () => {
    return user && user.rol === "admin"
  }

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
