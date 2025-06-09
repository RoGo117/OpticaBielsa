"use client";

import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminVentas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    cliente_id: "",
    total: "",
    estado: "pendiente",
  });
  const [editingVentaId, setEditingVentaId] = useState(null);
  const [filtros, setFiltros] = useState({
  fechaInicio: "",
  fechaFin: "",
  estado: "",
 });
  const [totalVendido, setTotalVendido] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  fetchUsuarios();
}, []);

const fetchUsuarios = async () => {
  try {
    const response = await apiService.getUsers();
    if (response.success) {
      setUsuarios(Array.isArray(response.data?.rows) ? response.data.rows : response.data);
    }
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
};

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    setLoading(true);
    try {
      const response = await apiService.getVentas();
      if (response.success) {
        setVentas(response.data);
      }
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      alert("Error al cargar las ventas");
    } finally {
      setLoading(false);
    }
  };

    const handleTotalVendido = async () => {
    if (!fechaInicio || !fechaFin) {
        alert("Por favor selecciona ambas fechas");
        return;
    }
    try {
        const res = await apiService.getTotalVendido(fechaInicio, fechaFin);
        if (res.success) {
        setTotalVendido(res.data.total);
        } else {
        alert("Error obteniendo el total");
        }
    } catch (err) {
        console.error("Error obteniendo total:", err);
        alert("Error de conexión");
    }
    };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta venta?")) return;
    try {
      const response = await apiService.deleteVenta(id);
      if (response.success) {
        fetchVentas();
        alert("Venta eliminada exitosamente");
      } else {
        alert("Error al eliminar la venta");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar la venta");
    }
  };

  const handleEdit = (venta) => {
    setEditingVentaId(venta.id);
    setFormData({
      cliente_id: venta.cliente_id,
      total: venta.total,
      estado: venta.estado,
    });
    setFormVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingVentaId) {
        response = await apiService.updateVenta(editingVentaId, formData);
      } else {
        response = await apiService.createVenta(formData);
      }

      if (response.success) {
        fetchVentas();
        setFormVisible(false);
        setEditingVentaId(null);
        setFormData({
          cliente_id: "",
          total: "",
          estado: "pendiente",
        });
        alert("Venta guardada exitosamente");
      } else {
        alert("Error al guardar la venta");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar la venta");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  const handleFiltrar = async () => {
  try {
    const query = new URLSearchParams(filtros).toString();
    const response = await apiService.getVentasFiltradas(query);
    if (response.success) {
      setVentas(response.data);
    } else {
      alert("Error al filtrar ventas");
    }
  } catch (error) {
    console.error("Error filtrando ventas:", error);
    alert("Error al filtrar ventas");
  }
};

const handleExportarExcel = async () => {
  try {
    // Hacer la solicitud GET a la ruta exportar, pasando el token manualmente
    const token = localStorage.getItem("token"); // o donde guardes el token
    const response = await fetch("http://localhost:5000/api/ventas/exportar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al exportar el archivo");
    }

    // Recibir el archivo en formato blob
    const blob = await response.blob();

    // Crear un enlace para descargar el archivo
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ventas.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Archivo exportado correctamente");
  } catch (error) {
    console.error("Error exportando:", error);
    alert("Error al exportar el archivo");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Gestión de Ventas</h1>
            <p className="text-gray-600 dark:text-gray-300">Administra todas las ventas realizadas</p>
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
                setFormVisible(true);
                setEditingVentaId(null);
                setFormData({ cliente_id: "", total: "", estado: "pendiente" });
              }}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Nueva Venta
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 mb-6">
        <div>
            <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
            <input
            type="date"
            value={filtros.fechaInicio}
            onChange={(e) => setFiltros((prev) => ({ ...prev, fechaInicio: e.target.value }))}
            className="px-3 py-2 border rounded"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
            <input
            type="date"
            value={filtros.fechaFin}
            onChange={(e) => setFiltros((prev) => ({ ...prev, fechaFin: e.target.value }))}
            className="px-3 py-2 border rounded"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
            value={filtros.estado}
            onChange={(e) => setFiltros((prev) => ({ ...prev, estado: e.target.value }))}
            className="px-3 py-2 border rounded"
            >
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="pagada">Pagada</option>
            <option value="cancelada">Cancelada</option>
            </select>
        </div>
        <button
            onClick={handleFiltrar}
            className="self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Filtrar
        </button>
        </div>


        {formVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingVentaId ? "Editar Venta" : "Nueva Venta"}
                </h2>
                <button
                  onClick={() => setFormVisible(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cliente</label>
                  <select
                    name="cliente_id"
                    value={formData.cliente_id}
                    onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar cliente</option>
                        {Array.isArray(usuarios) && usuarios.length > 0 ? (
                          usuarios.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.nombre} - {user.email}
                            </option>
                          ))
                        ) : (
                          <option value="">No hay usuarios disponibles</option>
                        )}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total (€)</label>
                  <input
                    type="number"
                    name="total"
                    value={formData.total}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="pagada">Pagada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setFormVisible(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    {editingVentaId ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mb-6 flex gap-2 items-end">
          <div>
            <label>Fecha Inicio</label>
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </div>
          <div>
            <label>Fecha Fin</label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </div>
          <button
            onClick={handleTotalVendido}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ver Total Vendido
          </button>

          <button
            onClick={handleExportarExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Exportar a Excel
          </button>

        </div>

        {totalVendido !== null && (
          <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            Total vendido: €{totalVendido}
          </p>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ventas.map((venta) => (
                <div
                key={venta.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all p-4"
                >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Venta #{venta.id}
                </h3>

                {/* Cliente */}
                {venta.cliente ? (
                    <div className="mb-1">
                    <p className="text-gray-600 dark:text-gray-300">
                        Cliente: {venta.cliente.nombre} ({venta.cliente.email})
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        Teléfono: {venta.cliente.telefono || "N/A"}
                    </p>
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Cliente ID: {venta.cliente_id}
                    </p>
                )}

                {/* Productos Vendidos */}
                {venta.productosVendidos?.length > 0 && (
                    <div className="mb-2">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Productos vendidos:</h4>
                    <ul className="list-disc pl-4">
                        {venta.productosVendidos.map((producto) => (
                        <li key={producto.producto_id} className="text-gray-600 dark:text-gray-300 text-sm">
                            Producto ID: {producto.producto_id} - Cantidad: {producto.cantidad} - Precio: €{producto.precio_unitario}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}

                {/* Total y Estado */}
                <p className="text-gray-600 dark:text-gray-300 mb-1">Total: €{venta.total}</p>
                <p
                    className={`text-sm font-semibold ${
                    venta.estado === "pagada"
                        ? "text-green-600 dark:text-green-400"
                        : venta.estado === "cancelada"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                >
                    Estado: {venta.estado}
                </p>

                {/* Fecha */}
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    Fecha: {new Date(venta.fecha).toLocaleDateString()}
                </p>

                {/* Botones */}
                <div className="flex gap-2">
                    <button
                    onClick={() => handleEdit(venta)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                    Editar
                    </button>
                    <button
                    onClick={() => handleDelete(venta.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                    Eliminar
                    </button>
                </div>
                </div>
            ))}
            </div>

        {ventas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No hay ventas registradas</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default AdminVentas;
