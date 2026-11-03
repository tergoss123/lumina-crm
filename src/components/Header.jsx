import React, { useState, useEffect } from 'react';
import { Plus, SlidersHorizontal, Bell, Clock, ShieldCheck, Sparkles, User, LayoutDashboard, ArrowRightLeft } from 'lucide-react';

export const Header = ({ 
  onOpenNewBooking, 
  activeTab, 
  pendingCount, 
  onOpenQuickAction,
  appMode,
  onSelectMode,
  onToggleAppMode 
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(`${timeStr} WIB`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top Status Bar */}
      <div className="bg-[#111827] text-white px-4 lg:px-8 py-2 flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-gray-300 font-semibold">Area Produksi Aktif:</span>
          <span className="text-gray-200">Garut & Bandung • Unit Sesi Foto & Aerial Drone Siap</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <div className="flex items-center gap-1.5 bg-gray-800/80 px-2 py-0.5 rounded text-xs">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-white">{time || '12:00:00 WIB'}</span>
          </div>
          <span className="text-gray-600 hidden md:inline">•</span>
          <span className="hidden md:inline text-gray-300">Global State Synchronized</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <div 
            onClick={() => onSelectMode && onSelectMode('customer')}
            className="cursor-pointer group flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-lg tracking-tight shadow-sm">
              L
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors">
                  Lumina Studios
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                  {appMode === 'customer' ? '/customer' : '/admin'}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-normal">
                {appMode === 'customer' 
                  ? 'Portal Pelanggan (Garut & Bandung)' 
                  : 'Dasbor Manajemen CRM & Produksi'}
              </p>
            </div>
          </div>

          {/* Route Switcher Selector (Desktop Pill) */}
          <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => onSelectMode && onSelectMode('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'customer'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>/customer (Pelanggan)</span>
            </button>
            <button
              onClick={() => onSelectMode && onSelectMode('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'admin'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>/admin (CRM Internal)</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Route Toggle Button */}
          <button
            onClick={onToggleAppMode}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all shadow-xs border ${
              appMode === 'customer' 
                ? 'bg-black text-white hover:bg-gray-800 border-black' 
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
            }`}
            title="Beralih Jalur Akses /customer & /admin"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {appMode === 'customer' ? 'Buka /admin (CRM)' : 'Buka /customer'}
            </span>
            <span className="sm:hidden">
              {appMode === 'customer' ? '/admin' : '/customer'}
            </span>
          </button>

          {appMode === 'admin' && (
            <>
              <button
                onClick={() => onOpenQuickAction && onOpenQuickAction('filter')}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-300 hover:border-gray-900 hover:bg-gray-50 rounded-lg transition-all text-gray-700"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>

              <button
                onClick={onOpenNewBooking}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>+ Pesanan</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
