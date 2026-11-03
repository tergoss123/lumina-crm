import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Video, 
  ArrowUpRight, 
  CheckSquare, 
  Square, 
  Clock, 
  MapPin, 
  Send, 
  PhoneCall, 
  X, 
  ChevronRight, 
  Sparkles, 
  SlidersHorizontal,
  Camera,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export const DashboardView = ({ 
  bookings, 
  invoices, 
  onSelectBooking, 
  onToggleGearItem, 
  onUpdateBookingStatus, 
  onNavigateToTab,
  showToast 
}) => {
  const [quickFilter, setQuickFilter] = useState('Semua');

  // KPI Calculations
  const totalYTD = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalCollected = bookings.reduce((acc, curr) => acc + curr.dpAmount, 0);
  const liquidityRate = totalYTD > 0 ? (totalCollected / totalYTD) * 100 : 0;
  const activeShootingCount = bookings.filter(b => b.workflowStatus === 'Shooting').length;
  const inProgressCount = bookings.filter(b => ['Booked', 'Shooting', 'Post-Production'].includes(b.workflowStatus)).length;

  // Filter bookings for overview
  const filteredBookings = bookings.filter(b => {
    if (quickFilter === 'Semua') return true;
    if (quickFilter === 'Prospek') return b.workflowStatus === 'Inquiry';
    if (quickFilter === 'Penawaran') return b.workflowStatus === 'Quote Sent';
    if (quickFilter === 'Terkonfirmasi') return ['Booked', 'Shooting'].includes(b.workflowStatus);
    return true;
  });

  // Urgent Call Sheet (Next closest shoot)
  const urgentShoot = bookings.find(b => b.workflowStatus === 'Shooting') || bookings[0];

  // New Leads (Inquiry or Quote Sent)
  const newLeads = bookings.filter(b => ['Inquiry', 'Quote Sent'].includes(b.workflowStatus));

  const handleSendQuote = (booking) => {
    onUpdateBookingStatus(booking.id, 'Quote Sent');
    showToast({
      title: 'Penawaran Terkirim',
      message: `Draft penawaran resmi untuk ${booking.clientName} telah digenerate via WhatsApp & Email.`,
      type: 'success'
    });
  };

  const handleRejectLead = (bookingId, clientName) => {
    if (window.confirm(`Apakah Anda yakin ingin menolak prospek ${clientName}?`)) {
      onUpdateBookingStatus(bookingId, 'Rejected');
      showToast({
        title: 'Prospek Diarsipkan',
        message: `Prospek ${clientName} telah ditandai tidak cocok/ditolak.`,
        type: 'info'
      });
    }
  };

  const handleScheduleCall = (booking) => {
    showToast({
      title: 'Panggilan Dijadwalkan',
      message: `Jadwal briefing daring bersama ${booking.clientName} telah ditambahkan ke Kalender Studio.`,
      type: 'success'
    });
    onNavigateToTab('calendar');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Editorial Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded mb-2">
            <span>Ringkasan Studio</span>
            <span>•</span>
            <span>Kuartal IV 2026</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Dasbor Operasional & Keuangan
          </h2>
          <p className="text-gray-600 text-sm mt-1 max-w-xl">
            Pusat kendali studio: pemantauan alur produksi foto & video 8K, jadwal kru, likuiditas kas, dan kesiapan armada kamera.
          </p>
        </div>

        {/* Workflow Quick Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-lg border border-gray-200 self-start md:self-auto overflow-x-auto">
          {['Semua', 'Prospek', 'Penawaran', 'Terkonfirmasi'].map((filter) => (
            <button
              key={filter}
              onClick={() => setQuickFilter(filter)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                quickFilter === filter
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Financial & Operational Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Proyeksi Pendapatan YTD</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatRupiah(totalYTD)}
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2 text-xs text-gray-500">
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
              +19.4% vs 2025
            </span>
            <span>Target Q4 Tercapai 84%</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Kas Masuk (DP & Pelunasan)</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatRupiah(totalCollected)}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Rasio Likuiditas:</span>
            <span className="font-bold text-gray-900">{liquidityRate.toFixed(1)}% Terealisasi</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className="bg-gray-900 h-1.5 rounded-full transition-all duration-700" 
              style={{ width: `${Math.min(liquidityRate, 100)}%` }}
            />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Syuting Berjalan Hari Ini</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              {activeShootingCount}
            </span>
            <span className="text-xs font-medium text-gray-500">Unit Produksi</span>
          </div>
          <div className="mt-2.5 text-xs text-gray-600 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Uluwatu Bali & Senopati Cyclorama A</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Total Proyek Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              {inProgressCount}
            </span>
            <span className="text-xs font-medium text-gray-500">Proyek Berjalan</span>
          </div>
          <div className="mt-2.5 text-xs text-gray-500 font-medium">
            2 Pasca-Produksi • 1 Syuting • 2 Pra-Produksi
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Call Sheet + New Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Urgent Call Sheet Timeline & Gear Check (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
              <h3 className="text-sm font-bold text-gray-900">
                Lembar Panggilan Terdekat (Call Sheet)
              </h3>
            </div>
            <button 
              onClick={() => onNavigateToTab('calendar')}
              className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1"
            >
              <span>Buka Kalender</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {urgentShoot ? (
            <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-5 shadow-sm">
              {/* Shoot Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
                    <span className="font-semibold text-gray-700">{urgentShoot.bookingCode}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      {urgentShoot.eventType}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-gray-600">{urgentShoot.packageTier} Tier</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {urgentShoot.clientName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-gray-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formatDateIndo(urgentShoot.eventDate)}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {urgentShoot.callSheet?.callTime || '06:00 WIB'}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate max-w-[220px]">{urgentShoot.venue}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectBooking(urgentShoot)}
                  className="px-3.5 py-2 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-800 hover:bg-gray-50 self-start transition-all"
                >
                  Detail Pesanan
                </button>
              </div>

              {/* Assigned Crew Chips */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Kru Bertugas di Lapangan:
                </p>
                <div className="flex flex-wrap gap-2">
                  {urgentShoot.assignedCrew?.map((crew, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-md border border-gray-200"
                    >
                      {crew}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Gear Check (Kesiapan Peralatan) */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-gray-700" />
                    <span className="text-xs font-bold text-gray-900">
                      Cek Kesiapan Peralatan (Gear Check)
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">
                    {urgentShoot.callSheet?.equipmentChecklist?.filter(e => e.ready).length} dari {urgentShoot.callSheet?.equipmentChecklist?.length} Peralatan Siap
                  </span>
                </div>

                <div className="space-y-2 bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                  {urgentShoot.callSheet?.equipmentChecklist?.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => onToggleGearItem(urgentShoot.id, item.id)}
                      className="flex items-center justify-between p-2.5 bg-white rounded-md border border-gray-200 cursor-pointer hover:border-gray-400 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.ready ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={`text-xs ${item.ready ? 'text-gray-900 font-semibold' : 'text-gray-600 font-normal'}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        item.ready 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.ready ? 'Siap Digunakan' : 'Perlu Diinspeksi'}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Klik item untuk langsung mengubah status kesiapan peralatan di gudang.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-xl border border-gray-200 text-center text-gray-500 text-xs">
              Tidak ada jadwal syuting mendesak hari ini.
            </div>
          )}
        </div>

        {/* Right Column: New Leads Cards with Quick Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
              <h3 className="text-sm font-bold text-gray-900">
                Prospek Baru ({newLeads.length})
              </h3>
            </div>
            <button 
              onClick={() => onNavigateToTab('pipeline')}
              className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1"
            >
              <span>Buka Pipeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {newLeads.map((lead) => (
              <div 
                key={lead.id}
                className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 hover:border-gray-400 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                      <span className="font-semibold text-gray-700">{lead.eventType}</span>
                      <span>•</span>
                      <span>{formatDateIndo(lead.eventDate)}</span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900">
                      {lead.clientName}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5 font-medium">
                      Nilai Prospek: <span className="font-bold text-gray-900">{formatRupiah(lead.totalPrice)}</span>
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                    lead.workflowStatus === 'Quote Sent' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  }`}>
                    {lead.workflowStatus === 'Inquiry' ? 'Inquiry Baru' : 'Penawaran Dikirim'}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  "{lead.notes}"
                </p>

                {/* Quick Action Buttons */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleRejectLead(lead.id, lead.clientName)}
                    className="px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Tolak</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleScheduleCall(lead)}
                      className="px-3 py-1.5 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-all flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-gray-500" />
                      <span>Jadwalkan Panggilan</span>
                    </button>

                    <button
                      onClick={() => handleSendQuote(lead)}
                      className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                    >
                      <Send className="w-3 h-3" />
                      <span>Kirim Penawaran</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Filtered Bookings Table Snapshot */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-900">
              Daftar Pesanan Aktif ({filteredBookings.length} Pesanan)
            </h3>
          </div>
          <span className="text-gray-500 text-xs font-medium">
            Filter: {quickFilter}
          </span>
        </div>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs">
                <th className="py-3 px-4">Kode & Klien</th>
                <th className="py-3 px-4">Kategori Acara</th>
                <th className="py-3 px-4">Tanggal & Lokasi</th>
                <th className="py-3 px-4">Nilai Kontrak</th>
                <th className="py-3 px-4">Status Alur</th>
                <th className="py-3 px-4">Pembayaran</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((b) => (
                <tr 
                  key={b.id} 
                  className="hover:bg-gray-50 transition-colors group cursor-pointer"
                  onClick={() => onSelectBooking(b)}
                >
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900 group-hover:text-black">
                      {b.clientName}
                    </p>
                    <p className="text-xs text-gray-500">{b.bookingCode}</p>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 text-xs font-medium">
                    {b.eventType} ({b.packageTier})
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 text-xs">
                    <p className="font-medium">{formatDateIndo(b.eventDate)}</p>
                    <p className="text-gray-500 truncate max-w-[180px]">{b.venue}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900 text-sm">
                    {formatRupiah(b.totalPrice)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-md border border-gray-200">
                      {b.workflowStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      b.paymentStatus === 'Fully Paid' ? 'bg-emerald-50 text-emerald-700' :
                      b.paymentStatus === 'DP Paid' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {b.paymentStatus === 'Fully Paid' ? 'Lunas 100%' :
                       b.paymentStatus === 'DP Paid' ? 'DP 50% Masuk' : 'Belum Bayar'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectBooking(b)}
                      className="px-3 py-1.5 text-xs font-semibold border border-gray-300 hover:border-black rounded-lg hover:bg-black hover:text-white transition-all"
                    >
                      Periksa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
