import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  Camera, 
  Tv, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Radio, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Film
} from 'lucide-react';
import { formatDateIndo } from '../utils/formatters';

export const CalendarView = ({ bookings, crewList, showToast, onSelectBooking }) => {
  const [selectedDate, setSelectedDate] = useState('2026-11-08');
  const [calendarMode, setCalendarMode] = useState('month'); // 'month' | 'week'
  const [activeCallSheetBooking, setActiveCallSheetBooking] = useState(
    bookings.find(b => b.eventDate === '2026-11-08') || bookings[0]
  );
  const [isLiveFeedSimulated, setIsLiveFeedSimulated] = useState(true);

  // November 2026 Calendar days matrix
  const daysInNov = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-11-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    const matchedBookings = bookings.filter(b => b.eventDate === dateStr);
    return {
      dayNum,
      dateStr,
      bookings: matchedBookings
    };
  });

  const handleSelectDay = (day) => {
    setSelectedDate(day.dateStr);
    if (day.bookings.length > 0) {
      setActiveCallSheetBooking(day.bookings[0]);
    }
  };

  const handleBroadcastCrew = () => {
    showToast({
      title: 'Broadcast Kru Terkirim',
      message: `Lembar panggilan call time ${activeCallSheetBooking?.callSheet?.callTime || '06:00 WIB'} berhasil dibroadcast via WhatsApp Tim Operasional.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded mb-2">
            <span>Jadwal Produksi</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Kalender Produksi & Penugasan Kru
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Manajemen alokasi set studio cyclorama, durasi lembar panggilan, dan feed kontrol kamera langsung.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200">
            <button
              onClick={() => setCalendarMode('month')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                calendarMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              Bulan
            </button>
            <button
              onClick={() => setCalendarMode('week')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                calendarMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              Minggu
            </button>
          </div>

          <button
            onClick={handleBroadcastCrew}
            className="flex items-center gap-2 px-3.5 py-2 border border-gray-300 hover:border-black bg-white text-gray-900 text-xs font-semibold rounded-lg transition-all shadow-xs hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
            <span>Broadcast Call Sheet</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar Matrix (7 cols) + Selected Call Sheet & Camera Feed (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Calendar Operational Grid (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-bold text-gray-900">
                November 2026
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-500 font-medium">Jadwal Terdaftar:</span>
              <span className="font-bold text-gray-900">{bookings.length} Sesi</span>
            </div>
          </div>

          {/* Calendar Table */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d, i) => (
              <div key={i} className="py-1.5 text-gray-500 font-bold uppercase text-[11px] tracking-wider">
                {d}
              </div>
            ))}

            {daysInNov.map((day) => {
              const isSelected = selectedDate === day.dateStr;
              const hasBookings = day.bookings.length > 0;
              const isToday = day.dayNum === 3; // Mock today Nov 3

              return (
                <div
                  key={day.dayNum}
                  onClick={() => handleSelectDay(day)}
                  className={`min-h-[76px] p-2 rounded-lg border transition-all text-left flex flex-col justify-between cursor-pointer ${
                    isSelected 
                      ? 'border-black bg-gray-50 ring-2 ring-black' 
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${
                      isToday 
                        ? 'bg-black text-white px-1.5 py-0.2 rounded font-bold' 
                        : isSelected ? 'font-bold text-black' : 'text-gray-600 font-medium'
                    }`}>
                      {day.dayNum}
                    </span>
                    {hasBookings && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                  </div>

                  <div className="mt-1 space-y-1">
                    {day.bookings.map((b) => (
                      <div
                        key={b.id}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-black text-white truncate leading-tight font-medium"
                        title={`${b.clientName} - ${b.venue}`}
                      >
                        {b.clientName.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-black rounded-sm inline-block"></span>
              <span>Sesi Syuting Terjadwal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border border-black bg-gray-50 rounded-sm inline-block"></span>
              <span>Hari Terpilih</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <span>Studio A: White Cyc</span>
              <span className="text-gray-300">•</span>
              <span>Studio B: Loft Menteng</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Call Sheet Detail + Live Camera Feed Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Live Camera Viewfinder Monitor Simulator */}
          <div className="bg-[#111827] text-white rounded-xl border border-gray-800 p-4 space-y-3 relative overflow-hidden shadow-md">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <span className="text-red-500 font-bold uppercase tracking-wider">● REC 8K VV</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300 font-medium">RED V-Raptor [Cam A]</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs">Live 1080p</span>
              </div>
            </div>

            {/* Viewfinder simulation frame */}
            <div className="relative aspect-video bg-gray-900 rounded-lg border border-gray-800 flex items-center justify-center overflow-hidden group">
              <img
                src={
                  activeCallSheetBooking?.eventType === 'Pernikahan'
                    ? "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80"
                    : activeCallSheetBooking?.eventType === 'Editorial'
                    ? "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
                    : "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80"
                }
                alt="Camera Monitor Live Preview"
                className="w-full h-full object-cover opacity-85 filter contrast-105"
              />

              {/* Viewfinder Overlays */}
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between text-xs text-white/95">
                <div className="flex justify-between items-start">
                  <div className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs font-mono text-[11px]">
                    <span>TC: 01:24:18:12</span>
                  </div>
                  <div className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-2 font-mono text-[11px]">
                    <span>ISO 800</span>
                    <span>5600K</span>
                    <span>180°</span>
                  </div>
                </div>

                {/* Center crosshair */}
                <div className="self-center flex items-center justify-center">
                  <div className="w-8 h-8 border border-white/40 rounded-full relative flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs font-mono text-[11px]">
                    <span>FPS: 23.976</span>
                  </div>
                  <div className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs text-emerald-400 font-mono text-[11px]">
                    <span>BATT: 94%</span>
                  </div>
                </div>
              </div>

              {/* Live Tag Pill */}
              <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                Feed Studio Live
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-1 font-medium">
              <span>Transmisi: SDI Wireless Ch 4</span>
              <span>Latensi: &lt; 1ms (Zero Delay)</span>
            </div>
          </div>

          {/* Call Sheet Details */}
          {activeCallSheetBooking ? (
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Lembar Panggilan // {activeCallSheetBooking.bookingCode}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mt-0.5">
                    {activeCallSheetBooking.clientName}
                  </h4>
                  <p className="text-xs font-medium text-gray-600 mt-0.5">
                    {formatDateIndo(activeCallSheetBooking.eventDate)}
                  </p>
                </div>
                <button
                  onClick={() => onSelectBooking(activeCallSheetBooking)}
                  className="px-3 py-1.5 text-xs font-semibold border border-gray-300 hover:border-black rounded-lg hover:bg-gray-50"
                >
                  Detail
                </button>
              </div>

              {/* Durasi Panggilan & Fasilitas Studio */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                <div>
                  <span className="text-gray-500 block text-[11px] font-medium">Jam Panggilan (Call Time):</span>
                  <span className="font-bold text-gray-900 text-sm">
                    {activeCallSheetBooking.callSheet?.callTime || '06:00 WIB'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px] font-medium">Jam Selesai (Wrap Time):</span>
                  <span className="font-bold text-gray-900 text-sm">
                    {activeCallSheetBooking.callSheet?.wrapTime || '20:00 WIB'}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-500 block text-[11px] font-medium">Fasilitas / Lokasi:</span>
                  <span className="font-bold text-gray-900 text-sm">
                    {activeCallSheetBooking.callSheet?.studioUnit || 'Studio A White Cyclorama'}
                  </span>
                  <span className="block text-gray-600 text-xs mt-0.5 truncate">
                    {activeCallSheetBooking.venue}
                  </span>
                </div>
              </div>

              {/* Daftar Kru yang Bertugas */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span>Daftar Kru Bertugas:</span>
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {activeCallSheetBooking.assignedCrew?.length || 0} Personel
                  </span>
                </div>

                <div className="space-y-1.5">
                  {activeCallSheetBooking.assignedCrew?.map((crew, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </div>
                        <span className="font-semibold text-gray-900">{crew}</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        Siap On-Set
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Ready Status */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">Kesiapan Armada Peralatan:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Inspeksi Diverifikasi</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white border border-gray-200 rounded-xl text-center text-gray-500 text-xs">
              Pilih tanggal pada kalender untuk melihat Lembar Panggilan (Call Sheet).
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
