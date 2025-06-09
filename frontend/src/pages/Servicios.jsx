import { Link } from "react-router-dom";

const Servicios = () => {
  const services = [
    {
      id: "examen",
      title: "Examen Visual Completo",
      icon: "👁️",
      description: "Evaluación profesional completa de tu salud visual",
      details: [
        "Medición de agudeza visual",
        "Evaluación de refracción",
        "Examen del fondo de ojo",
        "Detección de patologías oculares",
        "Recomendaciones personalizadas",
      ],
      duration: "45 minutos",
      price: "€35",
    },
    {
      id: "gafas",
      title: "Gafas y Monturas",
      icon: "👓",
      description: "Amplio catálogo de gafas graduadas y de sol",
      details: [
        "Monturas de las mejores marcas",
        "Lentes con tratamientos especiales",
        "Asesoramiento personalizado",
        "Ajuste y reparaciones",
        "Garantía en todos los productos",
      ],
      duration: "Consulta",
      price: "Desde €49",
    },
    {
      id: "contacto",
      title: "Lentes de Contacto",
      icon: "🔍",
      description: "Adaptación y seguimiento de lentes de contacto",
      details: [
        "Adaptación personalizada",
        "Lentes diarias, semanales y mensuales",
        "Lentes tóricas para astigmatismo",
        "Lentes multifocales",
        "Seguimiento y revisiones",
      ],
      duration: "30 minutos",
      price: "Desde €25",
    },
    {
      id: "infantil",
      title: "Optometría Infantil",
      icon: "👶",
      description: "Cuidado visual especializado para niños",
      details: [
        "Exámenes adaptados a la edad",
        "Detección temprana de problemas",
        "Terapia visual",
        "Monturas resistentes para niños",
        "Seguimiento del desarrollo visual",
      ],
      duration: "30 minutos",
      price: "€30",
    },
    {
      id: "baja-vision",
      title: "Baja Visión",
      icon: "🔬",
      description: "Ayudas ópticas para personas con baja visión",
      details: [
        "Evaluación de baja visión",
        "Lupas y telescopios",
        "Ayudas electrónicas",
        "Entrenamiento en el uso",
        "Seguimiento personalizado",
      ],
      duration: "60 minutos",
      price: "€50",
    },
    {
      id: "reparaciones",
      title: "Reparaciones",
      icon: "🔧",
      description: "Servicio técnico especializado",
      details: [
        "Reparación de monturas",
        "Cambio de cristales",
        "Ajustes y soldaduras",
        "Limpieza profesional",
        "Presupuesto sin compromiso",
      ],
      duration: "24-48 horas",
      price: "Desde €10",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios ópticos profesionales para cuidar de tu salud visual
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">{service.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <ul className="space-y-2">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duración</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Precio</p>
                    <p className="font-bold text-blue-700 dark:text-blue-400 text-lg">{service.price}</p>
                  </div>
                </div>

                {/* Aquí cambio el <button> por <Link> */}
                <Link
                  to="/citas"
                  className="block text-center bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Pedir Cita
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas más información?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de profesionales está aquí para ayudarte. Contáctanos para resolver cualquier duda sobre
            nuestros servicios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+34695183255"
              className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Llamar: 695 183 255
            </a>
            <a
              href="mailto:florabielsa@gmail.com"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              Email: florabielsa@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Servicios
