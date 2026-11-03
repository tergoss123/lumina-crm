import React, { useState } from 'react';
import { 
  Columns3, 
  List, 
  Search, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export const WORKFLOW_STAGES = [
  { id: 'Inquiry', label: 'Prospek Masuk', color: 'border-blue-400' },
  { id: 'Quote Sent', label: 'Penawaran Dikirim', color: 'border-amber-400' },
  { id: 'Booked', label: 'Terkonfirmasi (DP)', color: 'border-purple-400' },
  { id: 'Shooting', label: 'Sesi Syuting', color: 'border-emerald-500' },
  { id: 'Post-Production', label: 'Pasca-Produksi', color: 'border-indigo-500' },
  { id: 'Delivered', label: 'Selesai & Dikirim', color: 'border-teal-500' }
];

export const CATEGORIES = ['Semua', 'Pernikahan', 'Komersial', 'Editorial', 'Potret'];

export const PipelineView = ({ 
  bookings, 
  onSelectBooking, 
  onAdvanceStage, 
  onRevertStage, 
  onOpenNewBooking 
}) => {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesCategory = selectedCategory === 'Semua' || b.eventType === selectedCategory;
    const matchesSearch = 
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded mb-2">
            <span>Pipeline Alur Kerja</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Pipeline Prospek & Pesanan
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Pantau dan geser tahapan klien dari penawaran awal hingga pengiriman master box.
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'kanban' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
              title="Tampilan Papan Kanban"
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
              title="Tampilan Daftar"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenNewBooking}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Entri Pesanan</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama klien, kode, lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all"
          />
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="overflow-x-auto pb-6">
          <div className="grid grid-flow-col auto-cols-[310px] gap-4 min-w-[1900px]">
            {WORKFLOW_STAGES.map((stage, stageIdx) => {
              const stageBookings = filteredBookings.filter(b => b.workflowStatus === stage.id);
              const stageTotal = stageBookings.reduce((sum, b) => sum + b.totalPrice, 0);

              return (
                <div key={stage.id} className="flex flex-col bg-gray-50/80 rounded-xl border border-gray-200 p-3.5 min-h-[600px]">
                  {/* Column Header */}
                  <div className="pb-3 border-b border-gray-200 mb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-900">
                        {stage.label}
                      </h3>
                      <span className="w-5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 shadow-xs">
                        {stageBookings.length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      {formatRupiah(stageTotal)}
                    </p>
                  </div>

                  {/* Cards List */}
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {stageBookings.map((booking) => (
                      <div
                        key={booking.id}
                        onClick={() => onSelectBooking(booking)}
                        className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="font-semibold text-gray-700">{booking.bookingCode}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-medium">
                            {booking.eventType}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-gray-900 group-hover:text-black">
                            {booking.clientName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                            <span className="truncate">{booking.venue}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                            <span>{formatDateIndo(booking.eventDate)}</span>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[11px] text-gray-400 block font-normal">Nilai Kontrak:</span>
                            <span className="font-bold text-gray-900">{formatRupiah(booking.totalPrice)}</span>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            booking.paymentStatus === 'Fully Paid' ? 'bg-emerald-50 text-emerald-700' :
                            booking.paymentStatus === 'DP Paid' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {booking.paymentStatus === 'Fully Paid' ? 'Lunas' :
                             booking.paymentStatus === 'DP Paid' ? 'DP Masuk' : 'Belum Bayar'}
                          </span>
                        </div>

                        {/* Quick Advance / Revert buttons */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                          {stageIdx > 0 ? (
                            <button
                              onClick={() => onRevertStage(booking.id, WORKFLOW_STAGES[stageIdx - 1].id)}
                              className="text-gray-500 hover:text-black font-semibold flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 transition-colors"
                              title="Kembalikan Tahap"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              <span>Mundur</span>
                            </button>
                          ) : <span />}

                          {stageIdx < WORKFLOW_STAGES.length - 1 && (
                            <button
                              onClick={() => onAdvanceStage(booking.id, WORKFLOW_STAGES[stageIdx + 1].id)}
                              className="text-gray-900 font-bold hover:bg-black hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded-md border border-gray-200 transition-colors ml-auto shadow-xs"
                              title="Majukan Tahap"
                            >
                              <span>Lanjut</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {stageBookings.length === 0 && (
                      <div className="p-6 text-center text-gray-400 text-xs rounded-xl border border-dashed border-gray-200">
                        Tidak ada pesanan di tahap ini
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs">
                <th className="py-3 px-4">Kode & Klien</th>
                <th className="py-3 px-4">Kategori & Paket</th>
                <th className="py-3 px-4">Tanggal Pelaksanaan</th>
                <th className="py-3 px-4">Lokasi / Venue</th>
                <th className="py-3 px-4">Nilai Kontrak</th>
                <th className="py-3 px-4">Tahap Alur Kerja</th>
                <th className="py-3 px-4">Status Pembayaran</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((b) => (
                <tr 
                  key={b.id} 
                  onClick={() => onSelectBooking(b)}
                  className="hover:bg-gray-50 cursor-pointer group transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900 group-hover:text-black">
                      {b.clientName}
                    </p>
                    <p className="text-xs text-gray-500">{b.bookingCode}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-gray-800 text-xs">{b.eventType}</span>
                    <span className="text-xs text-gray-500 block">{b.packageTier} Tier</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 text-xs font-medium">
                    {formatDateIndo(b.eventDate)}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 text-xs truncate max-w-[200px]">
                    {b.venue}
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
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectBooking(b)}
                      className="px-3 py-1.5 text-xs font-semibold border border-gray-300 hover:border-black rounded-lg hover:bg-black hover:text-white transition-all"
                    >
                      Buka Rincian
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
