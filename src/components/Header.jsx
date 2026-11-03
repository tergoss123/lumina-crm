import React, { useState, useEffect } from 'react';
import { Plus, SlidersHorizontal, Bell, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const Header = ({ onOpenNewBooking, activeTab, pendingCount, onOpenQuickAction }) => {
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
          <span className="text-gray-300 font-semibold">Status Operasional Studio:</span>
          <span className="text-gray-200 hidden sm:inline">Set Aktif • White Cyclorama A & Loft B Siap</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <div className="flex items-center gap-1.5 bg-gray-800/80 px-2 py-0.5 rounded text-xs">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-white">{time || '12:00:00 WIB'}</span>
          </div>
          <span className="text-gray-600 hidden md:inline">•</span>
          <span className="hidden md:inline text-gray-300">Jakarta & Bali Units</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="cursor-pointer group flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-lg tracking-tight shadow-sm">
              L
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors">
                  Lumina Studios
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                  CRM & Produksi
                </span>
              </div>
              <p className="text-xs text-gray-500 font-normal">
                Sistem Manajemen Pemesanan & Alur Kerja Studio
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-gray-200">
            <div className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded border border-gray-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Data Terverifikasi</span>
            </div>
            {pendingCount > 0 && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-medium rounded border border-amber-200">
                {pendingCount} Prospek Menunggu Respon
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenQuickAction && onOpenQuickAction('filter')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-gray-300 hover:border-gray-900 hover:bg-gray-50 rounded-lg transition-all text-gray-700"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter Cepat</span>
          </button>

          <button
            onClick={onOpenNewBooking}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Pesanan Baru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
