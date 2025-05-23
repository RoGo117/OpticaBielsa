"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Eye, Calendar, ShoppingBag, User, UserCog } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-800 dark:text-blue-300" />
            <span className="text-xl font-bold text-blue-800 dark:text-blue-300">Óptica Bielsa</span>
          </Link>
        </div>

        {isMobile ? (
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/servicios"
                    className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <Eye className="h-5 w-5" />
                    Servicios
                  </Link>
                  <Link
                    href="/citas"
                    className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="h-5 w-5" />
                    Citas
                  </Link>
                  <Link
                    href="/productos"
                    className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Productos
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserCog className="h-5 w-5" />
                    Administración
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Inicio</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {[
                        {
                          title: "Examen Visual",
                          href: "/servicios/examen-visual",
                          description: "Evaluación completa de tu salud visual",
                          icon: <Eye className="h-5 w-5" />,
                        },
                        {
                          title: "Adaptación de Lentes",
                          href: "/servicios/lentes",
                          description: "Lentes de contacto y gafas personalizadas",
                          icon: <Eye className="h-5 w-5" />,
                        },
                        {
                          title: "Tratamientos Especiales",
                          href: "/servicios/tratamientos",
                          description: "Soluciones para problemas visuales específicos",
                          icon: <Eye className="h-5 w-5" />,
                        },
                        {
                          title: "Salud Ocular",
                          href: "/servicios/salud-ocular",
                          description: "Prevención y cuidado de enfermedades oculares",
                          icon: <Eye className="h-5 w-5" />,
                        },
                      ].map((service) => (
                        <li key={service.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="flex select-none flex-col gap-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2">
                                {service.icon}
                                <span className="text-sm font-medium">{service.title}</span>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/citas" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Citas</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/productos" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Productos</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button asChild variant="outline">
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Link>
              </Button>
              <Button asChild className="bg-blue-800 hover:bg-blue-700">
                <Link href="/citas">Pedir Cita</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
