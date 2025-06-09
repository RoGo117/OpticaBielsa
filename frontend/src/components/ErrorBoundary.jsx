"use client"

import { Component } from "react"

// Componente para manejar errores en la aplicación, muestra una UI si ocurre un error cualquiera

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Actualizar el estado para que el siguiente renderizado muestre la UI alternativa
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Error capturado por ErrorBoundary:", error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI alternativa
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Algo salió mal</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página o contacta con soporte si el
              problema persiste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Recargar página
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Volver atrás
              </button>
            </div>
            {this.props.showDetails && this.state.error && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto max-h-64">
                <p className="font-mono text-sm text-red-600 dark:text-red-400">{this.state.error.toString()}</p>
                <pre className="mt-2 font-mono text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
