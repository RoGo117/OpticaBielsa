import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock } from "lucide-react"
import AppointmentForm from "@/components/appointment-form"

export default function CitasPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Gestión de Citas</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Reserva una cita con nuestros especialistas para recibir la mejor atención personalizada
          </p>
        </div>

        <Tabs defaultValue="nueva-cita" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="nueva-cita">Nueva Cita</TabsTrigger>
            <TabsTrigger value="mis-citas">Mis Citas</TabsTrigger>
          </TabsList>

          <TabsContent value="nueva-cita" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-blue-800 dark:text-blue-300" />
                    Selecciona una fecha
                  </CardTitle>
                  <CardDescription>Elige el día que prefieras para tu cita</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" className="rounded-md border" />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-800 dark:text-blue-300" />
                      Horarios Disponibles
                    </CardTitle>
                    <CardDescription>Selecciona la hora que mejor te convenga</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {["09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"].map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          className="justify-start hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <AppointmentForm />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mis-citas">
            <Card>
              <CardHeader>
                <CardTitle>Mis Citas Programadas</CardTitle>
                <CardDescription>Gestiona tus citas existentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "15 Junio 2023", time: "10:30", type: "Examen Visual" },
                    { date: "22 Julio 2023", time: "16:00", type: "Adaptación Lentes de Contacto" },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <CalendarIcon className="h-5 w-5 text-blue-800 dark:text-blue-300" />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.type}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {appointment.date} - {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Modificar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
