import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { DollarSign, Calendar, TrendingUp, Car, BarChart3, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { calculateTotalRevenue, calculateRentalRevenue, calculateMitraRevenueTotal, getMonthlyRevenue, type Pesanan } from '../lib/data';

interface LaporanPenyewaanProps {
  pesanans: Pesanan[];
}

export function LaporanPenyewaan({ pesanans }: LaporanPenyewaanProps) {
  const [selectedMonth] = useState(10); // November 2025 (0-indexed)
  const [selectedYear] = useState(2025);

  // Calculate revenues
  const totalRevenue = calculateTotalRevenue(pesanans);
  const rentalRevenue = calculateRentalRevenue(pesanans);
  const mitraRevenue = calculateMitraRevenueTotal(pesanans);
  const monthlyRevenue = getMonthlyRevenue(pesanans, selectedYear, selectedMonth);

  // Get completed orders
  const completedOrders = pesanans.filter(p => p.status === 'completed');
  const monthlyCompletedOrders = completedOrders.filter(p => {
    const date = new Date(p.endDate);
    return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
  });

  // Calculate statistics
  const totalTransactions = completedOrders.length;
  const monthlyTransactions = monthlyCompletedOrders.length;

  // Get rental and mitra orders
  const rentalOrders = completedOrders.filter(p => p.ownerType === 'rental');
  const mitraOrders = completedOrders.filter(p => p.ownerType === 'mitra');

  // Prepare chart data - Last 6 months
  const chartData = [];
  const monthNames = ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'];
  
  for (let i = 5; i <= 10; i++) {
    const monthRevenue = getMonthlyRevenue(pesanans, selectedYear, i);
    const monthOrders = pesanans.filter(p => {
      const date = new Date(p.endDate);
      return p.status === 'completed' && date.getFullYear() === selectedYear && date.getMonth() === i;
    }).length;
    
    chartData.push({
      month: monthNames[i - 5],
      revenue: monthRevenue / 1000000, // In millions
      transaksi: monthOrders,
    });
  }

  // Pie chart data
  const pieData = [
    { name: 'Rental', value: rentalRevenue, color: '#3b82f6' },
    { name: 'Mitra', value: mitraRevenue, color: '#a855f7' },
  ];

  const COLORS = ['#3b82f6', '#a855f7'];

  const stats = [
    {
      title: 'Total Pendapatan',
      value: `Rp ${(totalRevenue / 1000000).toFixed(1)}Jt`,
      subtitle: `${totalTransactions} transaksi`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Pendapatan Bulan Ini',
      value: `Rp ${(monthlyRevenue / 1000000).toFixed(1)}Jt`,
      subtitle: `${monthlyTransactions} transaksi`,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Mobil Rental',
      value: `Rp ${(rentalRevenue / 1000000).toFixed(1)}Jt`,
      subtitle: `${rentalOrders.length} transaksi`,
      icon: Car,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Mobil Mitra',
      value: `Rp ${(mitraRevenue / 1000000).toFixed(1)}Jt`,
      subtitle: `${mitraOrders.length} transaksi`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Banner with Financial Report Image */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjByZXBvcnQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzY2NjUwMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Financial Report"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-6 h-6 text-green-200" />
            <h2 className="text-white text-xl font-bold">Laporan Penyewaan</h2>
          </div>
          <p className="text-green-100 text-sm mb-4">
            Analisis Pendapatan & Statistik Bisnis
          </p>
          
          {/* Stats Mini */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all animate-in slide-in-from-bottom duration-300">
              <p className="text-green-100 text-xs mb-1">Total</p>
              <p className="text-white text-sm font-bold">Rp {(totalRevenue / 1000000).toFixed(1)}Jt</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '100ms' }}>
              <p className="text-green-100 text-xs mb-1">Bulan Ini</p>
              <p className="text-white text-sm font-bold">Rp {(monthlyRevenue / 1000000).toFixed(1)}Jt</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '200ms' }}>
              <p className="text-green-100 text-xs mb-1">Transaksi</p>
              <p className="text-white text-lg font-bold">{totalTransactions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden animate-in slide-in-from-bottom" style={{ animationDelay: `${index * 100}ms` }}>
            <div className={`h-1 bg-gradient-to-r ${
              index === 0 ? 'from-green-400 to-emerald-600' :
              index === 1 ? 'from-blue-400 to-cyan-600' :
              index === 2 ? 'from-purple-400 to-pink-600' :
              'from-orange-400 to-red-600'
            }`} />
            <CardContent className={`p-4 bg-gradient-to-br ${
              index === 0 ? 'from-green-50 to-emerald-50' :
              index === 1 ? 'from-blue-50 to-cyan-50' :
              index === 2 ? 'from-purple-50 to-pink-50' :
              'from-orange-50 to-red-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl shadow-md`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <Card className="border-0 shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '400ms' }}>
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
        <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-600" />
            Rincian Pendapatan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 font-medium">Mobil Rental</span>
              <span className="text-gray-900 font-bold">Rp {rentalRevenue.toLocaleString('id-ID')}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(rentalRevenue / totalRevenue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {rentalOrders.length} transaksi ({((rentalRevenue / totalRevenue) * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 font-medium">Mobil Mitra</span>
              <span className="text-gray-900 font-bold">Rp {mitraRevenue.toLocaleString('id-ID')}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(mitraRevenue / totalRevenue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {mitraOrders.length} transaksi ({((mitraRevenue / totalRevenue) * 100).toFixed(1)}%)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trend Chart */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-500" />
            Grafik Pendapatan 6 Bulan Terakhir
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-gradient-to-b from-gray-50 to-white">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
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
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Pendapatan (Jt)"
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="transaksi" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Transaksi"
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Comparison Pie Chart */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-600" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Perbandingan Pendapatan Rental vs Mitra
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-gradient-to-b from-gray-50 to-white">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Rental</span>
              </div>
              <p className="text-sm font-bold text-gray-900">Rp {(rentalRevenue / 1000000).toFixed(1)}Jt</p>
              <p className="text-xs text-gray-600">{rentalOrders.length} transaksi</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-purple-600" />
                <span className="text-xs text-purple-600 font-medium">Mitra</span>
              </div>
              <p className="text-sm font-bold text-gray-900">Rp {(mitraRevenue / 1000000).toFixed(1)}Jt</p>
              <p className="text-xs text-gray-600">{mitraOrders.length} transaksi</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="border-0 shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '500ms' }}>
        <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
        <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50">
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5 text-cyan-600" />
            Riwayat Transaksi
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 bg-gradient-to-b from-gray-50 to-white">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-100 to-slate-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                Semua ({completedOrders.length})
              </TabsTrigger>
              <TabsTrigger value="rental" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                Rental ({rentalOrders.length})
              </TabsTrigger>
              <TabsTrigger value="mitra" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                Mitra ({mitraOrders.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {completedOrders.slice(0, 10).map((order, index) => (
                <div key={order.id} className="animate-in slide-in-from-right duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                  <TransactionCard order={order} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="rental" className="space-y-3 mt-4">
              {rentalOrders.slice(0, 10).map((order, index) => (
                <div key={order.id} className="animate-in slide-in-from-right duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                  <TransactionCard order={order} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="mitra" className="space-y-3 mt-4">
              {mitraOrders.slice(0, 10).map((order, index) => (
                <div key={order.id} className="animate-in slide-in-from-right duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                  <TransactionCard order={order} />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function TransactionCard({ order }: { order: Pesanan }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm text-gray-900 font-medium">{order.customerName}</p>
          <Badge className={
            order.ownerType === 'rental' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0' 
              : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0'
          }>
            {order.ownerType === 'rental' ? 'Rental' : 'Mitra'}
          </Badge>
        </div>
        <p className="text-xs text-gray-600 truncate mb-1">{order.carModel}</p>
        <p className="text-xs text-gray-500">
          {new Date(order.startDate).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short'
          })}{' '}
          -{' '}
          {new Date(order.endDate).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}{' '}
          ({order.totalDays} hari)
        </p>
      </div>
      <div className="text-right bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
        <p className="text-green-600 font-bold">
          Rp {order.totalPrice.toLocaleString('id-ID')}
        </p>
        <p className="text-xs text-gray-500">
          Rp {order.pricePerDay.toLocaleString('id-ID')}/hari
        </p>
      </div>
    </div>
  );
}