"use client"

import { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Textarea } from "../components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Switch } from "../components/switch"
import { Badge } from "../components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/dialog"
import { Star, Plus, Edit, Gift, Calendar, Target, CheckCircle, XCircle, Coins, Search, User } from "lucide-react"

export function Fidelizacion({ userRole }) {
  const [activeTab, setActiveTab] = useState("points")
  const [showPointRuleDialog, setShowPointRuleDialog] = useState(false)
  const [showRedemptionRuleDialog, setShowRedemptionRuleDialog] = useState(false)
  const [showPromotionDialog, setShowPromotionDialog] = useState(false)
  const [showBonusDialog, setShowBonusDialog] = useState(false)
  const [editingPointRule, setEditingPointRule] = useState(null)
  const [editingRedemptionRule, setEditingRedemptionRule] = useState(null)
  const [editingPromotion, setEditingPromotion] = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientSearch, setClientSearch] = useState("")

  const [pointRules, setPointRules] = useState([
    {
      id: "1",
      name: "Puntos por Compra",
      type: "amount",
      description: "1 punto por cada $10 gastados",
      pointsAwarded: 1,
      amountRequired: 10,
      active: true,
    },
    {
      id: "2",
      name: "Puntos por Asistencia",
      type: "attendance",
      description: "5 puntos por check-in diario",
      pointsAwarded: 5,
      active: true,
    },
    {
      id: "3",
      name: "Bonus Cumpleaños",
      type: "birthday",
      description: "50 puntos en el mes de cumpleaños",
      pointsAwarded: 50,
      active: true,
    },
  ])

  const [redemptionRules, setRedemptionRules] = useState([
    {
      id: "1",
      name: "Descuento 10%",
      pointsRequired: 100,
      rewardType: "discount",
      rewardValue: 10,
      dailyLimit: 1,
      expirationDays: 30,
      active: true,
    },
    {
      id: "2",
      name: "Producto Gratis",
      pointsRequired: 500,
      rewardType: "product",
      rewardValue: 1,
      monthlyLimit: 2,
      expirationDays: 60,
      active: true,
    },
  ])

  const [promotions, setPromotions] = useState([
    {
      id: "1",
      name: "Promoción Navideña",
      description: "20% de descuento en productos seleccionados",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      applicableProducts: ["producto1", "producto2"],
      applicableCategories: ["categoria1"],
      usageLimit: 1,
      active: true,
      type: "discount",
      value: 20,
    },
  ])

  const [bonuses, setBonuses] = useState([
    {
      id: "1",
      clientId: "client1",
      clientName: "Juan Pérez",
      pointsAwarded: 100,
      reason: "Cliente frecuente - compensación por inconveniente",
      date: "2024-01-15",
      appliedBy: "Admin Principal",
    },
  ])

  const [clients] = useState([
    { id: "client1", name: "Juan Pérez", email: "juan@email.com", points: 250 },
    { id: "client2", name: "María García", email: "maria@email.com", points: 180 },
    { id: "client3", name: "Carlos López", email: "carlos@email.com", points: 420 },
  ])

  const handleSavePointRule = (ruleData) => {
    if (editingPointRule) {
      setPointRules(pointRules.map((r) => (r.id === editingPointRule.id ? { ...r, ...ruleData } : r)))
    } else {
      const newRule = {
        id: Date.now().toString(),
        name: ruleData.name || "",
        type: ruleData.type || "amount",
        description: ruleData.description || "",
        pointsAwarded: ruleData.pointsAwarded || 0,
        amountRequired: ruleData.amountRequired,
        categoryId: ruleData.categoryId,
        active: ruleData.active ?? true,
      }
      setPointRules([...pointRules, newRule])
    }
    setShowPointRuleDialog(false)
    setEditingPointRule(null)
  }

  const handleSaveRedemptionRule = (ruleData) => {
    if (editingRedemptionRule) {
      setRedemptionRules(redemptionRules.map((r) => (r.id === editingRedemptionRule.id ? { ...r, ...ruleData } : r)))
    } else {
      const newRule = {
        id: Date.now().toString(),
        name: ruleData.name || "",
        pointsRequired: ruleData.pointsRequired || 0,
        rewardType: ruleData.rewardType || "discount",
        rewardValue: ruleData.rewardValue || 0,
        dailyLimit: ruleData.dailyLimit,
        monthlyLimit: ruleData.monthlyLimit,
        expirationDays: ruleData.expirationDays || 30,
        active: ruleData.active ?? true,
      }
      setRedemptionRules([...redemptionRules, newRule])
    }
    setShowRedemptionRuleDialog(false)
    setEditingRedemptionRule(null)
  }

  const handleSavePromotion = (promotionData) => {
    if (editingPromotion) {
      setPromotions(promotions.map((p) => (p.id === editingPromotion.id ? { ...p, ...promotionData } : p)))
    } else {
      const newPromotion = {
        id: Date.now().toString(),
        name: promotionData.name || "",
        description: promotionData.description || "",
        startDate: promotionData.startDate || "",
        endDate: promotionData.endDate || "",
        applicableProducts: promotionData.applicableProducts || [],
        applicableCategories: promotionData.applicableCategories || [],
        usageLimit: promotionData.usageLimit || 1,
        active: promotionData.active ?? true,
        type: promotionData.type || "discount",
        value: promotionData.value || 0,
      }
      setPromotions([...promotions, newPromotion])
    }
    setShowPromotionDialog(false)
    setEditingPromotion(null)
  }

  const handleGiveBonus = (clientId, points, reason) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      const newBonus = {
        id: Date.now().toString(),
        clientId,
        clientName: client.name,
        pointsAwarded: points,
        reason,
        date: new Date().toISOString().split("T")[0],
        appliedBy: "Admin Principal",
      }
      setBonuses([...bonuses, newBonus])
      // Update client points (in real app, this would be handled by backend)
      client.points += points
    }
    setShowBonusDialog(false)
    setSelectedClient(null)
  }

  const toggleRuleStatus = (id, type) => {
    if (type === "point") {
      setPointRules(pointRules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)))
    } else {
      setRedemptionRules(redemptionRules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)))
    }
  }

  const togglePromotionStatus = (id) => {
    setPromotions(promotions.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      client.email.toLowerCase().includes(clientSearch.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Programas de Lealtad y Promociones</h1>
          <p className="text-muted-foreground">
            Configura reglas de puntos, promociones y bonificaciones para tus clientes
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="points" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Reglas de Puntos
          </TabsTrigger>
          <TabsTrigger value="promotions" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Promociones
          </TabsTrigger>
          <TabsTrigger value="bonuses" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Bonificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="points" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Accumulation Rules */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Reglas de Acumulación
                  </CardTitle>
                  <CardDescription>Define cómo los clientes ganan puntos</CardDescription>
                </div>
                <Button onClick={() => setShowPointRuleDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Regla
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {pointRules.map((rule) => (
                  <Card key={rule.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{rule.name}</h4>
                            <Badge variant={rule.active ? "default" : "secondary"}>
                              {rule.active ? "Activa" : "Inactiva"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium text-primary">{rule.pointsAwarded} puntos</span>
                            {rule.amountRequired && ` por cada $${rule.amountRequired}`}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => toggleRuleStatus(rule.id, "point")}>
                            {rule.active ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingPointRule(rule)
                              setShowPointRuleDialog(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Redemption Rules */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Reglas de Canje
                  </CardTitle>
                  <CardDescription>Define cómo los clientes usan sus puntos</CardDescription>
                </div>
                <Button onClick={() => setShowRedemptionRuleDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Regla
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {redemptionRules.map((rule) => (
                  <Card key={rule.id} className="border-l-4 border-l-accent">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{rule.name}</h4>
                            <Badge variant={rule.active ? "default" : "secondary"}>
                              {rule.active ? "Activa" : "Inactiva"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-accent">{rule.pointsRequired} puntos</span>
                            {" → "}
                            {rule.rewardType === "discount" && `${rule.rewardValue}% descuento`}
                            {rule.rewardType === "product" && `${rule.rewardValue} producto gratis`}
                            {rule.rewardType === "service" && `${rule.rewardValue} servicio`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {rule.dailyLimit && `Límite diario: ${rule.dailyLimit} | `}
                            {rule.monthlyLimit && `Límite mensual: ${rule.monthlyLimit} | `}
                            Vigencia: {rule.expirationDays} días
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => toggleRuleStatus(rule.id, "redemption")}>
                            {rule.active ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingRedemptionRule(rule)
                              setShowRedemptionRuleDialog(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Campañas Promocionales</h2>
              <p className="text-muted-foreground">Crea promociones temporales para tus clientes</p>
            </div>
            <Button onClick={() => setShowPromotionDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Promoción
            </Button>
          </div>

          <div className="grid gap-4">
            {promotions.map((promotion) => (
              <Card key={promotion.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{promotion.name}</h3>
                        <Badge variant={promotion.active ? "default" : "secondary"}>
                          {promotion.active ? "Activa" : "Inactiva"}
                        </Badge>
                        <Badge variant="outline">
                          {promotion.type === "discount" && "Descuento"}
                          {promotion.type === "free_product" && "Producto Gratis"}
                          {promotion.type === "extra_points" && "Puntos Extra"}
                          {promotion.type === "combo" && "Combo"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{promotion.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {promotion.startDate} - {promotion.endDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          Límite: {promotion.usageLimit} uso(s) por cliente
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => togglePromotionStatus(promotion.id)}>
                        {promotion.active ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPromotion(promotion)
                          setShowPromotionDialog(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bonuses" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Bonificaciones Especiales</h2>
              <p className="text-muted-foreground">Otorga puntos extra a clientes en casos especiales</p>
            </div>
            <Button onClick={() => setShowBonusDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Dar Bonificación
            </Button>
          </div>

          <div className="grid gap-4">
            {bonuses.map((bonus) => (
              <Card key={bonus.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{bonus.clientName}</h3>
                        <Badge variant="default">+{bonus.pointsAwarded} puntos</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{bonus.reason}</p>
                      <div className="text-xs text-muted-foreground">
                        Aplicado por: {bonus.appliedBy} | Fecha: {bonus.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showPointRuleDialog} onOpenChange={setShowPointRuleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPointRule ? "Editar Regla de Puntos" : "Nueva Regla de Puntos"}</DialogTitle>
            <DialogDescription>Configura cómo los clientes acumulan puntos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rule-name">Nombre de la Regla</Label>
                <Input id="rule-name" defaultValue={editingPointRule?.name} />
              </div>
              <div>
                <Label htmlFor="rule-type">Tipo de Acumulación</Label>
                <Select defaultValue={editingPointRule?.type || "amount"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">Por monto gastado</SelectItem>
                    <SelectItem value="product_category">Por categoría de producto</SelectItem>
                    <SelectItem value="attendance">Por asistencia/check-in</SelectItem>
                    <SelectItem value="birthday">Por cumpleaños</SelectItem>
                    <SelectItem value="referral">Por referir cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="rule-description">Descripción</Label>
              <Textarea id="rule-description" defaultValue={editingPointRule?.description} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="points-awarded">Puntos Otorgados</Label>
                <Input id="points-awarded" type="number" defaultValue={editingPointRule?.pointsAwarded} />
              </div>
              <div>
                <Label htmlFor="amount-required">Monto Requerido ($)</Label>
                <Input id="amount-required" type="number" defaultValue={editingPointRule?.amountRequired} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="rule-active" defaultChecked={editingPointRule?.active ?? true} />
              <Label htmlFor="rule-active">Regla activa</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPointRuleDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => handleSavePointRule({})}>{editingPointRule ? "Actualizar" : "Crear"} Regla</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRedemptionRuleDialog} onOpenChange={setShowRedemptionRuleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRedemptionRule ? "Editar Regla de Canje" : "Nueva Regla de Canje"}</DialogTitle>
            <DialogDescription>Configura cómo los clientes pueden usar sus puntos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="redemption-name">Nombre de la Recompensa</Label>
                <Input id="redemption-name" defaultValue={editingRedemptionRule?.name} />
              </div>
              <div>
                <Label htmlFor="points-required">Puntos Requeridos</Label>
                <Input id="points-required" type="number" defaultValue={editingRedemptionRule?.pointsRequired} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reward-type">Tipo de Recompensa</Label>
                <Select defaultValue={editingRedemptionRule?.rewardType || "discount"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Descuento</SelectItem>
                    <SelectItem value="product">Producto</SelectItem>
                    <SelectItem value="service">Servicio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reward-value">Valor de la Recompensa</Label>
                <Input id="reward-value" type="number" defaultValue={editingRedemptionRule?.rewardValue} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="daily-limit">Límite Diario</Label>
                <Input id="daily-limit" type="number" defaultValue={editingRedemptionRule?.dailyLimit} />
              </div>
              <div>
                <Label htmlFor="monthly-limit">Límite Mensual</Label>
                <Input id="monthly-limit" type="number" defaultValue={editingRedemptionRule?.monthlyLimit} />
              </div>
              <div>
                <Label htmlFor="expiration-days">Días de Vigencia</Label>
                <Input id="expiration-days" type="number" defaultValue={editingRedemptionRule?.expirationDays} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="redemption-active" defaultChecked={editingRedemptionRule?.active ?? true} />
              <Label htmlFor="redemption-active">Regla activa</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRedemptionRuleDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => handleSaveRedemptionRule({})}>
                {editingRedemptionRule ? "Actualizar" : "Crear"} Regla
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPromotionDialog} onOpenChange={setShowPromotionDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPromotion ? "Editar Promoción" : "Nueva Promoción"}</DialogTitle>
            <DialogDescription>Configura una campaña promocional temporal</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promo-name">Nombre de la Promoción</Label>
                <Input id="promo-name" defaultValue={editingPromotion?.name} />
              </div>
              <div>
                <Label htmlFor="promo-type">Tipo de Promoción</Label>
                <Select defaultValue={editingPromotion?.type || "discount"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Descuento</SelectItem>
                    <SelectItem value="free_product">Producto Gratis</SelectItem>
                    <SelectItem value="extra_points">Puntos Extra</SelectItem>
                    <SelectItem value="combo">Combo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="promo-description">Descripción</Label>
              <Textarea id="promo-description" defaultValue={editingPromotion?.description} />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start-date">Fecha de Inicio</Label>
                <Input id="start-date" type="date" defaultValue={editingPromotion?.startDate} />
              </div>
              <div>
                <Label htmlFor="end-date">Fecha de Fin</Label>
                <Input id="end-date" type="date" defaultValue={editingPromotion?.endDate} />
              </div>
              <div>
                <Label htmlFor="usage-limit">Límite de Uso por Cliente</Label>
                <Input id="usage-limit" type="number" defaultValue={editingPromotion?.usageLimit} />
              </div>
            </div>
            <div>
              <Label htmlFor="applicable-products">Productos Aplicables (separados por coma)</Label>
              <Input
                id="applicable-products"
                defaultValue={editingPromotion?.applicableProducts?.join(", ")}
                placeholder="producto1, producto2, producto3"
              />
            </div>
            <div>
              <Label htmlFor="applicable-categories">Categorías Aplicables (separados por coma)</Label>
              <Input
                id="applicable-categories"
                defaultValue={editingPromotion?.applicableCategories?.join(", ")}
                placeholder="categoria1, categoria2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="promo-active" defaultChecked={editingPromotion?.active ?? true} />
              <Label htmlFor="promo-active">Promoción activa</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPromotionDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => handleSavePromotion({})}>
                {editingPromotion ? "Actualizar" : "Crear"} Promoción
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBonusDialog} onOpenChange={setShowBonusDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Dar Bonificación Especial</DialogTitle>
            <DialogDescription>Otorga puntos extra a un cliente específico</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="client-search">Buscar Cliente</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="client-search"
                  placeholder="Buscar por nombre or email..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {clientSearch && (
              <div className="max-h-32 overflow-y-auto border rounded-md">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setSelectedClient(client)
                      setClientSearch(client.name)
                    }}
                  >
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {client.email} • {client.points} puntos
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedClient && (
              <>
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{selectedClient.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Puntos actuales: {selectedClient.points}</div>
                </div>
                <div>
                  <Label htmlFor="bonus-points">Puntos a Otorgar</Label>
                  <Input id="bonus-points" type="number" placeholder="Ej: 100" />
                </div>
                <div>
                  <Label htmlFor="bonus-reason">Motivo de la Bonificación</Label>
                  <Textarea id="bonus-reason" placeholder="Ej: Cliente frecuente - compensación por inconveniente" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowBonusDialog(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      const pointsInput = document.getElementById("bonus-points")
                      const reasonInput = document.getElementById("bonus-reason")
                      const points = Number.parseInt(pointsInput?.value || "0")
                      const reason = reasonInput?.value || ""
                      if (points > 0 && reason.trim()) {
                        handleGiveBonus(selectedClient.id, points, reason)
                      }
                    }}
                  >
                    Otorgar Puntos
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}