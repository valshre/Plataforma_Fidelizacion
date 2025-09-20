"use client";

import { useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select";
import { Badge } from "../components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Filter, DollarSign, ShoppingCart, Users, Star, Gift, TrendingUp } from "lucide-react";

export function Reportes({ userRole }) {
  const [activeTab, setActiveTab] = useState("ventas");
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  });
  const [selectedBranch, setSelectedBranch] = useState("todas");
  const [isLoading, setIsLoading] = useState(false);

  const salesData = [
    {
      date: "2024-01-15",
      branch: "Sucursal Centro",
      customer: "Juan Pérez",
      amount: 1250.0,
      points: 125,
      promotion: "Sí",
    },
    {
      date: "2024-01-16",
      branch: "Sucursal Norte",
      customer: "María García",
      amount: 890.5,
      points: 89,
      promotion: "No",
    },
    {
      date: "2024-01-17",
      branch: "Sucursal Sur",
      customer: "Carlos López",
      amount: 2100.0,
      points: 210,
      promotion: "Sí",
    },
    {
      date: "2024-01-18",
      branch: "Sucursal Centro",
      customer: "Ana Martínez",
      amount: 750.25,
      points: 75,
      promotion: "No",
    },
  ];

  const customersData = [
    {
      name: "Juan Pérez",
      email: "juan@email.com",
      phone: "555-0123",
      registerDate: "2023-05-15",
      lastPurchase: "2024-01-15",
      currentPoints: 1250,
    },
    {
      name: "María García",
      email: "maria@email.com",
      phone: "555-0124",
      registerDate: "2023-08-22",
      lastPurchase: "2024-01-16",
      currentPoints: 890,
    },
    {
      name: "Carlos López",
      email: "carlos@email.com",
      phone: "555-0125",
      registerDate: "2023-12-10",
      lastPurchase: "2024-01-17",
      currentPoints: 2100,
    },
    {
      name: "Ana Martínez",
      email: "ana@email.com",
      phone: "555-0126",
      registerDate: "2024-01-05",
      lastPurchase: "2024-01-18",
      currentPoints: 750,
    },
  ];

  const pointsData = [
    {
      date: "2024-01-15",
      customer: "Juan Pérez",
      type: "Acumulación",
      points: 125,
      branch: "Sucursal Centro",
      operator: "Admin",
    },
    {
      date: "2024-01-16",
      customer: "María García",
      type: "Canje",
      points: -50,
      branch: "Sucursal Norte",
      operator: "Gerente1",
    },
    {
      date: "2024-01-17",
      customer: "Carlos López",
      type: "Bonificación",
      points: 100,
      branch: "Sucursal Sur",
      operator: "Admin",
    },
    {
      date: "2024-01-18",
      customer: "Ana Martínez",
      type: "Acumulación",
      points: 75,
      branch: "Sucursal Centro",
      operator: "Líder1",
    },
  ];

  const promotionsData = [
    {
      name: "Descuento 20% Enero",
      validity: "01/01/2024 - 31/01/2024",
      uses: 45,
      limitPerCustomer: 1,
      status: "Activa",
    },
    {
      name: "2x1 Productos Seleccionados",
      validity: "15/01/2024 - 15/02/2024",
      uses: 23,
      limitPerCustomer: 2,
      status: "Activa",
    },
    { name: "Envío Gratis", validity: "01/12/2023 - 31/12/2023", uses: 156, limitPerCustomer: 5, status: "Inactiva" },
    {
      name: "Sorteo Navideño",
      validity: "01/12/2023 - 25/12/2023",
      uses: 234,
      limitPerCustomer: 1,
      status: "Finalizada",
    },
  ];

  const chartData = [
    { day: "Lun", sales: 4500 },
    { day: "Mar", sales: 3200 },
    { day: "Mié", sales: 5800 },
    { day: "Jue", sales: 4100 },
    { day: "Vie", sales: 6200 },
    { day: "Sáb", sales: 7800 },
    { day: "Dom", sales: 3900 },
  ];

  const handleApplyFilters = () => {
    setIsLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
      console.log("[v0] Filtros aplicados:", { dateRange, selectedBranch });
    }, 1000);
  };

  const handleExportCSV = () => {
    const fileName = `reporte_${activeTab}_${new Date().toISOString().split("T")[0]}.csv`;
    console.log(`[v0] Exportando ${fileName}...`);
    // Aquí se implementaría la lógica real de exportación
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
        <p className="text-muted-foreground">Analiza el rendimiento de tu programa de fidelización</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label>Desde</Label>
              <Input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Hasta</Label>
              <Input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Sucursal</Label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="centro">Sucursal Centro</SelectItem>
                  <SelectItem value="norte">Sucursal Norte</SelectItem>
                  <SelectItem value="sur">Sucursal Sur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleApplyFilters} disabled={isLoading}>
                <Filter className="h-4 w-4 mr-2" />
                {isLoading ? "Aplicando..." : "Aplicar filtros"}
              </Button>
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="puntos">Puntos y Canjes</TabsTrigger>
          <TabsTrigger value="promociones">Promociones y Sorteos</TabsTrigger>
        </TabsList>

        {/* Pestaña Ventas */}
        <TabsContent value="ventas" className="space-y-6">
          {/* Indicadores de Ventas */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ventas Totales</p>
                    <p className="text-2xl font-bold">$24,890.75</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground"># de Transacciones</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ticket Promedio</p>
                    <p className="text-2xl font-bold">$159.55</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfica de Ventas */}
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Día</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Ventas"]} />
                  <Bar dataKey="sales" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabla de Ventas */}
          <Card>
            <CardHeader>
              <CardTitle>Detalle de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Puntos Otorgados</TableHead>
                    <TableHead>Promoción Aplicada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.branch}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>${sale.amount.toFixed(2)}</TableCell>
                      <TableCell>{sale.points}</TableCell>
                      <TableCell>
                        <Badge variant={sale.promotion === "Sí" ? "default" : "secondary"}>{sale.promotion}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña Clientes */}
        <TabsContent value="clientes" className="space-y-6">
          {/* Indicadores de Clientes */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Clientes Totales</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nuevos en el Período</p>
                    <p className="text-2xl font-bold">89</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Activos (Compraron)</p>
                    <p className="text-2xl font-bold">456</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Inactivos</p>
                    <p className="text-2xl font-bold">689</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Clientes */}
          <Card>
            <CardHeader>
              <CardTitle>Detalle de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Fecha de Alta</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Puntos Actuales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customersData.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.registerDate}</TableCell>
                      <TableCell>{customer.lastPurchase}</TableCell>
                      <TableCell>{customer.currentPoints}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña Puntos y Canjes */}
        <TabsContent value="puntos" className="space-y-6">
          {/* Indicadores de Puntos */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Puntos Otorgados</p>
                    <p className="text-2xl font-bold">45,678</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Puntos Canjeados</p>
                    <p className="text-2xl font-bold">12,345</p>
                  </div>
                  <Star className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Saldo Actual</p>
                    <p className="text-2xl font-bold">33,333</p>
                  </div>
                  <Star className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Puntos Caducados</p>
                    <p className="text-2xl font-bold">2,890</p>
                  </div>
                  <Star className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Puntos */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Puntos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Puntos</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Usuario que Operó</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pointsData.map((point, index) => (
                    <TableRow key={index}>
                      <TableCell>{point.date}</TableCell>
                      <TableCell>{point.customer}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            point.type === "Acumulación"
                              ? "default"
                              : point.type === "Canje"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {point.type}
                        </Badge>
                      </TableCell>
                      <TableCell className={point.points > 0 ? "text-green-600" : "text-red-600"}>
                        {point.points > 0 ? "+" : ""}
                        {point.points}
                      </TableCell>
                      <TableCell>{point.branch}</TableCell>
                      <TableCell>{point.operator}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña Promociones y Sorteos */}
        <TabsContent value="promociones" className="space-y-6">
          {/* Indicadores de Promociones */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground"># de Promociones Activas</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <Gift className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total de Usos/Redenciones</p>
                    <p className="text-2xl font-bold">458</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Promociones */}
          <Card>
            <CardHeader>
              <CardTitle>Detalle de Promociones y Sorteos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Promoción</TableHead>
                    <TableHead>Vigencia</TableHead>
                    <TableHead>Usos</TableHead>
                    <TableHead>Límite por Cliente</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotionsData.map((promo, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{promo.name}</TableCell>
                      <TableCell>{promo.validity}</TableCell>
                      <TableCell>{promo.uses}</TableCell>
                      <TableCell>{promo.limitPerCustomer}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            promo.status === "Activa"
                              ? "default"
                              : promo.status === "Finalizada"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {promo.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isLoading && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Cargando datos...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}