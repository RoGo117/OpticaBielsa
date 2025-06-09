import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Contexto
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastProvider, useToastContext } from "./context/ToastContext"

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import ToastContainer from "./components/ToastContainer"
import ErrorBoundary from "./components/ErrorBoundary"
import ProtectedRoute from "./components/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Servicios from "./pages/Servicios"
import Citas from "./pages/Citas"
import Productos from "./pages/Productos"
import QuienesSomos from "./pages/QuienesSomos"

// Pages Admin
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminCitas from "./pages/admin/AdminCitas"
import AdminProductos from "./pages/admin/AdminProductos"
import AdminUsuarios from "./pages/admin/AdminUsuarios"
import AdminVentas from "./pages/admin/AdminVentas"
import AdminInventario from "./pages/admin/AdminInventario"

function AppContent() {
  const { toasts, removeToast } = useToastContext()
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />

              {/* Rutas protegidas */}
              <Route
                path="/citas"
                element={
                  <Citas />
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/citas"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminCitas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/productos"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminProductos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/usuarios"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminUsuarios />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/ventas"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminVentas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/inventario"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminInventario />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>

        <Footer />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App