import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CreditCard, 
  Building2, 
  Smartphone, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  Camera, 
  Film, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Download,
  ArrowLeft
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export const PACKAGES = [
  {
    id: 'pkg-standard',
    name: 'Standard Studio Session',
    tier: 'Standard',
    badge: 'Paket Esensial',
    price: 48000000,
    dpPrice: 24000000,
    description: 'Sesi foto & video studio komersial / portret beresolusi tinggi dengan set pencahayaan terkalibrasi.',
    features: [
      'Durasi 4 Jam Sesi Studio White Cyclorama',
      'Kamera Cinema Sony FX9 Full Frame 4K',
      '1 Lead Photographer + 1 Lighting Assistant',
      '30 Foto High-End Retouched + 15s Teaser Video',
      'Akses Private Cloud Vault Klien (Aktif 90 Hari)'
    ],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pkg-signature',
    name: 'Signature Editorial Campaign',
    tier: 'Signature',
    badge: 'Paling Diminati (Popular)',
    price: 95000000,
    dpPrice: 47500000,
    description: 'Produksi sinematik penuh untuk kampanye busana, editorial majalah, dan komersial brand mewah.',
    features: [
      'Durasi 8 Jam Full-Day Sesi (Studio A / Lokasi Jakarta)',
      'RED V-Raptor 8K VV + Cooke Anamorphic Prime Lenses',
      'Squad Kru Lengkap: Director, Cinematographer, Gaffer, Stylist',
      'Mastering Warna DaVinci Resolve 19 (Arri LogC3 to 35mm)',
      '60 Foto Master Retouch + 60s Cinematic Film 4K',
      'Ulasan Kolaboratif via Frame.io Enterprise'
    ],
    recommended: true,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pkg-editorial',
    name: 'Haute Couture & Luxury Wedding',
    tier: 'Editorial',
    badge: 'Prestige Edition',
    price: 185000000,
    dpPrice: 92500000,
    description: 'Layanan produksi tanpa batas dengan armada kamera 8K ganda, drone RAW, dan kotak arsip kayu jati.',
    features: [
      'Unlimited Session Day (Jakarta / Bali On-Location)',
      'Dual RED V-Raptor 8K Cameras + Drone DJI Inspire 3 RAW',
      'Unit Produksi Eksekutif 6 Personel + Sound Engineer',
      'Audio Master Dolby Atmos + Musik Scoring Original',
      'Kotak Kayu Jati Archival Fine-Art Album Hahnemuhle',
      'VIP Lifetime Access Private Cloud Vault (PIN Enkripsi)'
    ],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
  }
];

export const CustomerPortal = ({ onBookingCreated, onSwitchToAdmin, showToast }) => {
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1]);
  const [step, setStep] = useState('catalog'); // 'catalog' | 'checkout' | 'payment' | 'success'

  // Form checkout state
  const [formData, setFormData] = useState({
    customerName: '',
    whatsapp: '',
    email: '',
    productionDate: '2026-11-20',
    venue: 'Studio A (White Cyclorama) - Lumina Jakarta',
    notes: 'Mohon pencahayaan dramatis high-fashion dengan palet warna monokromatik.',
    paymentOption: 'dp' // 'dp' (50%) | 'full' (100%)
  });

  // Payment method selection
  const [paymentCategory, setPaymentCategory] = useState('bank'); // 'bank' | 'ewallet'
  const [paymentMethod, setPaymentMethod] = useState('bca'); // 'bca' | 'mandiri' | 'gopay' | 'ovo'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Completed booking data for receipt
  const [completedBooking, setCompletedBooking] = useState(null);

  // Calculate prices
  const currentPrice = formData.paymentOption === 'dp' ? selectedPackage.dpPrice : selectedPackage.price;
  const ppnAmount = currentPrice * 0.11;
  const totalAmountToPay = currentPrice + ppnAmount;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast({
      title: 'Tersalin ke Clipboard',
      message: `${label} (${text}) berhasil disalin.`,
      type: 'success'
    });
  };

  const handleProceedToCheckout = (pkg) => {
    setSelectedPackage(pkg);
    setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.whatsapp) {
      showToast({
        title: 'Form Belum Lengkap',
        message: 'Mohon lengkapi Nama dan Nomor WhatsApp Anda.',
        type: 'error'
      });
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const bookingCode = `LMN-26-${Math.floor(100 + Math.random() * 900)}`;
      const invoiceNumber = `INV/LMN/26/11-${Math.floor(100 + Math.random() * 900)}`;
      const pinVault = String(Math.floor(100000 + Math.random() * 900000));
      const isFull = formData.paymentOption === 'full';

      const newBookingRecord = {
        id: `b-${Date.now()}`,
        bookingCode,
        clientId: `c-${Date.now()}`,
        clientName: formData.customerName,
        eventType: selectedPackage.tier === 'Editorial' ? 'Pernikahan' : selectedPackage.tier === 'Signature' ? 'Editorial' : 'Potret',
        eventDate: formData.productionDate,
        venue: formData.venue,
        packageTier: selectedPackage.tier,
        totalPrice: selectedPackage.price,
        dpAmount: isFull ? selectedPackage.price : selectedPackage.dpPrice,
        paymentStatus: isFull ? 'Fully Paid' : 'DP Paid',
        workflowStatus: 'Booked', // Langsung masuk ke Terkonfirmasi (DP) di Pipeline!
        assignedCrew: ['Arya Wiratama (Dir)', 'Radit Pratama (Cam)', 'Reza Wardhana (Gaffer)'],
        galleryUrl: `https://vault.lumina.studio/c/${formData.customerName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        invoiceId: invoiceNumber,
        notes: `[Online Booking Pelanggan] ${formData.notes}`,
        pinVault,
        postProdProgress: 0,
        callSheet: {
          callTime: '07:00 WIB',
          wrapTime: '19:00 WIB',
          studioUnit: formData.venue.includes('Studio A') ? 'Studio A Infinite Cyclorama' : 'On-Location Unit',
          equipmentChecklist: [
            { id: 'eq-cp-1', name: 'RED V-Raptor 8K VV Cinema Package', ready: true },
            { id: 'eq-cp-2', name: 'Arri SkyPanel X21 Softlight', ready: true },
            { id: 'eq-cp-3', name: 'Wireless Teradek 4K Zero-Delay', ready: true }
          ]
        }
      };

      const newInvoiceRecord = {
        id: invoiceNumber,
        invoiceNumber,
        bookingId: newBookingRecord.id,
        bookingCode,
        clientName: formData.customerName,
        totalAmount: selectedPackage.price,
        dpPaid: isFull ? selectedPackage.price : selectedPackage.dpPrice,
        balanceRemaining: isFull ? 0 : selectedPackage.price - selectedPackage.dpPrice,
        status: isFull ? 'Fully Paid' : 'DP Paid',
        dueDate: '2026-11-25',
        issuedDate: '2026-11-03',
        ppnApplied: true,
        pph23Applied: false,
        virtualAccount: paymentMethod === 'bca' ? '1280 8821 9901 4452 (BCA)' : '8870 1492 8812 0031 (Mandiri)',
        xenditLink: `https://checkout.xendit.co/web/${bookingCode.toLowerCase()}`
      };

      // Call parent callback to sync with monolith global state!
      onBookingCreated(newBookingRecord, newInvoiceRecord);

      setCompletedBooking({
        ...newBookingRecord,
        invoiceNumber,
        totalPaidNow: totalAmountToPay,
        paymentMethodName: paymentMethod.toUpperCase(),
        paidAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB'
      });

      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      showToast({
        title: 'Pembayaran Berhasil Diverifikasi',
        message: `Pesanan ${bookingCode} otomatis masuk ke Pipeline CRM dan menambah saldo kas masuk!`,
        type: 'success'
      });
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-24 max-w-5xl mx-auto">
      
      {/* Editorial Customer Hero Header */}
      <div className="text-center space-y-3 pt-2 pb-6 border-b border-gray-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Lumina Studios • Portal Pemesanan Resmi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          Booking Sesi Produksi & Studio 8K
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Pilih paket layanan sinematik, tentukan jadwal produksi Anda, dan selesaikan pembayaran dengan verifikasi instan.
        </p>

        {/* Multi-step progress indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4 text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step === 'catalog' ? 'text-black font-bold' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'catalog' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>1</span>
            <span>Pilih Layanan</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className={`flex items-center gap-1.5 ${step === 'checkout' ? 'text-black font-bold' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'checkout' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>2</span>
            <span>Detail Booking</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-black font-bold' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'payment' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>3</span>
            <span>Pembayaran</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className={`flex items-center gap-1.5 ${step === 'success' ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'success' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}>4</span>
            <span>Konfirmasi</span>
          </div>
        </div>
      </div>

      {/* STEP 1: KATALOG PEMESANAN (2-3 PILIHAN PAKET LAYANAN STUDIO) */}
      {step === 'catalog' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pilihan Paket Produksi Eksklusif</h2>
              <p className="text-xs text-gray-500 mt-0.5">Seluruh paket mencakup hak lisensi master dan akses brankas digital privat.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPackage.id === pkg.id;

              return (
                <div 
                  key={pkg.id}
                  className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                    pkg.recommended 
                      ? 'border-black ring-2 ring-black relative' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="bg-black text-white text-[11px] font-bold text-center py-1 tracking-wider uppercase">
                      ⭐ {pkg.badge}
                    </div>
                  )}

                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-xs font-bold text-gray-900">
                      {pkg.tier} Edition
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 leading-snug">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-normal">
                        {pkg.description}
                      </p>

                      <div className="pt-2">
                        <span className="text-2xl font-extrabold text-gray-900 tracking-tight block">
                          {formatRupiah(pkg.price)}
                        </span>
                        <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                          Opsi DP 50%: {formatRupiah(pkg.dpPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                      <p className="font-semibold text-gray-700">Fasilitas Termasuk:</p>
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleProceedToCheckout(pkg)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-4 shadow-sm ${
                        pkg.recommended 
                          ? 'bg-black hover:bg-gray-800 text-white' 
                          : 'bg-gray-100 hover:bg-black hover:text-white text-gray-900'
                      }`}
                    >
                      <span>Pilih Paket Ini</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: FORM CHECKOUT (NAMA, TANGGAL, CATATAN) */}
      {step === 'checkout' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <button 
                onClick={() => setStep('catalog')}
                className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali Pilih Paket</span>
              </button>
              <h2 className="text-xl font-bold text-gray-900">Formulir Pemesanan Sesi</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 block">Paket Dipilih:</span>
              <span className="text-sm font-bold text-gray-900">{selectedPackage.name}</span>
            </div>
          </div>

          <form onSubmit={handleProceedToPayment} className="space-y-6 text-sm">
            
            {/* Customer Contact Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-1">
                1. Identitas Pelanggan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Nama Lengkap Pelanggan / Brand *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Jessica Mila & Yakup"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="+62 812 8899 0011"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Email Konfirmasi
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="jessica@management.id"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Tanggal Produksi yang Diinginkan *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={formData.productionDate}
                      onChange={(e) => setFormData({ ...formData, productionDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-gray-700 font-semibold mb-1">
                  Lokasi / Pilihan Studio
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-medium"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-gray-700 font-semibold mb-1">
                  Catatan Khusus & Brief Kreatif
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ceritakan konsep visual, referensi moodboard, atau kebutuhan busana..."
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-xs font-medium"
                />
              </div>
            </div>

            {/* Payment Term Option */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-1">
                2. Pilihan Pembayaran
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div 
                  onClick={() => setFormData({ ...formData, paymentOption: 'dp' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentOption === 'dp' 
                      ? 'border-black bg-gray-50 ring-2 ring-black' 
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">Uang Muka (DP 50%)</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded text-[10px]">
                      Konfirmasi Jadwal
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Bayar separuh sekarang untuk mengunci jadwal studio & kru.</p>
                  <p className="text-base font-extrabold text-gray-900 mt-2">
                    {formatRupiah(selectedPackage.dpPrice)}
                  </p>
                </div>

                <div 
                  onClick={() => setFormData({ ...formData, paymentOption: 'full' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentOption === 'full' 
                      ? 'border-black bg-gray-50 ring-2 ring-black' 
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">Pelunasan Penuh (100%)</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px]">
                      Prioritas Lab
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Bebas administrasi pelunasan kemudian saat serah terima master.</p>
                  <p className="text-base font-extrabold text-gray-900 mt-2">
                    {formatRupiah(selectedPackage.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({formData.paymentOption === 'dp' ? 'DP 50%' : 'Lunas 100%'}):</span>
                <span className="font-bold text-gray-900">{formatRupiah(currentPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>PPN 11% (UU HPP):</span>
                <span className="font-bold text-gray-900">{formatRupiah(ppnAmount)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-extrabold text-gray-900">
                <span>Total yang Harus Dibayar:</span>
                <span>{formatRupiah(totalAmountToPay)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('catalog')}
                className="px-4 py-2.5 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-700"
              >
                Ganti Paket
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: MOCKUP PEMBAYARAN (PAYMENT GATEWAY FUNCTIONAL) */}
      {step === 'payment' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <button 
                onClick={() => setStep('checkout')}
                className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ubah Data Checkout</span>
              </button>
              <h2 className="text-xl font-bold text-gray-900">Gerbang Pembayaran Studio (Payment Gateway)</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 block">Total Ditagihkan:</span>
              <span className="text-lg font-extrabold text-gray-900">{formatRupiah(totalAmountToPay)}</span>
            </div>
          </div>

          {/* Payment Method Switcher Tabs */}
          <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => {
                setPaymentCategory('bank');
                setPaymentMethod('bca');
              }}
              className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                paymentCategory === 'bank' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Transfer Virtual Account</span>
            </button>

            <button
              onClick={() => {
                setPaymentCategory('ewallet');
                setPaymentMethod('gopay');
              }}
              className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                paymentCategory === 'ewallet' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>E-Wallet & QRIS</span>
            </button>
          </div>

          {/* Bank Transfer Selection (BCA, Mandiri) */}
          {paymentCategory === 'bank' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bca')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'bca' 
                      ? 'border-black bg-gray-50 ring-2 ring-black font-bold' 
                      : 'border-gray-200 hover:border-gray-400 bg-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-extrabold text-[10px]">
                      BCA
                    </span>
                    <div>
                      <p className="text-gray-900">BCA Virtual Account</p>
                      <p className="text-[10px] text-gray-500 font-normal">Verifikasi Otomatis 24/7</p>
                    </div>
                  </div>
                  {paymentMethod === 'bca' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mandiri')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'mandiri' 
                      ? 'border-black bg-gray-50 ring-2 ring-black font-bold' 
                      : 'border-gray-200 hover:border-gray-400 bg-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-blue-700 text-amber-300 flex items-center justify-center font-extrabold text-[9px]">
                      MNDR
                    </span>
                    <div>
                      <p className="text-gray-900">Mandiri Bill Payment</p>
                      <p className="text-[10px] text-gray-500 font-normal">Konfirmasi Seketika</p>
                    </div>
                  </div>
                  {paymentMethod === 'mandiri' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>

              {/* Virtual Account Box */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-medium">Nomor Virtual Account {paymentMethod === 'bca' ? 'BCA' : 'Mandiri'}:</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Aktif 2 Jam</span>
                </div>
                <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-mono text-lg font-bold text-gray-900 tracking-wider">
                    {paymentMethod === 'bca' ? '1280 8821 9901 4452' : '8870 1492 8812 0031'}
                  </span>
                  <button
                    onClick={() => handleCopy(paymentMethod === 'bca' ? '1280882199014452' : '8870149288120031', 'Nomor Virtual Account')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-md text-xs font-semibold text-gray-800 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Transfer tepat hingga nominal rupiah terakhir. Sistem CRM Lumina Studios akan otomatis mendeteksi mutasi dan mengubah status pesanan Anda.
                </p>
              </div>
            </div>
          )}

          {/* E-Wallet Selection (GoPay, OVO) */}
          {paymentCategory === 'ewallet' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gopay')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'gopay' 
                      ? 'border-black bg-gray-50 ring-2 ring-black font-bold' 
                      : 'border-gray-200 hover:border-gray-400 bg-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-[10px]">
                      GOPAY
                    </span>
                    <div>
                      <p className="text-gray-900">GoPay / QRIS</p>
                      <p className="text-[10px] text-gray-500 font-normal">Scan QR Semua Aplikasi</p>
                    </div>
                  </div>
                  {paymentMethod === 'gopay' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ovo')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'ovo' 
                      ? 'border-black bg-gray-50 ring-2 ring-black font-bold' 
                      : 'border-gray-200 hover:border-gray-400 bg-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center font-extrabold text-[10px]">
                      OVO
                    </span>
                    <div>
                      <p className="text-gray-900">OVO Cash</p>
                      <p className="text-[10px] text-gray-500 font-normal">Notifikasi HP Instan</p>
                    </div>
                  </div>
                  {paymentMethod === 'ovo' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>

              {/* QRIS / E-Wallet Box */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="w-32 h-32 bg-white p-2 rounded-xl border border-gray-200 flex flex-col items-center justify-center shadow-xs">
                  <QrCode className="w-24 h-24 text-gray-900" />
                  <span className="text-[9px] font-bold text-gray-500 mt-1 uppercase">QRIS Terverifikasi</span>
                </div>
                <div className="space-y-1.5 text-xs flex-1">
                  <p className="font-bold text-gray-900 text-sm">Pindai Kode QR Melalui Aplikasi {paymentMethod.toUpperCase()}</p>
                  <p className="text-gray-500 leading-relaxed">
                    Buka aplikasi {paymentMethod === 'gopay' ? 'GoPay, BCA Mobile, atau e-wallet apa saja' : 'OVO'} di smartphone Anda, lalu arahkan kamera ke kode QR untuk menyelesaikan otorisasi pembayaran.
                  </p>
                  <p className="text-emerald-700 font-semibold pt-1">
                    Total: {formatRupiah(totalAmountToPay)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button to Complete Payment Mockup */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Pembayaran terenkripsi 256-bit standar PCI-DSS perbankan.</span>
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Memverifikasi Pembayaran...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi & Simulasikan Pembayaran Lunas</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: HALAMAN SUKSES & STRUK PEMBAYARAN */}
      {step === 'success' && completedBooking && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 space-y-8 shadow-md animate-fade-in text-center sm:text-left">
          
          {/* Success Banner */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-gray-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                ✓ Transaksi Sukses & Terverifikasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Pemesanan Berhasil Terdaftar!
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Data pesanan Anda telah otomatis disinkronkan ke Dasbor Internal Tim Produksi Lumina Studios.
              </p>
            </div>
          </div>

          {/* Receipt Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-4 text-xs font-medium">
            <div className="flex flex-col sm:flex-row justify-between pb-3 border-b border-gray-200 gap-2">
              <div>
                <span className="text-gray-400 uppercase text-[10px] block">Kode Pesanan:</span>
                <span className="text-base font-extrabold text-gray-900">{completedBooking.bookingCode}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-gray-400 uppercase text-[10px] block">Nomor Faktur Resmi:</span>
                <span className="text-sm font-bold text-gray-900">{completedBooking.invoiceNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <div>
                <span className="text-gray-400 text-[11px] block">Nama Pelanggan:</span>
                <span className="font-bold text-gray-900">{completedBooking.clientName}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">Paket Layanan:</span>
                <span className="font-bold text-gray-900">{selectedPackage.name}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">Tanggal Produksi:</span>
                <span className="font-bold text-gray-900">{formatDateIndo(completedBooking.eventDate)}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">Metode Pembayaran:</span>
                <span className="font-bold text-gray-900">{completedBooking.paymentMethodName} (Terverifikasi)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
              <span className="text-gray-700">Total Nominal Dibayar:</span>
              <span className="text-lg text-emerald-700 font-extrabold">{formatRupiah(completedBooking.totalPaidNow)}</span>
            </div>
          </div>

          {/* Real-time Integration Callout */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-blue-900">
                Data Terhubung Real-Time ke Dasbor CRM Internal
              </p>
              <p className="text-blue-700 leading-relaxed font-normal">
                Pesanan <strong>{completedBooking.bookingCode}</strong> telah otomatis terdaftar sebagai kartu baru di kolom <em>Terkonfirmasi (DP)</em> pada <strong>Pipeline Prospek & Pesanan</strong>, serta menambahkan saldo pemasukan di <strong>Faktur & Keuangan</strong>.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setStep('catalog');
                setFormData({
                  customerName: '',
                  whatsapp: '',
                  email: '',
                  productionDate: '2026-11-20',
                  venue: 'Studio A (White Cyclorama) - Lumina Jakarta',
                  notes: 'Sesi foto komersial baru.',
                  paymentOption: 'dp'
                });
              }}
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              + Buat Pemesanan Lain
            </button>

            <button
              onClick={onSwitchToAdmin}
              className="w-full sm:w-auto px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Buka Dasbor Internal (Lihat Hasil di CRM)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
