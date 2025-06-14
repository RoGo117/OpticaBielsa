"use client"

import { createContext, useContext } from "react"
import { useToast } from "../hooks/useToast"

// Trata según el contexto las notificaciones (toast)

const ToastContext = createContext()

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const toast = useToast()

  return <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
}
