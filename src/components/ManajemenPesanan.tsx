import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Calendar,
  User,
  Car,
  Building2,
  Check,
  X,
  Eye,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { toast } from "sonner@2.0.3";
import { InvoiceGenerator } from "./InvoiceGenerator"; // ← INI BARU!
import type { Pesanan, Mobil } from "../lib/data";
interface ManajemenPesananProps {
  pesanans: Pesanan[];
  setPesanans: (pesanans: Pesanan[]) => void;
  mobils: Mobil[];
  setMobils: (mobils: Mobil[]) => void;
}

export function ManajemenPesanan({ pesanans, setPesanans, mobils, setMobils }: ManajemenPesananProps) {
  const handleConfirm = (id: number) => {
    const pesanan = pesanans.find(p => p.id === id);
    
    if (!pesanan) {
      toast.error('Pesanan tidak ditemukan');
      return;
    }
    
    setPesanans(
      pesanans.map((p) =>
        p.id === id ? { ...p, status: 'confirmed' as const } : p
      )
    );
    toast.success('Pesanan berhasil dikonfirmasi');
  };

  const handleReject = (id: number) => {
    const pesanan = pesanans.find(p => p.id === id);
    
    if (!pesanan) {
      toast.error('Pesanan tidak ditemukan');
      return;
    }
    
    setPesanans(
      pesanans.map((p) =>
        p.id === id ? { ...p, status: 'cancelled' as const } : p
      )
    );
    
    // Update car status back to available
    setMobils(
      mobils.map((m) =>
        m.plateNumber === pesanan.carPlate ? { ...m, status: 'available' as const } : m
      )
    );
    
    toast.success('Pesanan berhasil ditolak');
  };

  const handleStartRental = (id: number) => {
    const pesanan = pesanans.find(p => p.id === id);
    
    if (!pesanan) {
      toast.error('Pesanan tidak ditemukan');
      return;
    }
    
    // Check if car is available
    const car = mobils.find(m => m.plateNumber === pesanan.carPlate);
    if (car && car.status !== 'available' && car.status !== 'rented') {
      toast.error('Mobil tidak dapat disewa saat ini');
      return;
    }
    
    setPesanans(
      pesanans.map((p) =>
        p.id === id ? { ...p, status: 'ongoing' as const } : p
      )
    );
    
    // Update car status to rented
    setMobils(
      mobils.map((m) =>
        m.plateNumber === pesanan.carPlate ? { ...m, status: 'rented' as const } : m
      )
    );
    
    toast.success('Penyewaan dimulai');
  };

  const handleComplete = (id: number) => {
    const pesanan = pesanans.find(p => p.id === id);
    
    if (!pesanan) {
      toast.error('Pesanan tidak ditemukan');
      return;
    }
    
    setPesanans(
      pesanans.map((p) =>
        p.id === id ? { ...p, status: 'completed' as const } : p
      )
    );
    
    // Update car status back to available
    setMobils(
      mobils.map((m) =>
        m.plateNumber === pesanan.carPlate ? { ...m, status: 'available' as const } : m
      )
    );
    
    toast.success('Penyewaan selesai, pendapatan telah ditambahkan');
  };

  const pendingOrders = pesanans.filter((p) => p.status === 'pending');
  const confirmedOrders = pesanans.filter((p) => p.status === 'confirmed');
  const ongoingOrders = pesanans.filter((p) => p.status === 'ongoing');
  const completedOrders = pesanans.filter((p) => p.status === 'completed');

  return (
    <div className="space-y-6 pb-6">
      {/* Header Banner with Car Keys Image */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1653565217811-85b41bcd1edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBrZXlzJTIwaGFuZHxlbnwxfHx8fDE3NjYzOTg3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Car Keys"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6 text-amber-200" />
            <h2 className="text-white text-xl font-bold">Manajemen Pesanan</h2>
          </div>
          <p className="text-amber-100 text-sm mb-4">
            Kelola & Konfirmasi Pesanan Rental
          </p>
          
          {/* Stats Mini */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all animate-in slide-in-from-bottom duration-300">
              <p className="text-amber-100 text-xs mb-1">Pesanan Baru</p>
              <p className="text-white text-lg font-bold">{pendingOrders.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '100ms' }}>
              <p className="text-amber-100 text-xs mb-1">Berjalan</p>
              <p className="text-white text-lg font-bold">{ongoingOrders.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '200ms' }}>
              <p className="text-amber-100 text-xs mb-1">Selesai</p>
              <p className="text-white text-lg font-bold">{completedOrders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs with Gradient */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-amber-50 to-orange-50 p-1">
          <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-600 data-[state=active]:text-white text-xs">
            Baru ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-xs">
            Konfirmasi ({confirmedOrders.length})
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-xs">
            Berjalan ({ongoingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-gray-600 data-[state=active]:text-white text-xs">
            Selesai ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 mt-4">
          {pendingOrders.map((pesanan, index) => (
            <div key={pesanan.id} className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: `${index * 50}ms` }}>
              <PesananCard
                pesanan={pesanan}
                onConfirm={() => handleConfirm(pesanan.id)}
                onReject={() => handleReject(pesanan.id)}
                onStartRental={() => handleStartRental(pesanan.id)}
                onComplete={() => handleComplete(pesanan.id)}
              />
            </div>
          ))}
          {pendingOrders.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-dashed border-orange-200 animate-in fade-in duration-500">
              <Sparkles className="w-12 h-12 text-orange-300 mx-auto mb-3" />
              <p className="text-orange-600 font-semibold">Tidak ada pesanan baru</p>
              <p className="text-orange-500 text-sm mt-1">Semua pesanan sudah diproses</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-3 mt-4">
          {confirmedOrders.map((pesanan, index) => (
            <div key={pesanan.id} className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: `${index * 50}ms` }}>
              <PesananCard
                pesanan={pesanan}
                onConfirm={() => handleConfirm(pesanan.id)}
                onReject={() => handleReject(pesanan.id)}
                onStartRental={() => handleStartRental(pesanan.id)}
                onComplete={() => handleComplete(pesanan.id)}
              />
            </div>
          ))}
          {confirmedOrders.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-200 animate-in fade-in duration-500">
              <Check className="w-12 h-12 text-blue-300 mx-auto mb-3" />
              <p className="text-blue-600 font-semibold">Tidak ada pesanan dikonfirmasi</p>
              <p className="text-blue-500 text-sm mt-1">Konfirmasi pesanan akan muncul di sini</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-3 mt-4">
          {ongoingOrders.map((pesanan, index) => (
            <div key={pesanan.id} className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: `${index * 50}ms` }}>
              <PesananCard
                pesanan={pesanan}
                onConfirm={() => handleConfirm(pesanan.id)}
                onReject={() => handleReject(pesanan.id)}
                onStartRental={() => handleStartRental(pesanan.id)}
                onComplete={() => handleComplete(pesanan.id)}
              />
            </div>
          ))}
          {ongoingOrders.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-dashed border-green-200 animate-in fade-in duration-500">
              <Car className="w-12 h-12 text-green-300 mx-auto mb-3" />
              <p className="text-green-600 font-semibold">Tidak ada pesanan berjalan</p>
              <p className="text-green-500 text-sm mt-1">Pesanan yang sedang berlangsung akan muncul di sini</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 mt-4">
          {completedOrders.map((pesanan, index) => (
            <div key={pesanan.id} className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: `${index * 50}ms` }}>
              <PesananCard
                pesanan={pesanan}
                onConfirm={() => handleConfirm(pesanan.id)}
                onReject={() => handleReject(pesanan.id)}
                onStartRental={() => handleStartRental(pesanan.id)}
                onComplete={() => handleComplete(pesanan.id)}
              />
            </div>
          ))}
          {completedOrders.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-dashed border-gray-200 animate-in fade-in duration-500">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-semibold">Tidak ada pesanan selesai</p>
              <p className="text-gray-500 text-sm mt-1">Riwayat pesanan selesai akan muncul di sini</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PesananCard({
  pesanan,
  onConfirm,
  onReject,
  onStartRental,
  onComplete
}: {
  pesanan: Pesanan;
  onConfirm: () => void;
  onReject: () => void;
  onStartRental: () => void;
  onComplete: () => void;
}) {
  const getStatusBadge = (status: Pesanan['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Menunggu</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Dikonfirmasi</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Berjalan</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Selesai</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Dibatalkan</Badge>;
    }
  };

  const getGradientColor = (status: Pesanan['status']) => {
    switch (status) {
      case 'pending':
        return 'from-orange-500 to-amber-600';
      case 'confirmed':
        return 'from-blue-500 to-indigo-600';
      case 'ongoing':
        return 'from-green-500 to-emerald-600';
      case 'completed':
        return 'from-gray-500 to-gray-600';
      case 'cancelled':
        return 'from-red-500 to-red-600';
    }
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${getGradientColor(pesanan.status)}`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-gray-900 font-semibold mb-1">Pesanan #{pesanan.id}</h3>
            <p className="text-sm text-gray-500">
              {new Date(pesanan.orderDate).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          {getStatusBadge(pesanan.status)}
        </div>

        <div className="space-y-2 mb-3 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="size-4 text-blue-500" />
            <span className="text-gray-700 font-medium">{pesanan.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Car className="size-4 text-purple-500" />
            <span className="text-gray-700">
              {pesanan.carModel} ({pesanan.carPlate})
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {pesanan.ownerType === 'rental' ? (
              <Building2 className="size-4 text-cyan-600" />
            ) : (
              <User className="size-4 text-purple-600" />
            )}
            <span className="text-gray-600">{pesanan.ownerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="size-4 text-green-500" />
            <span className="text-gray-700">
              {new Date(pesanan.startDate).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
              })}{' '}
              -{' '}
              {new Date(pesanan.endDate).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
              })}{' '}
              ({pesanan.totalDays} hari)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 mb-3 px-3 py-2 bg-blue-50 rounded-lg">
          <span className="text-sm text-gray-600 font-medium">Total Pembayaran</span>
          <span className="text-blue-600 font-bold">Rp {pesanan.totalPrice.toLocaleString('id-ID')}</span>
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                <Eye className="size-4 mr-1" />
                Detail
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Detail Pesanan #{pesanan.id}
                </DialogTitle>
                <DialogDescription>Informasi lengkap pesanan</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm text-blue-700 mb-2 font-semibold">Informasi Pelanggan</h4>
                  <div className="space-y-1">
                    <p className="text-gray-900 font-medium">{pesanan.customerName}</p>
                    <p className="text-sm text-gray-600">{pesanan.customerPhone}</p>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="text-sm text-purple-700 mb-2 font-semibold">Informasi Mobil</h4>
                  <div className="space-y-1">
                    <p className="text-gray-900 font-medium">{pesanan.carModel}</p>
                    <p className="text-sm text-gray-600">{pesanan.carPlate}</p>
                    <div className="flex items-center gap-1">
                      {pesanan.ownerType === 'rental' ? (
                        <Building2 className="size-3 text-blue-600" />
                      ) : (
                        <User className="size-3 text-purple-600" />
                      )}
                      <p className="text-sm text-gray-600">{pesanan.ownerName}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-sm text-green-700 mb-2 font-semibold">Periode Sewa</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700">
                      Mulai:{' '}
                      {new Date(pesanan.startDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-700">
                      Selesai:{' '}
                      {new Date(pesanan.endDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-700 font-medium">Durasi: {pesanan.totalDays} hari</p>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="text-sm text-amber-700 mb-2 font-semibold">Rincian Pembayaran</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Harga per hari</span>
                      <span className="text-gray-900">
                        Rp {pesanan.pricePerDay.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Durasi</span>
                      <span className="text-gray-900">{pesanan.totalDays} hari</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between pt-2">
                      <span className="text-gray-900 font-bold">Total</span>
                      <span className="text-blue-600 font-bold">
                        Rp {pesanan.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {pesanan.status === 'pending' && (
            <>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg transition-all" onClick={onConfirm}>
                <Check className="size-4 mr-1" />
                Konfirmasi
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                onClick={onReject}
              >
                <X className="size-4 mr-1" />
                Tolak
              </Button>
            </>
          )}

          {pesanan.status === 'confirmed' && (
            <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg transition-all" onClick={onStartRental}>
              Mulai Sewa
            </Button>
          )}
          {
  pesanan.status === "ongoing" && (
    <Button
      size="sm"
      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg transition-all"
      onClick={onComplete}
    >
      Selesaikan
    </Button>
  )
}
{
  pesanan.status === "completed" && (
    <InvoiceGenerator pesanan={pesanan} />
  )
}
        </div>
      </CardContent>
    </Card>
  );
}
