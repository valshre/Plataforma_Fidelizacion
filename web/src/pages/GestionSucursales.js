"use client";

import React, { useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog";
import { Plus, Edit, Trash2, Phone, MapPin, Clock, AlertCircle, CheckCircle, Search, Building2 } from "lucide-react";

export function GestionSucursales({ userRole }) {
  const [branches, setBranches] = useState([
    {
      id: "1",
      nombre: "Sucursal Centro",
      direccion: "Av. Principal 123, Col. Centro, Ciudad, CP 12345",
      telefono: "5512345678",
      horario: "Lunes a Viernes: 9:00 - 18:00, Sábados: 9:00 - 14:00",
      fechaRegistro: "2024-01-15",
    },
    {
      id: "2",
      nombre: "Sucursal Norte",
      direccion: "Calle Norte 456, Col. Residencial, Ciudad, CP 54321",
      telefono: "5587654321",
      horario: "Lunes a Sábado: 8:00 - 20:00, Domingos: 10:00 - 16:00",
      fechaRegistro: "2024-02-20",
    },
    {
      id: "3",
      nombre: "Sucursal Sur",
      direccion: "Av. Sur 789, Col. Industrial, Ciudad, CP 67890",
      telefono: "5511223344",
      horario: "Lunes a Viernes: 8:00 - 17:00",
      fechaRegistro: "2024-03-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    horario: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredBranches = branches.filter(
    (branch) =>
      branch.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.telefono.includes(searchTerm)
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre de la sucursal es requerido";
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^[0-9]{10}$/.test(formData.telefono.replace(/\D/g, ""))) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }

    if (!formData.horario.trim()) {
      newErrors.horario = "El horario de atención es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingBranch) {
      // Editar sucursal existente
      setBranches((prev) =>
        prev.map((branch) =>
          branch.id === editingBranch.id ? { ...branch, ...formData } : branch
        )
      );
    } else {
      // Agregar nueva sucursal
      const newBranch = {
        id: Date.now().toString(),
        ...formData,
        fechaRegistro: new Date().toISOString().split("T")[0],
      };
      setBranches((prev) => [...prev, newBranch]);
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
      direccion: "",
      telefono: "",
      horario: "",
    });
    setEditingBranch(null);
    setErrors({});
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      nombre: branch.nombre,
      direccion: branch.direccion,
      telefono: branch.telefono,
      horario: branch.horario,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (branchId) => {
    setBranches((prev) => prev.filter((branch) => branch.id !== branchId));
    setShowDeleteConfirm(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Sucursales</h1>
          <p className="text-muted-foreground">Administra las ubicaciones y horarios de tus sucursales</p>
        </div>

        {/* Dialog para agregar/editar sucursal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="h-12">
              <Plus className="h-5 w-5 mr-2" />
              Agregar Sucursal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBranch ? "Editar Sucursal" : "Agregar Nueva Sucursal"}</DialogTitle>
              <DialogDescription>
                {editingBranch
                  ? "Modifica la información de la sucursal"
                  : "Complete la información de la nueva sucursal"}
              </DialogDescription>
            </DialogHeader>

            {showSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {editingBranch ? "¡Sucursal actualizada!" : "¡Sucursal agregada!"}
                </h3>
                <p className="text-muted-foreground">Los cambios se han guardado correctamente</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la Sucursal *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className={errors.nombre ? "border-destructive" : ""}
                    placeholder="Ej: Sucursal Centro"
                  />
                  {errors.nombre && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.nombre}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección Completa *</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                    className={errors.direccion ? "border-destructive" : ""}
                    placeholder="Ej: Av. Principal 123, Col. Centro, Ciudad, CP 12345"
                  />
                  {errors.direccion && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.direccion}
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
                    placeholder="5512345678"
                    maxLength={10}
                  />
                  {errors.telefono && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.telefono}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario">Horario de Atención *</Label>
                  <Input
                    id="horario"
                    value={formData.horario}
                    onChange={(e) => handleInputChange("horario", e.target.value)}
                    className={errors.horario ? "border-destructive" : ""}
                    placeholder="Ej: Lunes a Viernes: 9:00 - 18:00, Sábados: 9:00 - 14:00"
                  />
                  {errors.horario && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.horario}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingBranch ? "Actualizar" : "Agregar"} Sucursal
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
              placeholder="Buscar por nombre, dirección o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de sucursales */}
      <div className="grid gap-4">
        {filteredBranches.map((branch) => (
          <Card key={branch.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{branch.nombre}</h3>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{branch.direccion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{branch.telefono}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{branch.horario}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    Registrada: {new Date(branch.fechaRegistro).toLocaleDateString("es-MX")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(branch)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>

                  <Dialog
                    open={showDeleteConfirm === branch.id}
                    onOpenChange={(open) => setShowDeleteConfirm(open ? branch.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar Eliminación</DialogTitle>
                        <DialogDescription>
                          ¿Está seguro que desea eliminar la sucursal "{branch.nombre}"? Esta acción no se puede deshacer.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-4 pt-4">
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(null)} className="flex-1">
                          Cancelar
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(branch.id)} className="flex-1">
                          Eliminar
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredBranches.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No se encontraron sucursales que coincidan con la búsqueda"
                  : "No hay sucursales registradas"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
