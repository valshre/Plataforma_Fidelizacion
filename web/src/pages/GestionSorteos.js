"use client"

import React, { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Textarea } from "../components/textarea"
import { Badge } from "../components/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog"
import { Calendar, Gift, Users, Trophy, Plus, Edit, Power, Eye } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function GestionSorteos({ userRole }) {
  const [raffles, setRaffles] = useState([
    {
      id: "1",
      name: "Sorteo Navideño 2024",
      description: "Gran sorteo navideño con increíbles premios para nuestros clientes más fieles",
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-25"),
      prizes: ["iPhone 15", "Tablet Samsung", "Auriculares Sony"],
      rules: "Mínimo 500 puntos para participar. Un boleto por cada 100 puntos adicionales.",
      status: "active",
      participants: 234,
    },
    {
      id: "2",
      name: "Sorteo Fin de Año",
      description: "Celebra el año nuevo con nosotros y gana increíbles premios",
      startDate: new Date("2024-12-26"),
      endDate: new Date("2025-01-15"),
      prizes: ['Smart TV 55"', "Consola PlayStation 5"],
      rules: "Mínimo 1000 puntos para participar.",
      status: "inactive",
      participants: 0,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRaffle, setEditingRaffle] = useState(null)
  const [showParticipants, setShowParticipants] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    prizes: "",
    rules: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const newRaffle = {
      id: editingRaffle?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      prizes: formData.prizes.split(",").map((p) => p.trim()),
      rules: formData.rules,
      status: "inactive",
      participants: editingRaffle?.participants || 0,
    }

    if (editingRaffle) {
      setRaffles(raffles.map((r) => (r.id === editingRaffle.id ? { ...newRaffle, status: editingRaffle.status } : r)))
    } else {
      setRaffles([...raffles, newRaffle])
    }

    setFormData({ name: "", description: "", startDate: "", endDate: "", prizes: "", rules: "" })
    setEditingRaffle(null)
    setIsDialogOpen(false)
  }

  const toggleRaffleStatus = (id) => {
    setRaffles(
      raffles.map((raffle) =>
        raffle.id === id ? { ...raffle, status: raffle.status === "active" ? "inactive" : "active" } : raffle,
      ),
    )
  }

  const editRaffle = (raffle) => {
    setEditingRaffle(raffle)
    setFormData({
      name: raffle.name,
      description: raffle.description,
      startDate: format(raffle.startDate, "yyyy-MM-dd"),
      endDate: format(raffle.endDate, "yyyy-MM-dd"),
      prizes: raffle.prizes.join(", "),
      rules: raffle.rules,
    })
    setIsDialogOpen(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "finished":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "finished":
        return "Finalizado"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Sorteos</h1>
          <p className="text-muted-foreground">Crea y administra sorteos para tus clientes</p>
        </div>

        {(userRole === "Administrador" || userRole === "Gerente") && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Sorteo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingRaffle ? "Editar Sorteo" : "Crear Nuevo Sorteo"}</DialogTitle>
                <DialogDescription>
                  {editingRaffle
                    ? "Modifica los datos del sorteo"
                    : "Completa la información para crear un nuevo sorteo"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Sorteo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Sorteo Navideño 2024"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prizes">Premios (separados por comas) *</Label>
                    <Input
                      id="prizes"
                      value={formData.prizes}
                      onChange={(e) => setFormData({ ...formData, prizes: e.target.value })}
                      placeholder="iPhone 15, Tablet, Auriculares"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe el sorteo y sus características principales"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de Inicio *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha de Fin *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">Reglas del Sorteo *</Label>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                    placeholder="Define las reglas de participación, requisitos mínimos, etc."
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingRaffle ? "Actualizar Sorteo" : "Crear Sorteo"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6">
        {raffles.map((raffle) => (
          <Card key={raffle.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{raffle.name}</CardTitle>
                    <Badge className={getStatusColor(raffle.status)}>{getStatusText(raffle.status)}</Badge>
                  </div>
                  <CardDescription>{raffle.description}</CardDescription>
                </div>

                {(userRole === "Administrador" || userRole === "Gerente") && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => editRaffle(raffle)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRaffleStatus(raffle.id)}
                      className={raffle.status === "active" ? "text-red-600" : "text-green-600"}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">Período</div>
                    <div className="text-muted-foreground">
                      {format(raffle.startDate, "dd/MM/yyyy", { locale: es })} -{" "}
                      {format(raffle.endDate, "dd/MM/yyyy", { locale: es })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">Participantes</div>
                    <div className="text-muted-foreground">{raffle.participants} inscritos</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">Premios</div>
                    <div className="text-muted-foreground">{raffle.prizes.length} premio(s)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium text-sm">Premios:</div>
                <div className="flex flex-wrap gap-2">
                  {raffle.prizes.map((prize, index) => (
                    <Badge key={index} variant="secondary">
                      {prize}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium text-sm">Reglas:</div>
                <p className="text-sm text-muted-foreground">{raffle.rules}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowParticipants(raffle.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Participantes
                </Button>
                {raffle.status === "finished" && (
                  <Button variant="outline" size="sm">
                    <Trophy className="h-4 w-4 mr-2" />
                    Ver Ganador
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {raffles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay sorteos creados</h3>
            <p className="text-muted-foreground mb-4">
              Crea tu primer sorteo para comenzar a premiar a tus clientes más fieles
            </p>
            {(userRole === "Administrador" || userRole === "Gerente") && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primer Sorteo
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
