"use client"

import { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Switch } from "../components/switch"
import { Badge } from "../components/badge"
import { Alert, AlertDescription } from "../components/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table"
import { UserPlus, Gift, Users, CheckCircle, Copy, Eye } from "lucide-react"

export default function Referencias({ userRole }) {
  const [rules, setRules] = useState({
    inviterPoints: 100,
    inviteePoints: 50,
    hasLimit: false,
    maxReferrals: 10,
  })
  const [isActive, setIsActive] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock data
  const mockReferrals = [
    {
      id: "REF001",
      inviterName: "Juan Pérez",
      inviterEmail: "juan@email.com",
      inviteeName: "María García",
      inviteeEmail: "maria@email.com",
      referralCode: "JUAN2024",
      status: "Completado",
      pointsAwarded: 150,
      date: "2024-01-15",
    },
    {
      id: "REF002",
      inviterName: "Carlos López",
      inviterEmail: "carlos@email.com",
      inviteeName: "Ana Rodríguez",
      inviteeEmail: "ana@email.com",
      referralCode: "CARLOS2024",
      status: "Pendiente",
      pointsAwarded: 0,
      date: "2024-01-20",
    },
  ]

  const handleSaveRules = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const generateReferralCode = (customerName) => {
    return `${customerName.toUpperCase().replace(/\s+/g, "")}${new Date().getFullYear()}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <UserPlus className="h-8 w-8 text-primary" />
          Programa de Referidos
        </h1>
        <p className="text-muted-foreground mt-2">
          Configura las reglas del programa de referidos y consulta el historial de invitaciones.
        </p>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Configuración del programa de referidos guardada exitosamente.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Configuración</TabsTrigger>
          <TabsTrigger value="history">Historial de Referidos</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Configuración del Programa
              </CardTitle>
              <CardDescription>
                Define las reglas y límites del programa de referidos para tus clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Estado del Programa</h4>
                  <p className="text-sm text-muted-foreground">
                    {isActive ? "El programa está activo" : "El programa está desactivado"}
                  </p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="inviterPoints">Puntos para el Invitador</Label>
                  <Input
                    id="inviterPoints"
                    type="number"
                    value={rules.inviterPoints}
                    onChange={(e) => setRules({ ...rules, inviterPoints: Number(e.target.value) })}
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Puntos que recibe quien invita cuando el invitado hace su primera compra
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inviteePoints">Puntos para el Invitado</Label>
                  <Input
                    id="inviteePoints"
                    type="number"
                    value={rules.inviteePoints}
                    onChange={(e) => setRules({ ...rules, inviteePoints: Number(e.target.value) })}
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">Puntos que recibe el invitado en su primera compra</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasLimit"
                    checked={rules.hasLimit}
                    onCheckedChange={(checked) => setRules({ ...rules, hasLimit: checked })}
                  />
                  <Label htmlFor="hasLimit">Establecer límite de referidos por cliente</Label>
                </div>

                {rules.hasLimit && (
                  <div className="space-y-2">
                    <Label htmlFor="maxReferrals">Máximo de referidos por cliente</Label>
                    <Input
                      id="maxReferrals"
                      type="number"
                      value={rules.maxReferrals}
                      onChange={(e) => setRules({ ...rules, maxReferrals: Number(e.target.value) })}
                      min="1"
                      className="max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveRules} className="w-full md:w-auto">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cómo Funciona el Programa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Generación de Código</h4>
                    <p className="text-sm text-muted-foreground">
                      Cada cliente registrado puede generar un código único desde su perfil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Registro con Código</h4>
                    <p className="text-sm text-muted-foreground">
                      El invitado se registra en la plataforma ingresando el código de referido
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Primera Compra</h4>
                    <p className="text-sm text-muted-foreground">
                      Al realizar la primera compra, ambos reciben puntos automáticamente
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Historial de Referidos
              </CardTitle>
              <CardDescription>Consulta todas las invitaciones realizadas y su estado actual.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-sm text-muted-foreground">Total Referidos</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <div className="text-sm text-muted-foreground">Completados</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">6</div>
                    <div className="text-sm text-muted-foreground">Pendientes</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invitador</TableHead>
                        <TableHead>Invitado</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Puntos</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReferrals.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{referral.inviterName}</div>
                              <div className="text-sm text-muted-foreground">{referral.inviterEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{referral.inviteeName}</div>
                              <div className="text-sm text-muted-foreground">{referral.inviteeEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="bg-muted px-2 py-1 rounded text-sm">{referral.referralCode}</code>
                              <Button variant="ghost" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={referral.status === "Completado" ? "default" : "secondary"}
                              className={
                                referral.status === "Completado"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {referral.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {referral.pointsAwarded > 0 ? `+${referral.pointsAwarded}` : "-"}
                            </span>
                          </TableCell>
                          <TableCell>{referral.date}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
