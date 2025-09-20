"use client"

import React, { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { ArrowLeft, Store, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../components/alert"

export function BusinessRegistration({ onBack }) {
  const [formData, setFormData] = useState({
    nombre: "",
    nombreAdministrador: "",
    rfc: "",
    direccion: "",
    telefono: "",
    correo: "",
    plan: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [consent, setConsent] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre del comercio es requerido"
    if (!formData.nombreAdministrador.trim()) newErrors.nombreAdministrador = "El nombre del administrador es requerido"

    if (!formData.rfc.trim()) newErrors.rfc = "El RFC es requerido"
    else if (!/^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$/.test(formData.rfc.toUpperCase())) newErrors.rfc = "Formato de RFC inválido"

    if (!formData.direccion.trim()) newErrors.direccion = "La dirección es requerida"

    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido"
    else if (!/^[0-9]{10}$/.test(formData.telefono.replace(/\D/g, ""))) newErrors.telefono = "El teléfono debe tener 10 dígitos"

    if (!formData.correo.trim()) newErrors.correo = "El correo Gmail es requerido"
    else if (!/@gmail\.com$/.test(formData.correo.toLowerCase())) newErrors.correo = "Debe ser una dirección de Gmail válida"

    if (!formData.plan) newErrors.plan = "Debe seleccionar un plan"

    if (!consent) newErrors.consent = "Debe aceptar el aviso de privacidad"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simular registro
    setIsSubmitting(false)
    setShowSuccess(true)

    setTimeout(() => onBack(), 3000)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">¡Registro Exitoso!</h2>
            <p className="text-muted-foreground mb-4">
              Su comercio ha sido registrado correctamente. Se ha creado su cuenta de Administrador Principal.
            </p>
            <p className="text-sm text-muted-foreground">Redirigiendo al inicio...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Registro de Comercio</h1>
                <p className="text-muted-foreground">Complete la información de su negocio</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información del Comercio</CardTitle>
              <CardDescription>
                Todos los campos son obligatorios. El usuario registrado se convertirá en Administrador Principal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos de formulario */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del Comercio *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      className={errors.nombre ? "border-destructive" : ""}
                      placeholder="Ej: Mi Tienda"
                    />
                    {errors.nombre && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.nombre}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nombreAdministrador">Nombre del Administrador *</Label>
                    <Input
                      id="nombreAdministrador"
                      value={formData.nombreAdministrador}
                      onChange={(e) => handleInputChange("nombreAdministrador", e.target.value)}
                      className={errors.nombreAdministrador ? "border-destructive" : ""}
                      placeholder="Ej: Juan Pérez García"
                    />
                    {errors.nombreAdministrador && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.nombreAdministrador}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rfc">RFC *</Label>
                    <Input
                      id="rfc"
                      value={formData.rfc}
                      onChange={(e) => handleInputChange("rfc", e.target.value.toUpperCase())}
                      className={errors.rfc ? "border-destructive" : ""}
                      placeholder="Ej: ABC123456XYZ"
                      maxLength={13}
                    />
                    {errors.rfc && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.rfc}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      className={errors.telefono ? "border-destructive" : ""}
                      placeholder="Ej: 5512345678"
                      maxLength={10}
                    />
                    {errors.telefono && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.telefono}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección *</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                    className={errors.direccion ? "border-destructive" : ""}
                    placeholder="Ej: Av. Principal 123, Col. Centro, Ciudad, CP 12345"
                  />
                  {errors.direccion && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.direccion}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo Gmail del Administrador *</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={formData.correo}
                      onChange={(e) => handleInputChange("correo", e.target.value.toLowerCase())}
                      className={errors.correo ? "border-destructive" : ""}
                      placeholder="admin@gmail.com"
                    />
                    {errors.correo && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.correo}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan de Suscripción *</Label>
                    <Select value={formData.plan} onValueChange={(value) => handleInputChange("plan", value)}>
                      <SelectTrigger className={errors.plan ? "border-destructive" : ""}>
                        <SelectValue placeholder="Seleccione un plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basico">Básico - $299/mes</SelectItem>
                        <SelectItem value="profesional">Profesional - $599/mes</SelectItem>
                        <SelectItem value="empresarial">Empresarial - $999/mes</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.plan && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {errors.plan}
                      </p>
                    )}
                  </div>
                </div>

                {/* Aviso de privacidad */}
                <div className="flex items-start space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-foreground">
                    He leído y acepto el{" "}
                    <a
                      href="/aviso-privacidad"
                      target="_blank"
                      className="text-primary underline"
                    >
                      aviso de privacidad
                    </a>{" "}
                    y doy mi consentimiento para el tratamiento de mis datos personales para los fines indicados. Puedo revocar este consentimiento en cualquier momento.
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> {errors.consent}
                  </p>
                )}

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Al registrarse, usted se convertirá automáticamente en el <strong>Administrador Principal</strong>{" "}
                    del comercio y podrá gestionar empleados, sucursales y clientes.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12 bg-transparent">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !consent} className="flex-1 h-12">
                    {isSubmitting ? "Registrando..." : "Registrar Comercio"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
