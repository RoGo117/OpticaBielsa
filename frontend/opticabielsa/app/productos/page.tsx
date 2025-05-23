import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function ProductosPage() {
  const products = [
    {
      id: 1,
      name: "Gafas Ray-Ban Aviator",
      price: 149.99,
      category: "gafas",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Gafas Oakley Holbrook",
      price: 129.99,
      category: "gafas",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Lentes de Contacto Diarias",
      price: 39.99,
      category: "lentes",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Lentes de Contacto Mensuales",
      price: 59.99,
      category: "lentes",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Gafas de Sol Polarizadas",
      price: 89.99,
      category: "gafas",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Solución para Lentes",
      price: 12.99,
      category: "accesorios",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      name: "Estuche para Gafas",
      price: 19.99,
      category: "accesorios",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      name: "Gafas Progresivas",
      price: 199.99,
      category: "gafas",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nuestros Productos</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Descubre nuestra amplia selección de productos ópticos de alta calidad
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-64 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-800 dark:text-blue-300" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="search" placeholder="Buscar productos..." className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categorías</Label>
                <div className="space-y-2">
                  {["Todas", "Gafas", "Lentes de Contacto", "Gafas de Sol", "Accesorios"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={category}
                        className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800"
                      />
                      <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rango de Precio</Label>
                <Slider defaultValue={[200]} max={300} step={1} />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>0€</span>
                  <span>300€</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Marcas</Label>
                <div className="space-y-2">
                  {["Ray-Ban", "Oakley", "Prada", "Gucci", "Armani"].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={brand}
                        className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800"
                      />
                      <Label htmlFor={brand} className="text-sm font-normal cursor-pointer">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-blue-800 hover:bg-blue-700">Aplicar Filtros</Button>
            </CardContent>
          </Card>
        </div>

        {/* Productos */}
        <div className="flex-1">
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-4 mb-8">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="gafas">Gafas</TabsTrigger>
              <TabsTrigger value="lentes">Lentes</TabsTrigger>
              <TabsTrigger value="accesorios">Accesorios</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>Calidad y estilo garantizados</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <span className="font-bold text-blue-800 dark:text-blue-300">{product.price.toFixed(2)}€</span>
                      <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Añadir
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gafas" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === "gafas")
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>Calidad y estilo garantizados</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <span className="font-bold text-blue-800 dark:text-blue-300">{product.price.toFixed(2)}€</span>
                        <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Añadir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="lentes" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === "lentes")
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>Calidad y estilo garantizados</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <span className="font-bold text-blue-800 dark:text-blue-300">{product.price.toFixed(2)}€</span>
                        <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Añadir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="accesorios" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((p) => p.category === "accesorios")
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>Calidad y estilo garantizados</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <span className="font-bold text-blue-800 dark:text-blue-300">{product.price.toFixed(2)}€</span>
                        <Button size="sm" className="bg-blue-800 hover:bg-blue-700">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Añadir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
