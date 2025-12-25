import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  status: 'available' | 'rented' | 'maintenance';
  pricePerDay: number;
  image: string;
}

export function CarInventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cars] = useState<Car[]>([
    {
      id: 1,
      brand: 'Toyota',
      model: 'Avanza',
      year: 2022,
      plateNumber: 'B 1234 XYZ',
      status: 'rented',
      pricePerDay: 350000,
      image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400'
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Jazz',
      year: 2023,
      plateNumber: 'B 5678 ABC',
      status: 'available',
      pricePerDay: 400000,
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400'
    },
    {
      id: 3,
      brand: 'Suzuki',
      model: 'Ertiga',
      year: 2021,
      plateNumber: 'B 9012 DEF',
      status: 'available',
      pricePerDay: 325000,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
    },
    {
      id: 4,
      brand: 'Daihatsu',
      model: 'Xenia',
      year: 2022,
      plateNumber: 'B 3456 GHI',
      status: 'maintenance',
      pricePerDay: 300000,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400'
    },
    {
      id: 5,
      brand: 'Mitsubishi',
      model: 'Pajero Sport',
      year: 2023,
      plateNumber: 'B 7890 JKL',
      status: 'available',
      pricePerDay: 750000,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'
    },
    {
      id: 6,
      brand: 'Toyota',
      model: 'Innova Reborn',
      year: 2022,
      plateNumber: 'B 2468 MNO',
      status: 'rented',
      pricePerDay: 500000,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'
    }
  ]);

  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.model} ${car.plateNumber}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Car['status']) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-700">Tersedia</Badge>;
      case 'rented':
        return <Badge className="bg-blue-100 text-blue-700">Disewa</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-700">Maintenance</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Add */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari mobil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" className="shrink-0">
              <Plus className="size-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Mobil Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Merek</Label>
                <Input id="brand" placeholder="Toyota" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="Avanza" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Tahun</Label>
                <Input id="year" type="number" placeholder="2023" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plate">Nomor Plat</Label>
                <Input id="plate" placeholder="B 1234 XYZ" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Harga per Hari (Rp)</Label>
                <Input id="price" type="number" placeholder="350000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Tersedia</SelectItem>
                    <SelectItem value="rented">Disewa</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Car List */}
      <div className="space-y-3">
        {filteredCars.map((car) => (
          <Card key={car.id}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-24 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-gray-900">
                      {car.brand} {car.model}
                    </h3>
                    {getStatusBadge(car.status)}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{car.plateNumber}</p>
                  <p className="text-sm text-gray-500">Tahun {car.year}</p>
                  <p className="text-blue-600 mt-1">
                    Rp {car.pricePerDay.toLocaleString('id-ID')}/hari
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
