import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, ShoppingBag, Eye } from "lucide-react"
import AdminAppointments from "@/components/admin-appointments"
import AdminProducts from "@/components/admin-products"
import AdminCustomers from "@/components/admin-customers"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Panel de Administración</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Gestiona citas, productos, servicios y clientes</p>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-blue-800 dark:text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">+2 respecto a ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Totales</CardTitle>
              <Users className="h-4 w-4 text-blue-800 dark:text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">+8% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Mensuales</CardTitle>
              <ShoppingBag className="h-4 w-4 text-blue-800 dark:text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€24,560</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">+12% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
              <Eye className="h-4 w-4 text-blue-800 dark:text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">+3 nuevos esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="citas" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="citas">
              <Calendar className="h-4 w-4 mr-2" />
              Citas
            </TabsTrigger>
            <TabsTrigger value="productos">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="clientes">
              <Users className="h-4 w-4 mr-2" />
              Clientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citas" className="mt-0">
            <AdminAppointments />
          </TabsContent>

          <TabsContent value="productos" className="mt-0">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="clientes" className="mt-0">
            <AdminCustomers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
