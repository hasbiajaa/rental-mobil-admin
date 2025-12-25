# 🚀 START HERE - Panduan Mulai Edit

**Selamat datang!** Ini adalah panduan super cepat untuk mulai mengedit aplikasi Rental Mobil di VS Code.

---

## ⚡ 3 LANGKAH CEPAT

### 1️⃣ INSTALL SOFTWARE
- Download **VS Code**: https://code.visualstudio.com/
- Download **Node.js**: https://nodejs.org/ (pilih versi LTS)

### 2️⃣ BUKA PROYEK
```bash
# Buka terminal/command prompt
# Masuk ke folder proyek
cd path/ke/folder/rental-mobil

# Install dependencies
npm install

# Jalankan aplikasi
npm run dev
```

Buka browser → http://localhost:5173

### 3️⃣ MULAI EDIT!
Buka VS Code → Edit file → Save (Ctrl+S) → Refresh browser!

---

## 🎯 EDIT YANG PALING SERING DILAKUKAN

### 🎨 Warna Login (BARU!)
📁 **File:** `/components/Login.tsx` (baris 35)
**Lihat:** `CARA_GANTI_WARNA_LOGIN.md` untuk 15+ pilihan warna gradient!
- Biru (default) ✅
- Hijau, Ungu, Merah, Orange
- Ocean, Sunset, Galaxy, dan lainnya!

### Login Credentials
📁 **File:** `/components/Login.tsx` (baris 27)
```typescript
if (username === 'admin' && password === 'admin123') {
```
Ganti `admin` dan `admin123` dengan kredensial baru.

### Data Mobil
📁 **File:** `/lib/data.ts` (baris 47)
- Tambah mobil baru
- Edit harga, foto, plat nomor
- Ubah status mobil

### Nama Aplikasi
📁 **File:** `/components/Login.tsx` & `/App.tsx`
Cari dan ganti text "Rental Mobil" dan "Admin Panel"

### Warna Tema
📁 **File:** Semua komponen di `/components/`
Ganti `blue-600` dengan warna lain (purple, green, red, dll)

---

## 📚 DOKUMENTASI LENGKAP

### 🆕 Baru ditambahkan:
- ✅ **Halaman Login** - Username: `admin`, Password: `admin123`
- ✅ **Tombol Logout** - Di bagian bawah sidebar menu
- ✅ **Session Management** - Session bertahan sampai logout atau refresh

### 🔥 PUNYA PROJECT LAMA TANPA LOGIN?
**Baca:** `CARA_TAMBAH_LOGIN_KE_PROJECT_LAMA.md` untuk panduan step-by-step menambahkan login ke project Anda yang sudah ada!

### 📖 Baca dokumentasi lengkap:

| File | Deskripsi |
|------|-----------|
| `TUTORIAL_EDIT_VS_CODE.md` | 📘 Tutorial lengkap edit di VS Code (BACA INI DULU!) |
| `DOKUMENTASI_LOGIN.md` | 🔐 Detail sistem login & cara ganti kredensial |
| `CARA_GANTI_WARNA_LOGIN.md` | 🎨 15+ pilihan warna gradient login (BARU!) |
| `QUICK_REFERENCE.md` | ⚡ Cheat sheet edit cepat |
| `PANDUAN_EDIT_PLAT_NOMOR.md` | 🚗 Cara edit plat nomor & data mobil |
| `PANDUAN_EDIT_MOBIL.md` | 🔧 Panduan edit data mobil |

---

## 🛠️ COMMAND TERMINAL PENTING

```bash
# Jalankan aplikasi (development mode)
npm run dev

# Stop aplikasi
Ctrl + C

# Install package baru
npm install nama-package

# Clear & reinstall semua
rm -rf node_modules
npm install

# Check versi Node.js
node -v
```

---

## 🎨 TIPS EDITING

### Di VS Code:
- **Ctrl + S** → Save file
- **Ctrl + P** → Quick open file
- **Ctrl + F** → Find in file
- **Ctrl + H** → Find & Replace
- **Ctrl + Shift + F** → Search all files
- **Ctrl + `** → Toggle terminal

### Di Browser:
- **F12** → Open DevTools
- **Ctrl + R** → Reload
- **Ctrl + F5** → Hard reload
- **F12 → Console** → Lihat error

---

## 🔥 QUICK FIXES

### Aplikasi tidak jalan?
```bash
npm install
npm run dev
```

### Perubahan tidak muncul?
- Save file: **Ctrl + S**
- Refresh browser: **Ctrl + F5**

### Error "Port already in use"?
- Tutup terminal lain yang menjalankan `npm run dev`
- Atau restart komputer

### TypeScript error?
- Pastikan type data benar
- Hover mouse di error untuk detail

---

## 🎯 PROJECT STRUCTURE

```
rental-mobil/
├── /components/              # ← Semua komponen UI
│   ├── Login.tsx            # ← 🔐 Halaman login
│   ├── Dashboard.tsx        # ← 📊 Dashboard
│   ├── ManajemenMobil.tsx   # ← 🚗 Kelola mobil
│   ├── ManajemenPesanan.tsx # ← 📋 Kelola pesanan
│   └── ...
├── /lib/
│   └── data.ts              # ← 💾 DATABASE (edit di sini!)
├── App.tsx                  # ← 🏠 Main app file
└── /styles/
    └── globals.css          # ← 🎨 Styling
```

---

## ⚠️ PENTING SEBELUM EDIT

1. ✅ **Backup dulu!** Copy file sebelum edit
2. ✅ **Read documentation** Baca panduan yang relevan
3. ✅ **Test setelah edit** Pastikan aplikasi masih jalan
4. ✅ **Check console** Lihat F12 jika ada error

---

## 🆘 NEED HELP?

### Baca dokumentasi ini:
1. **TUTORIAL_EDIT_VS_CODE.md** → Tutorial lengkap
2. **QUICK_REFERENCE.md** → Reference cepat
3. **DOKUMENTASI_LOGIN.md** → Info sistem login

### Debug dengan:
- Browser Console (F12)
- Terminal output (di VS Code)
- `console.log()` di kode

---

## 🎓 LEARN MORE

### React:
https://react.dev/

### TypeScript:
https://www.typescriptlang.org/docs/

### Tailwind CSS:
https://tailwindcss.com/docs

### Lucide Icons:
https://lucide.dev/icons/

---

## ✅ CHECKLIST PEMULA

- [ ] Install VS Code & Node.js
- [ ] Buka proyek di VS Code
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Buka browser → localhost:5173
- [ ] Login dengan `admin` / `admin123`
- [ ] Edit `/lib/data.ts` → Tambah 1 mobil baru
- [ ] Save (Ctrl+S)
- [ ] Refresh browser → Lihat perubahan!

---

## 🎉 SELAMAT!

Kamu sudah siap untuk mulai mengedit aplikasi!

**Langkah selanjutnya:**
1. Baca `QUICK_REFERENCE.md` untuk edit cepat
2. Atau `TUTORIAL_EDIT_VS_CODE.md` untuk tutorial lengkap
3. Mulai eksperimen dengan data dan styling!

**Happy Coding! 💻✨**