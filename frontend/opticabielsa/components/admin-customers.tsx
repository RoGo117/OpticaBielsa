"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Edit, Trash2, Plus, User, Mail, Phone, Eye } from "lucide-react"

export default function AdminCustomers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState<any>(null)

  // Datos de ejemplo
  const customers = [
    {
      id: 1,
      name: "María García",
      email: "maria@example.com",
      phone: "612345678",
      lastVisit: "2023-05-10",
      appointments: 5,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      phone: "623456789",
      lastVisit: "2023-05-15",
      appointments: 3,
    },
    {
      id: 3,
      name: "Laura Martínez",
      email: "laura@example.com",
      phone: "634567890",
      lastVisit: "2023-05-20",
      appointments: 2,
    },
    {
      id: 4,
      name: "Javier López",
      email: "javier@example.com",
      phone: "645678901",
      lastVisit: "2023-05-25",
      appointments: 1,
    },
    {
      id: 5,
      name: "Ana Sánchez",
      email: "ana@example.com",
      phone: "656789012",
      lastVisit: "2023-05-30",
      appointments: 4,
    },
  ]

  const handleEditCustomer = (customer: any) => {
    setCurrentCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const handleViewCustomer = (customer: any) => {
    setCurrentCustomer(customer)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Clientes</CardTitle>
            <CardDescription>Administra la información de tus clientes</CardDescription>
          </div>
          <Button className="bg-blue-800 hover:bg-blue-700" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar clientes por nombre, email o teléfono..." className="pl-10" />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Última Visita</TableHead>
                  <TableHead>Citas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.lastVisit}</TableCell>
                    <TableCell>{customer.appointments}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleViewCustomer(customer)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleEditCustomer(customer)}>
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

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Cliente</DialogTitle>
            <DialogDescription>
              Completa los datos del nuevo cliente. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="customer-name" placeholder="Nombre y apellidos" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="customer-email" type="email" placeholder="email@ejemplo.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="customer-phone" placeholder="612345678" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-address">Dirección</Label>
              <Input id="customer-address" placeholder="Dirección completa" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-800 hover:bg-blue-700">Guardar Cliente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>Modifica los datos del cliente. Haz clic en guardar cuando termines.</DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-customer-name">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="edit-customer-name" defaultValue={currentCustomer.name} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-customer-email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="edit-customer-email" type="email" defaultValue={currentCustomer.email} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-customer-phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="edit-customer-phone" defaultValue={currentCustomer.phone} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-customer-address">Dirección</Label>
                <Input
                  id="edit-customer-address"
                  placeholder="Dirección completa"
                  defaultValue="Calle Ejemplo 123, 28001 Madrid"
                />
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

      {/* View Customer Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
            <DialogDescription>Información completa del cliente y su historial</DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</h3>
                  <p className="mt-1">{currentCustomer.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="mt-1">{currentCustomer.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</h3>
                  <p className="mt-1">{currentCustomer.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dirección</h3>
                  <p className="mt-1">Calle Ejemplo 123, 28001 Madrid</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Historial de Citas</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Servicio</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2023-05-10</TableCell>
                        <TableCell>Examen Visual</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Completada
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023-03-15</TableCell>
                        <TableCell>Adaptación Lentes</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Completada
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023-06-20</TableCell>
                        <TableCell>Revisión</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Pendiente
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Compras Recientes</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Precio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2023-05-10</TableCell>
                        <TableCell>Gafas Ray-Ban Aviator</TableCell>
                        <TableCell>149.99€</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023-03-15</TableCell>
                        <TableCell>Lentes de Contacto Mensuales</TableCell>
                        <TableCell>59.99€</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Cerrar
            </Button>
            <Button
              className="bg-blue-800 hover:bg-blue-700"
              onClick={() => {
                setIsViewDialogOpen(false)
                if (currentCustomer) handleEditCustomer(currentCustomer)
              }}
            >
              Editar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
