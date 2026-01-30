
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Power, 
  RotateCcw, 
  ExternalLink,
  Bot,
  Database,
  Network,
  Layers,
  ChevronRight,
  ShieldAlert,
  LayoutDashboard
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Console from './components/Console';
import StatCard from './components/StatCard';
import FileManager from './components/FileManager';
import Overview from './components/Overview';
import { ServerStatus, LogEntry, MCServer } from './types';
import { INITIAL_FILES } from './constants';
import { generateServerLogs, getSmartAdminAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [server, setServer] = useState<MCServer>({
    id: 'server-1',
    name: 'Genesis Survival',
    ip: '142.93.102.5',
    port: 25565,
    status: ServerStatus.OFFLINE,
    memoryLimit: 4096,
    cpuLimit: 200,
    diskLimit: 10240,
    location: 'Singapore-1',
    node: 'SEA-Node-04'
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [cpuData, setCpuData] = useState<{ value: number }[]>(Array(20).fill({ value: 0 }));
  const [memData, setMemData] = useState<{ value: number }[]>(Array(20).fill({ value: 0 }));
  const [advice, setAdvice] = useState<string>('Terminal initialized. Standing by for command input.');

  useEffect(() => {
    const interval = setInterval(() => {
      if (server.status === ServerStatus.RUNNING) {
        setCpuData(prev => [...prev.slice(1), { value: Math.floor(Math.random() * 25) + 15 }]);
        setMemData(prev => [...prev.slice(1), { value: Math.floor(Math.random() * 400) + 2100 }]);
      } else {
        setCpuData(prev => [...prev.slice(1), { value: 0 }]);
        setMemData(prev => [...prev.slice(1), { value: 0 }]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [server.status]);

  const addLog = useCallback((message: string, type: 'info' | 'warn' | 'error' | 'success' = 'info') => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const handleAction = async (action: 'start' | 'stop' | 'restart') => {
    if (action === 'start') {
      setServer(prev => ({ ...prev, status: ServerStatus.STARTING }));
      addLog("Allocating virtual machine resources...", 'info');
      
      const bootLogs = await generateServerLogs(server.name, 'start');
      for (const log of bootLogs) {
        await new Promise(r => setTimeout(r, Math.random() * 300 + 50));
        addLog(log);
      }
      
      setServer(prev => ({ ...prev, status: ServerStatus.RUNNING }));
      addLog("Node heartbeat detected. System ONLINE.", 'success');

      const aiAdvice = await getSmartAdminAdvice(bootLogs);
      setAdvice(aiAdvice);
    } else if (action === 'stop') {
      setServer(prev => ({ ...prev, status: ServerStatus.STOPPING }));
      addLog("Sending SIGTERM to process thread...", 'warn');
      await new Promise(r => setTimeout(r, 1000));
      setServer(prev => ({ ...prev, status: ServerStatus.OFFLINE }));
      addLog("Process disconnected safely.", 'error');
    } else if (action === 'restart') {
      await handleAction('stop');
      await handleAction('start');
    }
  };

  const handleCommand = (cmd: string) => {
    addLog(`$ /bin/exec ${cmd}`, 'info');
    if (cmd.toLowerCase() === 'help') {
      addLog("Internal SDK Commands: restart, logs, clear, status", 'info');
    } else {
      addLog("Instruction received and queued.", 'success');
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-blue-500/30 selection:text-blue-200">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        serverName={server.name} 
      />
      
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Top Header Section */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8 animate-fadeIn">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                <LayoutDashboard size={12} className="text-blue-500" />
                <span>Servers</span>
                <ChevronRight size={10} />
                <span className="text-white">{server.name}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                  {server.name}
                </h1>
                <div className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all duration-700 ${
                  server.status === ServerStatus.RUNNING ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  server.status === ServerStatus.STARTING ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                  'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {server.status}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                  <span className="font-mono text-xs text-gray-400 group-hover:text-gray-200 tracking-wider">{server.ip}:{server.port}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-gray-600">
                  <ShieldAlert size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Tunnel</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 shadow-2xl self-end xl:self-start">
              <button 
                onClick={() => handleAction('start')}
                disabled={server.status !== ServerStatus.OFFLINE}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-black text-[11px] tracking-[0.2em] transition-all btn-glow-blue ${
                  server.status === ServerStatus.OFFLINE 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-40'
                }`}
              >
                <Power size={18} /> BOOT UP
              </button>
              <div className="w-[1px] h-10 bg-white/5"></div>
              <button 
                onClick={() => handleAction('restart')}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <RotateCcw size={20} />
              </button>
              <button 
                onClick={() => handleAction('stop')}
                disabled={server.status === ServerStatus.OFFLINE}
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                  server.status !== ServerStatus.OFFLINE 
                    ? 'bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white' 
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-40'
                }`}
              >
                <Activity size={20} />
              </button>
            </div>
          </div>

          {/* AI Intelligence Banner */}
          <div className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 border-l-4 border-blue-500 animate-fadeIn">
             <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 relative">
               <Bot size={32} />
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#0d1117] animate-pulse"></div>
             </div>
             <div className="flex-1 text-center md:text-left">
               <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">Intelligence Module</h4>
               <p className="text-gray-200 text-lg font-medium leading-tight">"{advice}"</p>
             </div>
             <div className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/20"></span>
             </div>
          </div>

          {/* Tab Views */}
          {activeTab === 'dashboard' && (
            <Overview 
              server={server} 
              cpu={cpuData[cpuData.length-1].value} 
              memory={memData[memData.length-1].value} 
            />
          )}

          {activeTab === 'console' && (
            <div className="space-y-10 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard 
                  label="Compute Load" 
                  value={`${cpuData[cpuData.length-1].value}%`} 
                  max={`${server.cpuLimit}%`} 
                  icon={<Cpu size={22} />} 
                  data={cpuData}
                  color="text-blue-500"
                />
                <StatCard 
                  label="RAM Allocation" 
                  value={`${(memData[memData.length-1].value / 1024).toFixed(1)}GB`} 
                  max={`${(server.memoryLimit / 1024).toFixed(0)}GB`} 
                  icon={<Activity size={22} />} 
                  data={memData}
                  color="text-emerald-500"
                />
                <StatCard 
                  label="I/O Throughput" 
                  value="254MB" 
                  max="10GB" 
                  icon={<HardDrive size={22} />} 
                  data={Array(20).fill({ value: 120 })}
                  color="text-red-500"
                />
              </div>
              <Console 
                logs={logs} 
                onCommand={handleCommand} 
                status={server.status}
              />
            </div>
          )}

          {activeTab === 'files' && (
            <div className="animate-fadeIn">
              <FileManager files={INITIAL_FILES} />
            </div>
          )}

          {/* Fallback for empty modules */}
          {['databases', 'network', 'startup', 'settings'].includes(activeTab) && (
            <div className="glass-panel rounded-[40px] p-24 flex flex-col items-center justify-center text-center min-h-[500px] animate-fadeIn">
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-blue-500 mb-10 border border-white/5 group hover:rotate-12 transition-transform duration-500">
                 {activeTab === 'databases' && <Database size={48} />}
                 {activeTab === 'network' && <Network size={48} />}
                 {activeTab === 'startup' && <Layers size={48} />}
                 {activeTab === 'settings' && <RotateCcw size={48} />}
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic italic">{activeTab} Integration</h2>
              <p className="text-gray-500 max-w-md text-lg font-medium">Remote node synchronization in progress. This module will be available shortly.</p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="mt-12 px-8 py-4 bg-white/5 rounded-2xl text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase border border-blue-500/10 hover:bg-blue-500/5 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
