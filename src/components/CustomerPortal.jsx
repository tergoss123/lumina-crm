import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  FileText, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  Camera, 
  Video,
  Clock, 
  ExternalLink,
  ArrowLeft,
  Home,
  CheckCircle,
  Building2,
  Wallet
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export const PACKAGES = [
  {
    id: 'pkg-wisuda',
    name: 'Paket Foto Wisuda (Studio/Outdoor)',
    tier: 'Wisuda',
    badge: 'Paling Terjangkau',
    price: 350000,
    dpPrice: 175000,
    category: 'Potret',
    description: 'Sesi foto wisuda standar, cetak + file digital berkualitas tinggi untuk momen kelulusan berharga.',
    features: [
      '45 Menit Sesi Foto (Studio / Outdoor Area Garut & Bandung)',
      '10 Foto Master Retouched Resolusi Tinggi',
      '1 Cetak Foto Ukuran 10R + Bingkai Minimalis',
      'Akses Google Drive Seluruh File Mentah & Edited',
      'Bisa Foto Tunggal, Bersama Orang Tua, atau Sahabat (Maks. 4 Orang)'
    ],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pkg-engagement',
    name: 'Paket Engagement / Lamaran',
    tier: 'Lamaran',
    badge: 'Populer',
    price: 1500000,
    dpPrice: 750000,
    category: 'Pernikahan',
    description: 'Dokumentasi liputan foto & video lengkap untuk prosesi lamaran atau pertunangan yang sakral.',
    features: [
      'Liputan Acara hingga 4 Jam di Garut / Bandung',
      '1 Photographer + 1 Videographer Profesional',
      'Semua File Foto Unedited via Google Drive',
      '40 Foto Pilihan Color Graded & Retouched',
      'Video Highlight Sinematik 1-2 Menit (Format Reels & 16:9)',
      'Flashdisk Eksklusif Berisi Seluruh Dokumentasi'
    ],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pkg-wedding',
    name: 'Paket Wedding Outdoor + Cinematic Drone',
    tier: 'Wedding Drone',
    badge: 'Paket Lengkap Unggulan',
    price: 3500000,
    dpPrice: 1750000,
    category: 'Pernikahan',
    description: 'Liputan foto, video komprehensif, dan sesi aerial / drone sinematik 1 hari penuh untuk pernikahan impian.',
    features: [
      'Liputan 1 Hari Penuh (Akad & Resepsi) Area Garut & Bandung',
      '2 Photographer + 2 Videographer + 1 Pilot Drone Bersertifikat',
      'Sesi Aerial Cinematic Drone 4K (DJI Mini Pro / Air Series)',
      'Teaser Reels 60 Detik Siap Upload (H+2 Acara)',
      'Video Dokumentasi Sinematik Durasi 3-5 Menit (4K UHD)',
      'Album Kolase Magnetik Eksklusif 20 Halaman + Flashdisk Kayu'
    ],
    recommended: true,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pkg-prewed',
    name: 'Paket Pre-Wedding Casual (Foto Saja)',
    tier: 'Pre-Wedding',
    badge: 'Konsep Fleksibel',
    price: 750000,
    dpPrice: 375000,
    category: 'Pernikahan',
    description: 'Sesi foto outdoor kasual dan hangat di lokasi pilihan terbaik Garut atau Bandung.',
    features: [
      '2-3 Jam Sesi Pemotretan Outdoor (Kawah Kamojang, Situ Bagendit, Tebing Keraton, dll.)',
      '1 Lead Photographer Berpengalaman',
      '25 Foto Master Retouched & Tone Grading Khas Lumina',
      'Konsultasi Konsep, Moodboard & Pemilihan Outfit',
      'Seluruh File Original Beresolusi Penuh via Cloud'
    ],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pkg-family',
    name: 'Paket Family Portrait',
    tier: 'Keluarga',
    badge: 'Hangat & Intim',
    price: 250000,
    dpPrice: 125000,
    category: 'Potret',
    description: 'Sesi foto keluarga ringkas, hangat, dan berkesan untuk mengabadikan momen kebersamaan.',
    features: [
      '30-45 Menit Sesi Foto Studio / Home Visit (Garut & Bandung)',
      'Maksimal 6 Anggota Keluarga',
      '5 Foto Master Retouched & Dicetak Ukuran 8R',
      'Seluruh File Mentah & Edited Diberikan via Google Drive',
      'Properti Studio & Setup Pencahayaan Profesional'
    ],
    recommended: false,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80'
  }
];

export const CustomerPortal = ({ onBookingCreated, onSwitchToAdmin, showToast }) => {
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[2]); // Default to Wedding Drone
  const [step, setStep] = useState('catalog'); // 'catalog' | 'checkout' | 'payment' | 'success'

  // Form checkout state - Area Garut & Bandung
  const [formData, setFormData] = useState({
    customerName: '',
    whatsapp: '',
    location: 'Garut', // Dropdown: 'Garut' | 'Bandung'
    productionDate: '2026-11-20',
    notes: '',
    paymentOption: 'dp' // 'dp' (50%) | 'full' (100%)
  });

  // Payment method selection: BCA, Mandiri, GoPay, DANA
  const [paymentMethod, setPaymentMethod] = useState('bca'); // 'bca' | 'mandiri' | 'gopay' | 'dana'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Completed booking data for receipt
  const [completedBooking, setCompletedBooking] = useState(null);

  // Calculate prices
  const currentPrice = formData.paymentOption === 'dp' ? selectedPackage.dpPrice : selectedPackage.price;
  const ppnAmount = Math.round(currentPrice * 0.11);
  const totalAmountToPay = currentPrice + ppnAmount;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    if (showToast) {
      showToast({
        title: 'Tersalin ke Clipboard',
        message: `${label} (${text}) berhasil disalin.`,
        type: 'success'
      });
    }
  };

  const handleProceedToCheckout = (pkg) => {
    setSelectedPackage(pkg);
    setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.whatsapp.trim()) {
      if (showToast) {
        showToast({
          title: 'Form Belum Lengkap',
          message: 'Mohon isi Nama Lengkap dan Nomor WhatsApp Anda.',
          type: 'error'
        });
      }
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const bookingCode = `LMN-GB-${Math.floor(100 + Math.random() * 900)}`;
      const invoiceNumber = `INV/LMN/26/11-${Math.floor(100 + Math.random() * 900)}`;
      const isFull = formData.paymentOption === 'full';

      // Record for Global State:
      // Notice: workflowStatus is 'Inquiry' so it appears as a new incoming card in "Pesanan Masuk" / "Prospek"!
      const newBookingRecord = {
        id: `b-${Date.now()}`,
        bookingCode,
        clientId: `c-${Date.now()}`,
        clientName: formData.customerName,
        whatsapp: formData.whatsapp,
        eventType: selectedPackage.category,
        eventDate: formData.productionDate,
        venue: `${selectedPackage.name} (${formData.location})`,
        location: formData.location,
        packageTier: selectedPackage.tier,
        packageName: selectedPackage.name,
        totalPrice: selectedPackage.price,
        dpAmount: isFull ? selectedPackage.price : selectedPackage.dpPrice,
        paymentStatus: isFull ? 'Fully Paid' : 'DP Paid',
        workflowStatus: 'Inquiry', // Masuk ke kolom "Pesanan Masuk / Prospek" di Kanban Pipeline!
        assignedCrew: formData.location === 'Garut' 
          ? ['Tim Kreatif Lumina Garut (Dian & Rizky)'] 
          : ['Tim Kreatif Lumina Bandung (Rama & Yoga)'],
        galleryUrl: `https://vault.lumina.studio/client/${formData.customerName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        invoiceId: invoiceNumber,
        notes: `[Pesanan Online ${formData.location}] WA: ${formData.whatsapp}. Catatan: ${formData.notes || 'Tidak ada catatan khusus.'}`,
        postProdProgress: 0,
        source: 'Portal Pelanggan Online'
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
        virtualAccount: paymentMethod === 'bca' ? '1280 8821 9901 4452 (BCA)' 
                      : paymentMethod === 'mandiri' ? '8870 1492 8812 0031 (Mandiri)'
                      : paymentMethod === 'dana' ? '0812 2345 6789 (DANA Bisnis)'
                      : 'QRIS Dinamis GoPay',
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

      if (showToast) {
        showToast({
          title: 'Pembayaran Berhasil Diverifikasi',
          message: `Pesanan ${bookingCode} otomatis masuk ke kolom "Pesanan Masuk / Prospek" di Admin CRM!`,
          type: 'success'
        });
      }
    }, 1100);
  };

  // Reset to Catalog for "Kembali ke Beranda"
  const handleBackToHome = () => {
    setStep('catalog');
    setFormData({
      customerName: '',
      whatsapp: '',
      location: 'Garut',
      productionDate: '2026-11-20',
      notes: '',
      paymentOption: 'dp'
    });
    setCompletedBooking(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-24 max-w-5xl mx-auto">
      
      {/* Editorial Customer Hero Header */}
      <div className="text-center space-y-3 pt-2 pb-6 border-b border-gray-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Lumina Studios • Area Layanan Garut & Bandung</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          Layanan Foto & Video Sinematik
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Pilihan paket dokumentasi wisuda, lamaran, pre-wedding, family portrait, dan pernikahan dengan teknologi aerial drone di wilayah Garut & Bandung.
        </p>
      </div>

      {/* ======================================================== */}
      {/* STEP 1: KATALOG 5 PAKET LAYANAN STUDIO                   */}
      {/* ======================================================== */}
      {step === 'catalog' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pilihan Paket Layanan</h2>
              <p className="text-xs text-gray-500">Harga transparan, sudah termasuk sesi produksi dan pengolahan master digital.</p>
            </div>
            <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
              5 Paket Tersedia
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPackage.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-md ${
                    pkg.recommended 
                      ? 'border-gray-900 ring-2 ring-gray-900/10' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {/* Top Badge */}
                  {pkg.badge && (
                    <div className={`px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase flex items-center justify-between ${
                      pkg.recommended ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span>{pkg.badge}</span>
                      <span className="text-[10px] font-mono opacity-80">{pkg.tier}</span>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 space-y-4 flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors leading-snug">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                          {formatRupiah(pkg.price)}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                        Opsi DP 50%: {formatRupiah(pkg.dpPrice)}
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="text-xs text-gray-600 space-y-2 pt-2 border-t border-gray-100">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action */}
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      onClick={() => handleProceedToCheckout(pkg)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        pkg.recommended
                          ? 'bg-black hover:bg-neutral-800 text-white shadow-sm'
                          : 'bg-gray-900 hover:bg-black text-white'
                      }`}
                    >
                      <span>Pilih Paket Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* STEP 2: FORM CHECKOUT DETAIL PESANAN                     */}
      {/* ======================================================== */}
      {step === 'checkout' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep('catalog')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ganti Pilihan Paket</span>
            </button>
            <span className="text-xs text-gray-500 font-medium">Langkah 2 dari 3</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Inputs */}
            <form onSubmit={handleProceedToPayment} className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Form Pemesanan Layanan</h2>
                <p className="text-xs text-gray-500 mt-0.5">Isi data lengkap kontak dan preferensi jadwal untuk wilayah Garut atau Bandung.</p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Nama Pelanggan */}
                <div>
                  <label className="block font-semibold text-gray-800 mb-1.5">
                    Nama Lengkap Pelanggan *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Farhan / Nabila Rahma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* WhatsApp & Lokasi (Dropdown) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-800 mb-1.5">
                      Nomor WhatsApp Aktif *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 0812-3456-7890"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-800 mb-1.5">
                      Lokasi Pelaksanaan (Dropdown) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 text-xs font-medium bg-white"
                      >
                        <option value="Garut">Area Garut (Studio / Outdoor Kota & Sekitarnya)</option>
                        <option value="Bandung">Area Bandung (Studio / Outdoor Bandung Raya)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tanggal Produksi */}
                <div>
                  <label className="block font-semibold text-gray-800 mb-1.5">
                    Tanggal Rencana Produksi / Sesi Foto *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={formData.productionDate}
                      onChange={(e) => setFormData({ ...formData, productionDate: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Catatan Khusus */}
                <div>
                  <label className="block font-semibold text-gray-800 mb-1.5">
                    Catatan Tambahan (Konsep, Alamat Spesifik, atau Permintaan Khusus)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Lokasi outdoor di Situ Cangkuang Garut, request foto candid saat matahari terbenam."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 text-xs font-medium"
                  />
                </div>

                {/* Payment Option: DP vs Full */}
                <div className="pt-2">
                  <label className="block font-semibold text-gray-800 mb-2">
                    Pilihan Termin Pembayaran:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      formData.paymentOption === 'dp' 
                        ? 'border-black bg-gray-50/80 ring-1 ring-black' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={formData.paymentOption === 'dp'}
                        onChange={() => setFormData({ ...formData, paymentOption: 'dp' })}
                        className="mt-0.5 text-black focus:ring-black"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block text-xs">Uang Muka / DP 50%</span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          Bayar {formatRupiah(selectedPackage.dpPrice)} sekarang, pelunasan saat sesi selesai.
                        </span>
                      </div>
                    </label>

                    <label className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      formData.paymentOption === 'full' 
                        ? 'border-black bg-gray-50/80 ring-1 ring-black' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={formData.paymentOption === 'full'}
                        onChange={() => setFormData({ ...formData, paymentOption: 'full' })}
                        className="mt-0.5 text-black focus:ring-black"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block text-xs">Pelunasan Penuh 100%</span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          Bayar {formatRupiah(selectedPackage.price)} langsung lunas di awal.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Lanjut ke Pembayaran</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Sidebar Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 h-fit shadow-sm">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">Ringkasan Pesanan</span>
                <h3 className="font-bold text-base text-gray-900 mt-1">{selectedPackage.name}</h3>
                <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Area: {formData.location}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Harga Paket:</span>
                  <span className="font-bold text-gray-900">{formatRupiah(selectedPackage.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Termin Dipilih:</span>
                  <span className="font-semibold text-gray-900">{formData.paymentOption === 'dp' ? 'DP 50%' : 'Lunas 100%'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">{formatRupiah(currentPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>PPN (11%):</span>
                  <span>{formatRupiah(ppnAmount)}</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-gray-900">Total Ditagihkan:</span>
                  <span className="text-lg font-extrabold text-gray-900">{formatRupiah(totalAmountToPay)}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Jaminan Kepuasan Lumina</span>
                </div>
                <p>Termasuk revisi tone warna dan pengiriman berkas digital via cloud.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* STEP 3: MOCKUP PEMBAYARAN (BCA, MANDIRI, GOPAY, DANA)     */}
      {/* ======================================================== */}
      {step === 'payment' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep('checkout')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Detail Pesanan</span>
            </button>
            <span className="text-xs text-gray-500 font-medium">Langkah 3 dari 3</span>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="text-center space-y-1 border-b border-gray-100 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                Simulasi Payment Gateway Aktif
              </span>
              <h2 className="text-xl font-bold text-gray-900">Pilih Metode Pembayaran</h2>
              <p className="text-xs text-gray-500">Pilih salah satu kanal pembayaran untuk menyelesaikan pemesanan.</p>
            </div>

            {/* Total Display */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center space-y-1">
              <span className="text-xs text-gray-500">Total yang Harus Dibayar:</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {formatRupiah(totalAmountToPay)}
              </div>
              <span className="text-[11px] text-gray-500 block">
                {selectedPackage.name} • Lokasi {formData.location} ({formData.paymentOption === 'dp' ? 'DP 50%' : 'Lunas'})
              </span>
            </div>

            {/* 4 Payment Options: BCA, Mandiri, GoPay, DANA */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-800">
                Pilih Kanal Pembayaran:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* BCA */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bca')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'bca'
                      ? 'border-black bg-black text-white font-bold shadow-xs'
                      : 'border-gray-200 hover:border-black text-gray-700 bg-white'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs">BCA VA</span>
                </button>

                {/* Mandiri */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mandiri')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'mandiri'
                      ? 'border-black bg-black text-white font-bold shadow-xs'
                      : 'border-gray-200 hover:border-black text-gray-700 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Mandiri</span>
                </button>

                {/* GoPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gopay')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'gopay'
                      ? 'border-black bg-black text-white font-bold shadow-xs'
                      : 'border-gray-200 hover:border-black text-gray-700 bg-white'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs">GoPay QRIS</span>
                </button>

                {/* DANA */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('dana')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'dana'
                      ? 'border-black bg-black text-white font-bold shadow-xs'
                      : 'border-gray-200 hover:border-black text-gray-700 bg-white'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-xs">DANA</span>
                </button>
              </div>
            </div>

            {/* Payment Details Container */}
            <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-3 text-xs">
              {paymentMethod === 'bca' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Nomor Virtual Account BCA:</span>
                    <button
                      onClick={() => handleCopy('1280 8821 9901 4452', 'Nomor BCA VA')}
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Salin No. VA</span>
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg font-mono text-base font-bold text-gray-900 tracking-wider">
                    1280 8821 9901 4452
                  </div>
                  <p className="text-[11px] text-gray-500">Atas nama: <strong>PT LUMINA MEDIA PRODUKSI</strong></p>
                </div>
              )}

              {paymentMethod === 'mandiri' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Nomor Mandiri Bill Payment:</span>
                    <button
                      onClick={() => handleCopy('8870 1492 8812 0031', 'Nomor Mandiri Bill')}
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Salin No. Rekening</span>
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg font-mono text-base font-bold text-gray-900 tracking-wider">
                    8870 1492 8812 0031
                  </div>
                  <p className="text-[11px] text-gray-500">Kode Perusahaan: <strong>88701 (Lumina Studios)</strong></p>
                </div>
              )}

              {paymentMethod === 'gopay' && (
                <div className="space-y-3 text-center py-2">
                  <div className="w-36 h-36 mx-auto bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-2">
                    <QrCode className="w-16 h-16 text-gray-700 mb-1" />
                    <span className="text-[10px] font-bold text-gray-600 font-mono">QRIS LUMINA</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Buka aplikasi GoPay atau Mobile Banking, lalu scan kode QR di atas untuk pembayaran instan.
                  </p>
                </div>
              )}

              {paymentMethod === 'dana' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Nomor DANA Bisnis (Garut-Bandung):</span>
                    <button
                      onClick={() => handleCopy('0812 2345 6789', 'Nomor DANA')}
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Salin No. DANA</span>
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg font-mono text-base font-bold text-gray-900 tracking-wider">
                    0812 2345 6789
                  </div>
                  <p className="text-[11px] text-gray-500">Nama Akun: <strong>LUMINA STUDIOS OFFICIAL</strong></p>
                </div>
              )}
            </div>

            {/* CTA Submit Simulation */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleConfirmPayment}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] disabled:opacity-75"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Memverifikasi Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi Pembayaran ({formatRupiah(totalAmountToPay)})</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-gray-400">
                🔒 Simulasi terhubung langsung dengan sistem CRM & pembukuan kas Lumina.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* STEP 4: HALAMAN SUKSES (STRUK & TOMBOL KEMBALI)           */}
      {/* ======================================================== */}
      {step === 'success' && completedBooking && (
        <section className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 space-y-6 shadow-md text-left">
          
          {/* Header Status */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl shrink-0">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                Pembayaran Berhasil Diverifikasi
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
                Pemesanan Anda Telah Dikonfirmasi!
              </h2>
            </div>
          </div>

          {/* Struk Rincian Pemesanan */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 text-xs font-medium">
            <div className="flex justify-between items-start pb-3 border-b border-gray-200">
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-mono block">KODE PESANAN:</span>
                <span className="text-base font-mono font-extrabold text-gray-900">{completedBooking.bookingCode}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 text-[10px] uppercase font-mono block">NOMOR FAKTUR:</span>
                <span className="font-mono font-bold text-gray-900">{completedBooking.invoiceNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div>
                <span className="text-gray-400 text-[11px] block">Pelanggan:</span>
                <span className="font-bold text-gray-900">{completedBooking.clientName}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">No. WhatsApp:</span>
                <span className="font-bold text-gray-900">{completedBooking.whatsapp}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">Paket Layanan:</span>
                <span className="font-bold text-gray-900">{completedBooking.packageName}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">Area Produksi:</span>
                <span className="font-bold text-gray-900">Wilayah {completedBooking.location}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">Tanggal Produksi:</span>
                <span className="font-bold text-gray-900">{completedBooking.eventDate}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[11px] block">Metode Pembayaran:</span>
                <span className="font-bold text-gray-900">{completedBooking.paymentMethodName} (Lunas)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
              <span>Total Terbayar:</span>
              <span className="text-lg text-emerald-700 font-extrabold">
                {formatRupiah(completedBooking.totalPaidNow)}
              </span>
            </div>
          </div>

          {/* Real-time sync notification badge */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Sinkronisasi Real-Time Berhasil ke Dasbor Admin
            </p>
            <p className="text-emerald-800 leading-relaxed">
              Data pesanan Anda telah otomatis muncul sebagai card baru pada kolom <strong>"Pesanan Masuk" / "Prospek"</strong> di modul Pipeline dan nominalnya telah menambah <strong>Total Saldo Masuk</strong> di modul Faktur Keuangan!
            </p>
          </div>

          {/* Action Buttons: Kembali ke Beranda & Lihat di Admin */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
            <button
              onClick={handleBackToHome}
              className="w-full sm:w-auto px-5 py-3 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>

            <button
              onClick={onSwitchToAdmin}
              className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Buka Dasbor Admin (Lihat Card Baru)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

    </div>
  );
};
