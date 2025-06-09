"use client"

import { useState, useEffect } from "react"
import { apiService } from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [usuariosLoading, setUsuariosLoading] = useState(true) 
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rol: "cliente",
    password: "",
  })

  // Filtros dinámicos
const [roleFilter, setRoleFilter] = useState("");
const [searchName, setSearchName] = useState("");
const [searchEmail, setSearchEmail] = useState("");

const filteredUsuarios = usuarios.filter((user) => {
  const matchesRole = roleFilter === "" || user.rol === roleFilter;
  const matchesName =
    searchName === "" ||
    user.nombre.toLowerCase().includes(searchName.toLowerCase());
  const matchesEmail =
    searchEmail === "" ||
    user.email.toLowerCase().includes(searchEmail.toLowerCase());

  return matchesRole && matchesName && matchesEmail;
});


  const roles = ["admin", "cliente", "empleado"]

  const { loading } = useAuth() 

  useEffect(() => {
    if (!loading) {
      fetchUsuarios()
    }
  }, [loading])

const fetchUsuarios = async () => {
  try {
    const response = await apiService.getUsers();
    console.log("API response en usuarios:", response);

    if (response.success && Array.isArray(response.data.rows)) {
      setUsuarios(response.data.rows);
    } else {
      console.error("La respuesta no tiene un array válido de usuarios.");
      setUsuarios([]);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    setUsuarios([]); 
  } finally {
    setUsuariosLoading(false);
  }
};

const navigate = useNavigate()

// Manejador para volver atrás
const handleGoBack = () => {
  navigate("/admin")
}

  // Muestra loader si aún se están cargando los usuarios
  if (usuariosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let response
      if (editingUser) {
        // Para editar, no enviamos la contraseña si está vacía
        const updateData = { ...formData }
        if (!updateData.password) {
          delete updateData.password
        }
        response = await apiService.updateUser(editingUser.id, updateData)
      } else {
        response = await apiService.createUser(formData)
      }

      if (response.success) {
        setShowForm(false)
        setEditingUser(null)
        setFormData({ nombre: "", email: "", telefono: "", rol: "cliente", password: "" })
        fetchUsuarios()
        alert(editingUser ? "Usuario actualizado exitosamente" : "Usuario creado exitosamente")
      } else {
        alert("Error: " + response.message)
      }
    } catch (error) {
      console.error("Error saving user:", error)
      alert("Error al guardar el usuario")
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono || "",
      rol: user.rol,
      password: "", 
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        const response = await apiService.deleteUser(id)
        if (response.success) {
          fetchUsuarios()
          alert("Usuario eliminado exitosamente")
        } else {
          alert("Error: " + response.message)
        }
      } catch (error) {
        console.error("Error deleting user:", error)
        alert("Error al eliminar el usuario")
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getRoleColor = (rol) => {
    switch (rol) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "empleado":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "cliente":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

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
        <div className="flex gap-4 justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Gestión de Usuarios</h1>
            <p className="text-gray-600 dark:text-gray-300">Administra clientes, empleados y administradores</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleGoBack}
              className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-300 transition-colors font-medium flex items-center"
            >
              ← Volver
            </button>
            <button
              onClick={() => {
                setEditingUser(null)
                setFormData({ nombre: "", email: "", telefono: "", rol: "cliente", password: "" })
                setShowForm(true)
              }}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Nuevo Usuario
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="usuario@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rol</label>
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {roles.map((rol) => (
                      <option key={rol} value={rol}>
                        {rol.charAt(0).toUpperCase() + rol.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contraseña {editingUser && "(dejar vacío para mantener la actual)"}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editingUser}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    {editingUser ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/3"
        />
        <input
            type="text"
            placeholder="Buscar por email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/3"
        />
        <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/3"
        >
            <option value="">Todos</option>
            <option value="admin">Admin</option>
            <option value="empleado">Empleado</option>
            <option value="cliente">Cliente</option>
        </select>
        </div>


        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {user.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.telefono || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.rol)}`}>
                        {user.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {usuarios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No hay usuarios registrados</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsuarios
