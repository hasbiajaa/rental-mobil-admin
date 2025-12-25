import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Search, Phone, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  idNumber: string;
  totalRentals: number;
}

export function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Ahmad Rizki',
      phone: '081234567890',
      email: 'ahmad.rizki@email.com',
      address: 'Jl. Sudirman No. 123, Jakarta',
      idNumber: '3174012345678901',
      totalRentals: 8
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      phone: '081298765432',
      email: 'siti.nurhaliza@email.com',
      address: 'Jl. Gatot Subroto No. 45, Jakarta',
      idNumber: '3174019876543210',
      totalRentals: 5
    },
    {
      id: 3,
      name: 'Budi Santoso',
      phone: '081345678901',
      email: 'budi.santoso@email.com',
      address: 'Jl. Thamrin No. 78, Jakarta',
      idNumber: '3174015678901234',
      totalRentals: 12
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      phone: '081456789012',
      email: 'dewi.lestari@email.com',
      address: 'Jl. Rasuna Said No. 90, Jakarta',
      idNumber: '3174014567890123',
      totalRentals: 3
    },
    {
      id: 5,
      name: 'Eko Prasetyo',
      phone: '081567890123',
      email: 'eko.prasetyo@email.com',
      address: 'Jl. Kuningan No. 56, Jakarta',
      idNumber: '3174013456789012',
      totalRentals: 7
    }
  ]);

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.phone} ${customer.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search and Add */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari pelanggan..."
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
              <DialogTitle>Tambah Pelanggan Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Ahmad Rizki" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" type="tel" placeholder="081234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ahmad@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">Nomor KTP</Label>
                <Input id="idNumber" placeholder="3174012345678901" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input id="address" placeholder="Jl. Sudirman No. 123" />
              </div>
              <Button className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Customer List */}
      <div className="space-y-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900 mb-1">{customer.name}</h3>
                  <p className="text-xs text-gray-500">KTP: {customer.idNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">{customer.totalRentals}x rental</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="size-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="size-4" />
                  <span>{customer.email}</span>
                </div>
                <p className="text-sm text-gray-500 pl-6">{customer.address}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
