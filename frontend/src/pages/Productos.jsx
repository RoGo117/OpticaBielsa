"use client"

import { useState, useEffect } from "react"
import { apiService } from "../services/api"
import { useToast } from "../hooks/useToast"
import Loading from "../components/Loading"

const Productos = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [availableCategories, setAvailableCategories] = useState([])
  const [availableBrands, setAvailableBrands] = useState([])
  const [maxPrice, setMaxPrice] = useState(500)
  const { showToast } = useToast()

  const tabs = ["Todos", "Gafas", "Lentes", "Accesorios"]


  
// Carga inicial de productos y filtros desde el backend
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)

      // Obtener solo los productos (los filtros se generarán a partir de ellos)
      const response = await apiService.getProducts()

      if (response.success && Array.isArray(response.data)) {
        const productsData = response.data
        setProducts(productsData)

        // Generar categorías y marcas sin nulos
        const categories = [...new Set(productsData.map((p) => p.categoria?.trim() || "Sin categoría"))]
        const brands = [...new Set(productsData.map((p) => p.marca?.trim() || "Sin marca"))]

        setAvailableCategories(["Todas", ...categories])
        setAvailableBrands(brands)

        // Calcular precio máximo
        const prices = productsData.map((p) => parseFloat(p.precio) || 0)
        const calculatedMaxPrice = Math.max(...prices, 500)
        setMaxPrice(calculatedMaxPrice)
        setPriceRange([0, calculatedMaxPrice])

        showToast("Productos cargados correctamente", "success")
      } else {
        showToast("No se pudieron cargar los productos", "error")
        setProducts([])
      }
    } catch (error) {
      console.error("Error al cargar productos:", error)
      showToast("Error al cargar los productos", "error")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [showToast])

  // Aplicar filtros cuando cambian productos, filtros o pestañas
  useEffect(() => {
    applyFilters()
  }, [products, activeTab, searchTerm, selectedCategories, selectedBrands, priceRange])

  // Función de filtrado
  const applyFilters = () => {
    let filtered = [...products]

    // Filtrar por pestaña
    if (activeTab !== "Todos") {
      const tabMapping = {
        Gafas: ["gafas", "graduadas", "lectura", "vista"],
        Lentes: ["lentes", "contacto", "progresivas"],
        Accesorios: ["accesorios", "limpieza", "estuche", "cordón"],
      }

      filtered = filtered.filter((product) =>
        tabMapping[activeTab]?.some(
          (keyword) =>
            product.categoria?.toLowerCase().includes(keyword) ||
            product.nombre?.toLowerCase().includes(keyword),
        ),
      )
    }

    // Búsqueda
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.nombre?.toLowerCase().includes(searchLower) ||
          product.marca?.toLowerCase().includes(searchLower) ||
          product.categoria?.toLowerCase().includes(searchLower),
      )
    }

    // Categorías seleccionadas
    if (selectedCategories.length > 0 && !selectedCategories.includes("Todas")) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((cat) =>
          product.categoria?.toLowerCase().includes(cat.toLowerCase()),
        ),
      )
    }

    // Marcas seleccionadas
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.some((brand) => product.marca?.toLowerCase() === brand.toLowerCase()),
      )
    }

    // Rango de precio
    filtered = filtered.filter((product) => {
      const price = Number.parseFloat(product.precio) || 0
      return price >= priceRange[0] && price <= priceRange[1]
    })

    setFilteredProducts(filtered)
  }

  // Manejadores de cambios de filtros
  const handleCategoryChange = (category) => {
    if (category === "Todas") {
      setSelectedCategories(selectedCategories.includes("Todas") ? [] : ["Todas"])
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category && c !== "Todas")
        : [...selectedCategories.filter((c) => c !== "Todas"), category]
      setSelectedCategories(newCategories)
    }
  }

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    )
  }

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      showToast(`${product.nombre} añadido al carrito`, "success")
    } else {
      showToast("Producto sin stock", "error")
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, maxPrice])
    setActiveTab("Todos")
  }
  

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Descubre nuestra amplia selección de productos ópticos
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {filteredProducts.length} de {products.length} productos
          </div>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow border border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* SIDEBAR */}
          <div className="w-80 bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
            {/* Filtros */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707L13 14v7l-4-4v-3.586L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros</h3>
              </div>
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Limpiar
              </button>
            </div>

            {/* Buscar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Categorías */}
            {availableCategories.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Categorías</h4>
                {availableCategories.map((category) => (
                  <label key={category} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="text-blue-600 rounded"
                    />
                    {category}
                  </label>
                ))}
              </div>
            )}

            {/* Marcas */}
            {availableBrands.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Marcas</h4>
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="text-blue-600 rounded"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            )}

            {/* Rango Precio */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rango de Precio</h4>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0€</span>
                <span>{priceRange[1]}€</span>
              </div>
            </div>
          </div>

          {/* PRODUCTOS */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition p-4 flex flex-col justify-between"
                >
                  <img
                    src={`http://localhost:5000/api/productos/${product.id}/imagen`}
                    alt={product.nombre}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.nombre}</h3>
                    {product.marca && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{product.marca}</p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.categoria}</p>
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                      {Number(product.precio).toFixed(2)}€
                    </span>
                  </div>
                  {/* <button
                    onClick={() => handleAddToCart(product)}
                    className={`mt-3 w-full py-2 rounded-lg font-medium ${
                      product.stock > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                  </button> */}
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                No se encontraron productos.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productos
