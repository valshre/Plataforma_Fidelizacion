'use client'

import { useState, useEffect } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import {
  LayoutDashboard, Users, Building2, UserCheck, LogOut, Menu, X,
  Gift, BarChart3, Palette, Star, ShoppingCart, UserPlus, CreditCard,
  HelpCircle, Megaphone, Shield
} from "lucide-react"

import { GestionTrabajadores } from "./GestionTrabajadores"
import { GestionClientes } from "./GestionClientes"
import { Fidelizacion } from "./Fidelizacion"
import { RegistroVentas } from "./RegistroVentas"
import { Reportes } from "./Reportes"
import GestionSorteos from "./GestionSorteos"
import Personalizacion from "./Personalizacion"
import Marketing from "./Marketing"
import { GestionSucursales } from "./GestionSucursales"
import PagoSub from "./PagoSub"
import Soporte from "./Soporte"
import Referencias from "./Referencias"
import { SuperAdmin } from "./SuperAdmin"
import MiPerfil from "./MiPerfil"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

// Registro de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

// Datos simulados para gráficos
const mockStats = {
  sales: [1200, 1500, 900, 1800, 2000, 1700, 2100],
  clientes: [30, 40, 25, 50, 60, 55, 70],
  sucursales: ["Sucursal A", "Sucursal B", "Sucursal C"]
}

// Card reutilizable
function DashboardCard({ icon: Icon, title, description, onClick }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onClick}>Acceder</Button>
      </CardContent>
    </Card>
  )
}

export function Dashboard({ userRole, userEmail, onLogout }) {
  const [currentView, setCurrentView] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isSuperAdmin = userEmail === "super@gmail.com"

  // Map de vistas
  const views = {
    profile: MiPerfil,
    sales: RegistroVentas,
    workers: GestionTrabajadores,
    branches: GestionSucursales,
    customers: GestionClientes,
    loyalty: Fidelizacion,
    marketing: Marketing,
    reports: Reportes,
    raffles: GestionSorteos,
    referrals: Referencias,
    branding: Personalizacion,
    subscription: PagoSub,
    support: Soporte,
    superadmin: SuperAdmin
  }

  const CurrentComponent = views[currentView]

  // Cards que se muestran en dashboard principal
  const mainCards = ["profile", "reports", "support"]
  const cardDescriptions = {
    profile: "Ver y gestionar tu información y privacidad",
    reports: "Analiza datos y genera reportes",
    support: "Obtén ayuda y soporte técnico",
  }

  // Estadísticas
  const stats = isSuperAdmin
    ? [
        { label: "Comercios Activos", value: 156, color: "text-primary" },
        { label: "Clientes Totales", value: 45678, color: "text-accent" },
        { label: "Tickets Pendientes", value: 23, color: "text-secondary" },
        { label: "Ingresos Mensuales", value: "$125,450", color: "text-green-600" }
      ]
    : [
        { label: "Clientes Activos", value: 1234, color: "text-primary" },
        { label: "Empleados", value: 15, color: "text-accent" },
        { label: "Sucursales", value: 12, color: "text-secondary" },
        { label: "Sorteos Activos", value: 3, color: "text-green-600" }
      ]

  const renderOverview = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Panel Principal</h1>
      <p className="text-muted-foreground">Bienvenido, {userRole}. Gestiona la plataforma desde aquí.</p>

      {/* Estadísticas rápidas */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="text-center p-4 bg-muted/50 rounded-lg">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Última Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                datasets: [{ label: "Ventas ($)", data: mockStats.sales, backgroundColor: "rgba(34,197,94,0.7)" }]
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes por Sucursal</CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut
              data={{
                labels: mockStats.sucursales,
                datasets: [{ label: "Clientes", data: [50, 70, 40], backgroundColor: ["#3B82F6", "#F59E0B", "#EF4444"] }]
              }}
              options={{ responsive: true }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Cards principales */}
      <div className="grid md:grid-cols-3 gap-6">
        {mainCards.map(id => {
          const iconMap = { profile: Users, reports: BarChart3, support: HelpCircle }
          return (
            <DashboardCard
              key={id}
              icon={iconMap[id]}
              title={id === "profile" ? "Mi Perfil" : id === "reports" ? "Reportes" : "Soporte"}
              description={cardDescriptions[id]}
              onClick={() => setCurrentView(id)}
            />
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Botón móvil */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar completo */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <h2 className="text-xl font-bold text-sidebar-foreground">Sistema Fidelización</h2>
            <p className="text-sm text-sidebar-foreground/70 mt-1">{userRole}</p>
            <p className="text-xs text-sidebar-foreground/50 mt-1">{userEmail}</p>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {Object.entries({
              overview: { label: "Inicio", icon: LayoutDashboard },
              profile: { label: "Mi Perfil", icon: Users },
              sales: { label: "Registrar Venta", icon: ShoppingCart },
              workers: { label: "Trabajadores", icon: Users },
              branches: { label: "Sucursales", icon: Building2 },
              customers: { label: "Clientes", icon: UserCheck },
              loyalty: { label: "Programas de Lealtad", icon: Star },
              referrals: { label: "Referidos", icon: UserPlus },
              raffles: { label: "Sorteos", icon: Gift },
              reports: { label: "Reportes", icon: BarChart3 },
              branding: { label: "Personalización", icon: Palette },
              marketing: { label: "Marketing", icon: Megaphone },
              subscription: { label: "Mi Suscripción", icon: CreditCard },
              support: { label: "Soporte", icon: HelpCircle },
              superadmin: { label: "Super Admin", icon: Shield }
            }).map(([id, item]) => {
              const isActive = currentView === id
              const Icon = item.icon
              return (
                <Button
                  key={id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 text-left ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"}`}
                  onClick={() => { setCurrentView(id); setSidebarOpen(false) }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Button variant="outline" className="w-full justify-start h-12 bg-transparent" onClick={onLogout}>
              <LogOut className="h-5 w-5 mr-3" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:ml-64 p-6 lg:p-8">
        {currentView === "overview" ? renderOverview() : <CurrentComponent userRole={userRole} />}
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
