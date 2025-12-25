# ⚡ QUICK DEPLOY GUIDE

> Super cepat! Copy-paste commands ini untuk deploy ke GitHub & Vercel

---

## 🚀 LANGKAH CEPAT (5 MENIT!)

### 1️⃣ Setup Local & Push ke GitHub

```bash
# Masuk ke folder project
cd rental-mobil-admin

# Install dependencies
npm install

# Test aplikasi
npm run dev
# Buka: http://localhost:5173

# Test build
npm run build

# Init git
git init
git add .
git commit -m "Initial commit: Rental Mobil Admin"

# Push ke GitHub (ganti <username> dengan username GitHub Anda)
git branch -M main
git remote add origin https://github.com/<username>/rental-mobil-admin.git
git push -u origin main
```

### 2️⃣ Deploy ke Vercel

1. Buka: https://vercel.com
2. Login dengan GitHub
3. Klik **"Add New..."** → **"Project"**
4. Import repository: `rental-mobil-admin`
5. Settings auto-detect (jangan ubah!)
6. Klik **"Deploy"**
7. ✅ Done! Copy URL aplikasi

---

## 🔄 Update Setelah Edit

```bash
git add .
git commit -m "Update: <deskripsi>"
git push
# Vercel auto-deploy dalam 1-2 menit!
```

---

## 🎯 UNTUK TUGAS KULIAH

**Yang Anda Butuhkan:**

1. ✅ **Live Demo URL:** `https://your-app.vercel.app`
2. ✅ **GitHub Repo:** `https://github.com/username/repo`
3. ✅ **Login:** admin / admin123
4. ✅ **Screenshots:** Semua halaman

---

## ⚠️ AMAN UNTUK TUGAS KULIAH

✅ Data adalah dummy/demo
✅ No database needed
✅ Public repository OK
✅ Fokus UI/UX only

---

## 📚 Full Guide

Lihat **DEPLOYMENT_GUIDE.md** untuk panduan lengkap dengan troubleshooting!

---

**Good luck! 🎓🚀**
