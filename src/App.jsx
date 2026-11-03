import React, { useState } from 'react';
import { Header } from './components/Header';
import { DesktopNav, MobileBottomNav } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { PipelineView } from './components/PipelineView';
import { CalendarView } from './components/CalendarView';
import { PostProductionView } from './components/PostProductionView';
import { InvoicesView } from './components/InvoicesView';
import { CustomerPortal } from './components/CustomerPortal';
import { BookingInspector } from './components/BookingInspector';
import { InvoiceModal } from './components/InvoiceModal';
import { NewBookingModal } from './components/NewBookingModal';
import { Toast } from './components/Toast';
import { ArrowRightLeft, Sparkles, User, LayoutDashboard, ShieldCheck } from 'lucide-react';

import { 
  INITIAL_BOOKINGS, 
  INITIAL_INVOICES, 
  INITIAL_CLIENTS,
  STUDIO_CREW 
} from './data/mockData';

export function App() {
  // App Mode: 'admin' (Internal CRM Dashboard) | 'customer' (Customer-Facing Portal)
  const [appMode, setAppMode] = useState('admin');
  
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeInvoiceId, setActiveInvoiceId] = useState(null);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = ({ title, message, type = 'success' }) => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Toggle gear check item in call sheet
  const handleToggleGearItem = (bookingId, itemId) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId && b.callSheet) {
        const updatedChecklist = b.callSheet.equipmentChecklist.map(eq => {
          if (eq.id === itemId) return { ...eq, ready: !eq.ready };
          return eq;
        });
        return {
          ...b,
          callSheet: {
            ...b.callSheet,
            equipmentChecklist: updatedChecklist
          }
        };
      }
      return b;
    }));

    showToast({
      title: 'Kesiapan Armada Diperbarui',
      message: 'Status kalibrasi & inspeksi peralatan diverifikasi.',
      type: 'info'
    });
  };

  // Update booking status
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, workflowStatus: newStatus };
      }
      return b;
    }));

    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(prev => ({ ...prev, workflowStatus: newStatus }));
    }
  };

  // Advance stage in Kanban pipeline
  const handleAdvanceStage = (bookingId, nextStageId) => {
    handleUpdateBookingStatus(bookingId, nextStageId);
    showToast({
      title: 'Tahap Dimajukan',
      message: `Pesanan berhasil dipindahkan ke tahap ${nextStageId}.`,
      type: 'success'
    });
  };

  // Revert stage in Kanban pipeline
  const handleRevertStage = (bookingId, prevStageId) => {
    handleUpdateBookingStatus(bookingId, prevStageId);
    showToast({
      title: 'Tahap Dikembalikan',
      message: `Pesanan dikembalikan ke tahap ${prevStageId}.`,
      type: 'info'
    });
  };

  // Simulate payment
  const handleSimulatePayFull = (invoiceId) => {
    let matchedBookingCode = '';

    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        matchedBookingCode = inv.bookingCode;
        return {
          ...inv,
          dpPaid: inv.totalAmount,
          balanceRemaining: 0,
          status: 'Fully Paid'
        };
      }
      return inv;
    }));

    if (matchedBookingCode) {
      setBookings(prev => prev.map(b => {
        if (b.bookingCode === matchedBookingCode) {
          return {
            ...b,
            dpAmount: b.totalPrice,
            paymentStatus: 'Fully Paid'
          };
        }
        return b;
      }));
    }

    showToast({
      title: 'Pelunasan Dikonfirmasi',
      message: 'Pembayaran sebesar 100% telah diverifikasi oleh Bank BCA. Status pesanan diperbarui menjadi LUNAS.',
      type: 'success'
    });
  };

  // Add new booking created via Admin Intake Modal
  const handleCreateNewBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);

    // Create corresponding invoice
    const newInvoice = {
      id: newBooking.invoiceId,
      invoiceNumber: `INV/LMN/26/11-${Math.floor(Math.random() * 80) + 100}`,
      bookingId: newBooking.id,
      bookingCode: newBooking.bookingCode,
      clientName: newBooking.clientName,
      totalAmount: newBooking.totalPrice,
      dpPaid: newBooking.dpAmount,
      balanceRemaining: newBooking.totalPrice - newBooking.dpAmount,
      status: newBooking.paymentStatus,
      dueDate: '2026-11-20',
      issuedDate: '2026-11-03',
      ppnApplied: true,
      pph23Applied: newBooking.eventType === 'Komersial',
      virtualAccount: `1280 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} (BCA)`,
      xenditLink: `https://checkout.xendit.co/web/lumina-${newBooking.bookingCode.toLowerCase()}`
    };

    setInvoices(prev => [newInvoice, ...prev]);

    showToast({
      title: 'Pesanan Berhasil Dibuat',
      message: `Pesanan ${newBooking.clientName} (${newBooking.bookingCode}) berhasil masuk ke Pipeline & Ledger Faktur.`,
      type: 'success'
    });
  };

  // Callback when a customer books & pays via CustomerPortal (Real-time Monolith Sync!)
  const handleCustomerBookingCreated = (newBookingRecord, newInvoiceRecord) => {
    setBookings(prev => [newBookingRecord, ...prev]);
    setInvoices(prev => [newInvoiceRecord, ...prev]);
    // Set active tab to pipeline so when switching to Admin mode, the user immediately sees the new card!
    setActiveTab('pipeline');
  };

  // Find active invoice for modal
  const activeInvoice = invoices.find(inv => inv.id === activeInvoiceId);

  // Overdue count for navigation badges
  const overdueCount = invoices.filter(inv => {
    return new Date(inv.dueDate) < new Date('2026-11-03') && inv.status !== 'Fully Paid';
  }).length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-[#111827]">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Persistent Floating Mode Switcher Button (Corner pill for easy demo) */}
      <aside 
        aria-label="Mode Switcher Navigation"
        className="fixed bottom-20 md:bottom-6 right-4 z-50 flex items-center gap-1.5 p-1.5 bg-[#111827] text-white rounded-full shadow-2xl border border-gray-700/80 backdrop-blur-md transition-all hover:scale-105"
      >
        <button
          onClick={() => setAppMode('customer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            appMode === 'customer' 
              ? 'bg-white text-black shadow-md' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>View as Customer</span>
        </button>

        <button
          onClick={() => setAppMode('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            appMode === 'admin' 
              ? 'bg-white text-black shadow-md' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>View as Admin (CRM)</span>
        </button>

        <div className="hidden lg:flex items-center gap-1 pr-2 pl-1 text-[10px] text-emerald-400 font-semibold border-l border-gray-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Sync</span>
        </div>
      </aside>

      {/* App Shell Header */}
      <Header
        onOpenNewBooking={() => setNewBookingModalOpen(true)}
        activeTab={activeTab}
        pendingCount={bookings.filter(b => b.workflowStatus === 'Inquiry' || b.workflowStatus === 'Booked').length}
        onOpenQuickAction={() => setActiveTab('pipeline')}
        appMode={appMode}
        onToggleAppMode={() => setAppMode(prev => prev === 'admin' ? 'customer' : 'admin')}
      />

      {/* Main Content Render based on appMode */}
      {appMode === 'customer' ? (
        /* CUSTOMER-FACING PORTAL (Katalog, Checkout, Mockup Gateway, Success Receipt) */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CustomerPortal
            onBookingCreated={handleCustomerBookingCreated}
            onSwitchToAdmin={() => setAppMode('admin')}
            showToast={showToast}
          />
        </main>
      ) : (
        /* INTERNAL CRM DASBOR (Ringkasan, Pipeline, Kalender, Pasca-Prod, Faktur) */
        <>
          {/* Desktop Navigation Tabs */}
          <DesktopNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            counts={{ overdueCount }}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeTab === 'overview' && (
              <DashboardView
                bookings={bookings}
                invoices={invoices}
                onSelectBooking={setSelectedBooking}
                onToggleGearItem={handleToggleGearItem}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                onNavigateToTab={setActiveTab}
                showToast={showToast}
              />
            )}

            {activeTab === 'pipeline' && (
              <PipelineView
                bookings={bookings}
                onSelectBooking={setSelectedBooking}
                onAdvanceStage={handleAdvanceStage}
                onRevertStage={handleRevertStage}
                onOpenNewBooking={() => setNewBookingModalOpen(true)}
              />
            )}

            {activeTab === 'calendar' && (
              <CalendarView
                bookings={bookings}
                crewList={STUDIO_CREW}
                showToast={showToast}
                onSelectBooking={setSelectedBooking}
              />
            )}

            {activeTab === 'postprod' && (
              <PostProductionView
                bookings={bookings}
                showToast={showToast}
              />
            )}

            {activeTab === 'invoices' && (
              <InvoicesView
                invoices={invoices}
                onOpenInvoiceModal={setActiveInvoiceId}
                onSimulatePayFull={handleSimulatePayFull}
                showToast={showToast}
              />
            )}
          </main>

          {/* Persistent Mobile Bottom Navigation Bar for Admin */}
          <MobileBottomNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            counts={{ overdueCount }}
          />
        </>
      )}

      {/* Slide-over Selected Booking Inspector Drawer */}
      {selectedBooking && (
        <BookingInspector
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onNavigateToTab={setActiveTab}
          onOpenInvoiceModal={setActiveInvoiceId}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          showToast={showToast}
        />
      )}

      {/* High-End Editorial Printable Invoice Modal */}
      {activeInvoice && (
        <InvoiceModal
          invoice={activeInvoice}
          onClose={() => setActiveInvoiceId(null)}
          onSimulatePayFull={handleSimulatePayFull}
          showToast={showToast}
        />
      )}

      {/* New Booking / Lead Intake Modal (Admin) */}
      <NewBookingModal
        isOpen={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
        onSubmit={handleCreateNewBooking}
        showToast={showToast}
      />
    </div>
  );
}

export default App;
