
import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Send, Hash, Activity } from 'lucide-react';
import { LogEntry } from '../types';

interface ConsoleProps {
  logs: LogEntry[];
  onCommand: (cmd: string) => void;
  status: string;
}

const Console: React.FC<ConsoleProps> = ({ logs, onCommand, status }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [command, setCommand] = React.useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command);
      setCommand('');
    }
  };

  return (
    <div className="glass-panel rounded-[2rem] flex flex-col h-[650px] shadow-2xl overflow-hidden group">
      <div className="px-8 py-5 bg-[#0d1117] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
            <TerminalIcon size={18} />
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Node Output</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
            <div className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`} />
            <span className="text-[10px] uppercase font-black text-gray-200 tracking-widest">{status}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
             <Activity size={14} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Async</span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-8 font-mono text-[13px] overflow-y-auto space-y-2 bg-[#05070a]/50 scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-5 group/line animate-fadeIn">
            <span className="text-gray-700 shrink-0 font-bold opacity-40 select-none">[{log.timestamp}]</span>
            <span className={`break-all leading-relaxed ${
              log.message.includes('[ERROR]') || log.message.includes('error') ? 'text-red-500' :
              log.message.includes('[WARN]') ? 'text-yellow-500' :
              log.message.includes('Done') ? 'text-green-400 font-bold' :
              log.message.startsWith('$') ? 'text-blue-500 italic' :
              'text-gray-400'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-800 space-y-4">
            <TerminalIcon size={64} strokeWidth={0.5} className="opacity-20" />
            <p className="font-bold text-xs uppercase tracking-[0.2em] opacity-30 italic">Awaiting kernel boot sequence...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-[#0d1117] border-t border-white/5 flex items-center gap-5">
        <div className="flex items-center gap-2 text-blue-500 font-mono font-bold text-lg select-none">
          <Hash size={18} />
        </div>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="ENTER SYSTEM COMMAND..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-100 font-mono placeholder:text-gray-700 uppercase font-bold tracking-wider"
        />
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-blue-600/10 active:scale-95 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
};

export default Console;
