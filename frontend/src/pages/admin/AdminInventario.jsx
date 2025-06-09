// src/pages/admin/AdminInventario.jsx
"use client";

import { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminInventario = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  fetchMovimientos();
}, []);

const fetchMovimientos = async () => {
  setLoading(true);
  try {
    const response = await apiService.getInventario();
    if (response.success) {
      setMovimientos(response.data);
    }
  } catch (error) {
    console.error("Error al cargar movimientos de inventario:", error);
    alert("Error cargando el inventario");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Gestión de Inventario</h1>
            <p className="text-gray-600 dark:text-gray-300">Revisa entradas y salidas de productos</p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-300 transition-colors font-medium flex items-center"
          >
            ← Volver
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movimientos.map((mov) => (
              <div
                key={mov.id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {mov.tipo === "entrada" ? "Entrada" : "Salida"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Producto: {mov.producto?.nombre || "N/A"} ({mov.producto?.marca || "N/A"})
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Categoría: {mov.producto?.categoria || "N/A"}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Cantidad: {mov.cantidad}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Fecha: {new Date(mov.fecha).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInventario;
