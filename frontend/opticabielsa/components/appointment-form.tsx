"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Phone, Mail, MessageSquare } from "lucide-react"

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al backend
    console.log("Datos del formulario:", formData)
    alert("Cita solicitada con éxito. Recibirás un correo de confirmación.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-800 dark:text-blue-300" />
          Tus Datos
        </CardTitle>
        <CardDescription>Completa tus datos para reservar la cita</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                placeholder="Tu nombre y apellidos"
                className="pl-10"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                name="phone"
                placeholder="Tu número de teléfono"
                className="pl-10"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Tu correo electrónico"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">Tipo de servicio</Label>
            <Select value={formData.serviceType} onValueChange={handleSelectChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="examen-visual">Examen Visual Completo</SelectItem>
                <SelectItem value="lentes-contacto">Adaptación de Lentes de Contacto</SelectItem>
                <SelectItem value="gafas">Asesoramiento para Gafas</SelectItem>
                <SelectItem value="revision">Revisión de Seguimiento</SelectItem>
                <SelectItem value="otro">Otro Servicio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="notes"
                name="notes"
                placeholder="Información adicional que quieras compartir"
                className="pl-10 min-h-[100px]"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
            Confirmar Cita
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
