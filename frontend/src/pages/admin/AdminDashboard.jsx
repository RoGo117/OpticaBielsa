"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { apiService } from "../../services/api"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalProductos: 0,
    totalCitas: 0,
    totalVentas: 0,
    totalInventario: 0,
  })
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    try {
      const statsResponse = await apiService.getDashboardSummary()

      if (statsResponse.success) {
        setStats(statsResponse.data)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])


  const statCards = [
    { title: "Total Usuarios", value: stats.totalUsuarios, icon: "👥", color: "bg-blue-500", link: "/admin/usuarios" },
    { title: "Total Productos", value: stats.totalProductos, icon: "👓", color: "bg-green-500", link: "/admin/productos" },
    { title: "Total Citas", value: stats.totalCitas, icon: "📅", color: "bg-yellow-500", link: "/admin/citas" },
    { title: "Total Ventas", value: stats.totalVentas, icon: "💰", color: "bg-purple-500", link: "/admin/ventas" },
    { title: "Inventario", value: stats.totalInventario, icon: "📦", color: "bg-red-500", link: "/admin/inventario" },
  ]

  const quickActions = [
    { title: "Gestionar Citas", description: "Ver, editar y programar citas", icon: "📅", link: "/admin/citas", color: "bg-blue-600" },
    { title: "Gestionar Productos", description: "Añadir, editar y eliminar productos", icon: "👓", color: "bg-green-600", link: "/admin/productos" },
    { title: "Gestionar Usuarios", description: "Administrar clientes y empleados", icon: "👥", color: "bg-purple-600", link: "/admin/usuarios" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Panel de Administración</h1>
          <p className="text-gray-600 dark:text-gray-300">Bienvenido al panel de control de Óptica Bielsa</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center">
                <div className={`${card.color} rounded-lg p-3 mr-4`}>
                  <span className="text-2xl text-white">{card.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className={`${action.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                  <span className="text-xl text-white">{action.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard
