import React from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Receipt, 
  Film, 
  Shield, 
  ExternalLink, 
  CheckCircle, 
  Key, 
  Users, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export const BookingInspector = ({ 
  booking, 
  onClose, 
  onNavigateToTab, 
  onOpenInvoiceModal,
  onUpdateBookingStatus,
  showToast 
}) => {
  if (!booking) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(booking.galleryUrl || 'https://vault.lumina.studio');
    showToast({
      title: 'Tautan Tersalin',
      message: 'Tautan VIP Private Vault telah disalin ke clipboard.',
      type: 'success'
    });
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(`Halo Tim Manajemen ${booking.clientName}, kami dari Lumina Studios mengonfirmasi rincian sesi produksi ${booking.bookingCode}.`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const balance = booking.totalPrice - booking.dpAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-gray-200 animate-slide-left overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/80 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <span className="font-semibold text-gray-700">Rincian Pesanan</span>
              <span>•</span>
              <span className="text-black font-bold">{booking.bookingCode}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">
              {booking.clientName}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-sm">
          
          {/* Workflow Status Switcher */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
            <span className="text-xs font-semibold text-gray-500 block">
              Tahap Alur Kerja Saat Ini:
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="font-bold text-sm text-gray-900">
                {booking.workflowStatus}
              </span>
              <select 
                value={booking.workflowStatus}
                onChange={(e) => {
                  onUpdateBookingStatus(booking.id, e.target.value);
                  showToast({
                    title: 'Status Diperbarui',
                    message: `Status pesanan diubah menjadi: ${e.target.value}`,
                    type: 'success'
                  });
                }}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-black"
              >
                <option value="Inquiry">Prospek Masuk (Inquiry)</option>
                <option value="Quote Sent">Penawaran Dikirim</option>
                <option value="Booked">Terkonfirmasi (DP)</option>
                <option value="Shooting">Sesi Syuting</option>
                <option value="Post-Production">Pasca-Produksi</option>
                <option value="Delivered">Selesai & Dikirim</option>
              </select>
            </div>
          </div>

          {/* Client Contact Profile */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-200 pb-1.5">
              Kontak Klien
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Nomor WhatsApp:</span>
                <button 
                  onClick={handleWhatsAppChat}
                  className="flex items-center gap-1.5 text-emerald-700 hover:underline font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+62 811 8892 411 (Chat Klien)</span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Email Resmi:</span>
                <span className="text-gray-900 font-medium">client.mgmt@atelier.id</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Instagram:</span>
                <span className="text-gray-900 font-medium">@anyageraldine</span>
              </div>
            </div>
          </div>

          {/* Production Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-200 pb-1.5">
              Spesifikasi Produksi
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Kategori Acara:</span>
                <span className="font-bold text-gray-900">{booking.eventType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Tier Paket:</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-semibold text-xs">
                  {booking.packageTier} Tier
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Tanggal Syuting:</span>
                <span className="text-gray-900 font-semibold">{formatDateIndo(booking.eventDate)}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-gray-500">Lokasi / Venue:</span>
                <span className="text-gray-900 font-medium text-right max-w-[240px]">{booking.venue}</span>
              </div>
            </div>
          </div>

          {/* Assigned Crew */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-200 pb-1.5">
              Kru Bertugas (Crew Roster)
            </h4>
            <div className="flex flex-wrap gap-2">
              {booking.assignedCrew?.map((c, i) => (
                <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-md border border-gray-200">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Financial Breakdown (Rincian Pembayaran) */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-200 pb-1.5">
              Rincian Biaya & Pembayaran
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Nilai Kontrak:</span>
                <span className="font-bold text-gray-900 text-sm">{formatRupiah(booking.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">DP Termin 1 (Diterima):</span>
                <span className="text-emerald-700 font-semibold">{formatRupiah(booking.dpAmount)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="text-gray-600 font-medium">Sisa Pelunasan:</span>
                <span className="font-bold text-gray-900 text-sm">{formatRupiah(balance)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-gray-200">
              <span className="text-gray-500">Status Pembayaran:</span>
              <span className={`font-bold px-2 py-0.5 rounded ${
                booking.paymentStatus === 'Fully Paid' ? 'bg-emerald-50 text-emerald-700' :
                booking.paymentStatus === 'DP Paid' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {booking.paymentStatus === 'Fully Paid' ? 'Lunas' :
                 booking.paymentStatus === 'DP Paid' ? 'DP Masuk' : 'Belum Bayar'}
              </span>
            </div>
          </div>

          {/* Private Vault Info */}
          <div className="border border-gray-200 rounded-xl p-4 space-y-2.5 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <Key className="w-4 h-4 text-gray-600" />
                <span>Private Vault Klien</span>
              </div>
              <span className="text-xs bg-gray-100 px-2 py-0.5 text-gray-700 rounded font-semibold">
                PIN: {booking.pinVault || '884920'}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Portal galeri terenkripsi untuk pratinjau raw & unduhan master 8K ProRes klien.
            </p>
            <button
              onClick={handleCopyLink}
              className="w-full py-2 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-800 transition-all flex items-center justify-center gap-1.5 hover:bg-gray-50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Salin Tautan Galeri VIP</span>
            </button>
          </div>

          {/* Direct Shortcuts */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => {
                onClose();
                onNavigateToTab('calendar');
              }}
              className="w-full py-2.5 bg-white border border-gray-300 hover:border-black rounded-lg text-gray-800 text-xs font-semibold transition-all flex items-center justify-between px-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Buka Lembar Panggilan (Kalender)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInvoiceModal(booking.invoiceId || 'inv-2026-001');
              }}
              className="w-full py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-between px-4 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-gray-300" />
                <span>Lihat Faktur & Audit Kas</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateToTab('postprod');
              }}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-all flex items-center justify-between px-4"
            >
              <div className="flex items-center gap-2.5">
                <Film className="w-4 h-4 text-gray-500" />
                <span>Status Lab Pasca-Produksi</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
