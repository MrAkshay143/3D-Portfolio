import React, { CSSProperties } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

interface CustomCSS extends CSSProperties {
  '--electric-border-color'?: string;
  '--gradient-color'?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Determine color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Web': return '#3b82f6'; // Blue 500
      case 'App': return '#ec4899'; // Pink 500
      case 'Software': return '#10b981'; // Emerald 500
      case 'Adv. Excel': return '#f59e0b'; // Amber 500
      default: return '#6366f1'; // Indigo 500
    }
  };

  const color = getCategoryColor(project.category);
  
  const style: CustomCSS = {
    '--electric-border-color': color,
    '--gradient-color': `oklch(from ${color} 0.3 calc(c / 2) h / 0.4)`
  };

  return (
    <div className="electric-card-container h-full" style={style}>
      <div className="electric-inner-container">
        
        {/* Electric Border Effect Layers */}
        <div className="electric-border-outer">
          <div className="electric-main-card"></div>
        </div>
        <div className="electric-glow-layer-1"></div>
        <div className="electric-glow-layer-2"></div>
        
        {/* Content Overlay - Holds actual data */}
        <div className="electric-content-container">
          
          {/* Top Half - Project Image */}
          <div className="content-top relative flex-1 p-0 overflow-hidden rounded-t-[22px] group">
             {/* Badge */}
             <div className="absolute top-4 right-4 z-20">
               <div className="scrollbar-glass backdrop-blur-md bg-slate-900/60 border border-white/10 px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                 {project.category}
               </div>
             </div>
             
             {/* Image */}
             <img 
               src={project.image} 
               alt={project.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>

          <hr className="electric-divider" />

          {/* Bottom Half - Info & Actions */}
          <div className="content-bottom p-5 bg-slate-950/40 backdrop-blur-sm flex flex-col justify-between flex-shrink-0 min-h-[180px]">
            <div>
               <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
               <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4 opacity-70">
                 {project.description}
               </p>
            </div>
            
            <div className="mt-auto">
               <div className="flex flex-wrap gap-1 mb-4">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                      {tech}
                    </span>
                  ))}
               </div>
               
               <div className="flex justify-between items-center border-t border-white/5 pt-3">
                  <div className="flex gap-3">
                     {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[var(--electric-border-color)] transition-colors">
                        <ExternalLink size={18} />
                      </a>
                     )}
                     {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Github size={18} />
                      </a>
                     )}
                  </div>
                  <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                     Verified
                  </span>
               </div>
            </div>
          </div>

        </div>

      </div>

      <div className="electric-overlay-1"></div>
      <div className="electric-overlay-2"></div>
      <div className="electric-background-glow"></div>
    </div>
  );
};

export default ProjectCard;