import { useState } from 'react';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from '../assets/logo.png';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Username dan password harus diisi');
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      onLogin(username, password);
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, rgb(37, 99, 235), rgb(29, 78, 216), rgb(67, 56, 202))' }} className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div style={{ display: 'inline-block', marginBottom: '20px' }}>
            <img src={logoImage} alt="RentCar Management Logo" style={{ width: '160px', height: 'auto' }} />
          </div>
          <h1 style={{ fontSize: '1.875rem', color: 'white', marginBottom: '8px', fontWeight: '700' }}>RentCar Management</h1>
          <p style={{ color: 'rgb(191, 219, 254)' }}>Sistem Administrasi & Manajemen</p>
        </div>

        {/* Login Form Card */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '32px' }}>
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl text-gray-900">Login Admin</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <Label htmlFor="username" className="block mb-2 text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="block mb-2 text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span>⚠</span>
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button 
              type="submit" 
              style={{ background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(29, 78, 216))' }}
              className="w-full h-12 text-white shadow-lg hover:shadow-xl transition-all hover:opacity-90"
            >
              Masuk ke Dashboard
            </Button>

            {/* Info Kredensial */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div style={{ background: 'rgb(239, 246, 255)', border: '1px solid rgb(191, 219, 254)', borderRadius: '8px', padding: '12px' }}>
                <p className="text-xs text-blue-800 text-center">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Kredensial Default
                </p>
                <p className="text-sm text-blue-900 text-center mt-2">
                  <strong>Username:</strong> admin | <strong>Password:</strong> admin123
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p style={{ color: 'rgb(191, 219, 254)', fontSize: '0.875rem', marginBottom: '8px' }}>
            © 2025 RentCar Management
          </p>
          <p style={{ color: 'rgb(191, 219, 254)', fontSize: '0.75rem' }}>
            Sistem Manajemen Persewaan Mobil & Mitra
          </p>
          <p style={{ color: 'rgb(191, 219, 254)', fontSize: '0.75rem', marginTop: '8px' }}>
            Versi 1.0.0 | Build 2025.12
          </p>
        </div>
      </div>
    </div>
  );
}