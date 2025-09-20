"use client"

import { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Badge } from "../components/badge"
import { Alert, AlertDescription } from "../components/alert"
import { RadioGroup, RadioGroupItem } from "../components/radio-group"
import { Label } from "../components/label"
import { CreditCard, Calendar, CheckCircle, AlertCircle, Download, Shield } from "lucide-react"

export default function PagosSub({ userRole }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock subscription data
  const subscription = {
    planName: "Plan Profesional",
    cost: 299,
    expirationDate: "2024-03-15",
    status: "vigente",
    features: [
      "Hasta 5,000 clientes",
      "Reportes avanzados",
      "Soporte prioritario",
      "Personalización de marca",
      "API integrations",
    ],
  }

  const paymentMethods = [
    { id: "card", label: "Tarjeta de Crédito/Débito", icon: CreditCard },
    { id: "paypal", label: "PayPal", icon: Shield },
    { id: "transfer", label: "Transferencia Bancaria", icon: Calendar },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const downloadReceipt = () => {
    const link = document.createElement("a")
    link.href = "#"
    link.download = `comprobante-pago-${Date.now()}.pdf`
    link.click()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "vigente":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-orange-100 text-orange-800"
      case "vencido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "vigente":
        return <CheckCircle className="h-4 w-4" />
      case "pendiente":
      case "vencido":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-primary" />
          Mi Suscripción / Pagos
        </h1>
        <p className="text-muted-foreground mt-2">Gestiona tu suscripción, realiza pagos y descarga comprobantes.</p>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            ¡Pago procesado exitosamente! Tu suscripción ha sido renovada.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Plan Actual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Plan Actual
            </CardTitle>
            <CardDescription>Información de tu suscripción activa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{subscription.planName}</h3>
                <p className="text-2xl font-bold text-primary">${subscription.cost}/mes</p>
              </div>
              <Badge className={getStatusColor(subscription.status)}>
                {getStatusIcon(subscription.status)}
                <span className="ml-1 capitalize">{subscription.status}</span>
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Vence:</strong> {subscription.expirationDate}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Características incluidas:</h4>
              <ul className="space-y-1">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="outline" onClick={downloadReceipt} className="w-full bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Descargar Último Comprobante
            </Button>
          </CardContent>
        </Card>

        {/* Renovar Suscripción */}
        <Card>
          <CardHeader>
            <CardTitle>Renovar Suscripción</CardTitle>
            <CardDescription>Selecciona tu método de pago preferido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Método de Pago</Label>
              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer flex-1">
                        <Icon className="h-5 w-5" />
                        {method.label}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Resumen del Pago</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Plan Profesional (1 mes)</span>
                  <span>${subscription.cost}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (16%)</span>
                  <span>${(subscription.cost * 0.16).toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(subscription.cost * 1.16).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button onClick={handlePayment} disabled={isProcessing} className="w-full h-12" size="lg">
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Procesando Pago...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Renovar Suscripción
                </>
              )}
            </Button>

            {selectedPaymentMethod === "transfer" && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Para transferencia bancaria, recibirás los datos de la cuenta por correo electrónico.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historial de Pagos */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>Últimos pagos realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "2024-02-15", amount: 346.84, method: "Tarjeta ****1234", status: "Completado" },
              { date: "2024-01-15", amount: 346.84, method: "PayPal", status: "Completado" },
              { date: "2023-12-15", amount: 346.84, method: "Tarjeta ****1234", status: "Completado" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{payment.date}</div>
                  <div className="text-sm text-muted-foreground">{payment.method}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${payment.amount}</div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {payment.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={downloadReceipt}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
