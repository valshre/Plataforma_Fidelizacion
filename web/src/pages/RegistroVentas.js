import React, { useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Alert, AlertDescription } from "../components/alert";
import { Badge } from "../components/badge";
import { ShoppingCart, User, DollarSign, Star, CheckCircle, AlertCircle, Receipt } from "lucide-react";

export function RegistroVentas({ userRole }) {
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const mockCustomers = [
    { id: "CL001", name: "Juan Pérez", email: "juan@email.com", currentPoints: 150 },
    { id: "CL002", name: "María García", email: "maria@email.com", currentPoints: 320 },
    { id: "CL003", name: "Carlos López", email: "carlos@email.com", currentPoints: 89 },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!customerId.trim()) newErrors.customerId = "El ID del cliente es obligatorio";
    if (!amount.trim()) newErrors.amount = "El monto es obligatorio";
    else if (isNaN(Number(amount)) || Number(amount) <= 0) newErrors.amount = "El monto debe ser un número positivo";
    if (!ticketId.trim()) newErrors.ticketId = "El ID del ticket es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePoints = (saleAmount) => {
    const basePoints = Math.floor(saleAmount / 10);
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
    const promotionMultiplier = isWeekend ? 2 : 1;
    return basePoints * promotionMultiplier;
  };

  const processSale = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const customer = mockCustomers.find((c) => c.id.toLowerCase() === customerId.toLowerCase());
    if (!customer) {
      setResult({ success: false, error: "Cliente no encontrado. Verifique el ID e intente nuevamente." });
      setIsProcessing(false);
      return;
    }

    const saleAmount = Number(amount);
    const pointsEarned = calculatePoints(saleAmount);
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;

    const promotionsApplied = isWeekend ? ["Doble puntos fin de semana"] : [];
    const bonificationsApplied = customer.currentPoints > 200 ? ["Cliente VIP - 10% puntos extra"] : [];
    const finalPoints = bonificationsApplied.length > 0 ? Math.floor(pointsEarned * 1.1) : pointsEarned;

    setResult({
      success: true,
      customer: { ...customer, currentPoints: customer.currentPoints + finalPoints },
      sale: { amount: saleAmount, pointsEarned: finalPoints, promotionsApplied, bonificationsApplied, ticketId },
    });

    setIsProcessing(false);
  };

  const resetForm = () => {
    setCustomerId("");
    setAmount("");
    setTicketId("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-primary" />
          Registrar Consumo / Venta
        </h1>
        <p className="text-muted-foreground mt-2">
          Registra las ventas de tus clientes y otorga puntos automáticamente según las reglas configuradas.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulario de Registro */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" /> Datos de la Venta
            </CardTitle>
            <CardDescription>
              Ingresa el ID del cliente, ID del ticket y el monto consumido para procesar la venta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer ID */}
            <div className="space-y-2">
              <Label htmlFor="customerId" className="text-base font-medium">ID del Cliente *</Label>
              <Input
                id="customerId"
                placeholder="Ej: CL001"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className={`h-12 text-lg ${errors.customerId ? "border-destructive" : ""}`}
                disabled={isProcessing}
              />
              {errors.customerId && <p className="text-sm text-destructive">{errors.customerId}</p>}
            </div>

            {/* Ticket ID */}
            <div className="space-y-2">
              <Label htmlFor="ticketId" className="text-base font-medium">ID del Ticket *</Label>
              <Input
                id="ticketId"
                placeholder="Ej: TKT001"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className={`h-12 text-lg ${errors.ticketId ? "border-destructive" : ""}`}
                disabled={isProcessing}
              />
              {errors.ticketId && <p className="text-sm text-destructive">{errors.ticketId}</p>}
            </div>

            {/* Monto */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-base font-medium">Monto Consumido ($) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`h-12 text-lg ${errors.amount ? "border-destructive" : ""}`}
                disabled={isProcessing}
                min="0"
                step="0.01"
              />
              {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button onClick={processSale} disabled={isProcessing} className="flex-1 h-12 text-lg" size="lg">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" /> Registrar Venta
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetForm} disabled={isProcessing} className="h-12 bg-transparent" size="lg">
                Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumen de la operación */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result?.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : result?.error ? (
                <AlertCircle className="h-5 w-5 text-destructive" />
              ) : (
                <Star className="h-5 w-5" />
              )}
              Resumen de la Operación
            </CardTitle>
            <CardDescription>{result ? "Resultado del procesamiento" : "Aquí aparecerá el resumen de la venta"}</CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-8 text-muted-foreground">
                <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Complete el formulario y presione "Registrar Venta" para ver el resumen.</p>
              </div>
            ) : result.success ? (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">¡Venta registrada exitosamente!</AlertDescription>
                </Alert>
                {/* Detalles del cliente */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><User className="h-4 w-4" /> Cliente Identificado</h4>
                  <p><strong>ID:</strong> {result.customer?.id}</p>
                  <p><strong>Nombre:</strong> {result.customer?.name}</p>
                  <p><strong>Email:</strong> {result.customer?.email}</p>
                </div>
                {/* Detalles de venta */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Detalles de la Venta</h4>
                  <p><strong>Monto:</strong> ${result.sale?.amount.toFixed(2)}</p>
                  <p><strong>Ticket:</strong> {result.sale?.ticketId}</p>
                </div>
                {/* Puntos */}
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Puntos Otorgados</h4>
                  <div className="text-2xl font-bold text-primary mb-2">+{result.sale?.pointsEarned} puntos</div>
                  <p className="text-sm text-muted-foreground">Saldo actual: {result.customer?.currentPoints} puntos</p>
                </div>
                {/* Promociones */}
                {result.sale?.promotionsApplied?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Promociones Aplicadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.sale.promotionsApplied.map((promo, idx) => (
                        <Badge key={idx} variant="secondary">{promo}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {/* Bonificaciones */}
                {result.sale?.bonificationsApplied?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Bonificaciones Aplicadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.sale.bonificationsApplied.map((bonus, idx) => (
                        <Badge key={idx} variant="outline" className="border-green-500 text-green-700">{bonus}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{result.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
