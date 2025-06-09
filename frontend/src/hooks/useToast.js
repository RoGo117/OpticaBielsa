"use client"

import { useState, useCallback } from "react"

// lógica para manejar las notificaciones (toasts)
export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "info", duration = 5000) => {
    const id = Date.now()
    const toast = { id, message, type, duration }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback((message, duration) => addToast(message, "success", duration), [addToast])
  const error = useCallback((message, duration) => addToast(message, "error", duration), [addToast])
  const warning = useCallback((message, duration) => addToast(message, "warning", duration), [addToast])
  const info = useCallback((message, duration) => addToast(message, "info", duration), [addToast])
  const showToast = addToast

  return {
    toasts,
    addToast,
    showToast, 
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
