import React from 'react';
import { 
  LayoutDashboard, 
  Kanban, 
  CalendarDays, 
  Film, 
  ReceiptText 
} from 'lucide-react';

export const NAVIGATION_TABS = [
  { id: 'overview', label: 'Ringkasan', sub: 'Overview Studio', icon: LayoutDashboard },
  { id: 'pipeline', label: 'Pipeline', sub: 'Prospek & Pesanan', icon: Kanban },
  { id: 'calendar', label: 'Kalender', sub: 'Jadwal & Lembar Panggilan', icon: CalendarDays },
  { id: 'postprod', label: 'Pasca-Produksi', sub: 'Lab & Pengiriman', icon: Film },
  { id: 'invoices', label: 'Faktur & Keuangan', sub: 'Audit & Pajak', icon: ReceiptText },
];

export const DesktopNav = ({ activeTab, onSelectTab, counts }) => {
  return (
    <nav className="hidden md:flex border-b border-gray-200 bg-white px-4 lg:px-8">
      <div className="flex space-x-2 lg:space-x-4">
        {NAVIGATION_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative py-3 px-3.5 flex items-center gap-2.5 transition-all text-xs ${
                isActive 
                  ? 'text-black font-bold' 
                  : 'text-gray-500 hover:text-gray-900 font-medium'
              }`}
            >
              <div className={`p-1.5 rounded-md transition-colors ${
                isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 group-hover:text-black'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block leading-snug font-semibold text-sm">{tab.label}</span>
                <span className="text-[11px] text-gray-400 font-normal block">
                  {tab.sub}
                </span>
              </div>

              {tab.id === 'invoices' && counts?.overdueCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 ml-1" />
              )}

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black rounded-t" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export const MobileBottomNav = ({ activeTab, onSelectTab, counts }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {NAVIGATION_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-1 transition-all ${
                isActive ? 'text-black' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-black" />
              )}
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
                {tab.id === 'invoices' && counts?.overdueCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                )}
              </div>
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold text-black' : 'font-medium text-gray-500'}`}>
                {tab.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
