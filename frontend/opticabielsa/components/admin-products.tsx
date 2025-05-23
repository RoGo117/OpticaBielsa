"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Edit, Trash2, Plus, ImageIcon, Tag } from "lucide-react"
import Image from "next/image"

export default function AdminProducts() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)

  // Datos de ejemplo
  const products = [
    {
      id: 1,
      name: "Gafas Ray-Ban Aviator",
      category: "Gafas",
      price: 149.99,
      stock: 15,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Gafas Oakley Holbrook",
      category: "Gafas",
      price: 129.99,
      stock: 8,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Lentes de Contacto Diarias",
      category: "Lentes",
      price: 39.99,
      stock: 50,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Lentes de Contacto Mensuales",
      category: "Lentes",
      price: 59.99,
      stock: 30,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 5,
      name: "Gafas de Sol Polarizadas",
      category: "Gafas",
      price: 89.99,
      stock: 12,
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Productos</CardTitle>
            <CardDescription>Administra el catálogo de productos y servicios</CardDescription>
          </div>
          <Button className="bg-blue-800 hover:bg-blue-700" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar productos..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="glasses">Gafas</SelectItem>
                <SelectItem value="lenses">Lentes de Contacto</SelectItem>
                <SelectItem value="accessories">Accesorios</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toFixed(2)}€</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Producto</DialogTitle>
            <DialogDescription>
              Completa los detalles del nuevo producto. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Nombre del Producto</Label>
                <Input id="product-name" placeholder="Nombre del producto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="glasses">Gafas</SelectItem>
                    <SelectItem value="sunglasses">Gafas de Sol</SelectItem>
                    <SelectItem value="lenses">Lentes de Contacto</SelectItem>
                    <SelectItem value="accessories">Accesorios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Precio (€)</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="product-price" type="number" step="0.01" placeholder="0.00" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-stock">Stock</Label>
                  <Input id="product-stock" type="number" placeholder="0" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-image">Imagen del Producto</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <Button variant="outline" size="sm">
                      Seleccionar Imagen
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Descripción</Label>
                <Textarea id="product-description" placeholder="Descripción del producto" className="min-h-[120px]" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-800 hover:bg-blue-700">Guardar Producto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
              Modifica los detalles del producto. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-name">Nombre del Producto</Label>
                  <Input id="edit-product-name" defaultValue={currentProduct.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-category">Categoría</Label>
                  <Select defaultValue={currentProduct.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gafas">Gafas</SelectItem>
                      <SelectItem value="lentes">Lentes de Contacto</SelectItem>
                      <SelectItem value="accesorios">Accesorios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-product-price">Precio (€)</Label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="edit-product-price"
                        type="number"
                        step="0.01"
                        defaultValue={currentProduct.price}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-product-stock">Stock</Label>
                    <Input id="edit-product-stock" type="number" defaultValue={currentProduct.stock} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-image">Imagen del Producto</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image
                          src={currentProduct.image || "/placeholder.svg"}
                          alt={currentProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Cambiar Imagen
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-description">Descripción</Label>
                  <Textarea
                    id="edit-product-description"
                    placeholder="Descripción del producto"
                    className="min-h-[120px]"
                    defaultValue="Descripción detallada del producto con todas sus características y beneficios."
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-800 hover:bg-blue-700">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
