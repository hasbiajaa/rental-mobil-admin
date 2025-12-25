# 🚀 CARA DEPLOY & JALANKAN APLIKASI

Panduan lengkap untuk menjalankan aplikasi secara lokal dan deploy ke production.

---

## 💻 JALANKAN LOKAL (DEVELOPMENT)

### Persyaratan:
- Node.js versi 18+ (download: https://nodejs.org/)
- VS Code atau text editor lainnya
- Terminal/Command Prompt
- Browser modern (Chrome, Firefox, Edge)

### Langkah-langkah:

#### 1. Download/Clone Proyek
```bash
# Jika dari git
git clone <repository-url>
cd rental-mobil

# Atau extract dari ZIP ke folder
```

#### 2. Install Dependencies
```bash
npm install
```

Proses ini akan:
- Download semua package yang dibutuhkan
- Install React, TypeScript, Tailwind, dll
- Memakan waktu 1-3 menit (tergantung internet)

#### 3. Jalankan Development Server
```bash
npm run dev
```

Output yang akan muncul:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

#### 4. Buka di Browser
- Klik link atau ketik: `http://localhost:5173`
- Aplikasi akan terbuka
- Login dengan: `admin` / `admin123`

#### 5. Edit & Hot Reload
- Edit file di VS Code
- Save (Ctrl+S)
- Browser otomatis refresh
- Lihat perubahan instantly!

### Stop Development Server:
- Tekan `Ctrl + C` di terminal
- Atau tutup terminal window

---

## 📦 BUILD UNTUK PRODUCTION

### Build Project:
```bash
npm run build
```

Akan membuat folder `/dist` dengan file production-ready:
- HTML, CSS, JS yang sudah di-minify
- Optimized untuk performance
- Siap deploy ke hosting

### Preview Build:
```bash
npm run preview
```

Test production build di local:
- Buka: `http://localhost:4173`
- Test semua fitur
- Pastikan tidak ada error

---

## 🌐 DEPLOY KE HOSTING

### Opsi 1: Vercel (RECOMMENDED - Gratis)

**Langkah:**

1. Buat akun di https://vercel.com (gratis)
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Login:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow prompts:
   - Project name: `rental-mobil`
   - Setup: `y` (yes)
   - Framework: `vite`
   - Build command: `npm run build`
   - Output directory: `dist`

6. Done! Vercel akan berikan URL: `https://rental-mobil-xxx.vercel.app`

**Update setelah edit:**
```bash
git add .
git commit -m "Update data"
git push
# Vercel auto-deploy dari git
```

---

### Opsi 2: Netlify (Gratis)

**Via UI:**

1. Buka https://netlify.com
2. Sign up (gratis)
3. Drag & drop folder `/dist` ke dashboard
4. Done!

**Via CLI:**

```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

---

### Opsi 3: GitHub Pages (Gratis)

1. Push code ke GitHub
2. Install gh-pages:
```bash
npm install -g gh-pages
```

3. Tambah di `package.json`:
```json
{
  "homepage": "https://<username>.github.io/<repo-name>",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

---

### Opsi 4: Firebase Hosting (Gratis)

```bash
# Install
npm install -g firebase-tools

# Login
firebase login

# Init
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

---

### Opsi 5: Manual Upload (Shared Hosting)

1. Build project:
```bash
npm run build
```

2. Folder `/dist` akan terisi dengan file:
   - index.html
   - /assets/*.js
   - /assets/*.css

3. Upload semua isi folder `/dist` ke hosting:
   - Via FTP/SFTP
   - Via cPanel File Manager
   - Ke folder `public_html` atau `www`

4. Akses via domain/subdomain

---

## ⚙️ KONFIGURASI SEBELUM DEPLOY

### 1. Ganti Kredensial Login
📄 File: `/components/Login.tsx`

```typescript
// GANTI INI SEBELUM DEPLOY!
if (username === 'admin' && password === 'admin123') {
  
// Jadi kredensial yang aman:
if (username === 'your_secure_username' && password === 'Your$ecureP@ss123!') {
```

⚠️ **PENTING:** Jangan gunakan kredensial default di production!

### 2. Hapus Console.log
Cari dan hapus semua `console.log()` di semua file:

```bash
# Search di VS Code:
Ctrl + Shift + F
Cari: console.log
Hapus yang tidak perlu
```

### 3. Update Data Production
Edit `/lib/data.ts`:
- Ganti data dummy dengan data real
- Update foto mobil dengan URL yang valid
- Update info mitra dengan data real

### 4. Test Responsive
Buka di browser → F12 → Toggle device toolbar
Test di:
- iPhone (375px)
- iPad (768px)
- Desktop (1920px)

### 5. Security Check
- ✅ Password sudah diganti
- ✅ Tidak ada data sensitif di code
- ✅ Console.log sudah dihapus
- ✅ Error handling sudah baik

---

## 🔒 ENVIRONMENT VARIABLES (Opsional)

Untuk hide sensitive data, buat `.env` file:

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Rental Mobil
```

Pakai di code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**PENTING:** Jangan commit `.env` ke git!

Tambah ke `.gitignore`:
```
.env
.env.local
```

---

## 📊 MONITORING PRODUCTION

### Check Error:
1. Open browser console (F12)
2. Check tab Console untuk error
3. Check tab Network untuk failed requests

### Analytics (Opsional):
Add Google Analytics:
```html
<!-- Di index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

---

## 🐛 TROUBLESHOOTING DEPLOY

### Build Error:
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### 404 Error di Production:
Tambah `_redirects` file di `/public`:
```
/*    /index.html   200
```

### Styling Tidak Muncul:
Check `base` di `vite.config.ts`:
```typescript
export default {
  base: '/your-repo-name/'  // untuk GitHub Pages
}
```

### Login Tidak Berfungsi:
Check browser console untuk error localStorage

---

## 📝 DEPLOYMENT CHECKLIST

### Pre-Deploy:
- [ ] Ganti kredensial login
- [ ] Update data production
- [ ] Hapus console.log
- [ ] Test semua fitur
- [ ] Test responsive
- [ ] Build berhasil (`npm run build`)
- [ ] Preview build berfungsi (`npm run preview`)

### Deploy:
- [ ] Pilih hosting provider
- [ ] Deploy ke staging dulu (jika ada)
- [ ] Test di staging
- [ ] Deploy ke production

### Post-Deploy:
- [ ] Test live URL
- [ ] Test login
- [ ] Test semua CRUD operations
- [ ] Test di berbagai device
- [ ] Check browser console untuk error
- [ ] Share URL ke team

---

## 🔄 UPDATE SETELAH DEPLOY

### Vercel/Netlify (Auto):
```bash
git add .
git commit -m "Update features"
git push
# Auto-deploy!
```

### Manual:
```bash
npm run build
# Upload folder /dist baru
```

---

## 💡 TIPS

### 1. Custom Domain
Beli domain di Namecheap, GoDaddy, dll
Connect ke Vercel/Netlify:
- Vercel: Settings → Domains → Add
- Netlify: Site settings → Domain management

### 2. HTTPS
Vercel & Netlify provide free SSL otomatis

### 3. Speed Optimization
- Compress images
- Use CDN untuk assets
- Enable caching

### 4. SEO (Opsional)
Update `index.html`:
```html
<title>Rental Mobil Admin</title>
<meta name="description" content="...">
```

---

## 📞 SUPPORT

### Build Issues:
1. Check Node.js version: `node -v` (harus 18+)
2. Clear cache: `rm -rf node_modules && npm install`
3. Check error message di terminal

### Deploy Issues:
1. Check hosting documentation
2. Check build output di `/dist`
3. Check browser console

---

## 🎉 SELAMAT!

Aplikasi Anda sudah live di internet! 🚀

**Next Steps:**
- Share URL dengan team
- Setup monitoring
- Collect feedback
- Iterate & improve!

---

**Good luck! 💪**

*Last Updated: December 2024*
