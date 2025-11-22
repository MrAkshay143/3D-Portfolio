import React from 'react';
import { QrCode, ShieldCheck, Wifi, Activity, Cpu } from 'lucide-react';
import { DEVELOPER_NAME, DEVELOPER_ROLE } from '../constants';

const DeveloperIDCard: React.FC = () => {
  return (
    <div className="relative group perspective-1000 w-full max-w-sm mx-auto transition-all duration-500 hover:rotate-y-6 hover:rotate-x-6">
      {/* Outer Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-[20px] blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
      
      <div className="relative h-full bg-slate-950/90 backdrop-blur-2xl border border-slate-800/80 rounded-[18px] overflow-hidden shadow-2xl">
        
        {/* Holographic overlay texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }} 
        />

        {/* Animated Scanner Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/80 shadow-[0_0_20px_rgba(99,102,241,0.8)] z-30 animate-[scan_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-100" />

        {/* Top Banner */}
        <div className="h-28 bg-slate-900 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
          </div>
          
          {/* Logos */}
          <div className="absolute top-4 left-5 flex items-center gap-2 z-10">
             <div className="p-1.5 bg-slate-950/50 rounded-lg border border-white/10 backdrop-blur-md">
               <ShieldCheck className="text-primary" size={18} />
             </div>
             <span className="text-[10px] font-mono tracking-[0.2em] text-slate-300 uppercase font-bold">DevSpace Corp</span>
          </div>
          
          <div className="absolute top-4 right-5 flex gap-2 z-10">
             <Wifi size={16} className="text-emerald-400 animate-pulse" />
             <Activity size={16} className="text-sky-400" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="px-6 pb-6 relative z-10">
          {/* Profile Image with Tech Border */}
          <div className="-mt-14 mb-4 w-28 h-28 rounded-2xl p-1 bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl relative mx-auto group-hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-950">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              />
              {/* Glitch/Tech Overlay */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            {/* Status Dot */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </div>
          </div>

          {/* Text Info */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white tracking-tight font-sans mb-1">{DEVELOPER_NAME}</h3>
            <p className="text-xs font-mono text-primary uppercase tracking-widest">{DEVELOPER_ROLE}</p>
          </div>

          {/* Data Chip & Info Grid */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between group-hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3">
                {/* Simulated Chip */}
                <div className="w-10 h-8 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-md border border-yellow-300/30 flex items-center justify-center shadow-sm relative overflow-hidden">
                   <Cpu size={16} className="text-yellow-900/70" />
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40" />
                </div>
                <div className="text-left">
                   <p className="text-[9px] text-slate-500 uppercase font-bold">Auth Chip</p>
                   <p className="text-[10px] text-slate-300 font-mono">X86-SECURE</p>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-[9px] text-slate-500 uppercase font-bold">ID Code</p>
                 <p className="text-xs text-white font-mono tracking-wider">8492-AX-09</p>
              </div>
            </div>
          </div>

          {/* Footer / Barcode */}
          <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
             <div className="flex flex-col gap-1 opacity-50 group-hover:opacity-80 transition-opacity">
               <div className="flex gap-0.5">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-6 w-[2px] ${i % 2 === 0 ? 'bg-slate-400' : 'bg-transparent'}`} />
                  ))}
               </div>
               <span className="text-[9px] text-slate-500 font-mono">SCAN_VERIFIED</span>
             </div>
             <QrCode className="text-white/80 group-hover:text-primary transition-colors" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperIDCard;