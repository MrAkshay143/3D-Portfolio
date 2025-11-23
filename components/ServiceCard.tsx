import React, { CSSProperties } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface CustomStyle extends CSSProperties {
  '--theme-color': string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, icon, onClick }) => {
  const style: CustomStyle = {
    '--theme-color': service.color,
  };

  return (
    <div 
      className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-[var(--theme-color)]/30"
      style={style}
    >
      {/* Dynamic Shadow on Hover using the theme color */}
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
           style={{ boxShadow: `inset 0 0 20px 2px ${service.color}20` }} />

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--theme-color)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-5 md:p-3 lg:p-6 flex flex-col items-center md:items-start text-center md:text-left h-full relative z-10">
        
        {/* Colorful Icon Container - Smaller on tablet */}
        <div className="mb-4 md:mb-3 lg:mb-5 inline-block">
          <div 
            className="w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden"
            style={{ borderColor: `${service.color}30` }}
          >
            {/* Inner Glow */}
            <div 
              className="absolute inset-0 opacity-20 transition-opacity" 
              style={{ background: `radial-gradient(circle at center, ${service.color}, transparent 70%)` }} 
            />
            
            <div className="relative z-10 transition-colors duration-300" style={{ color: service.color }}>
              {React.cloneElement(icon as React.ReactElement<any>, { 
                size: 28, // Default (mobile/large desktop)
                className: "w-7 h-7 md:w-5 md:h-5 lg:w-7 lg:h-7", // Responsive class overrides
                strokeWidth: 1.5
              })}
            </div>
          </div>
        </div>
        
        <h3 className="text-lg md:text-base lg:text-xl font-bold text-white mb-2 md:mb-2 lg:mb-3 font-sans group-hover:text-[var(--theme-color)] transition-colors leading-tight">
          {service.title}
        </h3>
        
        <p className="text-slate-400 text-xs lg:text-sm leading-relaxed mb-4 md:mb-3 lg:mb-5 border-b border-slate-800/50 pb-4 md:pb-3 lg:pb-5 flex-grow line-clamp-2 min-h-[2.5em]">
          {service.description}
        </p>
        
        {/* Features List - Visible on all screens now, enforced text-left */}
        <div className="space-y-2 mb-4 md:mb-3 lg:mb-6 w-full text-left">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 group/item">
              <CheckCircle2 className="shrink-0 mt-0.5 transition-transform group-hover/item:scale-110 w-3 h-3 lg:w-[14px] lg:h-[14px]" style={{ color: service.color }} />
              <span className="text-xs text-slate-300 font-medium group-hover/item:text-white transition-colors truncate">{feature}</span>
            </div>
          ))}
        </div>
        
        <button 
           onClick={onClick}
           className="inline-flex items-center text-xs font-bold text-white bg-slate-800/50 px-4 py-2.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 rounded-xl transition-all duration-300 gap-2 group/btn w-max self-center md:self-start border border-slate-700 hover:text-white hover:pl-6 cursor-pointer"
           style={{ 
             borderColor: `${service.color}40`
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = service.color;
             e.currentTarget.style.borderColor = service.color;
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
             e.currentTarget.style.borderColor = `${service.color}40`;
           }}
        >
          <span className="hidden md:inline">Read More</span>
          <span className="md:hidden">More</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Background Glow on Hover */}
      <div 
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 translate-y-1/2 translate-x-1/2 transition-colors duration-500 opacity-0 group-hover:opacity-20" 
        style={{ backgroundColor: service.color }}
      />
    </div>
  );
};

export default ServiceCard;