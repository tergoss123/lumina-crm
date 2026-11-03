export const INITIAL_CLIENTS = [
  {
    id: "c-101",
    name: "Anya Geraldine & Nicko",
    whatsapp: "+62 811 8892 411",
    email: "anya.management@atelier.id",
    instagram: "@anyageraldine",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12"
  },
  {
    id: "c-102",
    name: "Maison De L'Est / Sejauh",
    whatsapp: "+62 812 9901 8820",
    email: "press@maisondelest.co.id",
    instagram: "@maisondelest",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    createdAt: "2026-10-18"
  },
  {
    id: "c-103",
    name: "Clarissa Wang & Bryan",
    whatsapp: "+62 817 6021 9911",
    email: "clarissa.wang@theprivate.com",
    instagram: "@clarissawang",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24"
  },
  {
    id: "c-104",
    name: "Harper's Bazaar Indonesia",
    whatsapp: "+62 813 1450 7710",
    email: "editorial@harpersbazaar.co.id",
    instagram: "@bazaarindonesia",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    createdAt: "2026-10-28"
  },
  {
    id: "c-105",
    name: "Dior Beaute Indonesia",
    whatsapp: "+62 811 9283 001",
    email: "brand.marketing@lvmh.id",
    instagram: "@diorbeauty",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    createdAt: "2026-11-01"
  },
  {
    id: "c-106",
    name: "Valerie Thomas & Julian",
    whatsapp: "+62 818 0998 7722",
    email: "valerie@thomasfam.id",
    instagram: "@valeriethomas",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    createdAt: "2026-11-02"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "b-01",
    bookingCode: "LMN-26-089",
    clientId: "c-101",
    clientName: "Anya Geraldine & Nicko",
    eventType: "Pernikahan",
    eventDate: "2026-11-08",
    venue: "Ayana Resort Cliff Villa, Uluwatu Bali",
    packageTier: "Editorial",
    totalPrice: 185000000,
    dpAmount: 92500000,
    paymentStatus: "DP Paid",
    workflowStatus: "Shooting",
    assignedCrew: ["Arya Wiratama (Dir)", "Radit Pratama (Cam)", "Sasha Lin (Stylist)", "Reza Wardhana (Gaffer)"],
    galleryUrl: "https://vault.lumina.studio/c/anya-nicko",
    invoiceId: "inv-2026-001",
    notes: "Pengambilan gambar sore hari Golden Hour 17:15. Rekaman 8K Full Frame anamorphic Cooke S4/i. Klien request privasi ketat NDA.",
    pinVault: "884920",
    postProdProgress: 35,
    callSheet: {
      callTime: "05:30 WIB",
      wrapTime: "20:00 WIB",
      studioUnit: "Main Cliff Lawn & Ocean Deck",
      equipmentChecklist: [
        { id: "eq-1", name: "RED V-Raptor 8K VV + Cooke Anamorphic Set", ready: true },
        { id: "eq-2", name: "DJI Ronin 4D 8K Cinema Gimbal", ready: true },
        { id: "eq-3", name: "Arri SkyPanel X21 + Matthews C-Stands", ready: true },
        { id: "eq-4", name: "Teradek Bolt 4K LT Zero-Delay Wireless", ready: false },
        { id: "eq-5", name: "Sennheiser MKH 416 Dual Boom Set", ready: true }
      ]
    }
  },
  {
    id: "b-02",
    bookingCode: "LMN-26-092",
    clientId: "c-104",
    clientName: "Harper's Bazaar Indonesia",
    eventType: "Editorial",
    eventDate: "2026-11-12",
    venue: "Lumina Studio A (White Cyclorama), Senopati",
    packageTier: "Signature",
    totalPrice: 95000000,
    dpAmount: 47500000,
    paymentStatus: "DP Paid",
    workflowStatus: "Booked",
    assignedCrew: ["Arya Wiratama (Dir)", "Karin Novita (Stylist)", "Bima Sena (Cam)"],
    galleryUrl: "https://vault.lumina.studio/c/hbazaar-december",
    invoiceId: "inv-2026-002",
    notes: "Edisi Cover Desember. High-contrast monochromatic lighting, 3 busana haute couture.",
    pinVault: "991204",
    postProdProgress: 0,
    callSheet: {
      callTime: "08:00 WIB",
      wrapTime: "17:30 WIB",
      studioUnit: "Studio A Infinite Cyclorama",
      equipmentChecklist: [
        { id: "eq-6", name: "Hasselblad H6D-100c Medium Format", ready: true },
        { id: "eq-7", name: "Profoto Pro-11 2400 AirTTL Strobe Pack", ready: true },
        { id: "eq-8", name: "Eizo ColorEdge 4K Calibrated Tether Station", ready: true }
      ]
    }
  },
  {
    id: "b-03",
    bookingCode: "LMN-26-085",
    clientId: "c-102",
    clientName: "Maison De L'Est / Sejauh",
    eventType: "Komersial",
    eventDate: "2026-10-29",
    venue: "The Dharmawangsa Penthouse, Jakarta Selatan",
    packageTier: "Editorial",
    totalPrice: 140000000,
    dpAmount: 140000000,
    paymentStatus: "Fully Paid",
    workflowStatus: "Post-Production",
    assignedCrew: ["Radit Pratama (Cam)", "Gilang Ramadhan (Editor)", "Devi Chandra (Colorist)"],
    galleryUrl: "https://vault.lumina.studio/c/maisondelest-fall26",
    invoiceId: "inv-2026-003",
    notes: "Kampanye Resort 2027. Sedang tahap Color Grading DaVinci Resolve 19. Koreksi tone film 35mm.",
    pinVault: "310928",
    postProdProgress: 75,
    callSheet: {
      callTime: "07:00 WIB",
      wrapTime: "19:00 WIB",
      studioUnit: "Suite & Garden Suite",
      equipmentChecklist: [
        { id: "eq-9", name: "Sony FX9 Full Frame + Angenieux EZ Zooms", ready: true },
        { id: "eq-10", name: "Aputure 1200d Pro + Light Dome 150", ready: true }
      ]
    }
  },
  {
    id: "b-04",
    bookingCode: "LMN-26-095",
    clientId: "c-103",
    clientName: "Clarissa Wang & Bryan",
    eventType: "Pernikahan",
    eventDate: "2026-11-20",
    venue: "The Langham Ballroom, SCBD Jakarta",
    packageTier: "Editorial",
    totalPrice: 220000000,
    dpAmount: 110000000,
    paymentStatus: "DP Paid",
    workflowStatus: "Quote Sent",
    assignedCrew: ["Arya Wiratama (Dir)", "Kru Unit 1 (5 Personel)"],
    galleryUrl: "https://vault.lumina.studio/c/clarissa-bryan",
    invoiceId: "inv-2026-004",
    notes: "Penawaran draft final dikirim via WhatsApp & Email. Menunggu persetujuan termin 2.",
    pinVault: "551982",
    postProdProgress: 0,
    callSheet: {
      callTime: "06:00 WIB",
      wrapTime: "23:00 WIB",
      studioUnit: "Grand Ballroom & Presidential Suite",
      equipmentChecklist: [
        { id: "eq-11", name: "Dual RED V-Raptor Cameras + Steadicam", ready: false },
        { id: "eq-12", name: "Drone DJI Inspire 3 RAW (Indoor/Outdoor)", ready: true }
      ]
    }
  },
  {
    id: "b-05",
    bookingCode: "LMN-26-098",
    clientId: "c-105",
    clientName: "Dior Beaute Indonesia",
    eventType: "Komersial",
    eventDate: "2026-11-28",
    venue: "Studio B (Daylight Loft), Menteng",
    packageTier: "Editorial",
    totalPrice: 165000000,
    dpAmount: 0,
    paymentStatus: "Unpaid",
    workflowStatus: "Inquiry",
    assignedCrew: ["Pending Konfirmasi"],
    galleryUrl: "https://vault.lumina.studio/c/dior-prestige",
    invoiceId: "inv-2026-005",
    notes: "Prospek baru masuk kemarin. Launching serum Prestige. Butuh makro sinematik 100fps.",
    pinVault: "772109",
    postProdProgress: 0,
    callSheet: {
      callTime: "09:00 WIB",
      wrapTime: "18:00 WIB",
      studioUnit: "Studio B Daylight Loft",
      equipmentChecklist: [
        { id: "eq-13", name: "Phantom Flex 4K High Speed Camera", ready: false }
      ]
    }
  },
  {
    id: "b-06",
    bookingCode: "LMN-26-078",
    clientId: "c-106",
    clientName: "Valerie Thomas & Julian",
    eventType: "Potret",
    eventDate: "2026-10-15",
    venue: "Lumina Studio Private Lab",
    packageTier: "Standard",
    totalPrice: 48000000,
    dpAmount: 48000000,
    paymentStatus: "Fully Paid",
    workflowStatus: "Delivered",
    assignedCrew: ["Radit Pratama (Cam)", "Devi Chandra (Colorist)"],
    galleryUrl: "https://vault.lumina.studio/c/valerie-julian-private",
    invoiceId: "inv-2026-006",
    notes: "Katalog Master & Cetakan Fine-Art Archival Box telah diterima klien di Jakarta.",
    pinVault: "129845",
    postProdProgress: 100,
    callSheet: {
      callTime: "10:00 WIB",
      wrapTime: "16:00 WIB",
      studioUnit: "Studio C Portrait Salon",
      equipmentChecklist: [
        { id: "eq-14", name: "Leica SL3 + Summilux 50mm f/1.4", ready: true }
      ]
    }
  }
];

export const INITIAL_INVOICES = [
  {
    id: "inv-2026-001",
    invoiceNumber: "INV/LMN/26/11-001",
    bookingId: "b-01",
    bookingCode: "LMN-26-089",
    clientName: "Anya Geraldine & Nicko",
    totalAmount: 185000000,
    dpPaid: 92500000,
    balanceRemaining: 92500000,
    status: "DP Paid",
    dueDate: "2026-11-06",
    issuedDate: "2026-10-15",
    ppnApplied: true,
    pph23Applied: false,
    virtualAccount: "1280 8921 4410 8821 (BCA)",
    xenditLink: "https://checkout.xendit.co/web/lumina-inv-001"
  },
  {
    id: "inv-2026-002",
    invoiceNumber: "INV/LMN/26/11-002",
    bookingId: "b-02",
    bookingCode: "LMN-26-092",
    clientName: "Harper's Bazaar Indonesia",
    totalAmount: 95000000,
    dpPaid: 47500000,
    balanceRemaining: 47500000,
    status: "DP Paid",
    dueDate: "2026-11-10",
    issuedDate: "2026-10-20",
    ppnApplied: true,
    pph23Applied: true,
    virtualAccount: "1280 9940 1120 7733 (BCA)",
    xenditLink: "https://checkout.xendit.co/web/lumina-inv-002"
  },
  {
    id: "inv-2026-003",
    invoiceNumber: "INV/LMN/26/10-045",
    bookingId: "b-03",
    bookingCode: "LMN-26-085",
    clientName: "Maison De L'Est / Sejauh",
    totalAmount: 140000000,
    dpPaid: 140000000,
    balanceRemaining: 0,
    status: "Fully Paid",
    dueDate: "2026-10-28",
    issuedDate: "2026-10-10",
    ppnApplied: true,
    pph23Applied: true,
    virtualAccount: "1280 7711 0022 3918 (BCA)",
    xenditLink: "https://checkout.xendit.co/web/lumina-inv-003"
  },
  {
    id: "inv-2026-004",
    invoiceNumber: "INV/LMN/26/11-004",
    bookingId: "b-04",
    bookingCode: "LMN-26-095",
    clientName: "Clarissa Wang & Bryan",
    totalAmount: 220000000,
    dpPaid: 110000000,
    balanceRemaining: 110000000,
    status: "DP Paid",
    dueDate: "2026-11-02", // Jatuh tempo / overdue peringatan
    issuedDate: "2026-10-18",
    ppnApplied: true,
    pph23Applied: false,
    virtualAccount: "1280 6633 4455 1209 (BCA)",
    xenditLink: "https://checkout.xendit.co/web/lumina-inv-004"
  },
  {
    id: "inv-2026-005",
    invoiceNumber: "INV/LMN/26/11-005",
    bookingId: "b-05",
    bookingCode: "LMN-26-098",
    clientName: "Dior Beaute Indonesia",
    totalAmount: 165000000,
    dpPaid: 0,
    balanceRemaining: 165000000,
    status: "Unpaid",
    dueDate: "2026-11-25",
    issuedDate: "2026-11-01",
    ppnApplied: true,
    pph23Applied: true,
    virtualAccount: "1280 5511 8844 9901 (BCA)",
    xenditLink: "https://checkout.xendit.co/web/lumina-inv-005"
  },
  {
    id: "inv-2026-006",
    invoiceNumber: "INV/LMN/26/10-038",
    bookingId: "b-06",
    bookingCode: "LMN-26-078",
    clientName: "Valerie Thomas & Julian",
    totalAmount: 48000000,
    dpPaid: 48000000,
    balanceRemaining: 0,
    status: "Fully Paid",
    dueDate: "2026-10-14",
    issuedDate: "2026-10-01",
    ppnApplied: true,
    pph23Applied: false,
    virtualAccount: "1280 4422 1199 8830 (BCA)",
    xenditLink: "https://checkout.xendit.co/web/lumina-inv-006"
  }
];

export const INITIAL_POST_PROD_TASKS = [
  {
    id: "task-01",
    bookingId: "b-03",
    bookingCode: "LMN-26-085",
    clientName: "Maison De L'Est / Sejauh",
    title: "Kampanye Resort 2027 Post Pipeline",
    editor: "Gilang Ramadhan",
    colorist: "Devi Chandra",
    frameIoLink: "https://app.frame.io/projects/lmn-sejauh-2027",
    stages: [
      { id: "s1", name: "Penerimaan Raw 8K (Ingest & Backup LTO)", done: true, date: "30 Okt 2026" },
      { id: "s2", name: "Kurasi & Seleksi 1.400 Frame", done: true, date: "31 Okt 2026" },
      { id: "s3", name: "Rough Cut 60s & 30s Cutdowns", done: true, date: "01 Nov 2026" },
      { id: "s4", name: "Color Grading DaVinci Resolve (Arri LogC3 to 35mm)", done: true, date: "02 Nov 2026" },
      { id: "s5", name: "Audio Master & Sound Design (Dolby Atmos)", done: false, date: "Sedang Berjalan" },
      { id: "s6", name: "Review Klien via Frame.io", done: false, date: "Est 05 Nov" },
      { id: "s7", name: "Final Master Delivery (ProRes 4444 XQ)", done: false, date: "Est 07 Nov" }
    ]
  },
  {
    id: "task-02",
    bookingId: "b-01",
    bookingCode: "LMN-26-089",
    clientName: "Anya Geraldine & Nicko",
    title: "Cinematic Film 4K & Editorial Stills",
    editor: "Radit Pratama",
    colorist: "Arya Wiratama",
    frameIoLink: "https://app.frame.io/projects/lmn-anya-nicko",
    stages: [
      { id: "s1", name: "Penerimaan Raw 8K (Ingest & Backup LTO)", done: false, date: "Jadwal 09 Nov" },
      { id: "s2", name: "Kurasi & Seleksi 3.000 Frame", done: false, date: "Jadwal 11 Nov" },
      { id: "s3", name: "Rough Cut Teaser 90 Detik", done: false, date: "Jadwal 14 Nov" },
      { id: "s4", name: "Color Grading DaVinci Resolve", done: false, date: "Jadwal 17 Nov" },
      { id: "s5", name: "Audio Master & Scoring Musik Asli", done: false, date: "Jadwal 19 Nov" },
      { id: "s6", name: "VIP Preview Private Vault", done: false, date: "Jadwal 22 Nov" },
      { id: "s7", name: "Penyerahan Master Box Kayu Jati", done: false, date: "Jadwal 25 Nov" }
    ]
  },
  {
    id: "task-03",
    bookingId: "b-06",
    bookingCode: "LMN-26-078",
    clientName: "Valerie Thomas & Julian",
    title: "Fine Art Editorial Portraits",
    editor: "Radit Pratama",
    colorist: "Devi Chandra",
    frameIoLink: "https://app.frame.io/projects/lmn-valerie",
    stages: [
      { id: "s1", name: "Penerimaan Raw 8K (Ingest & Backup LTO)", done: true, date: "16 Okt" },
      { id: "s2", name: "Kurasi & Seleksi 50 Frame Master", done: true, date: "17 Okt" },
      { id: "s3", name: "Retouching High-End Kulit & Tekstur", done: true, date: "20 Okt" },
      { id: "s4", name: "Color Grading Fine-Art B&W & Warm Tone", done: true, date: "22 Okt" },
      { id: "s5", name: "Proofing Cetak Hahnemuhle Photo Rag", done: true, date: "24 Okt" },
      { id: "s6", name: "Review Klien via Frame.io", done: true, date: "26 Okt" },
      { id: "s7", name: "Katalog Master & Cetakan Dikirim", done: true, date: "28 Okt" }
    ]
  }
];

export const STUDIO_CREW = [
  { id: "cr-1", name: "Arya Wiratama", role: "Creative Director", status: "On Set", avatar: "AW" },
  { id: "cr-2", name: "Radit Pratama", role: "Lead Cinematographer", status: "On Set", avatar: "RP" },
  { id: "cr-3", name: "Reza Wardhana", role: "Chief Gaffer", status: "Prep Lab", avatar: "RW" },
  { id: "cr-4", name: "Sasha Lin", role: "Fashion & Wardrobe Stylist", status: "On Set", avatar: "SL" },
  { id: "cr-5", name: "Devi Chandra", role: "Senior DaVinci Colorist", status: "Suite 1", avatar: "DC" },
  { id: "cr-6", name: "Gilang Ramadhan", role: "Lead Offline Editor", status: "Suite 2", avatar: "GR" }
];
