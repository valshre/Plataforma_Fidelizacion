// login.js
"use client"

import React, { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { ArrowLeft, LogIn, AlertCircle } from "lucide-react"

export function Login({ onLogin, onBack }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = "El correo Gmail es requerido"
    } else if (!/@gmail\.com$/.test(formData.email.toLowerCase())) {
      newErrors.email = "Debe ser una dirección de Gmail válida"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let role = "Administrador"
    if (formData.email.toLowerCase() === "super@gmail.com") role = "Super Administrador"
    else if (formData.email.includes("gerente")) role = "Gerente"
    else if (formData.email.includes("lider")) role = "Líder de Área"

    setIsSubmitting(false)
    onLogin(role, formData.email.toLowerCase())
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <LogIn className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Iniciar Sesión</h1>
              <p className="text-muted-foreground">Accede a tu cuenta</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Bienvenido de vuelta</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Gmail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value.toLowerCase())}
                  className={errors.email ? "border-destructive" : ""}
                  placeholder="usuario@gmail.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? "border-destructive" : ""}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg" size="lg">
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center text-sm text-muted-foreground">
              <strong>Cuentas de prueba:</strong>
              <br />
              admin@gmail.com - Administrador
              <br />
              gerente@gmail.com - Gerente
              <br />
              lider@gmail.com - Líder de Área
              <br />
              super@gmail.com - Super Administrador
              <br />
              <em>Contraseña: 123456</em>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
