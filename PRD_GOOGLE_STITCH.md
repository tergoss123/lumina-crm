# Product Requirements Document (PRD) // LUMINA STUDIOS WEB MONOLITH & CUSTOMER PORTAL
**Format Target:** Google Stitch Prototype & Multi-Screen Monolith Specification  
**Versi:** 2.1.0 (Customer Portal & Multi-Module Admin Integration)  
**Status:** Siap Produksi / Active Production  
**Design System:** High-End Editorial Minimalist (`#000000`, `#FFFFFF`, Hairline 1px `#E5E7EB`, Accent Emerald `#059669`)  
**Target Platform:** Mobile-First Responsive Web (PWA / SPA Monolith)  
**Tautan Referensi Visual:** [https://tergoss123.github.io/lumina-crm/](https://tergoss123.github.io/lumina-crm/)

---

## 1. Ringkasan Produk & Visi (Product Overview & Vision)
Lumina Studios Web Monolith adalah ekosistem aplikasi web satu atap (*single source of truth*) yang menggabungkan dua pengalaman pengguna yang terpisah secara visual namun terintegrasi dalam satu *global state*:
1. **Jalur Akses Pelanggan (`/customer`):** Antarmuka publik modern yang intuitif bagi calon klien di wilayah **Garut & Bandung** untuk menjelajahi katalog layanan foto/video/drone studio, mengisi formulir pemesanan, melakukan simulasi pembayaran instan (BCA, Mandiri, GoPay, DANA), dan menerima struk bukti pemesanan resmi.
2. **Jalur Akses Tim Internal Admin (`/admin`):** Dasbor terpadu 5 modul operasional studio (Ringkasan KPI, Papan Kanban Pipeline, Kalender Kru & Lembar Panggilan, Lab Pasca-Produksi, serta Buku Besar Faktur & Pajak).

Data transaksi yang dieksekusi di portal `/customer` secara langsung (*real-time reactive*) memperbarui kolom "Pesanan Masuk" di papan Kanban dan menambah saldo kas masuk di modul Faktur Keuangan tanpa perlu penyegaran halaman manual (*zero reload*).

---

## 2. Struktur Arsitektur & Jalur Akses (App Shell & Routing)

### 2.1 Skema Routing Monolith:
* `GET /customer` (atau Index Utama `/`): Portal Pelanggan publik.
* `GET /admin`: Dasbor Operasional Tim Internal Lumina Studios.
* `Mode Switcher Component`: Navigasi *floating pill* di sudut kanan bawah layar (`View as Customer` ⇄ `View as Admin`) dan *pill tabs* di bilah navigasi atas untuk kemudahan demonstrasi.

---

## 3. Inventaris Layar & Spesifikasi Antarmuka (Screen Specifications)

### SCREEN 1: `portal_pelanggan` (Jalur Akses: `/customer`)
* **Tipe Shell:** Public Landing & Multi-Step Booking Funnel
* **Target Pengguna:** Calon Klien Area Garut & Bandung
* **Komponen & Alur:**
  1. **Editorial Hero Header:**
     - Pill status: `"Area Layanan Garut & Bandung • Foto & Video Sinematik"`
     - Headline: `"Pemesanan Sesi Foto, Video & Aerial Drone"`
  2. **Katalog 5 Paket Layanan:**
     - **Paket 1 - Foto Wisuda (Studio/Outdoor):** Rp 350.000 (DP: Rp 175.000). Durasi 45 menit, 10 foto retouched, cetak 10R + bingkai, link Google Drive.
     - **Paket 2 - Engagement / Lamaran:** Rp 1.500.000 (DP: Rp 750.000). Liputan 4 jam, 1 foto + 1 video kru, 40 foto edited, highlight 1-2 menit.
     - **Paket 3 - Wedding Outdoor + Cinematic Drone (Recommended):** Rp 3.500.000 (DP: Rp 1.750.000). Liputan 1 hari penuh akad & resepsi, 2 foto + 2 video + 1 pilot drone, aerial 4K, video 3-5 menit, album kolase 20 hal + flashdisk kayu.
     - **Paket 4 - Pre-Wedding Casual (Foto Saja):** Rp 750.000 (DP: Rp 375.000). Sesi outdoor 2-3 jam (Kawah Kamojang, Situ Bagendit, Tebing Keraton), 25 foto master retouch, free moodboard outfit.
     - **Paket 5 - Family Portrait:** Rp 250.000 (DP: Rp 125.000). Sesi 30-45 menit studio/home visit, maks. 6 anggota, 5 master edited, cetak 8R.
  3. **Formulir Checkout Ringkas:**
     - `Nama Lengkap Pelanggan` (Text Input)
     - `Nomor WhatsApp Aktif` (Tel Input)
     - `Lokasi Pelaksanaan` (Dropdown: `Garut` / `Bandung`)
     - `Tanggal Sesi Foto / Produksi` (Date Picker)
     - `Catatan Tambahan` (Textarea: konsep, alamat detail, atau request khusus)
     - `Termin Pembayaran` (Radio: DP 50% vs Pelunasan Penuh 100% + otomatis PPN 11%)
  4. **Mockup Payment Gateway:**
     - Pilihan kanal: **BCA Virtual Account** (`1280 8821 9901 4452`), **Mandiri Bill Payment** (`8870 1492 8812 0031`), **GoPay QRIS** (Dynamic QR), **DANA Bisnis** (`0812 2345 6789`).
     - Fitur *1-click copy account number*.
     - Tombol aksi: `"Konfirmasi & Simulasikan Pembayaran Lunas"`.
  5. **Halaman Sukses & Struk Digital:**
     - Kartu struk: Kode Booking resmi (`LMN-GB-xxx`), Nomor Faktur, Nama, WhatsApp, Area Garut/Bandung, Tanggal, dan Total Terbayar.
     - Tombol Navigasi:
       - `"Kembali ke Beranda"` (Reset form ke katalog `/customer`)
       - `"Buka Dasbor Admin (/admin)"` (Navigasi cepat ke Pipeline internal)

---

### SCREEN 2: `ringkasan_studio` (Jalur Akses: `/admin/overview`)
* **Tipe Shell:** Executive KPI & Fleet Telemetry Dashboard
* **Komponen Utama:**
  - Baris KPI Utama: Total Nilai Ditagihkan YTD, Tingkat Likuiditas Pencairan (88.8%), Unit Syuting Aktif.
  - Urgent Call Sheet Countdown: Lembar panggilan terdekat, set studio (Cyclorama A / Loft B), status *Gear Calibration Check*.
  - Prospek Masuk Terbaru: Kartu lead instan dengan tombol cepat *Tolak*, *Kirim Penawaran*, atau *Jadwalkan Panggilan*.
  - Status Utilisasi Studio: Okupansi panggung 8K dan alokasi kru.

---

### SCREEN 3: `pipeline_prospek_pesanan` (Jalur Akses: `/admin/pipeline`)
* **Tipe Shell:** Multi-Stage Kanban Board & List Switcher
* **Spesifikasi Kolom Kanban:**
  1. **Kolom 1: "Pesanan Masuk" / "Prospek":**
     - Target sinkronisasi langsung dari `/customer`.
     - Setiap pesanan dari portal pelanggan otomatis terpasang di posisi teratas dengan tag:
       `⚡ PESANAN MASUK (PORTAL ONLINE)`
     - Menampilkan nama pemesan, nomor WhatsApp, area (Garut/Bandung), jenis paket, tanggal produksi, dan total nilai kontrak.
     - Counter badge kolom otomatis bertambah (`04` ➔ `05+`).
  2. **Kolom 2: "Penawaran Dikirim"** (Quotes & Proposed Budgets).
  3. **Kolom 3: "Terkonfirmasi (DP Dibayar)"** (Orders with 50% / Full DP).
  4. **Kolom 4: "Hari Syuting"** (Active Production & Call Time Sheets).
  5. **Kolom 5: "Pasca-Produksi"** (Lab Grading & Editing).
  6. **Kolom 6: "Selesai & Dikirim"** (Archived & Delivered).
* **Booking Inspector Drawer:** Slide-over detail berisi informasi teknis lensa/kamera, kru yang bertugas, checklist peralatan, dan tombol faktur.

---

### SCREEN 4: `kalender_produksi_kru` (Jalur Akses: `/admin/calendar`)
* **Tipe Shell:** Operational Production Calendar & Call Sheets
* **Komponen Utama:**
  - Grid jadwal harian/mingguan interaktif.
  - Detail *Call Sheet*: Jam panggilan kru (*Call Time*), *Wrap Time*, lokasi studio atau outdoor.
  - Penugasan Kru: Director, Lead Cinematographer, Drone Pilot, Gaffer, Audio Engineer.
  - Live Camera Feed Monitor preview & daftar checklist peralatan armada RED/Sony/DJI.

---

### SCREEN 5: `pasca_produksi_pengiriman` (Jalur Akses: `/admin/postprod`)
* **Tipe Shell:** Post-Production Lab Suite & Cloud Delivery Vault
* **Komponen Utama:**
  - 5 Tahap Progres Lab: Raw Ingest 8K ➔ Kurasi Foto ➔ Rough Cut ➔ DaVinci Resolve Color Grade ➔ Audio Mastering Dolby Atmos.
  - Integrasi Review: Kolaborasi catatan frame klien via Frame.io.
  - Private Client Vault: Tautan galeri digital terenkripsi PIN dengan opsi kirim tautan VIP via WhatsApp ke nomor klien.

---

### SCREEN 6: `faktur_keuangan` (Jalur Akses: `/admin/invoices`)
* **Tipe Shell:** Treasury Ledger & Tax Compliance
* **Komponen Utama:**
  - Metrik Finansial:
    - **Total Ditagihkan (YTD)**: Otomatis bertambah saat ada order dari `/customer`.
    - **Kas Terealisasi / Lunas**: Otomatis bertambah sesuai nominal DP atau pembayaran penuh pelanggan.
    - **Piutang Tertunda**: Sisa pembayaran yang jatuh tempo.
  - Buku Besar Faktur (*Invoices Editorial Ledger*):
    - Faktur dari portal pelanggan otomatis terbit di baris teratas dengan badge hijau `LUNAS (GATEWAY ONLINE)`.
    - Menyertakan nomor faktur resmi (`#INV/LMN/26/...`), nama klien, rincian paket, area Garut/Bandung, dan kanal bayar (BCA/Mandiri/GoPay/DANA).
  - Kepatuhan Pajak: Perhitungan otomatis PPN 11% dan PPh 23.

---

## 4. Spesifikasi Integrasi & State Management (Data Flow)

```
[ Pelanggan di /customer ]
       │
       ▼
1. Pilih Paket (Wisuda / Lamaran / Wedding Drone / Prewed / Family)
2. Isi Form Checkout (Nama, WA, Lokasi Garut/Bandung, Tanggal)
3. Eksekusi Pembayaran Mockup (BCA / Mandiri / GoPay / DANA)
       │
       ├──► Dispatch State ke LocalStorage / React Context
       │    ├── 'lumina_bookings': [ newBooking, ...existing ]
       │    └── 'lumina_revenue': currentRevenue + paidAmount
       ▼
[ Sinkronisasi Otomatis ke /admin ]
       ├──► SCREEN 3 (Pipeline): Kartu baru otomatis terpasang di Kolom 1 "Pesanan Masuk"
       └──► SCREEN 6 (Faktur): Total Ditagihkan & Kas Masuk seketika bertambah
```

### Skema Relasional Objek Pesanan (`BookingRecord`):
```json
{
  "id": "b-1793689000",
  "bookingCode": "LMN-GB-882",
  "clientName": "Muhammad Farhan",
  "whatsapp": "0812-3456-7890",
  "location": "Garut",
  "eventType": "Pernikahan",
  "packageName": "Paket Wedding Outdoor + Cinematic Drone",
  "packageTier": "Wedding Drone",
  "eventDate": "2026-11-20",
  "totalPrice": 3500000,
  "paidAmount": 1750000,
  "paymentStatus": "DP Paid",
  "workflowStatus": "Inquiry",
  "invoiceId": "INV/LMN/26/11-089",
  "paymentMethod": "BCA",
  "notes": "Lokasi outdoor Garut, request foto sunset candid."
}
```

---

## 5. Token Desain Google Stitch (Design Tokens & Styling)

```yaml
Design System: Lumina Monolith Minimalist
Colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  primary: '#000000'
  on-primary: '#ffffff'
  emerald-accent: '#059669'
  emerald-surface: '#ecfdf5'
Typography:
  sans: 'Inter, Plus Jakarta Sans, sans-serif'
  mono: 'Space Mono, monospace'
Border:
  hairline: '1px solid #E5E7EB'
  radius-default: '0.5rem (rounded-lg)'
  radius-large: '1rem (rounded-2xl)'
```

---

## 6. Skenario Pengujian & Kriteria Keberhasilan (Acceptance Criteria)

| ID | Fitur | Kriteria Keberhasilan | Status |
|---|---|---|---|
| AC-01 | Pemisahan Jalur Akses | Rute `/customer` membuka portal pelanggan dan `/admin` membuka dasbor internal CRM. | ✅ Lulus |
| AC-02 | Katalog Garut & Bandung | Menampilkan tepat 5 paket (Wisuda 350K, Lamaran 1.5M, Wedding Drone 3.5M, Prewed 750K, Family 250K). | ✅ Lulus |
| AC-03 | Formulir Checkout | Input Nama, WhatsApp, Dropdown Lokasi (Garut/Bandung), Tanggal, Catatan, dan Termin DP/Full berfungsi baik. | ✅ Lulus |
| AC-04 | Mockup Gateway | Pilihan BCA, Mandiri, GoPay, dan DANA dengan nomor rekening/rekening bisnis yang dapat disalin 1-klik. | ✅ Lulus |
| AC-05 | Struk & Tombol Kembali | Halaman struk menampilkan rincian pemesanan, tombol "Kembali ke Beranda", dan tombol "Buka Dasbor Admin". | ✅ Lulus |
| AC-06 | Sinkronisasi Kanban | Saat bayar sukses, pesanan langsung muncul sebagai kartu di kolom "Pesanan Masuk" / "Prospek" di Pipeline Admin. | ✅ Lulus |
| AC-07 | Sinkronisasi Kas Keuangan | Nilai transaksi otomatis menambah saldo kas terealisasi dan memunculkan faktur baru di daftar faktur. | ✅ Lulus |
| AC-08 | Akses 24/7 Cloud | Aplikasi aktif di GitHub Pages (`https://tergoss123.github.io/lumina-crm/`) dan Cloudflare tanpa mati saat komputer offline. | ✅ Lulus |
