"use client";

import React, { useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog";
import { Badge } from "../components/badge";
import { Plus, Edit, UserX, Mail, Phone, MapPin, CheckCircle, Search, Eye, EyeOff } from "lucide-react";

export function GestionTrabajadores({ userRole }) {
  const [workers, setWorkers] = useState([
    {
      id: "1",
      nombre: "Juan",
      apellidos: "Pérez García",
      correo: "juan.perez@gmail.com",
      telefono: "5512345678",
      direccion: "Av. Principal 123, Col. Centro",
      rol: "Administrador",
      activo: true,
      fechaRegistro: "2024-01-15",
    },
    {
      id: "2",
      nombre: "María",
      apellidos: "López Hernández",
      correo: "maria.lopez@gmail.com",
      telefono: "5587654321",
      direccion: "Calle Secundaria 456, Col. Norte",
      rol: "Gerente",
      activo: true,
      fechaRegistro: "2024-02-20",
    },
    {
      id: "3",
      nombre: "Carlos",
      apellidos: "Rodríguez Martín",
      correo: "carlos.rodriguez@gmail.com",
      telefono: "5511223344",
      direccion: "Av. Sur 789, Col. Industrial",
      rol: "Líder de Área",
      activo: false,
      fechaRegistro: "2024-03-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    direccion: "",
    rol: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos";
    if (!formData.correo.trim()) newErrors.correo = "El correo Gmail es requerido";
    else if (!/@gmail\.com$/.test(formData.correo.toLowerCase()))
      newErrors.correo = "Debe ser una dirección de Gmail válida";
    else if (
      workers.some((w) => w.correo === formData.correo && w.id !== (editingWorker?.id || ""))
    )
      newErrors.correo = "Este correo ya está registrado";

    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    else if (!/^[0-9]{10}$/.test(formData.telefono.replace(/\D/g, "")))
      newErrors.telefono = "El teléfono debe tener 10 dígitos";

    if (!formData.direccion.trim()) newErrors.direccion = "La dirección es requerida";
    if (!formData.rol) newErrors.rol = "Debe seleccionar un rol";

    if (!editingWorker) {
      if (!formData.password.trim()) newErrors.password = "La contraseña es requerida";
      else if (formData.password.length < 6)
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingWorker) {
      setWorkers((prev) =>
        prev.map((worker) =>
          worker.id === editingWorker.id ? { ...worker, ...formData } : worker
        )
      );
    } else {
      const newWorker = {
        id: Date.now().toString(),
        ...formData,
        activo: true,
        fechaRegistro: new Date().toISOString().split("T")[0],
      };
      setWorkers((prev) => [...prev, newWorker]);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsDialogOpen(false);
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      direccion: "",
      rol: "",
      password: "",
    });
    setEditingWorker(null);
    setErrors({});
    setShowPassword(false);
  };

  const handleEdit = (worker) => {
    setEditingWorker(worker);
    setFormData({
      nombre: worker.nombre,
      apellidos: worker.apellidos,
      correo: worker.correo,
      telefono: worker.telefono,
      direccion: worker.direccion,
      rol: worker.rol,
      password: "",
    });
    setIsDialogOpen(true);
  };

  const handleDeactivate = (workerId) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === workerId ? { ...w, activo: !w.activo } : w))
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const getRoleBadgeColor = (rol) => {
    switch (rol) {
      case "Administrador":
        return "bg-primary text-primary-foreground";
      case "Gerente":
        return "bg-accent text-accent-foreground";
      case "Líder de Área":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Trabajadores</h1>
          <p className="text-muted-foreground">
            Administra empleados, roles y permisos del sistema
          </p>
        </div>

        {/* Dialog para agregar/editar trabajador */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="h-12">
              <Plus className="h-5 w-5 mr-2" /> Agregar Trabajador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingWorker ? "Editar Trabajador" : "Agregar Nuevo Trabajador"}
              </DialogTitle>
              <DialogDescription>
                {editingWorker
                  ? "Modifica la información del trabajador"
                  : "Complete la información del nuevo empleado y establezca su contraseña de acceso."}
              </DialogDescription>
            </DialogHeader>

            {showSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {editingWorker ? "¡Trabajador actualizado!" : "¡Trabajador agregado!"}
                </h3>
                <p className="text-muted-foreground">
                  {editingWorker
                    ? "Los cambios se han guardado correctamente"
                    : "Se han enviado las credenciales por correo electrónico"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre y Apellidos */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      className={errors.nombre ? "border-destructive" : ""}
                      placeholder="Ej: Juan"
                    />
                    {errors.nombre && (
                      <p className="text-sm text-destructive">{errors.nombre}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellidos">Apellidos *</Label>
                    <Input
                      id="apellidos"
                      value={formData.apellidos}
                      onChange={(e) => handleInputChange("apellidos", e.target.value)}
                      className={errors.apellidos ? "border-destructive" : ""}
                      placeholder="Ej: Pérez García"
                    />
                    {errors.apellidos && (
                      <p className="text-sm text-destructive">{errors.apellidos}</p>
                    )}
                  </div>
                </div>

                {/* Correo y Teléfono */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo Gmail *</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={formData.correo}
                      onChange={(e) =>
                        handleInputChange("correo", e.target.value.toLowerCase())
                      }
                      className={errors.correo ? "border-destructive" : ""}
                      placeholder="usuario@gmail.com"
                    />
                    {errors.correo && (
                      <p className="text-sm text-destructive">{errors.correo}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      className={errors.telefono ? "border-destructive" : ""}
                      placeholder="5512345678"
                      maxLength={10}
                    />
                    {errors.telefono && (
                      <p className="text-sm text-destructive">{errors.telefono}</p>
                    )}
                  </div>
                </div>

                {/* Dirección */}
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección *</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                    className={errors.direccion ? "border-destructive" : ""}
                    placeholder="Av. Principal 123, Col. Centro"
                  />
                  {errors.direccion && (
                    <p className="text-sm text-destructive">{errors.direccion}</p>
                  )}
                </div>

                {/* Rol y Contraseña */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rol">Rol *</Label>
                    <Select
                      value={formData.rol}
                      onValueChange={(value) => handleInputChange("rol", value)}
                    >
                      <SelectTrigger
                        className={errors.rol ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Gerente">Gerente</SelectItem>
                        <SelectItem value="Líder de Área">Líder de Área</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.rol && (
                      <p className="text-sm text-destructive">{errors.rol}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña {editingWorker ? "(opcional)" : "*"}</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={errors.password ? "border-destructive pr-10" : "pr-10"}
                        placeholder="Mínimo 6 caracteres"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingWorker ? "Actualizar" : "Agregar"} Trabajador
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Buscador */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, apellidos, correo o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de trabajadores */}
      <div className="grid gap-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className={`${!worker.activo ? "opacity-60" : ""}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {worker.nombre} {worker.apellidos}
                    </h3>
                    <Badge className={getRoleBadgeColor(worker.rol)}>
                      {worker.rol}
                    </Badge>
                    {!worker.activo && <Badge variant="destructive">Inactivo</Badge>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {worker.correo}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {worker.telefono}
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin className="h-4 w-4" />
                      {worker.direccion}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Registrado:{" "}
                    {new Date(worker.fechaRegistro).toLocaleDateString("es-MX")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(worker)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant={worker.activo ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleDeactivate(worker.id)}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    {worker.activo ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredWorkers.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No se encontraron trabajadores que coincidan con la búsqueda"
                  : "No hay trabajadores registrados"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
