"use client"

import React, { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Textarea } from "../components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Badge } from "../components/badge"
import { Alert, AlertDescription } from "../components/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { HelpCircle, Send, CheckCircle, Clock, MessageSquare } from "lucide-react"

export default function Soporte({ userRole }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    priority: "media",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const mockTickets = [
    {
      id: "TKT-001",
      subject: "Error al generar reportes",
      description: "No puedo exportar los reportes a PDF",
      priority: "alta",
      status: "en revisión",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-21",
    },
    {
      id: "TKT-002",
      subject: "Consulta sobre configuración de puntos",
      description: "¿Cómo configuro puntos por categoría de producto?",
      priority: "media",
      status: "resuelto",
      createdAt: "2024-01-18",
      updatedAt: "2024-01-19",
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
    setFormData({ name: "", email: "", subject: "", description: "", priority: "media" })
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-orange-100 text-orange-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "resuelto":
        return "bg-green-100 text-green-800"
      case "en revisión":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "resuelto":
        return <CheckCircle className="h-4 w-4" />
      case "en revisión":
        return <MessageSquare className="h-4 w-4" />
      case "pendiente":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-primary" />
          Ayuda / Soporte
        </h1>
        <p className="text-muted-foreground mt-2">
          Obtén ayuda técnica y soporte para resolver cualquier problema o duda.
        </p>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Tu ticket de soporte ha sido enviado exitosamente. Recibirás una respuesta pronto.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="new-ticket" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-ticket">Nuevo Ticket</TabsTrigger>
          <TabsTrigger value="my-tickets">Mis Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="new-ticket" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Crear Ticket de Soporte
              </CardTitle>
              <CardDescription>
                Describe tu problema o consulta y nuestro equipo te ayudará lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo de Contacto *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Describe brevemente tu problema"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja - Consulta general</SelectItem>
                      <SelectItem value="media">Media - Problema funcional</SelectItem>
                      <SelectItem value="alta">Alta - Error crítico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción del Problema *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe detalladamente tu problema"
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto" size="lg">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Ticket
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">¿Cómo configuro las reglas de puntos?</h4>
                  <p className="text-sm text-muted-foreground">
                    Ve a Programas de Lealtad → Reglas de Puntos y configura la acumulación y canje según tus
                    necesidades.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">¿Puedo exportar los reportes?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sí, en la sección de Reportes puedes exportar todos los datos a CSV para análisis externos.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">¿Cómo agrego nuevos empleados?</h4>
                  <p className="text-sm text-muted-foreground">
                    En Gestión de Trabajadores puedes agregar empleados y asignarles roles específicos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Mis Tickets de Soporte
              </CardTitle>
              <CardDescription>Consulta el estado de tus solicitudes de soporte.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{ticket.subject}</h4>
                        <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Ticket: {ticket.id}</span>
                          <span>•</span>
                          <span>Creado: {ticket.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize">{ticket.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {mockTickets.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tienes tickets de soporte activos.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
