"use client"

import { useState } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Badge } from "../components/badge"
import { Upload, Palette, Eye, Save, RotateCcw } from "lucide-react"

export default function Personalizacion({ userRole }) {
  const [brandSettings, setBrandSettings] = useState({
    logo: null,
    primaryColor: "#3b82f6",
    secondaryColor: "#22c55e",
    accentColor: "#f59e0b",
    coverImage: null,
    companyName: "Mi Empresa",
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setBrandSettings({ ...brandSettings, logo: file })
      const reader = new FileReader()
      reader.onload = (e) => setLogoPreview(e.target?.result)
      reader.readAsDataURL(file)
    }
  }

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setBrandSettings({ ...brandSettings, coverImage: file })
      const reader = new FileReader()
      reader.onload = (e) => setCoverPreview(e.target?.result)
      reader.readAsDataURL(file)
    }
  }

  const handleColorChange = (colorType, color) => {
    setBrandSettings({ ...brandSettings, [colorType]: color })
  }

  const handleSave = () => {
    console.log("Guardando configuración de marca:", brandSettings)
  }

  const handleReset = () => {
    setBrandSettings({
      logo: null,
      primaryColor: "#3b82f6",
      secondaryColor: "#22c55e",
      accentColor: "#f59e0b",
      coverImage: null,
      companyName: "Mi Empresa",
    })
    setLogoPreview(null)
    setCoverPreview(null)
  }

  const colorPresets = [
    { name: "Azul Corporativo", primary: "#3b82f6", secondary: "#1e40af", accent: "#60a5fa" },
    { name: "Verde Natura", primary: "#22c55e", secondary: "#16a34a", accent: "#4ade80" },
    { name: "Naranja Energía", primary: "#f59e0b", secondary: "#d97706", accent: "#fbbf24" },
    { name: "Púrpura Premium", primary: "#8b5cf6", secondary: "#7c3aed", accent: "#a78bfa" },
    { name: "Rosa Moderno", primary: "#ec4899", secondary: "#db2777", accent: "#f472b6" },
    { name: "Gris Elegante", primary: "#6b7280", secondary: "#4b5563", accent: "#9ca3af" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Personalización de Marca</h1>
          <p className="text-muted-foreground">Customiza la apariencia de tu programa de fidelización</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Editar" : "Vista Previa"}
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuración */}
        <div className="space-y-6">
          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Logotipo
              </CardTitle>
              <CardDescription>Sube el logo de tu empresa (formato PNG, JPG, SVG)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center relative">
                {logoPreview ? (
                  <div className="space-y-4">
                    <img src={logoPreview || "/placeholder.svg"} alt="Logo preview" className="max-h-20 mx-auto" />
                    <p className="text-sm text-muted-foreground">Logo cargado correctamente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-sm font-medium">Arrastra tu logo aquí o haz clic para seleccionar</p>
                      <p className="text-xs text-muted-foreground">Tamaño recomendado: 200x80px</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Colores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Colores de Marca
              </CardTitle>
              <CardDescription>Define la paleta de colores de tu aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {/* Color Primario */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="primaryColor">Color Primario</Label>
                    <p className="text-xs text-muted-foreground">Color principal de botones y destacados</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border" style={{ backgroundColor: brandSettings.primaryColor }} />
                    <Input
                      id="primaryColor"
                      type="color"
                      value={brandSettings.primaryColor}
                      onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                      className="w-16 h-8 p-0 border-0"
                    />
                  </div>
                </div>

                {/* Color Secundario */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="secondaryColor">Color Secundario</Label>
                    <p className="text-xs text-muted-foreground">Color para elementos de apoyo</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border" style={{ backgroundColor: brandSettings.secondaryColor }} />
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={brandSettings.secondaryColor}
                      onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                      className="w-16 h-8 p-0 border-0"
                    />
                  </div>
                </div>

                {/* Color Acento */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="accentColor">Color de Acento</Label>
                    <p className="text-xs text-muted-foreground">Color para notificaciones y alertas</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border" style={{ backgroundColor: brandSettings.accentColor }} />
                    <Input
                      id="accentColor"
                      type="color"
                      value={brandSettings.accentColor}
                      onChange={(e) => handleColorChange("accentColor", e.target.value)}
                      className="w-16 h-8 p-0 border-0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Paletas Predefinidas</Label>
                <div className="grid grid-cols-2 gap-2">
                  {colorPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-2 bg-transparent"
                      onClick={() => {
                        setBrandSettings({
                          ...brandSettings,
                          primaryColor: preset.primary,
                          secondaryColor: preset.secondary,
                          accentColor: preset.accent,
                        })
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.secondary }} />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }} />
                        </div>
                        <span className="text-xs">{preset.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Imagen de portada */}
          <Card>
            <CardHeader>
              <CardTitle>Imagen de Portada</CardTitle>
              <CardDescription>Imagen principal para la página de inicio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center relative">
                {coverPreview ? (
                  <div className="space-y-4">
                    <img
                      src={coverPreview || "/placeholder.svg"}
                      alt="Cover preview"
                      className="max-h-32 w-full object-cover rounded"
                    />
                    <p className="text-sm text-muted-foreground">Imagen cargada</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-sm">Sube tu imagen de portada</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restablecer
            </Button>
          </div>
        </div>

        {/* Vista previa */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa en Tiempo Real</CardTitle>
              <CardDescription>Así se verá tu aplicación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 text-white" style={{ backgroundColor: brandSettings.primaryColor }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {logoPreview ? (
                        <img src={logoPreview || "/placeholder.svg"} alt="Logo" className="h-8" />
                      ) : (
                        <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                          <span className="text-xs font-bold">LOGO</span>
                        </div>
                      )}
                      <span className="font-semibold">{brandSettings.companyName}</span>
                    </div>
                    <Badge variant="secondary">Vista Previa</Badge>
                  </div>
                </div>

                {coverPreview && (
                  <div className="h-32 overflow-hidden">
                    <img src={coverPreview || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Programa de Fidelización</h3>
                    <p className="text-sm text-muted-foreground">Bienvenido a nuestro programa de puntos y recompensas</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" style={{ backgroundColor: brandSettings.primaryColor }}>
                      Botón Primario
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      style={{
                        borderColor: brandSettings.secondaryColor,
                        color: brandSettings.secondaryColor,
                      }}
                    >
                      Secundario
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 rounded text-white text-sm" style={{ backgroundColor: brandSettings.accentColor }}>
                      Notificación de ejemplo
                    </div>
                    <div className="p-2 rounded text-white text-sm" style={{ backgroundColor: brandSettings.secondaryColor }}>
                      Estado exitoso
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paleta actual */}
          <Card>
            <CardHeader>
              <CardTitle>Paleta de Colores Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-full h-16 rounded-lg mb-2" style={{ backgroundColor: brandSettings.primaryColor }} />
                  <p className="text-xs font-medium">Primario</p>
                  <p className="text-xs text-muted-foreground">{brandSettings.primaryColor}</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 rounded-lg mb-2" style={{ backgroundColor: brandSettings.secondaryColor }} />
                  <p className="text-xs font-medium">Secundario</p>
                  <p className="text-xs text-muted-foreground">{brandSettings.secondaryColor}</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 rounded-lg mb-2" style={{ backgroundColor: brandSettings.accentColor }} />
                  <p className="text-xs font-medium">Acento</p>
                  <p className="text-xs text-muted-foreground">{brandSettings.accentColor}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
