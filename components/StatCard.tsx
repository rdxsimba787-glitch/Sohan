
import React from 'react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer
} from 'recharts';

interface StatCardProps {
  label: string;
  value: string;
  max: string;
  icon: React.ReactNode;
  data: { value: number }[];
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, max, icon, data, color }) => {
  const getColors = () => {
    if (color.includes('blue')) return { hex: '#3b82f6', bg: 'bg-blue-500/10', text: 'text-blue-500' };
    if (color.includes('emerald')) return { hex: '#10b981', bg: 'bg-emerald-500/10', text: 'text-emerald-500' };
    return { hex: '#ef4444', bg: 'bg-red-500/10', text: 'text-red-500' };
  };

  const theme = getColors();

  return (
    <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden group hover:border-white/10 transition-all duration-300">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${theme.bg} ${theme.text} shadow-inner`}>
            {icon}
          </div>
          <div>
            <h3 className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-0.5">{label}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
              <span className="text-xs text-gray-500 font-medium">/ {max}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-20 w-full relative z-10 -mx-6 -mb-6 mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.hex} stopOpacity={0.2}/>
                <stop offset="100%" stopColor={theme.hex} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={theme.hex} 
              fillOpacity={1} 
              fill={`url(#grad-${label})`} 
              strokeWidth={3}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
