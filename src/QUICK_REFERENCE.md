# ⚡ QUICK REFERENCE - Edit Cepat

Panduan singkat untuk edit cepat aplikasi Rental Mobil.

---

## 🔥 YANG PALING SERING DIEDIT

### 1️⃣ GANTI USERNAME & PASSWORD LOGIN

**File:** `/components/Login.tsx` (baris ~27)

```typescript
// Cari ini:
if (username === 'admin' && password === 'admin123') {
  
// Ganti jadi:
if (username === 'myusername' && password === 'mypassword') {
```

**Jangan lupa update info di halaman login (baris ~107):**
```typescript
<span className="block">Username: <strong className="text-gray-900">myusername</strong></span>
<span className="block">Password: <strong className="text-gray-900">mypassword</strong></span>
```

**📖 Tutorial lengkap:** Lihat `/DOKUMENTASI_LOGIN.md`

---

### 2️⃣ TAMBAH MOBIL BARU

**File:** `/lib/data.ts` (baris ~47)

```typescript
// Tambah di akhir array initialMobils:
{
  id: 16,  // ID unik baru
  brand: 'Honda',
  model: 'Civic',
  year: 2024,
  plateNumber: 'D 1234 XYZ',
  status: 'available',
  pricePerDay: 350000,
  image: 'https://i.pinimg.com/736x/xxx.jpg',
  ownerType: 'rental',
  ownerName: 'Rental Mobil Utama'
}
```

---

### 3️⃣ EDIT HARGA MOBIL

**File:** `/lib/data.ts`

Cari mobil berdasarkan ID atau plat nomor, ubah `pricePerDay`:

```typescript
{
  id: 1,
  // ...
  pricePerDay: 450000,  // ← Ubah angka ini
  // ...
}
```

---

### 4️⃣ GANTI FOTO MOBIL

**File:** `/lib/data.ts`

```typescript
{
  id: 1,
  // ...
  image: 'https://i.pinimg.com/736x/NEW_URL.jpg',  // ← URL baru
  // ...
}
```

**Tips:** Cari foto di Pinterest, klik kanan → Copy Image Address

---

### 5️⃣ UBAH WARNA TEMA APLIKASI

**File:** `/App.tsx` dan komponen lainnya

Ganti `blue` dengan warna lain:

```typescript
// Contoh di Login.tsx
className="bg-blue-600"      // ← biru
className="bg-purple-600"    // ← ungu
className="bg-green-600"     // ← hijau
className="bg-red-600"       // ← merah
className="bg-indigo-600"    // ← indigo
```

Tailwind colors: `gray`, `red`, `orange`, `yellow`, `green`, `blue`, `indigo`, `purple`, `pink`

Intensitas: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`

---

### 6️⃣ GANTI NAMA APLIKASI

**File:** `/components/Login.tsx` (baris ~42)

```typescript
<h1 className="text-white text-3xl mb-2">Rental Mobil</h1>  // ← Ubah ini
<p className="text-blue-100">Admin Panel</p>  // ← Dan ini
```

**File:** `/App.tsx` (baris ~60)

```typescript
<h2>Rental Mobil</h2>  // ← Ubah ini
<p className="text-sm text-blue-100">Admin Panel</p>  // ← Dan ini
```

---

### 7️⃣ HAPUS MOBIL

**File:** `/lib/data.ts`

Hapus seluruh block object (dari `{` sampai `},`):

```typescript
// HAPUS SELURUH INI:
{
  id: 5,
  brand: 'Suzuki',
  model: 'Ertiga',
  // ... dst
},  // ← Jangan lupa hapus koma jika mobil terakhir
```

---

### 8️⃣ UBAH STATUS MOBIL

**File:** `/lib/data.ts`

```typescript
{
  id: 1,
  // ...
  status: 'available',   // ← available | rented | maintenance
  // ...
}
```

- `available` = Tersedia
- `rented` = Sedang Disewa
- `maintenance` = Dalam Perawatan

---

### 9️⃣ TAMBAH MITRA BARU

**File:** `/lib/data.ts` (cari `initialMitras`)

```typescript
{
  id: 4,  // ID unik baru
  name: 'Budi Santoso',
  companyName: 'CV Mitra Jaya',
  phone: '081234567890',
  email: 'budi@example.com',
  address: 'Jakarta',
  totalCars: 0,  // Akan otomatis terhitung
  activeCars: 0,
  totalRevenue: 0,
  registeredDate: '2024-01-15'
}
```

---

### 🔟 EDIT PROFIL ADMIN

**File:** `/components/Profil.tsx`

Cari dan edit data di bagian `return`:

```typescript
<div className="p-6">
  <div className="flex items-center gap-4 mb-6">
    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
      <UserCircle className="size-12 text-white" />
    </div>
    <div>
      <h3>Administrator</h3>  // ← Ubah nama
      <p className="text-gray-600">admin@rental.com</p>  // ← Ubah email
    </div>
  </div>
  // ...
```

---

## 🎯 LOKASI FILE PENTING

```
/lib/data.ts                  ← DATA UTAMA (mobil, pesanan, mitra)
/components/Login.tsx         ← Halaman login & kredensial
/App.tsx                      ← File utama aplikasi
/components/ManajemenMobil.tsx  ← Form tambah/edit mobil
/styles/globals.css           ← Style CSS global
```

---

## ⚙️ COMMAND TERMINAL

```bash
# Install dependencies (sekali saja)
npm install

# Jalankan aplikasi
npm run dev

# Stop aplikasi
Ctrl + C

# Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🚨 PENTING!

1. **Selalu backup file sebelum edit besar**
2. **Save file (Ctrl+S) setelah edit**
3. **Refresh browser (Ctrl+R) jika perubahan tidak muncul**
4. **Lihat Console di browser (F12) jika ada error**

---

## 🔍 CARA CARI & GANTI CEPAT

Di VS Code:

1. **Ctrl + F** → Cari dalam 1 file
2. **Ctrl + H** → Find & Replace dalam 1 file
3. **Ctrl + Shift + F** → Cari di semua file
4. **Ctrl + Shift + H** → Find & Replace di semua file

---

## 💾 CARA SAVE & RELOAD

1. Edit file di VS Code
2. **Ctrl + S** untuk save
3. Browser otomatis reload (hot reload)
4. Jika tidak reload → **Ctrl + R** di browser

---

## ❓ ERROR UMUM

### "npm: command not found"
→ Install Node.js dulu

### "Port 5173 already in use"
→ Matikan terminal lain yang menjalankan `npm run dev`

### Perubahan tidak muncul
→ Hard refresh browser: **Ctrl + F5**

### TypeScript error merah
→ Pastikan type data benar (id: number, name: string, dll)

---

## 📱 TEST RESPONSIVE

Buka di browser:
- **F12** → Toggle device toolbar
- Pilih iPhone/Android untuk test tampilan mobile

---

## 🎨 WARNA TAILWIND POPULER

Background:
- `bg-white` `bg-gray-100` `bg-gray-900`
- `bg-blue-500` `bg-blue-600` `bg-blue-700`
- `bg-red-500` `bg-green-500` `bg-yellow-500`

Text:
- `text-white` `text-black` `text-gray-600`
- `text-blue-600` `text-red-600` `text-green-600`

---

**Lihat tutorial lengkap di: `/TUTORIAL_EDIT_VS_CODE.md`**