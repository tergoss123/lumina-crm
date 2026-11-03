import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 animate-slide-in max-w-md">
      {toast.type === 'error' ? (
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      ) : toast.type === 'info' ? (
        <Info className="w-5 h-5 text-blue-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      )}
      <div className="text-xs">
        <p className="font-bold text-gray-200">
          {toast.title || 'Notifikasi Studio'}
        </p>
        <p className="text-gray-300 mt-0.5 leading-snug">{toast.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-auto text-gray-400 hover:text-white transition-colors pl-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
