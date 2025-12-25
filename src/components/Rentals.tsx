import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Rental {
  id: number;
  customerName: string;
  carModel: string;
  plateNumber: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  totalPrice: number;
  status: 'active' | 'completed' | 'cancelled';
}

export function Rentals() {
  const [rentals] = useState<Rental[]>([
    {
      id: 1,
      customerName: 'Ahmad Rizki',
      carModel: 'Toyota Avanza',
      plateNumber: 'B 1234 XYZ',
      startDate: '2024-11-05',
      endDate: '2024-11-08',
      totalDays: 3,
      pricePerDay: 350000,
      totalPrice: 1050000,
      status: 'active'
    },
    {
      id: 2,
      customerName: 'Siti Nurhaliza',
      carModel: 'Honda Jazz',
      plateNumber: 'B 5678 ABC',
      startDate: '2024-11-04',
      endDate: '2024-11-10',
      totalDays: 6,
      pricePerDay: 400000,
      totalPrice: 2400000,
      status: 'active'
    },
    {
      id: 3,
      customerName: 'Budi Santoso',
      carModel: 'Suzuki Ertiga',
      plateNumber: 'B 9012 DEF',
      startDate: '2024-11-01',
      endDate: '2024-11-03',
      totalDays: 2,
      pricePerDay: 325000,
      totalPrice: 650000,
      status: 'completed'
    },
    {
      id: 4,
      customerName: 'Dewi Lestari',
      carModel: 'Toyota Innova Reborn',
      plateNumber: 'B 2468 MNO',
      startDate: '2024-11-02',
      endDate: '2024-11-09',
      totalDays: 7,
      pricePerDay: 500000,
      totalPrice: 3500000,
      status: 'active'
    },
    {
      id: 5,
      customerName: 'Eko Prasetyo',
      carModel: 'Daihatsu Xenia',
      plateNumber: 'B 3456 GHI',
      startDate: '2024-10-28',
      endDate: '2024-10-30',
      totalDays: 2,
      pricePerDay: 300000,
      totalPrice: 600000,
      status: 'completed'
    }
  ]);

  const getStatusBadge = (status: Rental['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Aktif</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700">Selesai</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700">Dibatalkan</Badge>;
    }
  };

  const activeRentals = rentals.filter((r) => r.status === 'active');
  const completedRentals = rentals.filter((r) => r.status === 'completed');

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="size-5 mr-2" />
            Tambah Rental Baru
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rental Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Pelanggan</Label>
              <Select>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Pilih pelanggan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ahmad Rizki</SelectItem>
                  <SelectItem value="2">Siti Nurhaliza</SelectItem>
                  <SelectItem value="3">Budi Santoso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="car">Mobil</Label>
              <Select>
                <SelectTrigger id="car">
                  <SelectValue placeholder="Pilih mobil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Honda Jazz - B 5678 ABC</SelectItem>
                  <SelectItem value="2">Suzuki Ertiga - B 9012 DEF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Tanggal Mulai</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Selesai</Label>
              <Input id="endDate" type="date" />
            </div>
            <Button className="w-full">Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Aktif ({activeRentals.length})</TabsTrigger>
          <TabsTrigger value="completed">Selesai ({completedRentals.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-3 mt-4">
          {activeRentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} getStatusBadge={getStatusBadge} />
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-3 mt-4">
          {completedRentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} getStatusBadge={getStatusBadge} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RentalCard({
  rental,
  getStatusBadge
}: {
  rental: Rental;
  getStatusBadge: (status: Rental['status']) => JSX.Element;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-gray-900">{rental.customerName}</h3>
            <p className="text-sm text-gray-500">{rental.carModel}</p>
            <p className="text-xs text-gray-400">{rental.plateNumber}</p>
          </div>
          {getStatusBadge(rental.status)}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="size-4" />
          <span>
            {new Date(rental.startDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short'
            })}{' '}
            -{' '}
            {new Date(rental.endDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
          <span className="text-gray-400">({rental.totalDays} hari)</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-blue-600">
            Rp {rental.totalPrice.toLocaleString('id-ID')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
