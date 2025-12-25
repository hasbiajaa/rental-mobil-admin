import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Search, Edit, Trash2, Eye, Car, DollarSign, Building2, Users, Sparkles, TrendingUp, Award, Star } from 'lucide-react';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { calculateMitraRevenue, type Mitra, type Mobil, type Pesanan } from '../lib/data';

interface ManajemenMitraProps {
  mitras: Mitra[];
  setMitras: (mitras: Mitra[]) => void;
  pesanans: Pesanan[];
  mobils: Mobil[];
}

export function ManajemenMitra({ mitras, setMitras, pesanans, mobils }: ManajemenMitraProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMitra, setSelectedMitra] = useState<Mitra | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    address: ''
  });

  const filteredMitras = mitras.filter((mitra) =>
    `${mitra.name} ${mitra.companyName} ${mitra.phone} ${mitra.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleAddMitra = () => {
    if (!formData.name || !formData.companyName || !formData.phone || !formData.email) {
      toast.success('✨ Mitra baru berhasil ditambahkan!', {
        description: `${formData.companyName} sekarang terdaftar sebagai mitra`,
      });
      return;
    }

    const newMitra: Mitra = {
      id: Math.max(...mitras.map(m => m.id), 0) + 1,
      name: formData.name,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      totalCars: 0,
      activeCars: 0,
      totalRevenue: 0,
      registeredDate: new Date().toISOString().split('T')[0]
    };

    setMitras([...mitras, newMitra]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('✨ Mitra berhasil ditambahkan!');
  };

  const handleDeleteMitra = (id: number) => {
    const mitraToDelete = mitras.find(m => m.id === id);
    
    // Check if mitra has cars
    if (mitraToDelete) {
      const mitraCars = mobils.filter(m => m.ownerType === 'mitra' && m.ownerName === mitraToDelete.companyName);
      if (mitraCars.length > 0) {
        toast.error(`❌ Tidak dapat menghapus mitra`, {
          description: `${mitraToDelete.companyName} masih memiliki ${mitraCars.length} mobil terdaftar`,
        });
        return;
      }
    }
    
    setMitras(mitras.filter(m => m.id !== id));
    toast.success('🗑️ Mitra berhasil dihapus');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      companyName: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  const getMitraCars = (mitraCompanyName: string) => {
    return mobils.filter(m => m.ownerType === 'mitra' && m.ownerName === mitraCompanyName);
  };

  const getMitraRevenue = (mitraCompanyName: string) => {
    return calculateMitraRevenue(mitraCompanyName, pesanans);
  };

  const getMitraOrders = (mitraCompanyName: string) => {
    return pesanans.filter(p => p.ownerType === 'mitra' && p.ownerName === mitraCompanyName && p.status === 'completed');
  };

  const totalMitraCars = mobils.filter(m => m.ownerType === 'mitra').length;
  const totalMitraRevenue = pesanans
    .filter(p => p.ownerType === 'mitra' && p.status === 'completed')
    .reduce((sum, p) => sum + p.totalPrice, 0);

  // Get top mitra by revenue
  const topMitra = mitras
    .map(m => ({
      ...m,
      revenue: getMitraRevenue(m.companyName),
      cars: getMitraCars(m.companyName).length
    }))
    .sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Banner with Business Handshake Image */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1575956011521-4d7f5cf0b18e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc2NjM4MzI1MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Business Partners"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-purple-200" />
            <h2 className="text-white text-xl font-bold">Manajemen Mitra</h2>
          </div>
          <p className="text-purple-100 text-sm mb-4">
            Kelola Kemitraan Bisnis & Pendapatan
          </p>
          
          {/* Stats Mini */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all">
              <p className="text-purple-100 text-xs mb-1">Total Mitra</p>
              <p className="text-white text-lg font-bold">{mitras.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all">
              <p className="text-purple-100 text-xs mb-1">Mobil Mitra</p>
              <p className="text-white text-lg font-bold">{totalMitraCars}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/30 transition-all">
              <p className="text-purple-100 text-xs mb-1">Pendapatan</p>
              <p className="text-white text-sm font-bold">Rp {(totalMitraRevenue / 1000000).toFixed(1)}Jt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Mitra Card */}
      {topMitra && topMitra.revenue > 0 && (
        <Card className="border-0 shadow-xl overflow-hidden animate-in slide-in-from-top duration-500">
          <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500" />
          <CardContent className="p-5 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg animate-pulse">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="text-xs font-bold text-yellow-700 uppercase tracking-wide">Mitra Terbaik</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{topMitra.companyName}</h3>
                <p className="text-sm text-gray-600 mb-3">{topMitra.name}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg">
                    <p className="text-xs text-gray-600">Pendapatan</p>
                    <p className="font-bold text-sm text-orange-600">Rp {(topMitra.revenue / 1000000).toFixed(1)}Jt</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-2 rounded-lg">
                    <p className="text-xs text-gray-600">Mobil</p>
                    <p className="font-bold text-sm text-purple-600">{topMitra.cars} unit</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Add */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari mitra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-12 border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="icon" className="shrink-0 h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:scale-105 transition-all">
              <Plus className="size-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Tambah Mitra Baru
              </DialogTitle>
              <DialogDescription>Tambahkan mitra baru ke sistem</DialogDescription>
            </DialogHeader>
            <MitraForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleAddMitra}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-500" />
              Detail Mitra
            </DialogTitle>
            <DialogDescription>Informasi lengkap mitra dan laporan</DialogDescription>
          </DialogHeader>
          {selectedMitra && (
            <MitraDetail
              mitra={selectedMitra}
              cars={getMitraCars(selectedMitra.companyName)}
              orders={getMitraOrders(selectedMitra.companyName)}
              revenue={getMitraRevenue(selectedMitra.companyName)}
              onDelete={() => {
                handleDeleteMitra(selectedMitra.id);
                setIsDetailDialogOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Mitra Cards */}
      <div className="space-y-3">
        {filteredMitras.map((mitra, index) => {
          const mitraCars = getMitraCars(mitra.companyName);
          const mitraRevenue = getMitraRevenue(mitra.companyName);
          const isTopMitra = topMitra && mitra.id === topMitra.id;
          
          return (
            <Card 
              key={mitra.id} 
              className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-in slide-in-from-bottom ${isTopMitra ? 'ring-2 ring-yellow-400' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`h-1 bg-gradient-to-r ${isTopMitra ? 'from-yellow-400 to-orange-500' : 'from-purple-500 to-pink-600'}`} />
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900 font-semibold">{mitra.companyName}</h3>
                      {isTopMitra && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1 fill-white" />
                          Top
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{mitra.name}</p>
                    <p className="text-sm text-gray-500">{mitra.phone}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl">
                    <Building2 className="size-6 text-purple-600" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <Car className="size-4 text-blue-600" />
                      <p className="text-xs text-blue-600 font-medium">Total Mobil</p>
                    </div>
                    <p className="text-gray-900 font-bold text-lg">{mitraCars.length}</p>
                    <p className="text-xs text-gray-600">unit kendaraan</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="size-4 text-green-600" />
                      <p className="text-xs text-green-600 font-medium">Pendapatan</p>
                    </div>
                    <p className="text-gray-900 font-bold text-sm">
                      Rp {(mitraRevenue / 1000000).toFixed(1)}Jt
                    </p>
                    <p className="text-xs text-gray-600">total revenue</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 hover:shadow-md transition-all"
                    onClick={() => {
                      setSelectedMitra(mitra);
                      setIsDetailDialogOpen(true);
                    }}
                  >
                    <Eye className="size-4 mr-1" />
                    Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {filteredMitras.length === 0 && (
          <div className="text-center py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl border-2 border-dashed border-purple-200 animate-in fade-in duration-500">
            <Users className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <p className="text-purple-600 font-semibold text-lg">Tidak ada mitra ditemukan</p>
            <p className="text-purple-500 text-sm mt-2">
              {searchQuery ? 'Coba kata kunci lain atau tambah mitra baru' : 'Tambah mitra baru untuk memulai kemitraan'}
            </p>
            {!searchQuery && (
              <Button 
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg transition-all"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Mitra Pertama
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MitraForm({
  formData,
  setFormData,
  onSubmit
}: {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Pemilik</Label>
        <Input
          id="name"
          placeholder="Budi Hartono"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Nama Perusahaan</Label>
        <Input
          id="company"
          placeholder="PT Sejahtera Motor"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Nomor Telepon</Label>
        <Input
          id="phone"
          placeholder="081234567890"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="budi@sejahtera.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Alamat</Label>
        <Input
          id="address"
          placeholder="Jl. Sudirman No. 123, Jakarta"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:scale-105 transition-all" onClick={onSubmit}>
        <Sparkles className="w-4 h-4 mr-2" />
        Simpan Mitra
      </Button>
    </div>
  );
}

function MitraDetail({
  mitra,
  cars,
  orders,
  revenue,
  onDelete
}: {
  mitra: Mitra;
  cars: Mobil[];
  orders: Pesanan[];
  revenue: number;
  onDelete: () => void;
}) {
  return (
    <div className="space-y-4 py-4">
      {/* Informasi Mitra */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 shadow-sm">
        <h4 className="text-sm text-purple-700 mb-2 font-semibold flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Informasi Perusahaan
        </h4>
        <div className="space-y-1">
          <p className="text-gray-900 font-medium text-lg">{mitra.companyName}</p>
          <p className="text-sm text-gray-600">👤 Pemilik: {mitra.name}</p>
          <p className="text-sm text-gray-600">📞 {mitra.phone}</p>
          <p className="text-sm text-gray-600">📧 {mitra.email}</p>
          <p className="text-sm text-gray-600">📍 {mitra.address}</p>
        </div>
      </div>

      <Separator />

      {/* Statistik */}
      <div>
        <h4 className="text-sm text-gray-600 mb-3 font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Statistik Performa
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-blue-600 mb-1 font-medium">Total Mobil</p>
            <p className="text-gray-900 font-bold text-2xl">{cars.length}</p>
            <p className="text-xs text-gray-600 mt-1">unit kendaraan</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-green-600 mb-1 font-medium">Total Transaksi</p>
            <p className="text-gray-900 font-bold text-2xl">{orders.length}</p>
            <p className="text-xs text-gray-600 mt-1">pesanan selesai</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Daftar Mobil */}
      <div>
        <h4 className="text-sm text-gray-600 mb-3 font-semibold flex items-center gap-2">
          <Car className="w-4 h-4" />
          Daftar Mobil ({cars.length})
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {cars.map((car) => (
            <div key={car.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg hover:shadow-md transition-all border border-gray-100">
              <div>
                <p className="text-sm text-gray-900 font-medium">{car.brand} {car.model}</p>
                <p className="text-xs text-gray-600">{car.plateNumber}</p>
              </div>
              <Badge className={
                car.status === 'available' ? 'bg-green-100 text-green-700 border-green-200' :
                car.status === 'rented' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                'bg-orange-100 text-orange-700 border-orange-200'
              }>
                {car.status === 'available' ? '✓ Tersedia' :
                 car.status === 'rented' ? '🚗 Disewa' : '🔧 Maintenance'}
              </Badge>
            </div>
          ))}
          {cars.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
              Belum ada mobil terdaftar untuk mitra ini
            </p>
          )}
        </div>
      </div>

      <Separator />

      {/* Laporan Pendapatan */}
      <div>
        <h4 className="text-sm text-gray-600 mb-3 font-semibold flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Laporan Pendapatan
        </h4>
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 p-5 rounded-xl mb-3 border border-green-100 shadow-sm">
          <p className="text-sm text-green-600 mb-1 font-medium">Total Pendapatan</p>
          <p className="text-green-700 font-bold text-3xl">Rp {revenue.toLocaleString('id-ID')}</p>
          <p className="text-xs text-green-600 mt-1">{orders.length} transaksi selesai</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-gray-600 font-medium">Riwayat Transaksi Terakhir:</p>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex justify-between text-sm p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg hover:shadow-md transition-all border border-gray-100">
                <div>
                  <p className="text-gray-900 font-medium">{order.carModel}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(order.endDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <p className="text-green-600 font-semibold">
                  Rp {order.totalPrice.toLocaleString('id-ID')}
                </p>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                Belum ada transaksi untuk mitra ini
              </p>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:shadow-md transition-all" onClick={onDelete}>
          <Trash2 className="size-4 mr-1" />
          Hapus Mitra
        </Button>
      </div>
    </div>
  );
}
