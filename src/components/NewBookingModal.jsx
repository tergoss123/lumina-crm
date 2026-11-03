import React, { useState } from 'react';
import { X, Plus, Calendar, MapPin, DollarSign, User, Phone, Mail, Camera } from 'lucide-react';

export const NewBookingModal = ({ isOpen, onClose, onSubmit, showToast }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    whatsapp: '',
    email: '',
    instagram: '',
    eventType: 'Pernikahan',
    packageTier: 'Editorial',
    eventDate: '2026-11-25',
    venue: '',
    totalPrice: 150000000,
    dpAmount: 75000000,
    notes: 'Klien menginginkan visual sinematik anamorphic dengan pencahayaan high-fashion editorial.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.venue) {
      showToast({
        title: 'Form Belum Lengkap',
        message: 'Mohon isi nama klien dan lokasi syuting.',
        type: 'error'
      });
      return;
    }

    const newBooking = {
      id: `b-${Date.now()}`,
      bookingCode: `LMN-26-0${Math.floor(Math.random() * 80) + 100}`,
      clientId: `c-${Date.now()}`,
      clientName: formData.clientName,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      venue: formData.venue,
      packageTier: formData.packageTier,
      totalPrice: Number(formData.totalPrice),
      dpAmount: Number(formData.dpAmount),
      paymentStatus: Number(formData.dpAmount) >= Number(formData.totalPrice) ? 'Fully Paid' : Number(formData.dpAmount) > 0 ? 'DP Paid' : 'Unpaid',
      workflowStatus: 'Inquiry',
      assignedCrew: ["Arya Wiratama (Dir)", "Radit Pratama (Cam)"],
      galleryUrl: `https://vault.lumina.studio/c/${formData.clientName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      invoiceId: `inv-2026-0${Math.floor(Math.random() * 80) + 100}`,
      notes: formData.notes,
      pinVault: String(Math.floor(100000 + Math.random() * 900000)),
      postProdProgress: 0,
      callSheet: {
        callTime: "06:00 WIB",
        wrapTime: "20:00 WIB",
        studioUnit: "Studio A White Cyclorama",
        equipmentChecklist: [
          { id: "eq-new-1", name: "RED V-Raptor 8K Camera Set", ready: false },
          { id: "eq-new-2", name: "Cooke Anamorphic Prime Lenses", ready: true },
          { id: "eq-new-3", name: "Arri SkyPanel X21", ready: false }
        ]
      }
    };

    onSubmit(newBooking);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Entri Pesanan Baru
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
              + Registrasi Pesanan Baru
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm">
          
          {/* Client Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-200 pb-1.5">
              1. Informasi Klien & Kontak
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Nama Klien / Perusahaan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Chelsea Islan & Rob"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Nomor WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="+62 812 XXXX XXXX"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Email Resmi</label>
                <input
                  type="email"
                  placeholder="mgmt@klien.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Instagram Handle</label>
                <input
                  type="text"
                  placeholder="@klien.official"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs"
                />
              </div>
            </div>
          </div>

          {/* Event & Production Specification */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-200 pb-1.5">
              2. Kategori Produksi & Jadwal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Kategori Acara</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs font-medium"
                >
                  <option value="Pernikahan">Pernikahan (Wedding)</option>
                  <option value="Komersial">Komersial (Brand Campaign)</option>
                  <option value="Editorial">Editorial (Fashion / Magazine)</option>
                  <option value="Potret">Potret (Private Portrait)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Tier Paket Studio</label>
                <select
                  value={formData.packageTier}
                  onChange={(e) => setFormData({ ...formData, packageTier: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs font-medium"
                >
                  <option value="Standard">Standard Tier (Rp 48 - 75 Jt)</option>
                  <option value="Signature">Signature Tier (Rp 95 - 140 Jt)</option>
                  <option value="Editorial">Editorial Tier (Rp 185 - 250 Jt)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Tanggal Syuting</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-gray-600 font-semibold mb-1">Lokasi / Venue Produksi *</label>
              <input
                type="text"
                required
                placeholder="Contoh: The Bulgari Resort Bali atau Studio A Lumina"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs"
              />
            </div>
          </div>

          {/* Financials */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider border-b border-gray-200 pb-1.5">
              3. Nilai Kontrak & Ketentuan DP
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Total Nilai Kontrak (Rp)</label>
                <input
                  type="number"
                  step="1000000"
                  value={formData.totalPrice}
                  onChange={(e) => setFormData({ ...formData, totalPrice: Number(e.target.value) })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Nominal DP Termin 1 (Rp)</label>
                <input
                  type="number"
                  step="1000000"
                  value={formData.dpAmount}
                  onChange={(e) => setFormData({ ...formData, dpAmount: Number(e.target.value) })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-bold text-sm text-emerald-700"
                />
              </div>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-gray-600 font-semibold mb-1">Catatan Khusus & Kebutuhan Teknis</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-black hover:bg-gray-800 text-white font-bold rounded-lg text-xs transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan ke Pipeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
