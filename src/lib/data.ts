// Data shared untuk aplikasi rental mobil

export interface Mobil {
  id: number;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  status: 'available' | 'rented' | 'maintenance';
  pricePerDay: number;
  image: string;
  ownerType: 'rental' | 'mitra';
  ownerName: string;
}

export interface Pesanan {
  id: number;
  customerName: string;
  customerPhone: string;
  carId: number;
  carModel: string;
  carPlate: string;
  ownerType: 'rental' | 'mitra';
  ownerName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  orderDate: string;
}

export interface Mitra {
  id: number;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  totalCars: number;
  activeCars: number;
  totalRevenue: number;
  registeredDate: string;
}

export const initialMobils: Mobil[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Avanza',
    year: 2022,
    plateNumber: 'H 1652 NQ',
    status: 'rented',
    pricePerDay: 350000,
    image: 'https://i.pinimg.com/736x/c6/94/27/c6942748a44631dc9897cfc21bd1b976.jpg?w=400',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera'
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'Jazz',
    year: 2023,
    plateNumber: 'AD 1449 IU',
    status: 'available',
    pricePerDay: 400000,
    image: 'https://i.pinimg.com/1200x/61/4f/cc/614fcca42ab2c3052e66608445d1617d.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'PT Sejahtera Motor'
  },
  {
    id: 3,
    brand: 'Suzuki',
    model: 'Ertiga',
    year: 2021,
    plateNumber: 'AD 1233 NO',
    status: 'available',
    pricePerDay: 325000,
    image: 'https://i.pinimg.com/1200x/64/48/3b/64483b440d9c08f2689a8df4fd83e308.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport'
  },
  {
    id: 4,
    brand: 'Daihatsu',
    model: 'Xenia',
    year: 2022,
    plateNumber: 'K 1097 NN',
    status: 'maintenance',
    pricePerDay: 300000,
    image: 'https://i.pinimg.com/1200x/2f/b0/ad/2fb0adca16032269f6ce46d0d6afaee7.jpg?w=400',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera'
  },
  {
    id: 5,
    brand: 'Mitsubishi',
    model: 'Pajero Sport',
    year: 2023,
    plateNumber: 'L 1575 BAV',
    status: 'available',
    pricePerDay: 750000,
    image: 'https://i.pinimg.com/1200x/2c/97/83/2c978374ce410defeceb6c83231bb130.jpg?w=400',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera'
  },
  {
    id: 6,
    brand: 'Toyota',
    model: 'Innova Reborn',
    year: 2022,
    plateNumber: 'AD 1098 AA',
    status: 'rented',
    pricePerDay: 500000,
    image: 'https://i.pinimg.com/1200x/08/6f/c6/086fc6bdb33376f8220dea5bf84656b5.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'PT Maju Bersama'
  },
  {
    id: 7,
    brand: 'Honda',
    model: 'CR-V',
    year: 2023,
    plateNumber: 'H 3333 MAT',
    status: 'available',
    pricePerDay: 650000,
    image: 'https://i.pinimg.com/736x/64/b5/72/64b572720b2911bf924fe56cc4614fa5.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'PT Sejahtera Motor'
  },
  {
    id: 8,
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2023,
    plateNumber: 'F 1233 YA',
    status: 'available',
    pricePerDay: 800000,
    image: 'https://i.pinimg.com/736x/e8/e0/f8/e8e0f8c2b3624e359c050f3911db507b.jpg?w=400',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera'
  },
  {
    id: 9,
    brand: 'Daihatsu',
    model: 'Terios',
    year: 2022,
    plateNumber: 'AD 1534 AH',
    status: 'rented',
    pricePerDay: 375000,
    image: 'https://i.pinimg.com/1200x/18/35/d0/1835d02f1533e70996892cc6ba48d405.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport'
  },
  {
    id: 10,
    brand: 'Nissan',
    model: 'Livina',
    year: 2021,
    plateNumber: 'B 1021 ZA',
    status: 'available',
    pricePerDay: 340000,
    image: 'https://i.pinimg.com/736x/e2/2b/fe/e22bfe2cb314bb229723370712d10ecf.jpg?w=400',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera'
  },
  {
    id: 11,
    brand: 'Toyota',
    model: 'Alphard',
    year: 2023,
    plateNumber: 'B 1444 RIN',
    status: 'available',
    pricePerDay: 1200000,
    image: 'https://i.pinimg.com/1200x/bf/00/28/bf00286576a031c0e3e98563378244fb.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'PT Maju Bersama'
  },
  {
    id: 12,
    brand: 'Suzuki',
    model: 'XL 7',
    year: 2021,
    plateNumber: 'AD 1826 LO',
    status: 'maintenance',
    pricePerDay: 280000,
    image: 'https://i.pinimg.com/1200x/e9/b3/99/e9b399f583fccfc98f24f75d4dc69127.jpg?w=400',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera'
  },
  {
    id: 13,
    brand: 'Honda',
    model: 'Brio',
    year: 2022,
    plateNumber: 'B 1913 HIJ',
    status: 'available',
    pricePerDay: 320000,
    image: 'https://i.pinimg.com/1200x/cd/e4/38/cde438109185c4c83713a6f72899bf24.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'PT Sejahtera Motor'
  },
  {
    id: 14,
    brand: 'Mitsubishi',
    model: 'Xpander',
    year: 2023,
    plateNumber: 'G 1233 SEL',
    status: 'rented',
    pricePerDay: 450000,
    image: 'https://i.pinimg.com/736x/ae/b4/75/aeb475b1bfe3c821ef66ccbe0ba3e54d.jpg?w=400',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport'
  },
  {
    id: 15,
    brand: 'Toyota',
    model: 'Yaris Cross',
    year: 2022,
    plateNumber: 'B 1935 NOP',
    status: 'available',
    pricePerDay: 425000,
    image: 'https://i.pinimg.com/1200x/de/69/b6/de69b6b0fa8c57c7fe5803bce907901e.jpg?w=400',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera'
  }
];

export const initialPesanans: Pesanan[] = [
  // Pending - November 2025
  {
    id: 1,
    customerName: 'Ahmad Rizki',
    customerPhone: '081234567890',
    carId: 1,
    carModel: 'Toyota Avanza',
    carPlate: 'H 1652 NQ',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-11-15',
    endDate: '2025-11-18',
    totalDays: 3,
    pricePerDay: 350000,
    totalPrice: 1050000,
    status: 'pending',
    orderDate: '2025-11-12'
  },
  {
    id: 2,
    customerName: 'Siti Nurhaliza',
    customerPhone: '081298765432',
    carId: 2,
    carModel: 'Honda Jazz',
    carPlate: 'AD 1449 IU',
    ownerType: 'mitra',
    ownerName: 'PT Sejahtera Motor',
    startDate: '2025-11-13',
    endDate: '2025-11-19',
    totalDays: 6,
    pricePerDay: 400000,
    totalPrice: 2400000,
    status: 'pending',
    orderDate: '2025-11-12'
  },
  {
    id: 3,
    customerName: 'Rina Amalia',
    customerPhone: '081345671234',
    carId: 10,
    carModel: 'Nissan Livina',
    carPlate: 'B 1021 ZA',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-11-17',
    endDate: '2025-11-20',
    totalDays: 3,
    pricePerDay: 340000,
    totalPrice: 1020000,
    status: 'pending',
    orderDate: '2025-11-12'
  },
  {
    id: 4,
    customerName: 'Fajar Ramadhan',
    customerPhone: '081456782345',
    carId: 3,
    carModel: 'Suzuki Ertiga',
    carPlate: 'AD 1233 NO',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport',
    startDate: '2025-11-16',
    endDate: '2025-11-19',
    totalDays: 3,
    pricePerDay: 325000,
    totalPrice: 975000,
    status: 'pending',
    orderDate: '2025-11-12'
  },
  // Confirmed - November 2025
  {
    id: 5,
    customerName: 'Eko Prasetyo',
    customerPhone: '081567890123',
    carId: 7,
    carModel: 'Honda CR-V',
    carPlate: 'H 3333 MAT',
    ownerType: 'mitra',
    ownerName: 'PT Sejahtera Motor',
    startDate: '2025-11-14',
    endDate: '2025-11-17',
    totalDays: 3,
    pricePerDay: 650000,
    totalPrice: 1950000,
    status: 'confirmed',
    orderDate: '2025-11-11'
  },
  {
    id: 6,
    customerName: 'Linda Wijaya',
    customerPhone: '081678901234',
    carId: 8,
    carModel: 'Toyota Fortuner',
    carPlate: 'F 1233 YA',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-11-15',
    endDate: '2025-11-19',
    totalDays: 4,
    pricePerDay: 800000,
    totalPrice: 3200000,
    status: 'confirmed',
    orderDate: '2025-11-11'
  },
  {
    id: 7,
    customerName: 'Rudi Hartono',
    customerPhone: '081789012345',
    carId: 15,
    carModel: 'Toyota Yaris Cross',
    carPlate: 'B 9135 NOP',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-11-16',
    endDate: '2025-11-20',
    totalDays: 4,
    pricePerDay: 425000,
    totalPrice: 1700000,
    status: 'confirmed',
    orderDate: '2025-11-11'
  },
  // Ongoing - November 2025
  {
    id: 8,
    customerName: 'Budi Santoso',
    customerPhone: '081345678901',
    carId: 5,
    carModel: 'Mitsubishi Pajero Sport',
    carPlate: 'L 1575 BAV',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-11-10',
    endDate: '2025-11-14',
    totalDays: 4,
    pricePerDay: 750000,
    totalPrice: 3000000,
    status: 'ongoing',
    orderDate: '2025-11-09'
  },
  {
    id: 9,
    customerName: 'Maya Sari',
    customerPhone: '081890123456',
    carId: 9,
    carModel: 'Daihatsu Terios',
    carPlate: 'AD 1534 AH',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport',
    startDate: '2025-11-09',
    endDate: '2025-11-13',
    totalDays: 4,
    pricePerDay: 375000,
    totalPrice: 1500000,
    status: 'ongoing',
    orderDate: '2025-11-08'
  },
  {
    id: 10,
    customerName: 'Doni Saputra',
    customerPhone: '081901234567',
    carId: 14,
    carModel: 'Mitsubishi Xpander',
    carPlate: 'G 1233 SEL',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport',
    startDate: '2025-11-11',
    endDate: '2025-11-15',
    totalDays: 4,
    pricePerDay: 450000,
    totalPrice: 1800000,
    status: 'ongoing',
    orderDate: '2025-11-10'
  },
  // Completed - November 2025 (awal bulan)
  {
    id: 11,
    customerName: 'Dewi Lestari',
    customerPhone: '081456789012',
    carId: 6,
    carModel: 'Toyota Innova Reborn',
    carPlate: 'AD 1098 AA',
    ownerType: 'mitra',
    ownerName: 'PT Maju Bersama',
    startDate: '2025-11-01',
    endDate: '2025-11-06',
    totalDays: 5,
    pricePerDay: 500000,
    totalPrice: 2500000,
    status: 'completed',
    orderDate: '2025-10-30'
  },
  {
    id: 12,
    customerName: 'Andi Wijaya',
    customerPhone: '082012345678',
    carId: 11,
    carModel: 'Toyota Alphard',
    carPlate: 'B 1444 RIN',
    ownerType: 'mitra',
    ownerName: 'PT Maju Bersama',
    startDate: '2025-11-02',
    endDate: '2025-11-05',
    totalDays: 3,
    pricePerDay: 1200000,
    totalPrice: 3600000,
    status: 'completed',
    orderDate: '2025-10-31'
  },
  {
    id: 13,
    customerName: 'Siska Amelia',
    customerPhone: '082123456789',
    carId: 1,
    carModel: 'Toyota Avanza',
    carPlate: 'H 1652 NQ',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-11-03',
    endDate: '2025-11-07',
    totalDays: 4,
    pricePerDay: 350000,
    totalPrice: 1400000,
    status: 'completed',
    orderDate: '2025-11-01'
  },
  {
    id: 14,
    customerName: 'Joko Susilo',
    customerPhone: '082234567890',
    carId: 8,
    carModel: 'Toyota Fortuner',
    carPlate: 'F 1233 YA',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-11-04',
    endDate: '2025-11-09',
    totalDays: 5,
    pricePerDay: 800000,
    totalPrice: 4000000,
    status: 'completed',
    orderDate: '2025-11-02'
  },
  {
    id: 15,
    customerName: 'Putri Maharani',
    customerPhone: '082345678901',
    carId: 2,
    carModel: 'Honda Jazz',
    carPlate: 'AD 1449 IU',
    ownerType: 'mitra',
    ownerName: 'PT Sejahtera Motor',
    startDate: '2025-11-05',
    endDate: '2025-11-09',
    totalDays: 4,
    pricePerDay: 400000,
    totalPrice: 1600000,
    status: 'completed',
    orderDate: '2025-11-03'
  },
  // Completed - Oktober 2025 (bulan lalu untuk perbandingan)
  {
    id: 16,
    customerName: 'Hendra Gunawan',
    customerPhone: '082456789012',
    carId: 13,
    carModel: 'Honda Brio',
    carPlate: 'B 7913 HIJ',
    ownerType: 'mitra',
    ownerName: 'PT Sejahtera Motor',
    startDate: '2025-10-20',
    endDate: '2025-10-24',
    totalDays: 4,
    pricePerDay: 320000,
    totalPrice: 1280000,
    status: 'completed',
    orderDate: '2025-10-18'
  },
  {
    id: 17,
    customerName: 'Yanti Kusuma',
    customerPhone: '082567890123',
    carId: 9,
    carModel: 'Daihatsu Terios',
    carPlate: 'AD 1534 AH',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport',
    startDate: '2025-10-15',
    endDate: '2025-10-19',
    totalDays: 4,
    pricePerDay: 375000,
    totalPrice: 1500000,
    status: 'completed',
    orderDate: '2025-10-13'
  },
  {
    id: 18,
    customerName: 'Bambang Setiawan',
    customerPhone: '082678901234',
    carId: 15,
    carModel: 'Toyota Yaris Cross',
    carPlate: 'B 1935 NOP',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-10-22',
    endDate: '2025-10-27',
    totalDays: 5,
    pricePerDay: 425000,
    totalPrice: 2125000,
    status: 'completed',
    orderDate: '2025-10-20'
  },
  {
    id: 19,
    customerName: 'Dina Kartika',
    customerPhone: '082789012345',
    carId: 3,
    carModel: 'Suzuki Ertiga',
    carPlate: 'AD 1233 NO',
    ownerType: 'mitra',
    ownerName: 'CV Jaya Transport',
    startDate: '2025-10-10',
    endDate: '2025-10-14',
    totalDays: 4,
    pricePerDay: 325000,
    totalPrice: 1300000,
    status: 'completed',
    orderDate: '2025-10-08'
  },
  {
    id: 20,
    customerName: 'Arief Rahman',
    customerPhone: '082890123456',
    carId: 10,
    carModel: 'Nissan Livina',
    carPlate: 'B 1021 ZA',
    ownerType: 'rental',
    ownerName: 'Rental Sejahtera',
    startDate: '2025-10-25',
    endDate: '2025-10-29',
    totalDays: 4,
    pricePerDay: 340000,
    totalPrice: 1360000,
    status: 'completed',
    orderDate: '2025-10-23'
  }
];

export const initialMitras: Mitra[] = [
  {
    id: 1,
    name: 'Budi Hartono',
    companyName: 'PT Sejahtera Motor',
    phone: '081234567890',
    email: 'budi@sejahtera.com',
    address: 'Jl. Batik Keris, sukoharjo',
    totalCars: 3,
    activeCars: 3,
    totalRevenue: 0, // Will be calculated
    registeredDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    companyName: 'CV Jaya Transport',
    phone: '081298765432',
    email: 'siti@jayatransport.com',
    address: 'Jl. Gatot Subroto No. 45, surakarta',
    totalCars: 3,
    activeCars: 3,
    totalRevenue: 0, // Will be calculated
    registeredDate: '2024-02-20'
  },
  {
    id: 3,
    name: 'Ahmad Wijaya',
    companyName: 'PT Maju Bersama',
    phone: '081345678901',
    email: 'ahmad@majubersama.com',
    address: 'Jl. samanhudi No. 78, Solo',
    totalCars: 2,
    activeCars: 2,
    totalRevenue: 0, // Will be calculated
    registeredDate: '2023-11-10'
  }
];

// Helper function to calculate revenue
export function calculateMitraRevenue(mitraName: string, pesanans: Pesanan[]): number {
  return pesanans
    .filter(p => p.ownerType === 'mitra' && p.ownerName === mitraName && p.status === 'completed')
    .reduce((sum, p) => sum + p.totalPrice, 0);
}

export function calculateTotalRevenue(pesanans: Pesanan[]): number {
  return pesanans
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.totalPrice, 0);
}

export function calculateRentalRevenue(pesanans: Pesanan[]): number {
  return pesanans
    .filter(p => p.ownerType === 'rental' && p.status === 'completed')
    .reduce((sum, p) => sum + p.totalPrice, 0);
}

export function calculateMitraRevenueTotal(pesanans: Pesanan[]): number {
  return pesanans
    .filter(p => p.ownerType === 'mitra' && p.status === 'completed')
    .reduce((sum, p) => sum + p.totalPrice, 0);
}

export function getMonthlyRevenue(pesanans: Pesanan[], year: number, month: number): number {
  return pesanans
    .filter(p => {
      if (p.status !== 'completed') return false;
      const date = new Date(p.endDate);
      return date.getFullYear() === year && date.getMonth() === month;
    })
    .reduce((sum, p) => sum + p.totalPrice, 0);
}