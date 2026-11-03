import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Copy, ExternalLink } from 'lucide-react';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

export const InvoiceModal = ({ 
  invoice, 
  onClose, 
  onSimulatePayFull, 
  showToast 
}) => {
  if (!invoice) return null;

  const handleCopyVA = () => {
    navigator.clipboard.writeText(invoice.virtualAccount);
    showToast({
      title: 'Nomor VA Disalin',
      message: `Nomor BCA Virtual Account ${invoice.virtualAccount} disalin ke clipboard.`,
      type: 'success'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculations
  const subtotal = invoice.totalAmount;
  const ppnRate = invoice.ppnApplied ? 0.11 : 0;
  const pph23Rate = invoice.pph23Applied ? 0.02 : 0;
  const ppnAmount = subtotal * ppnRate;
  const pph23Amount = subtotal * pph23Rate;
  const grandTotal = subtotal + ppnAmount - pph23Amount;

  const isOverdue = new Date(invoice.dueDate) < new Date('2026-11-03') && invoice.status !== 'Fully Paid';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-2xl relative flex flex-col max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Non-printed controls) */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between print:hidden sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <span>Faktur Elektronik Resmi • PT Lumina Kreasi Utama</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-800 flex items-center gap-1.5 transition-all hover:bg-white"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Faktur (PDF)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Canvas */}
        <div className="p-8 sm:p-12 space-y-8 bg-white print:p-0">
          
          {/* Header Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-black pb-6 gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Lumina Studios
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">
                Fine Photography & Production House
              </p>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed font-normal">
                PT Lumina Kreasi Utama<br />
                Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190<br />
                NPWP: 01.384.992.4-013.000 (Pengusaha Kena Pajak Terdaftar DJP)
              </p>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className={`inline-block px-3 py-1 font-bold rounded-md text-xs mb-3 ${
                invoice.status === 'Fully Paid' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : isOverdue 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {invoice.status === 'Fully Paid' ? 'Lunas (Paid)' : isOverdue ? 'Jatuh Tempo (Overdue)' : 'DP Diterima (Termin 1)'}
              </span>
              <p className="font-bold text-base text-gray-900">{invoice.invoiceNumber}</p>
              <p className="text-gray-500 mt-1">Tanggal Terbit: {formatDateIndo(invoice.issuedDate)}</p>
              <p className="text-gray-500">Jatuh Tempo: {formatDateIndo(invoice.dueDate)}</p>
            </div>
          </div>

          {/* Client & Booking Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs py-2">
            <div>
              <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block mb-1">
                Ditujukan Kepada Klien:
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                {invoice.clientName}
              </h3>
              <p className="text-gray-600 mt-1">Kode Pesanan: <span className="font-bold text-gray-900">{invoice.bookingCode}</span></p>
              <p className="text-gray-600">ID Klien: {invoice.bookingId}</p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs uppercase font-bold text-gray-500 tracking-wider block mb-1">
                Ketentuan Pembayaran:
              </span>
              <p className="text-gray-800 font-medium">Termin 1: DP 50% Konfirmasi Jadwal</p>
              <p className="text-gray-800 font-medium">Termin 2: Pelunasan 50% Sebelum Serah Terima Master</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold text-xs">
                  <th className="py-3.5 px-4">Deskripsi Layanan Produksi</th>
                  <th className="py-3.5 px-4 text-center">Jumlah</th>
                  <th className="py-3.5 px-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4">
                    <p className="font-bold text-gray-900 text-sm">
                      Paket Produksi Cinema & Editorial 8K High-End
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Termasuk kru sutradara, sinematografer, tata cahaya gaffer, colorist DaVinci Resolve, dan lisensi penyiaran master.
                    </p>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700 font-medium">1 Sesi</td>
                  <td className="py-4 px-4 text-right font-bold text-gray-900 text-sm">
                    {formatRupiah(subtotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tax & Total Calculation Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 text-xs pt-2">
            <div className="space-y-3 max-w-sm">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-700 block">
                  Metode Pembayaran (BCA Virtual Account):
                </span>
                <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-gray-200">
                  <span className="font-bold text-gray-900 text-sm">{invoice.virtualAccount}</span>
                  <button 
                    onClick={handleCopyVA}
                    className="p-1 hover:text-black text-gray-400"
                    title="Salin Nomor VA"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Pembayaran diverifikasi otomatis 24/7 melalui sistem Xendit & API BCA.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-80 space-y-2 text-right text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Kontrak:</span>
                <span className="font-bold text-gray-900">{formatRupiah(subtotal)}</span>
              </div>

              {invoice.ppnApplied && (
                <div className="flex justify-between text-gray-600">
                  <span>PPN 11% (UU HPP):</span>
                  <span className="font-bold text-gray-900">{formatRupiah(ppnAmount)}</span>
                </div>
              )}

              {invoice.pph23Applied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Pemotongan PPh 23 (-2%):</span>
                  <span>-{formatRupiah(pph23Amount)}</span>
                </div>
              )}

              <div className="border-t-2 border-black pt-2 flex justify-between text-base font-bold text-gray-900">
                <span>Total Ditagihkan:</span>
                <span>{formatRupiah(grandTotal)}</span>
              </div>

              <div className="flex justify-between text-gray-600 pt-1">
                <span>DP Telah Dibayar:</span>
                <span className="text-emerald-700 font-semibold">{formatRupiah(invoice.dpPaid)}</span>
              </div>

              <div className="flex justify-between font-bold pt-1 border-t border-gray-200 text-gray-900">
                <span>Sisa Pelunasan:</span>
                <span className={`text-sm ${invoice.balanceRemaining > 0 ? 'text-red-700 font-bold' : 'text-emerald-700'}`}>
                  {formatRupiah(invoice.balanceRemaining)}
                </span>
              </div>
            </div>
          </div>

          {/* Signature & Seal Block */}
          <div className="pt-8 border-t border-gray-200 grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verifikasi Sistem:</p>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mt-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Dokumen Digital Sah Menurut UU ITE</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Authorized Treasury:</p>
              <p className="text-base font-bold text-gray-900 mt-2">
                Lumina Studios Treasury Ops
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Jakarta, Indonesia</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Actions (Simulation) */}
        {invoice.status !== 'Fully Paid' && (
          <div className="p-4 bg-gray-900 text-white rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs print:hidden">
            <div>
              <span className="text-gray-400 block text-xs">Simulasi Gateway:</span>
              <p className="font-semibold text-white">Sisa Tagihan Belum Lunas: {formatRupiah(invoice.balanceRemaining)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSimulatePayFull(invoice.id)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasikan Pembayaran Lunas</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
