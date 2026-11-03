import React, { useState } from 'react';
import { 
  Receipt, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  ArrowUpRight, 
  Copy, 
  CreditCard, 
  FileText, 
  Percent, 
  DollarSign, 
  ChevronRight,
  ShieldAlert,
  Search
} from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export const InvoicesView = ({ 
  invoices, 
  onOpenInvoiceModal, 
  onSimulatePayFull, 
  showToast 
}) => {
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalReceived = invoices.reduce((acc, curr) => acc + curr.dpPaid, 0);
  const totalOutstanding = invoices.reduce((acc, curr) => acc + curr.balanceRemaining, 0);

  // Overdue calculation (Date < Nov 3, 2026 and not fully paid)
  const isOverdue = (dueDate, status) => {
    return new Date(dueDate) < new Date('2026-11-03') && status !== 'Fully Paid';
  };

  const overdueInvoices = invoices.filter(inv => isOverdue(inv.dueDate, inv.status));

  // Filtered invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = 
      statusFilter === 'Semua' ? true :
      statusFilter === 'DP Dibayar' ? inv.status === 'DP Paid' :
      statusFilter === 'Belum Lunas' ? (inv.status === 'Unpaid' || isOverdue(inv.dueDate, inv.status)) :
      statusFilter === 'Lunas' ? inv.status === 'Fully Paid' : true;

    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.bookingCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleCopyVA = (va) => {
    navigator.clipboard.writeText(va);
    showToast({
      title: 'Nomor VA Disalin',
      message: `${va} disalin ke clipboard.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded mb-2">
            <span>Treasury & Keuangan</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Faktur & Audit Keuangan Studio
          </h2>
          <p className="text-gray-600 text-sm mt-1 max-w-xl">
            Audit piutang produksi, status rekonsiliasi gateway perbankan BCA & Xendit, serta kepatuhan pemotongan PPN 11% & PPh 23.
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-lg border border-gray-200 self-start md:self-auto overflow-x-auto">
          {['Semua', 'DP Dibayar', 'Belum Lunas', 'Lunas'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                statusFilter === filter
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Treasury Ops KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Total Ditagihkan YTD</span>
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatRupiah(totalBilled)}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500 font-medium">
            {invoices.length} Faktur Resmi Diterbitkan
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Kas Masuk (Terealisasi)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatRupiah(totalReceived)}
            </span>
          </div>
          <p className="mt-2 text-xs text-emerald-700 font-semibold">
            Saldo Kas Likuid Studio di Bank BCA
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Piutang Tertunda (Outstanding)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatRupiah(totalOutstanding)}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500 font-medium">
            Menunggu Pelunasan Sebelum Delivery
          </p>
        </div>

        {/* Card 4 - Overdue Warning */}
        <div className={`p-5 rounded-xl border shadow-sm transition-all ${
          overdueInvoices.length > 0 
            ? 'bg-red-50/70 border-red-200' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={overdueInvoices.length > 0 ? 'text-red-700 font-bold' : 'text-gray-500'}>
              Faktur Lewat Jatuh Tempo
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${overdueInvoices.length > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-extrabold tracking-tight ${overdueInvoices.length > 0 ? 'text-red-700' : 'text-gray-900'}`}>
              {overdueInvoices.length}
            </span>
            <span className="text-xs font-medium text-gray-500">Faktur Mendesak</span>
          </div>
          <p className="mt-2 text-xs text-red-600 font-medium">
            {overdueInvoices.length > 0 ? 'Perlu tindakan reminder WhatsApp penagihan' : 'Semua termin aman'}
          </p>
        </div>
      </div>

      {/* Tax & Gateway Information Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-xs">
              Kepatuhan Pajak (PPN 11% & PPh 23)
            </h4>
            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
              Setiap faktur komersial otomatis mengkalkulasi PPN 11% sesuai UU HPP dan pemotongan PPh 23 sebesar 2% untuk klien berbadan hukum (PT).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-xs">
              Otomasi Gateway BCA & Xendit
            </h4>
            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
              Rekonsiliasi mutasi bank secara instan memperbarui status booking di pipeline tanpa intervensi manual.
            </p>
          </div>
        </div>
      </div>

      {/* Invoices Ledger Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-gray-900">
            Daftar Faktur ({filteredInvoices.length} Dokumen)
          </h3>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nomor faktur, klien..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs">
                <th className="py-3 px-4">Nomor Faktur</th>
                <th className="py-3 px-4">Nama Klien & Pesanan</th>
                <th className="py-3 px-4">Jatuh Tempo</th>
                <th className="py-3 px-4">Total Tagihan</th>
                <th className="py-3 px-4">Sudah Dibayar</th>
                <th className="py-3 px-4">Sisa Pelunasan</th>
                <th className="py-3 px-4">Status & Pajak</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => {
                const overdue = isOverdue(inv.dueDate, inv.status);

                return (
                  <tr 
                    key={inv.id}
                    onClick={() => onOpenInvoiceModal(inv.id)}
                    className="hover:bg-gray-50 cursor-pointer group transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-gray-900 group-hover:text-black">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900">{inv.clientName}</p>
                      <p className="text-xs text-gray-500">{inv.bookingCode}</p>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <span className={overdue ? 'text-red-700 font-bold' : 'text-gray-700 font-medium'}>
                        {formatDateIndo(inv.dueDate)}
                      </span>
                      {overdue && (
                        <span className="block text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded mt-0.5 w-fit">
                          TERLAMBAT
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-900 text-sm">
                      {formatRupiah(inv.totalAmount)}
                    </td>
                    <td className="py-4 px-4 text-emerald-700 font-semibold text-xs">
                      {formatRupiah(inv.dpPaid)}
                    </td>
                    <td className="py-4 px-4 font-bold text-sm">
                      <span className={inv.balanceRemaining > 0 ? (overdue ? 'text-red-700' : 'text-gray-900') : 'text-emerald-700'}>
                        {formatRupiah(inv.balanceRemaining)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${
                          inv.status === 'Fully Paid' ? 'bg-emerald-50 text-emerald-700' :
                          overdue ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {inv.status === 'Fully Paid' ? 'Lunas' : overdue ? 'Jatuh Tempo' : 'DP Masuk'}
                        </span>

                        <div className="flex gap-1 text-[11px] text-gray-500 font-medium">
                          {inv.ppnApplied && <span>PPN 11%</span>}
                          {inv.pph23Applied && <span>• PPh 23</span>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {inv.status !== 'Fully Paid' && (
                          <button
                            onClick={() => onSimulatePayFull(inv.id)}
                            className="px-2.5 py-1 text-xs font-semibold bg-black hover:bg-gray-800 text-white rounded-lg transition-all"
                            title="Simulasikan Pelunasan Cepat"
                          >
                            Bayar
                          </button>
                        )}
                        <button
                          onClick={() => onOpenInvoiceModal(inv.id)}
                          className="px-3 py-1 text-xs font-semibold border border-gray-300 hover:border-black rounded-lg hover:bg-gray-50 transition-all text-gray-800"
                        >
                          Lihat Faktur
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
