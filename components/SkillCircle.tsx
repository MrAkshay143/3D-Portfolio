import React, { useEffect, useState } from 'react';

interface SkillCircleProps {
  percentage: number;
  title: string;
  id: string | number;
}

const SkillCircle: React.FC<SkillCircleProps> = ({ percentage, title, id }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (percentage / 100) * circumference;
  const uniqueId = `gradient-${id}`;

  // State to trigger animation
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Small timeout to ensure the transition triggers after mount
    const timer = setTimeout(() => {
      setOffset(targetOffset);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetOffset, circumference]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 group cursor-default">
      <div className="relative w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        {/* Drop Shadow Glow - Pulses on Hover */}
        <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-primary animate-pulse-slow" />
        
        <svg className="transform -rotate-90 w-full h-full overflow-visible">
          <defs>
            <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" /> {/* Secondary Pink */}
              <stop offset="100%" stopColor="#6366f1" /> {/* Primary Indigo */}
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-800/50 transition-all duration-300 group-hover:stroke-slate-700/50"
          />
          
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={`url(#${uniqueId})`}
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease, stroke-width 0.3s ease'
            }}
            className="drop-shadow-[0_0_4px_rgba(236,72,153,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(99,102,241,0.8)] group-hover:stroke-[7px]"
          />
        </svg>
        
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white font-mono transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-primary group-hover:scale-110">
            {percentage}<span className="text-sm opacity-70 text-primary ml-0.5 group-hover:text-secondary">%</span>
          </span>
        </div>
      </div>
      
      <span className="font-bold text-slate-200 text-sm tracking-wide text-center transition-all duration-300 group-hover:text-primary group-hover:tracking-wider">
        {title}
      </span>
    </div>
  );
};

export default SkillCircle;