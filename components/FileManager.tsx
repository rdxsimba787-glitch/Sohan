
import React from 'react';
import { File, Folder, MoreVertical, Trash2, Edit3, Download, Plus, Upload, HardDrive } from 'lucide-react';
import { ServerFile } from '../types';

interface FileManagerProps {
  files: ServerFile[];
}

const FileManager: React.FC<FileManagerProps> = ({ files }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-sm bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
          <HardDrive size={16} className="text-gray-500" />
          <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Path</span>
          <span className="text-gray-200 font-mono text-xs">/home/container</span>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-xs font-black tracking-widest flex items-center gap-3 transition-all border border-white/5">
            <Plus size={16} /> NEW FILE
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-black tracking-widest flex items-center gap-3 transition-all shadow-lg shadow-blue-600/20">
            <Upload size={16} /> UPLOAD
          </button>
        </div>
      </div>

      <div className="bg-[#0d1117]/60 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#0d1117]">
              <th className="px-8 py-5 font-black text-gray-500 uppercase text-[10px] tracking-[0.2em]">Name</th>
              <th className="px-8 py-5 font-black text-gray-500 uppercase text-[10px] tracking-[0.2em]">Size</th>
              <th className="px-8 py-5 font-black text-gray-500 uppercase text-[10px] tracking-[0.2em]">Last Modified</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${file.isDirectory ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-800/50 text-gray-500'}`}>
                      {file.isDirectory ? (
                        <Folder size={18} fill="currentColor" fillOpacity={0.2} />
                      ) : (
                        <File size={18} />
                      )}
                    </div>
                    <span className="text-gray-200 font-semibold text-sm group-hover:text-blue-400 transition-colors">
                      {file.name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-gray-500 font-mono text-xs">{file.size}</td>
                <td className="px-8 py-5 text-gray-500 text-xs font-medium">{file.updatedAt}</td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <button className="p-2.5 hover:bg-blue-500/20 rounded-xl text-gray-400 hover:text-blue-400 transition-all">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                      <Download size={16} />
                    </button>
                    <button className="p-2.5 hover:bg-red-500/20 rounded-xl text-gray-400 hover:text-red-400 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileManager;
