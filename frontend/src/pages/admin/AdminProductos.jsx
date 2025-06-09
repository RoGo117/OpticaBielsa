"use client"

import { useState, useEffect } from "react"
import { apiService } from "../../services/api"
import { useNavigate } from "react-router-dom"

const AdminProductos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
const [formData, setFormData] = useState({
  nombre: "",
  categoria: "",
  marca: "",
  precio: "",
  stock: "",
  activo: true,
  descripcion: "",
  imagen: null,
})

  const categorias = [
    "Gafas de Sol",
    "Gafas Graduadas",
    "Lentes de Contacto",
    "Lentes Progresivas",
    "Gafas de Lectura",
    "Accesorios",
  ]

  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    try {
      const response = await apiService.getProducts()
      if (response.success) {
        setProductos(response.data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const navigate = useNavigate()

  // Manejador para volver atrás
  const handleGoBack = () => {
    navigate("/admin")
  }

  // Manejador para enviar el formulario
const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append("nombre", formData.nombre);
  form.append("categoria", formData.categoria);
  form.append("marca", formData.marca);
  form.append("precio", formData.precio);
  form.append("stock", formData.stock);
  form.append("descripcion", formData.descripcion || "");

  if (formData.imagen) {
    form.append("imagen", formData.imagen);
  }

  try {
    let response;
    if (editingProduct) {
      response = await apiService.updateProduct(editingProduct.id, form); // PATCH O PUT
    } else {
      response = await apiService.createProduct(form); // POST
    }

    if (response.success) {
      fetchProductos();
      setShowForm(false);
      alert("Producto creado/actualizado exitosamente");
    } else {
      alert("Error al guardar el producto: " + response.message);
    }
  } catch (error) {
    console.error("Error guardando el producto:", error);
    alert("Error al guardar el producto");
  }
};


  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre || "",
      categoria: product.categoria || "", 
      marca: product.marca || "",
      precio: product.precio?.toString() || "0",
      stock: product.stock?.toString() || "0",
      descripcion: product.descripcion || "",
      imagen_url: product.imagen_url || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const response = await apiService.deleteProduct(id)
        if (response.success) {
          fetchProductos()
          alert("Producto eliminado exitosamente")
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        alert("Error al eliminar el producto")
      }
    }
  }

const handleChange = (e) => {
  const { name, value, files } = e.target
  if (name === "imagen") {
    setFormData((prev) => ({ ...prev, imagen: files[0] }))
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
}


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
console.log("Producto:", productos);


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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Gestión de Productos</h1>
            <p className="text-gray-600 dark:text-gray-300">Administra el inventario de productos</p>
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
                setEditingProduct(null)
                setFormData({ nombre: "", categoria: "", marca: "", precio: "", stock: "", imagen_url: "" })
                setShowForm(true)
              }}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Nuevo Producto
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingProduct ? "Editar Producto" : "Nuevo Producto"}
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
                    placeholder="Nombre del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Marca del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio (€)</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Imagen del Producto
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Vista previa"
                      className="mt-2 h-32 w-32 object-cover rounded"
                    />
                  )}
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
                    {editingProduct ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-gray-200 dark:bg-gray-700">
                <img
                  src={`http://localhost:5000/api/productos/${product.id}/imagen`}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                    {product.categoria}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{product.nombre}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.marca}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-blue-700 dark:text-blue-400">€{product.precio}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No hay productos registrados</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProductos
