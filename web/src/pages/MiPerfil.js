'use client'

import { useState, useEffect } from "react"
import { Button } from "../components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/card"

// Simulación de datos; reemplazar con API real
const mockUser = {
  nombre: "Juan Pérez",
  email: "juan@empresa.com",
  telefono: "5512345678",
  direccion: "Calle Falsa 123",
  historial: ["Compra 1", "Compra 2"],
  origen: "Proporcionado por el usuario",
  compartidoCon: ["Empresa A", "Empresa B"],
  proposito: "Registro, notificaciones, estadísticas",
}

export default function MiPerfil() {
  const [userData, setUserData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", direccion: "" })
  const [consentimientoMarketing, setConsentimientoMarketing] = useState(true)
  const [consentimientoTerceros, setConsentimientoTerceros] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    // Obtener datos del usuario desde la API
    setUserData(mockUser)
    setFormData({
      nombre: mockUser.nombre,
      email: mockUser.email,
      telefono: mockUser.telefono,
      direccion: mockUser.direccion
    })
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Guardar cambios en API
    setUserData(prev => ({ ...prev, ...formData }))
    setEditMode(false)
    alert("Datos actualizados correctamente.")
  }

  const handleDelete = () => {
    // Llamada API para eliminar cuenta
    alert("Cuenta eliminada correctamente.")
    setShowDeleteModal(false)
    // Redirigir o cerrar sesión
  }

  const handleReporte = () => {
    // Generar reporte completo de datos (API)
    alert("Se ha enviado un reporte completo de tus datos a tu correo.")
  }

  if (!userData) return <div>Cargando...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mi Información</CardTitle>
          <CardDescription>Consulta todos los datos que tenemos sobre ti.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Nombre:</strong> {userData.nombre}</div>
          <div><strong>Correo:</strong> {userData.email}</div>
          <div><strong>Teléfono:</strong> {userData.telefono}</div>
          <div><strong>Dirección:</strong> {userData.direccion}</div>
          <div><strong>Historial:</strong> {userData.historial.join(", ")}</div>
          <div><strong>Origen de la información:</strong> {userData.origen}</div>
          <div><strong>Compartido con:</strong> {userData.compartidoCon.join(", ")}</div>
          <div><strong>Propósito:</strong> {userData.proposito}</div>
        </CardContent>
        <CardContent className="flex gap-2">
          <Button onClick={handleReporte}>Solicitar Reporte de Mis Datos</Button>
          <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>Eliminar Cuenta</Button>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancelar Edición" : "Editar Perfil"}
          </Button>
        </CardContent>
      </Card>

      {editMode && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              className="w-full border rounded px-3 py-2"
            />
            <Button onClick={handleSave}>Guardar Cambios</Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Privacidad</CardTitle>
          <CardDescription>Gestiona tus consentimientos sobre datos personales.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={consentimientoMarketing}
              onChange={() => setConsentimientoMarketing(!consentimientoMarketing)}
            />
            Desactivar uso de mis datos para marketing y estadísticas
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={consentimientoTerceros}
              onChange={() => setConsentimientoTerceros(!consentimientoTerceros)}
            />
            No compartir mis datos con terceros
          </label>
          <div className="text-sm text-muted-foreground">
            Para cualquier consulta sobre tus datos, contacta: <strong>privacidad@hella.com</strong>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Confirmación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="mb-4">Se eliminarán todos tus datos y no podrás recuperarlos. ¿Deseas continuar?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
