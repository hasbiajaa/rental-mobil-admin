import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ManajemenMobil } from './components/ManajemenMobil';
import { ManajemenPesanan } from './components/ManajemenPesanan';
import { ManajemenMitra } from './components/ManajemenMitra';
import { LaporanPenyewaan } from './components/LaporanPenyewaan';
import { Profil } from './components/Profil';
import { Login } from './components/Login';
import { Car, LayoutDashboard, FileText, Users, BarChart3, UserCircle, Menu, LogOut, Home, ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { initialMobils, initialPesanans, initialMitras, type Mobil, type Pesanan, type Mitra } from './lib/data';
import logoImage from './assets/logo.png';

type TabType = 'dashboard' | 'mobil' | 'pesanan' | 'mitra' | 'laporan' | 'profil';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobils, setMobils] = useState<Mobil[]>(initialMobils);
  const [pesanans, setPesanans] = useState<Pesanan[]>(initialPesanans);
  const [mitras, setMitras] = useState<Mitra[]>(initialMitras);

  const menuItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mobil' as TabType, label: 'Manajemen Mobil', icon: Car },
    { id: 'pesanan' as TabType, label: 'Manajemen Pesanan', icon: FileText },
    { id: 'mitra' as TabType, label: 'Manajemen Mitra', icon: Users },
    { id: 'laporan' as TabType, label: 'Laporan Penyewaan', icon: BarChart3 },
    { id: 'profil' as TabType, label: 'Profil', icon: UserCircle }
  ];

  const handleMenuClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  const handleNavigate = (tab: 'mobil' | 'pesanan' | 'mitra' | 'laporan') => {
    setActiveTab(tab);
  };

  const handleLogin = (username: string, password: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setActiveTab('dashboard');
  };

  // Jika belum login, tampilkan halaman login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const currentMenuItem = menuItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Show Menu button only on Dashboard */}
            {activeTab === 'dashboard' ? (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                  <SheetDescription className="sr-only">
                    Pilih menu untuk navigasi aplikasi
                  </SheetDescription>
                  <div className="p-4 border-b bg-blue-600 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={logoImage} alt="RentCar Management" className="w-12 h-12 object-contain bg-white rounded-lg p-1" />
                      <div>
                        <h2 className="font-bold">RentCar Management</h2>
                        <p className="text-sm text-blue-100">Admin Panel</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-500">
                      <p className="text-sm text-blue-100">Login sebagai:</p>
                      <p className="text-white">{currentUser}</p>
                    </div>
                  </div>
                  <nav className="p-2">
                    {/* Quick Back to Dashboard Button */}
                    {activeTab !== 'dashboard' && (
                      <button
                        onClick={() => handleMenuClick('dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                      >
                        <Home className="size-5" />
                        <span className="font-semibold">Kembali ke Beranda</span>
                      </button>
                    )}
                    
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="size-5" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                    <div className="border-t mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="size-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            ) : (
              /* Show Back button on other pages */
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveTab('dashboard')}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 shrink-0"
                aria-label="Kembali ke Beranda"
              >
                <ArrowLeft className="size-5" />
              </Button>
            )}
            
            {/* Title - Always centered */}
            <div className="flex-1 text-center pr-10">
              <h1 className="text-gray-900">{currentMenuItem?.label}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-20">
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom duration-500">
          {activeTab === 'dashboard' && <Dashboard mobils={mobils} pesanans={pesanans} onNavigate={handleNavigate} />}
          {activeTab === 'mobil' && <ManajemenMobil mobils={mobils} setMobils={setMobils} />}
          {activeTab === 'pesanan' && <ManajemenPesanan pesanans={pesanans} setPesanans={setPesanans} mobils={mobils} setMobils={setMobils} />}
          {activeTab === 'mitra' && <ManajemenMitra mitras={mitras} setMitras={setMitras} pesanans={pesanans} mobils={mobils} />}
          {activeTab === 'laporan' && <LaporanPenyewaan pesanans={pesanans} />}
          {activeTab === 'profil' && <Profil />}
        </div>
      </main>
      
      {/* Floating Back to Home Button - Only show when not on dashboard */}
      {activeTab !== 'dashboard' && (
        <button
          onClick={() => setActiveTab('dashboard')}
          className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="Kembali ke Beranda"
        >
          <Home className="size-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Kembali ke Beranda
          </span>
        </button>
      )}
      
      <Toaster position="top-center" richColors />
    </div>
  );
}