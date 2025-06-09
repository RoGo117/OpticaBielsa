"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"

// Cabecera de la web

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mobileMenuRef = useRef(null)
  const servicesDropdownRef = useRef(null)

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 950)
      if (window.innerWidth >= 950) {
        setIsMobileMenuOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false)
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl transition-all hover:opacity-90 hover:-translate-y-0.5 z-50"
            onClick={closeMobileMenu}
          >
            <svg className="w-8 h-8 text-white transition-all" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span className="text-xl font-bold tracking-tight">Óptica Bielsa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className="px-3 py-2 rounded-md font-medium hover:bg-blue-600 transition-all flex items-center gap-1"
            >
              Inicio
            </Link>
            <Link to="/quienes-somos" className="px-3 py-2 rounded-md font-medium hover:bg-blue-600 transition-all flex items-center gap-1">
              Quiénes Somos
            </Link>

            <div
              ref={servicesDropdownRef}
              className="relative"
              onMouseEnter={() => !isMobile && setIsServicesOpen(true)}
              onMouseLeave={() => !isMobile && setIsServicesOpen(false)}
            >
              <button
                className="px-3 py-2 rounded-md font-medium hover:bg-blue-600 transition-all flex items-center gap-1"
                onClick={() => isMobile && toggleServicesDropdown()}
              >
                Servicios
                <svg
                  className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 bg-white rounded-md shadow-lg py-2 min-w-[200px] z-50 animate-fadeIn">
                  <Link
                    to="/servicios#examen"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    Examen Visual
                  </Link>
                  <Link
                    to="/servicios#gafas"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    Gafas y Lentes
                  </Link>
                  <Link
                    to="/servicios#contacto"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    Lentes de Contacto
                  </Link>
                </div>
              )}
            </div>

            <Link to="/citas" className="px-3 py-2 rounded-md font-medium hover:bg-blue-600 transition-all">
              Citas
            </Link>
            <Link to="/productos" className="px-3 py-2 rounded-md font-medium hover:bg-blue-600 transition-all">
              Productos
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
                  </svg>
                  <span className="font-medium text-sm hidden lg:inline">Hola, {user.nombre || user.name}</span>
                </div>
                {(user.rol === "admin" || user.role === "admin") && (
                  <Link
                    to="/admin"
                    className="bg-white text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="border border-white text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white hover:text-blue-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="border border-white text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white hover:text-blue-700 transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}

            <Link
              to="/citas"
              className="bg-white text-blue-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Pedir Cita
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-blue-700 border-t border-blue-600 py-4 px-4 shadow-lg z-40 animate-slideDown"
          >
            <nav className="flex flex-col space-y-1 mb-6">
              <Link
                to="/"
                className="px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-all"
                onClick={closeMobileMenu}
              >
                Inicio
              </Link>

              <Link
                to="/quienes-somos"
                className="px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-all"
                onClick={closeMobileMenu}
              >
                Quiénes Somos
              </Link>


              <div className="relative">
                <button
                  className="w-full text-left px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-all flex items-center justify-between"
                  onClick={toggleServicesDropdown}
                >
                  Servicios
                  <svg
                    className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" />
                  </svg>
                </button>

                {isServicesOpen && (
                  <div className="bg-blue-600 rounded-md mt-1 py-1">
                    <Link
                      to="/servicios#examen"
                      className="block px-8 py-2 hover:bg-blue-500 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Examen Visual
                    </Link>
                    <Link
                      to="/servicios#gafas"
                      className="block px-8 py-2 hover:bg-blue-500 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Gafas y Lentes
                    </Link>
                    <Link
                      to="/servicios#contacto"
                      className="block px-8 py-2 hover:bg-blue-500 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Lentes de Contacto
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/citas"
                className="px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-all"
                onClick={closeMobileMenu}
              >
                Citas
              </Link>
              <Link
                to="/productos"
                className="px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-all"
                onClick={closeMobileMenu}
              >
                Productos
              </Link>
            </nav>

            <div className="flex flex-col space-y-4 border-t border-blue-600 pt-4">
              <button
                onClick={() => {
                  toggleTheme()
                  closeMobileMenu()
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-md font-medium hover:bg-blue-600 transition-all"
              >
                {isDarkMode ? (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                    </svg>
                    <span>Modo Oscuro</span>
                  </>
                )}
              </button>

              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
                    </svg>
                    <span className="font-medium">Hola, {user.nombre || user.name}</span>
                  </div>

                  {(user.rol === "admin" || user.role === "admin") && (
                    <Link
                      to="/admin"
                      className="block w-full bg-white text-blue-700 text-center px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Panel Admin
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-blue-700 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full border border-white text-white text-center px-4 py-2 rounded-md font-medium hover:bg-white hover:text-blue-700 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión
                </Link>
              )}

              <Link
                to="/citas"
                className="block w-full bg-white text-blue-700 text-center px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                onClick={closeMobileMenu}
              >
                Pedir Cita
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
