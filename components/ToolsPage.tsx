
import React, { useEffect } from 'react';
import { 
  Calculator, FileLock, Youtube, Image, FileText, UserCheck, 
  MessageCircle, Video, CheckCircle2, ArrowRight, ArrowLeft, HelpCircle,
  FileSpreadsheet, Monitor, Smartphone, Globe, Cpu, ExternalLink
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const ToolsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { data } = useData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getToolIcon = (key: string) => {
    switch(key.toLowerCase()) {
      case 'calculator': return <Calculator size={24} />;
      case 'filelock': return <FileLock size={24} />;
      case 'youtube': return <Youtube size={24} />;
      case 'image': return <Image size={24} />;
      case 'filetext': return <FileText size={24} />;
      case 'usercheck': return <UserCheck size={24} />;
      case 'messagecircle': return <MessageCircle size={24} />;
      case 'video': return <Video size={24} />;
      case 'filespreadsheet': return <FileSpreadsheet size={24} />;
      case 'monitor': return <Monitor size={24} />;
      case 'app': return <Smartphone size={24} />;
      case 'web': return <Globe size={24} />;
      case 'cpu': return <Cpu size={24} />;
      default: return <HelpCircle size={24} />;
    }
  };

  // Sort sections by order
  const sortedSections = [...(data.toolSections || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 relative z-20 animate-fade-in-up">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header - Flex Row for Back Btn and Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-12 border-b border-slate-800 pb-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors shrink-0 self-start md:self-center"
          >
            <div className="p-2 rounded-full bg-slate-800 border border-slate-700 group-hover:border-primary/50 transition-all">
               <ArrowLeft size={18} />
            </div>
            <span className="font-medium text-sm">Back to Home</span>
          </button>

          <div className="text-left md:text-right">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary mb-1">
              Tools & Utilities
            </h1>
            <p className="text-slate-400 text-xs md:text-sm">
               Curated online tools for developers.
            </p>
          </div>
        </div>

        {/* Online Tools Grid - Compressed Design & 3 Col on Tablet */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Online Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.tools.map((tool) => (
              <div 
                key={tool.id}
                className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:border-[var(--color)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full items-center text-center"
                style={{ '--color': tool.color } as React.CSSProperties}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                
                {/* Absolute Link Icon */}
                <a 
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors z-20"
                  title="Open Tool"
                >
                  <ExternalLink size={16} />
                </a>

                <div className="flex flex-col h-full z-10 w-full items-center">
                  
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md shrink-0 mb-4"
                    style={{ color: tool.color }}
                  >
                    {getToolIcon(tool.iconKey)}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[var(--color)] transition-colors line-clamp-1 w-full">
                    {tool.title}
                  </h3>
                  
                  {/* Features - Left aligned text in a centered container */}
                  <div className="w-full bg-slate-950/30 rounded-xl p-3 mb-4 flex-1">
                    <ul className="space-y-2">
                      {tool.features.slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-400 text-left">
                          <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: tool.color }} />
                          <span className="line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button - Fixed Width / Auto */}
                  <a 
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-lg text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg border border-transparent hover:border-white/20 hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.color}cc)` }}
                  >
                    Launch Tool
                  </a>
                </div>
              </div>
            ))}
            {data.tools.length === 0 && (
              <div className="col-span-full text-center py-10 text-slate-500 italic">
                No tools available currently.
              </div>
            )}
          </div>
        </div>

        {/* Dynamic IFrames Section */}
        <div className="space-y-16">
           {sortedSections.map((section) => (
             <section key={section.id}>
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {section.title}
                  </h2>
               </div>
               <div 
                 className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative group"
                 style={{ height: section.height || '600px' }}
               >
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-900 -z-10">
                    <span className="text-slate-500 animate-pulse">Loading content...</span>
                 </div>
                 <iframe 
                   src={section.src} 
                   className="w-full h-full border-none bg-white"
                   title={section.title}
                   loading="lazy"
                 />
               </div>
             </section>
           ))}
        </div>

      </div>
    </div>
  );
};

export default ToolsPage;
