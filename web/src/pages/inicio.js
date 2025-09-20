import { useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Store, Users, Building2, UserCheck } from "lucide-react";
import { BusinessRegistration } from "./registro-comercio";
import { Login } from "./login";
import { Dashboard } from "./dashboard";

export default function Inicio() {
  const [currentView, setCurrentView] = useState("home");
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (role, email) => {
    setUserRole(role);
    setUserEmail(email);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserEmail("");
    setCurrentView("home");
  };

  if (currentView === "register") {
    return <BusinessRegistration onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "login") {
    return <Login onLogin={handleLogin} onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "dashboard" && userRole) {
    return <Dashboard userRole={userRole} userEmail={userEmail} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Store className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Sistema de Fidelización
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Gestiona tu programa de lealtad, empleados, sucursales y clientes desde una plataforma simple y moderna
          </p>
        </div>

        {/* Opciones */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Registrar Comercio</CardTitle>
              <CardDescription className="text-base">
                Crea una cuenta nueva para tu negocio y comienza a gestionar tu programa de fidelización
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setCurrentView("register")}
                className="w-full h-12 text-lg"
                size="lg"
              >
                Comenzar Registro
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
              <CardDescription className="text-base">
                Accede a tu cuenta existente para gestionar tu comercio y programa de lealtad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setCurrentView("login")}
                variant="outline"
                className="w-full h-12 text-lg"
                size="lg"
              >
                Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Características */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Características Principales</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-medium text-foreground mb-2">Gestión de Empleados</h3>
              <p className="text-sm text-muted-foreground">Administra roles y permisos de tu equipo</p>
            </div>
            <div className="text-center">
              <Building2 className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-medium text-foreground mb-2">Control de Sucursales</h3>
              <p className="text-sm text-muted-foreground">Organiza y supervisa todas tus ubicaciones</p>
            </div>
            <div className="text-center">
              <UserCheck className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-medium text-foreground mb-2">Base de Clientes</h3>
              <p className="text-sm text-muted-foreground">Seguimiento de puntos y promociones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
