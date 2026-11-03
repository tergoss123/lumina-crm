import React, { useState } from 'react';
import { 
  Film, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Share2, 
  Lock, 
  Key, 
  Sliders, 
  HardDrive, 
  MessageSquare, 
  Check, 
  ExternalLink,
  Sparkles,
  Eye,
  Copy,
  Download
} from 'lucide-react';
import { INITIAL_POST_PROD_TASKS } from '../data/mockData';

export const PostProductionView = ({ bookings, showToast }) => {
  const [tasks, setTasks] = useState(INITIAL_POST_PROD_TASKS);
  const [selectedTask, setSelectedTask] = useState(INITIAL_POST_PROD_TASKS[0]);
  const [previewVaultOpen, setPreviewVaultOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

  // Toggle stage completion
  const handleToggleStage = (taskId, stageId) => {
    setTasks(prevTasks => {
      const updated = prevTasks.map(t => {
        if (t.id === taskId) {
          const newStages = t.stages.map(s => {
            if (s.id === stageId) {
              return { ...s, done: !s.done };
            }
            return s;
          });
          return { ...t, stages: newStages };
        }
        return t;
      });

      const updatedSelected = updated.find(t => t.id === taskId);
      if (updatedSelected) setSelectedTask(updatedSelected);

      return updated;
    });

    showToast({
      title: 'Milestone Lab Diperbarui',
      message: 'Progres pasca-produksi berhasil disinkronkan ke ledger studio.',
      type: 'success'
    });
  };

  // Calculate percentage
  const calculateProgress = (stages) => {
    if (!stages || stages.length === 0) return 0;
    const completed = stages.filter(s => s.done).length;
    return Math.round((completed / stages.length) * 100);
  };

  const handleCopyVIPWhatsApp = (task) => {
    const booking = bookings.find(b => b.bookingCode === task.bookingCode);
    const pin = booking?.pinVault || '884920';
    const message = `Kepada Yth. Klien Lumina Studios,\n\nKatalog Master & Ulasan Proyek ${task.clientName} (${task.bookingCode}) telah tersedia di Private Vault Cloud kami.\n\nTautan VIP: https://vault.lumina.studio/c/${task.bookingCode.toLowerCase()}\nPIN Enkripsi: ${pin}\n\nSilakan tinjau dan tinggalkan feedback langsung pada frame yang diinginkan.\n\nSalam Hangat,\nLumina Studios Post-Lab Suite`;
    
    navigator.clipboard.writeText(message);
    showToast({
      title: 'Pesan VIP Tersalin',
      message: 'Format pesan VIP WhatsApp beserta tautan enkripsi PIN siap dikirimkan.',
      type: 'success'
    });
  };

  const handleOpenClientVaultModal = (task) => {
    setSelectedTask(task);
    setEnteredPin('');
    setIsVaultUnlocked(false);
    setPreviewVaultOpen(true);
  };

  const handleUnlockVault = () => {
    const booking = bookings.find(b => b.bookingCode === selectedTask.bookingCode);
    const validPin = booking?.pinVault || '884920';
    if (enteredPin === validPin || enteredPin === '884920' || enteredPin === '123456') {
      setIsVaultUnlocked(true);
      showToast({
        title: 'Vault Terbuka',
        message: 'Akses terenkripsi diberikan untuk master gallery klien.',
        type: 'success'
      });
    } else {
      showToast({
        title: 'PIN Tidak Cocok',
        message: `PIN yang dimasukkan salah. Gunakan PIN: ${validPin}`,
        type: 'error'
      });
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded mb-2">
            <span>Laboratorium Editing & Arsip</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Pasca-Produksi & Pengiriman Master
          </h2>
          <p className="text-gray-600 text-sm mt-1 max-w-xl">
            Siklus pengeditan offline 8K, color grading DaVinci Resolve, ulasan frame-akurat Frame.io, dan arsip brankas cloud privat klien.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopyVIPWhatsApp(selectedTask)}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Kirim Tautan VIP WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Projects List + Detailed Milestone Tracker & Frame.io & Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Project Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2.5">
            Daftar Suite Editing Aktif ({tasks.length})
          </h3>

          <div className="space-y-3">
            {tasks.map((task) => {
              const progress = calculateProgress(task.stages);
              const isSelected = selectedTask.id === task.id;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-white border-black shadow-md ring-2 ring-black' 
                      : 'bg-white border-gray-200 hover:border-gray-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="font-semibold text-gray-700">{task.bookingCode}</span>
                    <span className="font-bold text-black">{progress}% Selesai</span>
                  </div>

                  <h4 className="text-base font-bold text-gray-900">
                    {task.clientName}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {task.title}
                  </p>

                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className="bg-black h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>Editor: {task.editor.split(' ')[0]}</span>
                    <span>Colorist: {task.colorist.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Task Milestones & Frame.io & Vault (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Milestone Stepper Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Alur Editing // {selectedTask.bookingCode}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
                  {selectedTask.clientName}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenClientVaultModal(selectedTask)}
                  className="px-3.5 py-2 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-800 flex items-center gap-1.5 transition-all hover:bg-gray-50"
                >
                  <Lock className="w-3.5 h-3.5 text-gray-600" />
                  <span>Uji Akses Private Vault</span>
                </button>
              </div>
            </div>

            {/* Stages Checklist */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Tahapan Produksi & Verifikasi Lab:
              </p>

              {selectedTask.stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  onClick={() => handleToggleStage(selectedTask.id, stage.id)}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    stage.done 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-gray-200 hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                      stage.done ? 'bg-black text-white' : 'border border-gray-300 text-gray-500'
                    }`}>
                      {stage.done ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div>
                      <p className={`text-xs sm:text-sm ${stage.done ? 'text-gray-900 font-semibold line-through decoration-gray-300' : 'text-gray-900 font-medium'}`}>
                        {stage.name}
                      </p>
                      <span className="text-xs text-gray-500 block mt-0.5 font-medium">
                        Status: {stage.date}
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    stage.done 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {stage.done ? 'Selesai' : 'Sedang Diproses'}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500">
              * Klik tahapan di atas untuk menandai penyelesaian. Persentase progres akan dihitung otomatis.
            </p>
          </div>

          {/* Frame.io & Private Vault Integrations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Frame.io Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-purple-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Review Frame.io
                  </h4>
                </div>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Terhubung
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID Proyek:</span>
                    <span className="font-bold text-gray-900">frame-lmn-{selectedTask.bookingCode.toLowerCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Komentar Klien Aktif:</span>
                    <span className="font-bold text-amber-700">4 Catatan Timecode</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-lg border border-gray-200 bg-white">
                    <p className="font-bold text-gray-900">[00:00:42:18] Direktur Mode:</p>
                    <p className="text-gray-600 mt-0.5">"Naikkan kontras shadow 1 stop pada gaun hitam."</p>
                  </div>
                  <div className="p-2.5 rounded-lg border border-gray-200 bg-white">
                    <p className="font-bold text-gray-900">[00:01:12:04] Klien:</p>
                    <p className="text-gray-600 mt-0.5">"Transisi audio di cutdown 30s sangat halus, disetujui."</p>
                  </div>
                </div>
              </div>

              <a
                href={selectedTask.frameIoLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-gray-800 transition-all flex items-center justify-center gap-1.5 hover:bg-gray-50"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Frame.io Workspace</span>
              </a>
            </div>

            {/* Private Cloud Vault Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-black" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Private Vault VIP
                  </h4>
                </div>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded font-medium">
                  Enkripsi AES-256
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <p className="text-gray-600 leading-relaxed">
                  Akses brankas digital eksklusif klien untuk unduhan master ProRes 4444 XQ, album web beresolusi penuh, dan cetakan arsip.
                </p>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Kunci PIN Akses:</span>
                    <span className="font-bold text-sm bg-white px-2.5 py-0.5 rounded border border-gray-200 text-gray-900 font-mono">
                      884920
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Masa Aktif Tautan:</span>
                    <span className="text-gray-900 font-medium">365 Hari (Lifetime Archival)</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => handleOpenClientVaultModal(selectedTask)}
                  className="w-full py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Uji Akses Portal Vault</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Private Vault Client View Modal */}
      {previewVaultOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-2xl p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setPreviewVaultOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-2 rounded-lg"
            >
              ✕
            </button>

            {!isVaultUnlocked ? (
              /* PIN Entry Screen */
              <div className="text-center space-y-5 py-4">
                <div>
                  <div className="inline-flex p-3 bg-gray-100 text-black rounded-xl mb-3">
                    <Key className="w-6 h-6 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Lumina Private Vault
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase font-semibold tracking-wider">
                    Akses Master Terenkripsi // {selectedTask.clientName}
                  </p>
                </div>

                <div className="max-w-xs mx-auto space-y-3">
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Masukkan 6 Digit PIN"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    className="w-full py-2.5 px-4 text-center tracking-[0.4em] text-lg font-bold bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-black transition-all"
                  />
                  <p className="text-xs text-gray-500">
                    PIN Standar Demo: <span className="text-gray-900 font-bold">884920</span>
                  </p>

                  <button
                    onClick={handleUnlockVault}
                    className="w-full py-2.5 bg-black text-white text-xs uppercase font-bold rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                  >
                    Buka Brankas Digital
                  </button>
                </div>
              </div>
            ) : (
              /* Unlocked Vault Gallery View */
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Sesi Terverifikasi • Master Vault 8K</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedTask.clientName}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Arsip Foto Resolusi Penuh & Video Master 8K ProRes 4444 XQ
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="aspect-square bg-gray-100 rounded-xl border border-gray-200 relative group overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=80" 
                      alt="Master 1" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-xs font-bold bg-white text-black px-2.5 py-1 rounded-md shadow">
                        Unduh 8K
                      </span>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-xl border border-gray-200 relative group overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop&q=80" 
                      alt="Master 2" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-xs font-bold bg-white text-black px-2.5 py-1 rounded-md shadow">
                        Unduh 8K
                      </span>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-xl border border-gray-200 relative group overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" 
                      alt="Master 3" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-xs font-bold bg-white text-black px-2.5 py-1 rounded-md shadow">
                        Unduh 8K
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-gray-500 font-medium">Total Ukuran Berkas: 1.84 TB (Master Ingest)</span>
                  <button 
                    onClick={() => {
                      showToast({
                        title: 'Unduhan Dimulai',
                        message: 'Tautan unduhan arsip zip 8K telah diproses.',
                        type: 'success'
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh Paket Master Lengkap</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
