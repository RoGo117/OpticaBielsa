"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Search, CalendarIcon, Clock, Edit, Trash2, Plus } from "lucide-react"

export default function AdminAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState<any>(null)

  // Datos de ejemplo
  const appointments = [
    {
      id: 1,
      client: "María García",
      service: "Examen Visual",
      date: "2023-06-15",
      time: "10:30",
      status: "Confirmada",
    },
    {
      id: 2,
      client: "Carlos Rodríguez",
      service: "Adaptación Lentes",
      date: "2023-06-15",
      time: "12:00",
      status: "Pendiente",
    },
    { id: 3, client: "Laura Martínez", service: "Revisión", date: "2023-06-15", time: "16:30", status: "Confirmada" },
    {
      id: 4,
      client: "Javier López",
      service: "Examen Visual",
      date: "2023-06-16",
      time: "09:00",
      status: "Confirmada",
    },
    { id: 5, client: "Ana Sánchez", service: "Gafas de Sol", date: "2023-06-16", time: "11:30", status: "Pendiente" },
  ]

  const handleEditAppointment = (appointment: any) => {
    setCurrentAppointment(appointment)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-80">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>Selecciona una fecha para ver las citas</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Citas del Día</CardTitle>
                <CardDescription>
                  {selectedDate
                    ? selectedDate.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Selecciona una fecha"}
                </CardDescription>
              </div>
              <Button className="bg-blue-800 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cita
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar citas o clientes..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="confirmed">Confirmadas</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="cancelled">Canceladas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.client}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === "Confirmada"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEditAppointment(appointment)}>
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
        </div>
      </div>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Cita</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la cita. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          {currentAppointment && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Input id="client" defaultValue={currentAppointment.client} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Servicio</Label>
                <Select defaultValue={currentAppointment.service.toLowerCase().replace(" ", "-")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="examen-visual">Examen Visual</SelectItem>
                    <SelectItem value="adaptacion-lentes">Adaptación Lentes</SelectItem>
                    <SelectItem value="revision">Revisión</SelectItem>
                    <SelectItem value="gafas-sol">Gafas de Sol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="date" defaultValue={currentAppointment.date} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="time" defaultValue={currentAppointment.time} className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select defaultValue={currentAppointment.status.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
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
