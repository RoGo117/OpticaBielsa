import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Calendar, ShoppingBag, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-800 to-blue-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Óptica Bielsa</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Cuidamos tu visión con la última tecnología y los mejores profesionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                <Link href="/citas">Pedir Cita</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                <Link href="/productos">Ver Productos</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Óptica Bielsa"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios ópticos para cuidar de tu salud visual
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-blue-800 dark:text-blue-300" />
              </div>
              <CardTitle>Examen Visual Completo</CardTitle>
              <CardDescription>Evaluación profesional de tu salud visual</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Nuestros optometristas realizan un examen completo para detectar problemas visuales y recomendar la
                mejor solución.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-blue-800 dark:text-blue-300 p-0 hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-100"
              >
                <span>Más información</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-blue-800 dark:text-blue-300" />
              </div>
              <CardTitle>Gafas y Lentes</CardTitle>
              <CardDescription>Amplio catálogo de monturas y lentes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Disponemos de las mejores marcas y los diseños más actuales para que encuentres las gafas perfectas para
                ti.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-blue-800 dark:text-blue-300 p-0 hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-100"
              >
                <span>Más información</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-800 dark:text-blue-300" />
              </div>
              <CardTitle>Citas Personalizadas</CardTitle>
              <CardDescription>Atención personalizada según tus necesidades</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Reserva una cita con nuestros especialistas para recibir atención personalizada y resolver todas tus
                dudas.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-blue-800 dark:text-blue-300 p-0 hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-100"
              >
                <span>Más información</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Productos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubre nuestra selección de productos de alta calidad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                  <Image
                    src={`/placeholder.svg?height=200&width=300`}
                    alt={`Producto ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Gafas Modelo {item}</CardTitle>
                  <CardDescription>Diseño moderno y cómodo</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <span className="font-bold text-blue-800 dark:text-blue-300">€{item * 50 + 49}.99</span>
                  <Button size="sm">Ver detalles</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-blue-800 hover:bg-blue-700">
              <Link href="/productos">Ver todos los productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "María García",
              text: "Excelente atención y profesionalidad. Me ayudaron a encontrar las gafas perfectas para mi rostro y necesidades visuales.",
            },
            {
              name: "Carlos Rodríguez",
              text: "El sistema de citas online es muy cómodo y el personal es muy amable. Recomiendo totalmente Óptica Bielsa.",
            },
            {
              name: "Laura Martínez",
              text: "Gracias al examen visual completo, detectaron un problema que no sabía que tenía. Ahora veo perfectamente con mis nuevas lentes.",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-800 dark:text-blue-300" />
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para cuidar tu salud visual?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Reserva una cita hoy mismo y déjanos cuidar de tus ojos con la última tecnología y los mejores
            profesionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
              <Link href="/citas">Pedir Cita</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              <Link href="/contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
