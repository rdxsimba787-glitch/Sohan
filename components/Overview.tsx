
import React from 'react';
import { Server, Globe, ShieldCheck, Clock, Zap, HardDrive, Cpu, Activity } from 'lucide-react';
import { MCServer, ServerStatus } from '../types';

interface OverviewProps {
  server: MCServer;
  cpu: number;
  memory: number;
}

const Overview: React.FC<OverviewProps> = ({ server, cpu, memory }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      {/* Left Column: Server Status Card */}
      <div className="lg:col-span-2 space-y-8">
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server size={120} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Infrastructure Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                 <div>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Server Instance</p>
                   <p className="text-xl font-bold text-white">{server.name}</p>
                 </div>
                 <div className="flex items-center gap-6">
                   <div>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</p>
                     <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${server.status === ServerStatus.RUNNING ? 'bg-green-500' : 'bg-red-500'}`}></span>
                       <span className="text-sm font-black text-white uppercase">{server.status}</span>
                     </div>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Node</p>
                     <p className="text-sm font-black text-white uppercase">{server.node}</p>
                   </div>
                 </div>
               </div>
               
               <div className="space-y-4">
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <Globe size={16} className="text-gray-500" />
                     <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Address</span>
                   </div>
                   <span className="text-xs font-mono text-blue-400">{server.ip}:{server.port}</span>
                 </div>
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <ShieldCheck size={16} className="text-gray-500" />
                     <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Protection</span>
                   </div>
                   <span className="text-[10px] font-black text-green-500 uppercase">DDoS Active</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-6 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
              <Cpu size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Process Priority</p>
              <p className="text-lg font-bold text-white uppercase">Realtime-High</p>
            </div>
          </div>
          <div className="glass-panel rounded-3xl p-6 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-500">
              <Zap size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Uptime SLA</p>
              <p className="text-lg font-bold text-white uppercase">99.9% Target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Quick Stats & Resource Limits */}
      <div className="space-y-8">
        <div className="glass-panel rounded-3xl p-8 border-l-4 border-blue-600">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <Activity size={16} className="text-blue-500" />
            Live Usage
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span className="text-gray-500">CPU Load</span>
                <span className="text-blue-400">{cpu}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(cpu/server.cpuLimit)*100}%` }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span className="text-gray-500">Memory usage</span>
                <span className="text-emerald-400">{(memory/1024).toFixed(1)}GB</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(memory/server.memoryLimit)*100}%` }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span className="text-gray-500">Disk storage</span>
                <span className="text-red-400">254MB</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `5%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 bg-gradient-to-br from-gray-900 to-black">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
             <button className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black text-gray-400 uppercase hover:text-white hover:bg-white/10 transition-all">Documentation</button>
             <button className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black text-gray-400 uppercase hover:text-white hover:bg-white/10 transition-all">Support API</button>
             <button className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black text-gray-400 uppercase hover:text-white hover:bg-white/10 transition-all">Node Health</button>
             <button className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black text-gray-400 uppercase hover:text-white hover:bg-white/10 transition-all">Audit Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
