'use client'

import { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent } from "../components/card"
import { Input } from "../components/input"
import { Badge } from "../components/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/dialog"
import { Search, Eye, UserX, Mail, Phone, MapPin, Star, Gift, Calendar, TrendingUp } from "lucide-react"

export function GestionClientes({ userRole }) {
  const [customers, setCustomers] = useState([
    {
      id: "1",
      nombre: "Ana",
      apellidos: "García López",
      correo: "ana.garcia@gmail.com",
      telefono: "5512345678",
      direccion: "Av. Principal 123, Col. Centro",
      puntos: 2500,
      nivel: "Oro",
      activo: true,
      fechaRegistro: "2024-01-15",
      ultimaVisita: "2024-03-20",
      totalCompras: 15750,
    },
    {
      id: "2",
      nombre: "Carlos",
      apellidos: "Rodríguez Martín",
      correo: "carlos.rodriguez@gmail.com",
      telefono: "5587654321",
      direccion: "Calle Norte 456, Col. Residencial",
      puntos: 850,
      nivel: "Plata",
      activo: true,
      fechaRegistro: "2024-02-20",
      ultimaVisita: "2024-03-18",
      totalCompras: 8500,
    },
    {
      id: "3",
      nombre: "María",
      apellidos: "López Hernández",
      correo: "maria.lopez@gmail.com",
      telefono: "5511223344",
      direccion: "Av. Sur 789, Col. Industrial",
      puntos: 150,
      nivel: "Bronce",
      activo: false,
      fechaRegistro: "2024-03-10",
      ultimaVisita: "2024-03-15",
      totalCompras: 1500,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showHistory, setShowHistory] = useState(false)

  // Datos simulados del historial
  const customerHistory = [
    {
      id: "1",
      fecha: "2024-03-20",
      tipo: "Compra",
      puntos: 150,
      descripcion: "Compra en Sucursal Centro - $1,500",
    },
    {
      id: "2",
      fecha: "2024-03-15",
      tipo: "Canje",
      puntos: -500,
      descripcion: "Canje: Descuento 20% en próxima compra",
    },
    {
      id: "3",
      fecha: "2024-03-10",
      tipo: "Bonificación",
      puntos: 200,
      descripcion: "Bonificación por cumpleaños",
    },
    {
      id: "4",
      fecha: "2024-03-05",
      tipo: "Compra",
      puntos: 300,
      descripcion: "Compra en Sucursal Norte - $3,000",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.telefono.includes(searchTerm),
  )

  const handleDeactivate = (customerId) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId ? { ...customer, activo: !customer.activo } : customer
      )
    )
  }

  const handleViewHistory = (customer) => {
    setSelectedCustomer(customer)
    setShowHistory(true)
  }

  const getLevelBadgeColor = (nivel) => {
    switch (nivel) {
      case "Platino":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Oro":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Plata":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Bronce":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTransactionIcon = (tipo) => {
    switch (tipo) {
      case "Compra":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "Canje":
        return <Gift className="h-4 w-4 text-blue-500" />
      case "Bonificación":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>
        <p className="text-muted-foreground">Consulta información de clientes, historial de puntos y promociones</p>
      </div>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {customers.filter((c) => c.activo).length}
              </div>
              <div className="text-sm text-muted-foreground">Clientes Activos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {customers.reduce((sum, c) => sum + c.puntos, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Puntos Totales</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                ${customers.reduce((sum, c) => sum + c.totalCompras, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Ventas Totales</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {customers.filter((c) => c.nivel === "Oro" || c.nivel === "Platino").length}
              </div>
              <div className="text-sm text-muted-foreground">Clientes VIP</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, apellidos, correo o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de clientes */}
      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className={`${!customer.activo ? "opacity-60" : ""}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {customer.nombre} {customer.apellidos}
                    </h3>
                    <Badge className={getLevelBadgeColor(customer.nivel)}>{customer.nivel}</Badge>
                    {!customer.activo && <Badge variant="destructive">Inactivo</Badge>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {customer.correo}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {customer.telefono}
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin className="h-4 w-4" />
                      {customer.direccion}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-primary text-lg">{customer.puntos.toLocaleString()}</div>
                      <div className="text-muted-foreground">Puntos</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-accent text-lg">${customer.totalCompras.toLocaleString()}</div>
                      <div className="text-muted-foreground">Total Compras</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-secondary text-lg">
                        {new Date(customer.ultimaVisita).toLocaleDateString("es-MX")}
                      </div>
                      <div className="text-muted-foreground">Última Visita</div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    Cliente desde: {new Date(customer.fechaRegistro).toLocaleDateString("es-MX")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewHistory(customer)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Historial
                  </Button>
                  <Button
                    variant={customer.activo ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleDeactivate(customer.id)}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    {customer.activo ? "Dar de Baja" : "Reactivar"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No se encontraron clientes que coincidan con la búsqueda"
                  : "No hay clientes registrados"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de historial */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Historial de {selectedCustomer?.nombre} {selectedCustomer?.apellidos}
            </DialogTitle>
            <DialogDescription>
              Historial completo de puntos, compras y promociones
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Resumen del cliente */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedCustomer.puntos.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Puntos Actuales</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <Badge className={getLevelBadgeColor(selectedCustomer.nivel)}>{selectedCustomer.nivel}</Badge>
                      <div className="text-sm text-muted-foreground mt-2">Nivel Actual</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        ${selectedCustomer.totalCompras.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Gastado</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Historial de transacciones */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Historial de Transacciones</h3>
                <div className="space-y-3">
                  {customerHistory.map((transaction) => (
                    <Card key={transaction.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getTransactionIcon(transaction.tipo)}
                            <div>
                              <div className="font-medium text-foreground">{transaction.descripcion}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(transaction.fecha).toLocaleDateString("es-MX")}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`font-semibold ${transaction.puntos > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {transaction.puntos > 0 ? "+" : ""}
                            {transaction.puntos} pts
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
