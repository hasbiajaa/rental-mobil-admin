# 🚗 RentCar Management

Aplikasi mobile-friendly untuk administrasi persewaan mobil dengan fitur lengkap.

> 🎓 **Dibuat untuk Tugas Kuliah - Desain UI/UX**

---

## 📱 Fitur Utama

### 1. **Dashboard**
- Statistik real-time (total mobil, pesanan, mitra, pendapatan)
- Grafik penyewaan bulanan dengan Recharts
- Quick access cards ke menu utama
- Hero banner dengan gambar mobil

### 2. **Manajemen Mobil**
- Daftar 15 mobil (7 milik rental, 8 milik mitra)
- Filter berdasarkan status dan kepemilikan
- Status mobil: Available, Rented, Maintenance
- CRUD operations (Create, Read, Update, Delete)

### 3. **Manajemen Pesanan**
- Tab berbeda untuk setiap status pesanan
- Workflow: Pending → Confirmed → Ongoing → Completed
- Detail pesanan lengkap dengan rincian pembayaran
- Konfirmasi dan penolakan pesanan

### 4. **Manajemen Mitra**
- 3 mitra aktif dengan data mobil dan pendapatan
- Detail laporan pendapatan per mitra
- Daftar mobil yang dimiliki setiap mitra

### 5. **Laporan Penyewaan**
- Statistik pendapatan dan transaksi
- Grafik tren penyewaan dengan Recharts
- Riwayat transaksi lengkap
- Filter dan sorting data

### 6. **Profil**
- Informasi admin
- Settings dan preferences

---

## 🎨 Design Highlights

- ✨ **Mobile-first responsive design**
- 🌈 **Colorful gradient backgrounds** di setiap halaman
- 🖼️ **Hero banners** dengan gambar mobil dari Unsplash
- 🎭 **Smooth page transitions** dengan fade-in dan slide-in animations
- ⚡ **Staggered animations** pada cards dan stats
- 🧭 **Sidebar navigation** dengan floating back-to-home button
- 💎 **Modern UI components** dengan Tailwind CSS

---

## 🚀 Teknologi

- **React 18** dengan TypeScript
- **Tailwind CSS v4.0** untuk styling
- **Recharts** untuk grafik dan charts
- **Lucide React** untuk icons
- **Sonner** untuk toast notifications
- **Shadcn/ui** components (Dialog, Tabs, Card, dll)

---

## 🔐 Login Credentials

Untuk demo/tugas kuliah:
- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **Note:** Ini adalah aplikasi demo untuk tugas kuliah. Data bersifat dummy dan akan reset setiap kali halaman di-refresh.

---

## 📁 Struktur Project

```
/
├── components/
│   ├── Dashboard.tsx
│   ├── ManajemenMobil.tsx
│   ├── ManajemenPesanan.tsx
│   ├── ManajemenMitra.tsx
│   ├── LaporanPenyewaan.tsx
│   ├── Profil.tsx
│   ├── Login.tsx
│   └── ui/               # Shadcn/ui components
├── lib/
│   └── data.ts          # Mock data
├── styles/
│   └── globals.css      # Global styles & Tailwind
├── App.tsx              # Main app component
└── README.md
```

---

## 🎯 Data Structure

### Mobil (Cars)
- Total: 15 mobil
- Milik Rental: 7 mobil
- Milik Mitra: 8 mobil
- Status: Available, Rented, Maintenance

### Mitra (Partners)
- Total: 3 mitra aktif
- Setiap mitra memiliki 2-3 mobil
- Tracking pendapatan per mitra

### Pesanan (Orders)
- Status workflow: Pending → Confirmed → Ongoing → Completed
- Perhitungan otomatis: harga × durasi hari
- Tracking status mobil berdasarkan pesanan

---

## 🌐 Deployment

### Cara Deploy:

#### **Option 1: Download & Deploy Manual**
1. Download semua code dari Figma Make
2. Setup project dengan Vite locally
3. Push ke GitHub
4. Deploy ke Vercel/Netlify

Lihat **DEPLOYMENT_GUIDE.md** untuk panduan lengkap!

#### **Option 2: Figma Make Auto Deploy**
1. Gunakan fitur deploy dari Figma Make
2. Aplikasi langsung live!

---

## 📝 Notes untuk Tugas Kuliah

### ✅ Yang Sudah Diimplementasikan:
- [x] UI/UX Design yang modern dan colorful
- [x] Responsive design (mobile-first)
- [x] Smooth animations dan transitions
- [x] Complete user flow untuk rental workflow
- [x] Data visualization dengan charts
- [x] CRUD operations untuk manajemen data
- [x] Role-based views (owner vs mitra)
- [x] Consistent design system

### 📊 Poin untuk Presentasi:
1. **User Experience**
   - Intuitive navigation
   - Clear visual hierarchy
   - Smooth interactions

2. **Visual Design**
   - Consistent color palette
   - Modern gradient usage
   - Professional typography

3. **Functionality**
   - Complete rental workflow
   - Data management
   - Real-time updates

4. **Responsive Design**
   - Mobile-optimized
   - Touch-friendly interactions
   - Adaptive layouts

---

## ⚠️ Disclaimer

**Aplikasi ini dibuat untuk keperluan tugas kuliah Desain UI/UX:**

- ✓ Data bersifat dummy/mock data
- ✓ Tidak menggunakan database backend
- ✓ Data tersimpan di state (reset on refresh)
- ✓ Fokus pada tampilan dan user experience
- ✓ Tidak untuk production/real use

---

## 🎓 Credits

Dibuat untuk Tugas Kuliah - Desain UI/UX
**Aplikasi Admin Rental Mobil**

---

**Happy Presenting! 🎉**