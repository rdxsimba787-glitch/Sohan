
import React from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  FolderOpen, 
  Settings, 
  Database, 
  Network, 
  ShieldCheck, 
  Clock, 
  HardDrive, 
  Cpu, 
  Layers
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'console', label: 'Console', icon: <Terminal size={18} /> },
  { id: 'files', label: 'File Manager', icon: <FolderOpen size={18} /> },
  { id: 'databases', label: 'Databases', icon: <Database size={18} /> },
  { id: 'network', label: 'Network', icon: <Network size={18} /> },
  { id: 'startup', label: 'Startup', icon: <Layers size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

export const INITIAL_FILES = [
  { id: '1', name: 'bin', isDirectory: true, size: '4.0 KB', updatedAt: '2023-10-24 14:20' },
  { id: '2', name: 'logs', isDirectory: true, size: '12.0 KB', updatedAt: '2023-11-01 09:15' },
  { id: '3', name: 'world', isDirectory: true, size: '240 MB', updatedAt: '2023-11-15 18:30' },
  { id: '4', name: 'server.jar', isDirectory: false, size: '45.2 MB', updatedAt: '2023-11-12 11:00' },
  { id: '5', name: 'server.properties', isDirectory: false, size: '1.2 KB', updatedAt: '2023-11-15 20:05', content: 'server-port=25565\nmotd=Welcome to My Server\nmax-players=20\nlevel-name=world' },
  { id: '6', name: 'eula.txt', isDirectory: false, size: '128 B', updatedAt: '2023-10-20 08:00', content: 'eula=true' },
  { id: '7', name: 'ops.json', isDirectory: false, size: '0 B', updatedAt: '2023-10-20 08:00' },
];
