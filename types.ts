
export enum ServerStatus {
  OFFLINE = 'offline',
  STARTING = 'starting',
  RUNNING = 'running',
  STOPPING = 'stopping'
}

export interface ServerFile {
  id: string;
  name: string;
  size: string;
  updatedAt: string;
  isDirectory: boolean;
  content?: string;
}

export interface ServerStats {
  cpu: number;
  memory: number;
  disk: number;
  uptime: number;
}

export interface MCServer {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: ServerStatus;
  memoryLimit: number;
  cpuLimit: number;
  diskLimit: number;
  location: string;
  node: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}
