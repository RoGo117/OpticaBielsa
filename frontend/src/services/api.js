const API_BASE_URL = "http://localhost:5000/api"

class ApiService {
  constructor() {
    this.token = null
  }

  setAuthToken(token) {
    this.token = token
  }

async request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;

  const config = {
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
    ...options,
  };

  if (this.token) {
    config.headers.Authorization = `Bearer ${this.token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

  // Auth endpoints
  async login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData) {
    return this.request("/usuarios", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  // Users endpoints
  async getUsers() {
    return this.request("/usuarios")
  }

  async getUserById(id) {
    return this.request(`/usuarios/${id}`)
  }

  async createUser(userData) {
    return this.request("/usuarios", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id, userData) {
    return this.request(`/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id) {
    return this.request(`/usuarios/${id}`, {
      method: "DELETE",
    })
  }

  // Products endpoints
  async getProducts() {
    try {
      const response = await this.request("/productos")
      if (response && response.success && Array.isArray(response.data)) {
        return response
      }
      // Handle case where response structure is different
      if (Array.isArray(response)) {
        return { success: true, data: response }
      }
      throw new Error("Invalid response format")
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error
    }
  }

  async getProductById(id) {
    return this.request(`/productos/${id}`)
  }

  async createProduct(productData) {
    return this.request("/productos", {
      method: "POST",
      body: productData, 
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/productos/${id}`, {
      method: "PUT",
      body: productData,
    });
  }

  async deleteProduct(id) {
    return this.request(`/productos/${id}`, {
      method: "DELETE",
    })
  }

  // Add method to get unique categories and brands from products
  async getProductFilters() {
    try {
      const response = await this.getProducts()
      if (response.success) {
        const products = response.data
        const categories = [...new Set(products.map((p) => p.categoria).filter(Boolean))]
        const brands = [...new Set(products.map((p) => p.marca).filter(Boolean))]
        return { categories, brands }
      }
      return { categories: [], brands: [] }
    } catch (error) {
      console.error("Error fetching product filters:", error)
      return { categories: [], brands: [] }
    }
  }

  // Appointments endpoints
  async getCitas() {
    return this.request("/citas")
  }

  async getCitaById(id) {
    return this.request(`/citas/${id}`)
  }

  async createCita(citaData) {
    return this.request("/citas", {
      method: "POST",
      body: JSON.stringify(citaData),
    })
  }

  async updateCita(id, citaData) {
    return this.request(`/citas/${id}`, {
      method: "PUT",
      body: JSON.stringify(citaData),
    })
  }

  async deleteCita(id) {
    return this.request(`/citas/${id}`, {
      method: "DELETE",
    })
  }

  // Sales endpoints
  async getVentas() {
    return this.request("/ventas")
  }

  async createVenta(ventaData) {
    return this.request("/ventas", {
      method: "POST",
      body: JSON.stringify(ventaData),
    })
  }

  // Ventas endpoints (añadir esto en api.js donde ya está la clase ApiService)
  async updateVenta(id, ventaData) {
    return this.request(`/ventas/${id}`, {
      method: "PUT",
      body: JSON.stringify(ventaData),
      headers: { "Content-Type": "application/json" },
    });
  }

  async deleteVenta(id) {
    return this.request(`/ventas/${id}`, {
      method: "DELETE",
    });
  }

  async getVentasFiltradas(queryString) {
  return this.request(`/ventas/filtrar?${queryString}`);
  }

  // Dashboard endpoint
  async getDashboardSummary() {
    return this.request("/dashboard")
  }

  // Health check
  async healthCheck() {
    return this.request("/health")
  }

  async getTotalVendido(fechaInicio, fechaFin) {
  const params = new URLSearchParams({ fechaInicio, fechaFin }).toString();
  return this.request(`/ventas/total-vendido?${params}`);
}

// Inventario
async getInventario() {
  return this.request("/inventario");
}

}

export const apiService = new ApiService()
