
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { User, LogOut, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  serverName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, serverName }) => {
  return (
    <div className="w-64 bg-[#080b11] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-20 shadow-2xl">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="relative group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#080b11] rounded-full"></div>
        </div>
        <div>
          <h1 className="text-sm font-black text-white truncate w-32 tracking-tighter uppercase">{serverName}</h1>
          <p className="text-[9px] text-blue-500 font-bold tracking-[0.2em] uppercase opacity-70">Control Panel</p>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-8 space-y-1.5 overflow-y-auto">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-white tab-active' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`transition-colors ${activeTab === item.id ? 'text-blue-500' : 'text-gray-600 group-hover:text-gray-400'}`}>
                {item.icon}
              </span>
              <span className="text-xs font-bold tracking-widest uppercase">
                {item.label}
              </span>
            </div>
            {activeTab === item.id && <ChevronRight size={14} className="text-blue-500" />}
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-4">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 border border-white/10">
               <User size={16} />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-[10px] font-black text-white truncate uppercase">Server Admin</p>
               <p className="text-[9px] text-gray-500 font-bold truncate">admin@pterodactyl.io</p>
             </div>
             <button className="text-gray-600 hover:text-red-400 transition-colors">
               <LogOut size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
