# 🎯 QUICK START GUIDE

**Aplikasi Rental Mobil - Admin Panel dengan Login**

---

## 🚀 LANGKAH CEPAT (3 Menit)

### 1. Install & Run
```bash
npm install
npm run dev
```

### 2. Buka Browser
```
http://localhost:5173
```

### 3. Login
```
Username: admin
Password: admin123
```

✅ **Done!** Anda sudah masuk ke dashboard!

---

## 📚 DOKUMENTASI

| Untuk Apa? | Baca File Ini |
|------------|---------------|
| 🆕 Baru mulai? | **START_HERE.md** |
| ⚡ Edit cepat? | **QUICK_REFERENCE.md** |
| 📖 Tutorial lengkap? | **TUTORIAL_EDIT_VS_CODE.md** |
| 🔐 Ubah login? | **DOKUMENTASI_LOGIN.md** |
| 🚗 Edit data mobil? | **PANDUAN_EDIT_MOBIL.md** |
| 🔄 Sinkronisasi data? | **PANDUAN_EDIT_PLAT_NOMOR.md** |
| 🌐 Deploy aplikasi? | **CARA_DEPLOY.md** |
| 📋 Index semua docs? | **README.md** |

---

## 🎯 EDIT PALING SERING

### Ganti Login
```typescript
// File: /components/Login.tsx (baris 25)
if (username === 'admin' && password === 'admin123') {
// Ganti dengan kredensial baru
```

### Tambah Mobil
```typescript
// File: /lib/data.ts
export const initialMobils: Mobil[] = [
  // ... mobil lain
  {
    id: 16,
    brand: 'Honda',
    model: 'Civic',
    // ... dst
  }
];
```

### Edit Harga
```typescript
// File: /lib/data.ts
{
  id: 1,
  pricePerDay: 500000,  // ← Ubah angka ini
}
```

### Ganti Warna
```typescript
// Semua file komponen
className="bg-blue-600"  // ← Ganti blue dengan warna lain
```

---

## 📂 STRUKTUR PENTING

```
/lib/data.ts                  ← 💾 DATABASE
/components/Login.tsx         ← 🔐 Login Page
/App.tsx                      ← 🏠 Main App
/README.md                    ← 📚 Index Dokumentasi
```

---

## 🆘 MASALAH?

| Problem | Solution |
|---------|----------|
| Aplikasi tidak jalan | `npm install && npm run dev` |
| Perubahan tidak muncul | `Ctrl + F5` di browser |
| Error | Check console (F12) |
| Lupa password | Edit `/components/Login.tsx` |

---

## ✨ FITUR

- ✅ Login dengan persistent session
- ✅ Dashboard dengan statistik real-time
- ✅ Manajemen Mobil (CRUD + foto preview)
- ✅ Manajemen Pesanan (konfirmasi & tracking)
- ✅ Manajemen Mitra
- ✅ Laporan Penyewaan
- ✅ Profil Admin
- ✅ Logout button
- ✅ Mobile responsive
- ✅ 15 mobil, 3 mitra, multiple pesanan

---

## 📱 TEST RESPONSIVE

```bash
Browser → F12 → Toggle Device Toolbar
Test di iPhone, iPad, Desktop
```

---

## 🌐 DEPLOY

```bash
# Build
npm run build

# Deploy ke Vercel (gratis)
npm install -g vercel
vercel
```

Lihat **CARA_DEPLOY.md** untuk opsi lainnya.

---

## ⚠️ PENTING

1. **Ganti kredensial** sebelum deploy production!
2. **Backup file** sebelum edit besar
3. **Baca PANDUAN_EDIT_PLAT_NOMOR.md** jika edit mobil yang sudah punya pesanan
4. **Test setelah edit** untuk pastikan tidak ada error

---

## 🎓 LEARNING PATH

**Pemula:**
```
START_HERE → QUICK_REFERENCE → Praktek Edit
```

**Advanced:**
```
TUTORIAL_EDIT_VS_CODE → DOKUMENTASI_LOGIN → Custom Feature
```

---

## 💻 VS CODE SHORTCUTS

| Shortcut | Fungsi |
|----------|--------|
| Ctrl + S | Save |
| Ctrl + P | Quick open file |
| Ctrl + F | Find in file |
| Ctrl + H | Find & Replace |
| Ctrl + ` | Toggle terminal |
| F12 | Go to definition |

---

## 🎉 SELESAI!

**Aplikasi siap digunakan!**

Butuh bantuan? Baca dokumentasi di atas atau check console untuk error.

**Happy Coding! 💪**

---

*Version 2.0 | December 2024*
