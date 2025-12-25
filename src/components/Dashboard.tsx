import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Car,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Sparkles,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  calculateTotalRevenue,
  calculateRentalRevenue,
  calculateMitraRevenueTotal,
  getMonthlyRevenue,
  type Mobil,
  type Pesanan,
} from "../lib/data";

interface DashboardProps {
  mobils: Mobil[];
  pesanans: Pesanan[];
  onNavigate?: (tab: 'mobil' | 'pesanan' | 'mitra' | 'laporan') => void;
}

export function Dashboard({
  mobils,
  pesanans,
  onNavigate,
}: DashboardProps) {
  const availableCars = mobils.filter(
    (m) => m.status === "available",
  ).length;
  const pendingOrders = pesanans.filter(
    (p) => p.status === "pending",
  ).length;
  const mitraCount = new Set(
    mobils
      .filter((m) => m.ownerType === "mitra")
      .map((m) => m.ownerName),
  ).size;
  const mitraCars = mobils.filter(
    (m) => m.ownerType === "mitra",
  ).length;

  // Calculate revenues from completed orders
  const totalRevenue = calculateTotalRevenue(pesanans);
  const rentalRevenue = calculateRentalRevenue(pesanans);
  const mitraRevenue = calculateMitraRevenueTotal(pesanans);

  // Get current month revenue (November 2025)
  const currentMonthRevenue = getMonthlyRevenue(
    pesanans,
    2025,
    10,
  ); // Month 10 = November

  // Prepare chart data - Last 6 months
  const chartData = [];
  const monthNames = ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'];
  const currentYear = 2025;
  
  for (let i = 5; i <= 10; i++) {
    const monthRevenue = getMonthlyRevenue(pesanans, currentYear, i);
    const monthOrders = pesanans.filter(p => {
      const date = new Date(p.endDate);
      return p.status === 'completed' && date.getFullYear() === currentYear && date.getMonth() === i;
    }).length;
    
    chartData.push({
      month: monthNames[i - 5],
      revenue: monthRevenue / 1000000, // In millions
      orders: monthOrders,
    });
  }

  // Prepare revenue comparison data
  const revenueComparisonData = [
    { name: 'Rental', value: rentalRevenue / 1000000 },
    { name: 'Mitra', value: mitraRevenue / 1000000 },
  ];

  const stats = [
    {
      title: "Mobil Tersedia",
      value: availableCars.toString(),
      subtitle: `dari ${mobils.length} total`,
      icon: Car,
      gradient: "from-blue-500 to-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      onClick: () => onNavigate?.('mobil'),
    },
    {
      title: "Pesanan Baru",
      value: pendingOrders.toString(),
      subtitle: "menunggu konfirmasi",
      icon: FileText,
      gradient: "from-orange-500 to-orange-700",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      onClick: () => onNavigate?.('pesanan'),
    },
    {
      title: "Mitra Terdaftar",
      value: mitraCount.toString(),
      subtitle: "mitra aktif",
      icon: Users,
      gradient: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      onClick: () => onNavigate?.('mitra'),
    },
    {
      title: "Mobil Mitra",
      value: mitraCars.toString(),
      subtitle: "dari mitra",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-700",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      onClick: () => onNavigate?.('mobil'),
    },
  ];

  const recentOrders = pesanans
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() -
        new Date(a.orderDate).getTime(),
    )
    .slice(0, 5);

  const getStatusBadge = (status: Pesanan["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700 border-orange-200">
            Menunggu
          </Badge>
        );
      case "confirmed":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            Dikonfirmasi
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Berjalan
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            Selesai
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            Dibatalkan
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Banner with Car Image */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1753899762863-af6e21e86438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBibHVlfGVufDF8fHx8MTc2NjQ3NDYzMXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Car"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h2 className="text-white text-xl">Selamat Datang, Admin Rental Sejahtera!</h2>
          </div>
          <p className="text-purple-100 text-sm mb-4">
            Dashboard RentCar Management System
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <p className="text-purple-100 text-xs mb-1">Total Pendapatan</p>
              <p className="text-white text-lg font-bold">Rp {totalRevenue.toLocaleString("id-ID")}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <p className="text-purple-100 text-xs mb-1">Bulan Ini</p>
              <p className="text-white text-lg font-bold">Rp {currentMonthRevenue.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid with Gradient - CLICKABLE */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="border-0 shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-100" 
            onClick={stat.onClick}
          >
            <div className={`h-1 bg-gradient-to-r ${stat.gradient}`} />
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  <stat.icon
                    className={`w-5 h-5 ${stat.iconColor}`}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-xs text-gray-500">
                {stat.subtitle}
              </p>
              <p className="text-xs text-blue-500 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Klik untuk detail
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Card with Image - CLICKABLE */}
      <Card 
        className="border-0 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
        onClick={() => onNavigate?.('laporan')}
      >
        <div className="relative h-32 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1609465397944-be1ce3ebda61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY2NDAxNjE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dashboard"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-4 flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Laporan Pendapatan</h3>
              <p className="text-blue-100 text-sm">November 2025</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5 bg-gradient-to-b from-gray-50 to-white">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Pendapatan Bulan Ini
              </span>
              <span className="font-bold text-blue-600">
                Rp {currentMonthRevenue.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between items-center pl-6 py-2">
              <span className="text-sm text-gray-500">
                • Mobil Rental
              </span>
              <span className="text-sm text-gray-700">
                Rp{" "}
                {getMonthlyRevenue(
                  pesanans.filter(
                    (p) => p.ownerType === "rental",
                  ),
                  2025,
                  10,
                ).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between items-center pl-6 py-2">
              <span className="text-sm text-gray-500">
                • Mobil Mitra
              </span>
              <span className="text-sm text-gray-700">
                Rp{" "}
                {getMonthlyRevenue(
                  pesanans.filter(
                    (p) => p.ownerType === "mitra",
                  ),
                  2025,
                  10,
                ).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total Pendapatan Keseluruhan
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-sm text-gray-600">Rental</span>
                <span className="font-semibold text-green-700">
                  Rp {rentalRevenue.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                <span className="text-sm text-gray-600">Mitra</span>
                <span className="font-semibold text-purple-700">
                  Rp {mitraRevenue.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <span className="text-white font-bold">Total Keseluruhan</span>
                <span className="text-white font-bold text-lg">
                  Rp {totalRevenue.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="relative h-32 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1609465397944-be1ce3ebda61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY2NDAxNjE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dashboard"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-4 flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Pendapatan Terakhir 6 Bulan</h3>
              <p className="text-blue-100 text-sm">Juni - November 2025</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5 bg-gradient-to-b from-gray-50 to-white">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#8b5cf6" name="Pendapatan (Jt)" />
              <Bar dataKey="orders" fill="#10b981" name="Transaksi" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Orders with Car Image */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="relative h-24 bg-gradient-to-r from-orange-500 to-pink-600">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1763705859529-6a18f667a55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW50YWwlMjBjYXJzJTIwcGFya2luZ3xlbnwxfHx8fDE3NjY0NzQ2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Cars"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-4 flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-bold">Pesanan Terbaru</h3>
          </div>
        </div>
        <CardContent className="p-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    {order.carModel}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(
                      order.startDate,
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    -{" "}
                    {new Date(order.endDate).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "short",
                      },
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 ml-3">
                  {getStatusBadge(order.status)}
                  <span className="text-xs font-bold text-blue-600">
                    Rp{" "}
                    {order.totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}