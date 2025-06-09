"use client";

import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

const AdminCitas = () => {
  const [citas, setCitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosLoading, setUsuariosLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [formData, setFormData] = useState({
    usuario_id: "",
    servicio: "",
    fecha: "",
    hora: "",
    estado: "programada",
  });

  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [loading]);

  const fetchData = async () => {
    try {
      const [citasRes, usuariosRes] = await Promise.all([
        apiService.getCitas(),
        apiService.getUsers(),
      ]);

      if (citasRes.success) setCitas(citasRes.data);
      if (usuariosRes.success && Array.isArray(usuariosRes.data.rows)) {
        setUsuarios(usuariosRes.data.rows);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setUsuariosLoading(false);
    }
  };

  const navigate = useNavigate()

    // Manejador para volver atrás
    const handleGoBack = () => {
    navigate("/admin")
    }

  const handleEdit = (cita) => {
    setEditingCita(cita);
    setFormData({
      usuario_id: cita.usuario_id,
      servicio: cita.servicio,
      fecha: cita.fecha.split("T")[0],
      hora: cita.hora.substring(0, 5),
      estado: cita.estado,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta cita?")) {
      try {
        const res = await apiService.deleteCita(id);
        if (res.success) {
          fetchData();
          alert("Cita eliminada correctamente");
        }
      } catch (error) {
        console.error("Error deleting cita:", error);
        alert("Error al eliminar la cita");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const citaData = {
        ...formData,
        hora: formData.hora + ":00",
      };
      let response;
      if (editingCita) {
        response = await apiService.updateCita(editingCita.id, citaData);
      } else {
        response = await apiService.createCita(citaData);
      }

      if (response.success) {
        setShowForm(false);
        setEditingCita(null);
        setFormData({
          usuario_id: "",
          servicio: "",
          fecha: "",
          hora: "",
          estado: "programada",
        });
        fetchData();
        alert(editingCita ? "Cita actualizada correctamente" : "Cita creada correctamente");
      }
    } catch (error) {
      console.error("Error guardando cita:", error);
      alert("Error al guardar la cita");
    }
  };

  const getUserName = (userId) => {
    const user = usuarios.find((u) => u.id === userId);
    return user ? user.nombre : "Usuario no encontrado";
  };

  const estados = ["programada", "completada", "cancelada"];
  const horarios = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30",
  ];

  if (usuariosLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Gestión de Citas</h1>
            <p className="text-gray-600 dark:text-gray-300">Administra todas las citas de la clínica</p>
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
                setEditingCita(null);
                setFormData({
                    usuario_id: "",
                    servicio: "",
                    fecha: "",
                    hora: "",
                    estado: "programada",
                });
                setShowForm(true);
                }}
                className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
                Nueva Cita
            </button>
           </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {editingCita ? "Editar Cita" : "Nueva Cita"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cliente</label>
                  <select
                    name="usuario_id"
                    value={formData.usuario_id}
                    onChange={(e) => setFormData({ ...formData, usuario_id: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar cliente</option>
                    {usuarios.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.nombre} - {user.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Servicio</label>
                  <input
                    type="text"
                    name="servicio"
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hora</label>
                  <select
                    name="hora"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar hora</option>
                    {horarios.map((hora) => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>{estado.charAt(0).toUpperCase() + estado.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    {editingCita ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de citas con scroll */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto max-h-[500px]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Servicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {citas.map((cita) => (
                <tr key={cita.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {getUserName(cita.usuario_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cita.servicio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cita.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cita.hora}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{cita.estado}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(cita)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(cita.id)}
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

        {citas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No hay citas registradas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCitas;
