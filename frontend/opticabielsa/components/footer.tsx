import Link from "next/link"
import { Eye, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-blue-800 dark:text-blue-300" />
              <span className="text-xl font-bold text-blue-800 dark:text-blue-300">Óptica Bielsa</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Tu óptica de confianza con los mejores profesionales y la última tecnología para el cuidado de tu visión.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { name: "Inicio", href: "/" },
                { name: "Servicios", href: "/servicios" },
                { name: "Productos", href: "/productos" },
                { name: "Citas", href: "/citas" },
                { name: "Sobre Nosotros", href: "/nosotros" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Servicios</h3>
            <ul className="space-y-2">
              {[
                { name: "Examen Visual", href: "/servicios/examen-visual" },
                { name: "Adaptación de Lentes", href: "/servicios/lentes" },
                { name: "Gafas de Sol", href: "/productos/gafas-sol" },
                { name: "Lentes de Contacto", href: "/productos/lentes-contacto" },
                { name: "Salud Ocular", href: "/servicios/salud-ocular" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-800 dark:text-blue-300 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Calle Principal 123, 28001 Madrid</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-800 dark:text-blue-300" />
                <span className="text-gray-600 dark:text-gray-400">+34 91 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-800 dark:text-blue-300" />
                <span className="text-gray-600 dark:text-gray-400">info@opticabielsa.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Óptica Bielsa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
