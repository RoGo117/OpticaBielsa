"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useToastContext } from "../context/ToastContext"
import { apiService } from "../services/api"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, User, Phone, Mail, FileText } from "lucide-react"

const Citas = () => {
  const { user } = useAuth()
  const { success, error } = useToastContext()

  // Estados principales
  const [activeTab, setActiveTab] = useState("nueva")
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Estados del calendario
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [validationError, setValidationError] = useState("");

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    telefono: user?.telefono || "",
    email: user?.email || "",
    servicio: "",
    notas: "",
  })

  const servicios = [
    "Examen Visual Completo",
    "Adaptación Lentes de Contacto",
    "Revisión Gafas",
    "Optometría Infantil",
    "Baja Visión",
    "Reparaciones",
  ]

  const horarios = ["09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  useEffect(() => {
    fetchCitas()
  }, [])

  const fetchCitas = async () => {
    try {
      const response = await apiService.getCitas()
      if (response.success) {
        const userCitas =
          user.rol === "admin" ? response.data : response.data.filter((cita) => cita.usuario_id === user.id)
        setCitas(userCitas)
      }
    } catch (error) {
      console.error("Error fetching citas:", error)
    } finally {
      setLoading(false)
    }
  }

  // Generar días del calendario
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isToday = date.getTime() === today.getTime()
      const isPast = date < today
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime()

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isSelected,
        isAvailable: isCurrentMonth && !isPast,
      })
    }

    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const handleDateSelect = (day) => {
    if (day.isAvailable) {
      setSelectedDate(day.date)
      setSelectedTime("") // Reset selected time
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const validateForm = () => {
  if (!formData.nombre || !formData.telefono || !formData.email || !formData.servicio) {
    return "Por favor completa todos los campos obligatorios";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Por favor introduce un correo electrónico válido";
  }

  const phoneRegex = /^\d{9}$/;
  if (!phoneRegex.test(formData.telefono)) {
    return "El número de teléfono debe tener 9 dígitos";
  }

  return "";
};




  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !formData.servicio) {
      setValidationError("Por favor completa todos los campos requeridos (fecha, hora y servicio)");
      return;
    }

    const validationMessage = validateForm();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setValidationError(""); // limpia el error si todo está bien
    setSubmitting(true);

    try {
      const citaData = {
        usuario_id: user.id,
        servicio: formData.servicio,
        fecha: selectedDate.toISOString().split("T")[0],
        hora: selectedTime + ":00",
        notas: formData.notas,
      };

      const response = await apiService.createCita(citaData);

      if (response.success) {
        success("Cita creada exitosamente");
        setActiveTab("mis-citas");
        setSelectedDate(null);
        setSelectedTime("");
        setFormData((prev) => ({ ...prev, servicio: "", notas: "" }));
        fetchCitas();
      } else {
        error("Error al crear la cita: " + response.message);
      }
    } catch (err) {
      error("Error de conexión");
      console.error("Error creating cita:", err);
    } finally {
      setSubmitting(false);
    }
  };




  const handleCancelCita = async (citaId) => {
    if (!confirm("¿Estás seguro de que quieres cancelar esta cita?")) return

    try {
      const response = await apiService.deleteCita(citaId)
      if (response.success) {
        success("Cita cancelada exitosamente")
        fetchCitas()
      } else {
        error("Error al cancelar la cita")
      }
    } catch (err) {
      error("Error de conexión")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const calendarDays = generateCalendarDays()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Gestión de Citas</h1>
          {!user ? (
            <div className="mt-4 text-center">
              <p className="text-red-600 font-medium">
                Necesitas iniciar sesión para pedir una cita
              </p>
              <a
                href="/login"
                className="inline-block mt-2 bg-blue-700 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors"
              >
                Iniciar Sesión
              </a>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Reserva una cita con nuestros especialistas para recibir la mejor atención personalizada
            </p>
          )}
        </div>
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("nueva")}
              className={`px-8 py-3 rounded-md font-medium transition-all ${
                activeTab === "nueva"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Nueva Cita
            </button>
            <button
              onClick={() => setActiveTab("mis-citas")}
              className={`px-8 py-3 rounded-md font-medium transition-all ${
                activeTab === "mis-citas"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Mis Citas
            </button>
          </div>
        </div>

        {validationError && (
          <div className="text-red-600 font-medium bg-red-100 p-2 rounded mb-2 text-center">
            {validationError}
          </div>
        )}


        {/* Content */}
        {activeTab === "nueva" ? (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-opacity ${
              !user ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {/* Left Column - Calendar and Time */}
            <div className="space-y-6">
              {/* Calendar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <CalendarIcon className="w-5 h-5 text-blue-700" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Selecciona una fecha</h3>
                  <div className="w-5"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Elige el día que prefieras para tu cita</p>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h4>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(day)}
                      disabled={!day.isAvailable}
                      className={`
                        w-10 h-10 text-sm rounded-lg transition-all
                        ${
                          !day.isCurrentMonth
                            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                            : day.isPast
                              ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              : day.isSelected
                                ? "bg-blue-700 text-white"
                                : day.isToday
                                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold"
                                  : "text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900"
                        }
                      `}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Times */}
              {selectedDate && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <Clock className="w-5 h-5 text-blue-700 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Horarios Disponibles</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Selecciona la hora que mejor te convenga</p>

                  <div className="grid grid-cols-2 gap-3">
                    {horarios.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`
                          p-3 rounded-lg border text-center font-medium transition-all
                          ${
                            selectedTime === time
                              ? "bg-blue-700 text-white border-blue-700"
                              : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-6">
                <User className="w-5 h-5 text-blue-700 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tus Datos</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Completa tus datos para reservar la cita</p>

              <div className="space-y-4">
                {/* Nombre completo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre y apellidos"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="Tu número de teléfono"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Tu correo electrónico"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Tipo de servicio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de servicio
                  </label>
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Selecciona un servicio</option>
                    {servicios.map((servicio) => (
                      <option key={servicio} value={servicio}>
                        {servicio}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notas adicionales */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notas adicionales
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="notas"
                      value={formData.notas}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Información adicional que quieras compartir"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !selectedDate || !selectedTime || !formData.servicio}
                  className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Confirmando..." : "Confirmar Cita"}
                </button>

              </div>
            </div>
          </div>
        ) : (
          /* Mis Citas Tab */
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mis Citas Programadas</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Gestiona tus citas existentes</p>

            {citas.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No tienes citas programadas</p>
                <button
                  onClick={() => setActiveTab("nueva")}
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Programar primera cita
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {citas.map((cita) => (
                  <div
                    key={cita.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{cita.servicio}</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {formatDate(cita.fecha)} - {cita.hora.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancelCita(cita.id)}
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Citas
