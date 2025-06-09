"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { apiService } from "../services/api"

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts()
        if (response.success) {
          setProducts(response.data.slice(0, 4)) // Solo mostrar 4 productos
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])


  // Iconos de servicios
  const EyeIcon = (
    <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 4.5c-7 0-10 7.5-10 7.5s3 7.5 10 7.5 10-7.5 10-7.5-3-7.5-10-7.5zm0 12c-2.5 0-4.5-2-4.5-4.5S9.5 7.5 12 7.5 16.5 9.5 16.5 12 14.5 16.5 12 16.5zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  );

  const GlassesIcon = (
    <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2 12h2a3 3 0 0 1 6 0h4a3 3 0 0 1 6 0h2v3a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3h-4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-3zM5 15a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H4v4h1zm14 0a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1v4h1z" />
    </svg>
  );

  const CalendarIcon = (
    <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
    </svg>
  );

  const services = [
    {
      icon: EyeIcon,
      title: "Examen Visual Completo",
      description: "Evaluación profesional de tu salud visual",
      details:
        "Realizamos un examen completo para detectar problemas visuales y recomendar la mejor solución al mejor costo.",
    },
    {
      icon: GlassesIcon,
      title: "Gafas y Lentes",
      description: "Amplio catálogo de monturas y lentes",
      details:
        "Disponemos de las mejores marcas y los diseños más actuales para que encuentres las gafas perfectas para ti.",
    },
    {
      icon: CalendarIcon,
      title: "Citas Personalizadas",
      description: "Atención personalizada según tus necesidades",
      details:
        "Reserva una cita con nuestros especialistas para recibir atención personalizada y resolver todas tus dudas.",
    },
  ];

  const testimonials = [
    {
      name: "María García",
      text: "Excelente atención y profesionalidad. Me ayudaron a encontrar las gafas perfectas para mi y mis necesidades visuales.",
    },
    {
      name: "Carlos Rodríguez",
      text: "El sistema de citas online es muy cómodo y el personal es muy amable. Recomiendo totalmente la Óptica Bielsa.",
    },
    {
      name: "Laura Martínez",
      text: "Gracias al examen visual completo, detectaron un problema que no sabía que tenía. Ahora veo perfectamente con mis nuevas gafas.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Óptica <span className="text-blue-300">Bielsa</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Cuidamos tu visión con gran dedicación, profesionalidad y cercanía. Casi 30 años de experiencia en el sector óptico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/citas"
                  className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 text-center"
                >
                  Pedir Cita
                </Link>
                <Link
                  to="/servicios"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-all text-center"
                >
                  Nuestros Servicios
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <img
                  src="/src/assets/images/tiendaFrontalTalavera.jpg"
                  alt="Óptica Bielsa"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios ópticos para cuidar de tu salud visual
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">{service.description}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.details}</p>
                <Link
                  to="/servicios"
                  className="text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  Más información →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Productos</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubre nuestra selección de productos de alta calidad
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
                >
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700">
                    <img
                      src={product.imagen_url || "/placeholder.svg?height=300&width=300"}
                      alt={product.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{product.nombre}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{product.categoria}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">€{product.precio}</span>
                      <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                        <Link
                          to="/productos"
                              
                            >
                          Ver detalles
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/productos"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">👤</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{testimonial.name}</h4>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para cuidar tu salud visual?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Reserva una cita hoy mismo y déjanos cuidar de tus ojos con la última tecnología y los mejores
            profesionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/citas"
              className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Pedir Cita
            </Link>
            <Link
              to="/productos"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-all"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
