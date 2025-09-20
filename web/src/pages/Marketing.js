"use client"

import { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Textarea } from "../components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Badge } from "../components/badge"
import { Alert, AlertDescription } from "../components/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { Megaphone, Plus, Eye, Edit, Trash2, CheckCircle, Users, BarChart3 } from "lucide-react"

export default function Marketing({ userRole }) {
  const [showForm, setShowForm] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    targetAudience: "todos",
  })

  const mockCampaigns = [
    {
      id: "CAMP001",
      name: "Promoción Verano 2024",
      description: "Doble puntos en todas las compras durante el verano",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      targetAudience: "Todos los clientes",
      status: "activa",
      views: 1250,
      participations: 340,
    },
    {
      id: "CAMP002",
      name: "Clientes VIP Especial",
      description: "Descuentos exclusivos para clientes con más de 500 puntos",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      targetAudience: "Clientes con 500+ puntos",
      status: "finalizada",
      views: 890,
      participations: 156,
    },
  ]

  const targetAudienceOptions = [
    { value: "todos", label: "Todos los clientes registrados" },
    { value: "puntos-altos", label: "Clientes con más de 200 puntos" },
    { value: "puntos-medios", label: "Clientes con 50-200 puntos" },
    { value: "inactivos", label: "Clientes inactivos (sin compras en 30 días)" },
    { value: "nuevos", label: "Clientes registrados en los últimos 30 días" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setShowSuccess(true)
    setShowForm(false)
    setEditingCampaign(null)
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      targetAudience: "todos",
    })

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign)
    setFormData({
      name: campaign.name,
      description: campaign.description,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      targetAudience: campaign.targetAudience.toLowerCase().replace(/\s+/g, "-"),
    })
    setShowForm(true)
  }

  const handleDelete = (campaignId) => {
    console.log("Deleting campaign:", campaignId)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "activa":
        return "bg-green-100 text-green-800"
      case "programada":
        return "bg-blue-100 text-blue-800"
      case "finalizada":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Megaphone className="h-8 w-8 text-primary" />
          Marketing y Campañas
        </h1>
        <p className="text-muted-foreground mt-2">Crea y gestiona campañas de marketing dirigidas a tus clientes.</p>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Campaña {editingCampaign ? "actualizada" : "creada"} exitosamente.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="campaigns">Mis Campañas</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Campañas Activas</h2>
              <p className="text-muted-foreground">Gestiona tus campañas de marketing</p>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Campaña
            </Button>
          </div>

          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingCampaign ? "Editar Campaña" : "Nueva Campaña"}</CardTitle>
                <CardDescription>
                  {editingCampaign ? "Modifica los datos de la campaña" : "Crea una nueva campaña de marketing"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre de la Campaña *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetAudience">Público Objetivo *</Label>
                      <Select
                        value={formData.targetAudience}
                        onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {targetAudienceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción Corta *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe brevemente la campaña"
                      rows={3}
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
                    <Label htmlFor="image">Imagen o Banner (Opcional)</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    <p className="text-sm text-muted-foreground">
                      Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 2MB
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {editingCampaign ? "Actualizar" : "Crear"} Campaña
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false)
                        setEditingCampaign(null)
                        setFormData({
                          name: "",
                          description: "",
                          startDate: "",
                          endDate: "",
                          targetAudience: "todos",
                        })
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Lista de Campañas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaña</TableHead>
                      <TableHead>Público Objetivo</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Visualizaciones</TableHead>
                      <TableHead>Participaciones</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">{campaign.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{campaign.targetAudience}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{campaign.startDate}</div>
                            <div className="text-muted-foreground">a {campaign.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            {campaign.views}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {campaign.participations}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(campaign)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(campaign.id)}>
                              <Trash2 className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analíticas de Campañas
              </CardTitle>
              <CardDescription>Métricas de rendimiento de tus campañas de marketing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Campañas Totales</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-muted-foreground">Campañas Activas</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2,140</div>
                  <div className="text-sm text-muted-foreground">Total Visualizaciones</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">496</div>
                  <div className="text-sm text-muted-foreground">Total Participaciones</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Rendimiento por Campaña</h4>
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{campaign.name}</h5>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Visualizaciones:</span>
                        <span className="ml-2 font-medium">{campaign.views}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Participaciones:</span>
                        <span className="ml-2 font-medium">{campaign.participations}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tasa de conversión:</span>
                        <span className="ml-2 font-medium">
                          {((campaign.participations / campaign.views) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}