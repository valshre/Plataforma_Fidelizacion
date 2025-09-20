"use client"

import { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Badge } from "../components/badge"
import { Alert, AlertDescription } from "../components/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { Label } from "../components/label"
import { Shield, CheckCircle } from "lucide-react"

export function SuperAdmin() {
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data para comercios
  const mockBusinesses = [
    { id: "BIZ001", name: "Restaurante El Buen Sabor", email: "admin@elbuensabor.com", plan: "Profesional", expirationDate: "2024-03-15", status: "activo" },
    { id: "BIZ002", name: "Tienda Fashion Style", email: "admin@fashionstyle.com", plan: "Básico", expirationDate: "2024-02-28", status: "vencido" },
    { id: "BIZ003", name: "Farmacia San José", email: "admin@farmaciasanjose.com", plan: "Premium", expirationDate: "2024-04-20", status: "activo" },
  ]

  // Mock data para tickets
  const mockTickets = [
    { id: "TKT-001", businessName: "Restaurante El Buen Sabor", userEmail: "admin@elbuensabor.com", subject: "Error al generar reportes", description: "No puedo generar los reportes mensuales", priority: "alta", status: "pendiente" },
    { id: "TKT-002", businessName: "Tienda Fashion Style", userEmail: "gerente@fashionstyle.com", subject: "Consulta sobre puntos", description: "¿Cómo configurar reglas de puntos?", priority: "media", status: "en revisión" },
    { id: "TKT-003", businessName: "Farmacia San José", userEmail: "admin@farmaciasanjose.com", subject: "Problema con pagos", description: "Los pagos no se procesan correctamente", priority: "alta", status: "resuelto" },
  ]

  const handleBusinessAction = (action, businessId) => {
    console.log(`${action} business:`, businessId)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleTicketResolve = (ticketId) => {
    console.log("Resolving ticket:", ticketId)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "activo": return "bg-green-100 text-green-800"
      case "vencido": return "bg-red-100 text-red-800"
      case "pendiente": return "bg-orange-100 text-orange-800"
      case "en revisión": return "bg-blue-100 text-blue-800"
      case "resuelto": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta": return "bg-red-100 text-red-800"
      case "media": return "bg-orange-100 text-orange-800"
      case "baja": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBusinesses = mockBusinesses.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          Panel de Super Administrador
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestión completa de la plataforma de fidelización
        </p>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Acción realizada exitosamente.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="businesses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="businesses">Comercios</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="businesses">
          <Input
            placeholder="Buscar comercio..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map(b => (
                <TableRow key={b.id}>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.email}</TableCell>
                  <TableCell>{b.plan}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(b.status)}>{b.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleBusinessAction("Editar", b.id)}>Editar</Button>
                    <Button size="sm" onClick={() => handleBusinessAction("Eliminar", b.id)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="tickets">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Comercio</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTickets.map(t => (
                <TableRow key={t.id}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.businessName}</TableCell>
                  <TableCell>{t.userEmail}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(t.priority)}>{t.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(t.status)}>{t.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => setSelectedTicket(t)}>Ver</Button>
                    {t.status !== "resuelto" && (
                      <Button size="sm" onClick={() => handleTicketResolve(t.id)}>Resolver</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="users">
          <p>Sección de gestión de usuarios (puedes agregar tu tabla y botones aquí)</p>
        </TabsContent>
      </Tabs>

      {/* Modal para ver ticket */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Ticket {selectedTicket.id}</CardTitle>
              <CardDescription>{selectedTicket.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Comercio:</Label>
                <p>{selectedTicket.businessName}</p>
              </div>
              <div>
                <Label>Usuario:</Label>
                <p>{selectedTicket.userEmail}</p>
              </div>
              <div>
                <Label>Prioridad:</Label>
                <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
              </div>
              <div>
                <Label>Estado:</Label>
                <Badge className={getStatusColor(selectedTicket.status)}>{selectedTicket.status}</Badge>
              </div>
              <div className="mt-2">
                <Label>Descripción:</Label>
                <p>{selectedTicket.description}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setSelectedTicket(null)}>Cerrar</Button>
                {selectedTicket.status !== "resuelto" && (
                  <Button onClick={() => handleTicketResolve(selectedTicket.id)}>Marcar como Resuelto</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
